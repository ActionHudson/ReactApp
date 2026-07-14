import { Badge, Box, Group, LoadingOverlay, Stack } from '@mantine/core';
import sortBy from 'lodash/sortBy';
import { DataTable } from 'mantine-datatable';
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from 'react';

import { Colours } from '../../ArcaneThreads/Colours.js';
import { notify } from '../../ArcaneThreads/Notify';
import { FontSize, FontWeight } from '../../ArcaneThreads/Sizes.js';
import FilterControls from '../../Enchantments/FilterControls/FilterControls.jsx';
import Icon from '../../Runes/Icon/Icon.jsx';
import Text from '../../Runes/Text/Text.jsx';

const FILTER_KEYS = [
    'faction',
    'race',
    'class',
    'armor_type',
    'specialization',
    'primary_professions',
    'secondary_professions'
];

const CLASS_COLORS = {
    Shaman: '#0070DE',
    Mage: '#69CCF0',
    Warrior: '#C79C6E',
    Priest: '#FFFFFF',
    Hunter: '#ABD473',
    Druid: '#FF7C0A',
    Rogue: '#FFF569',
    Paladin: '#F58CBA',
    Warlock: '#9482C9',
    Monk: '#00FF96',
    'Death Knight': '#C41F3B',
    'Demon Hunter': '#A330C9',
    Evoker: '#33937F'
};

const EXPANSION_MAP = {
    classic: "Classic",
    tbc: "TBC",
    wotlk: "WoTLK",
    cata: "Cata",
    mop: "MoP",
    wod: "WoD",
    legion: "Legion",
    bfa: "BfA",
    sl: "SL",
    df: "DF",
    tww: "TWW",
    midnight: "Midnight"
};

const EXPANSION_MAX_SKILL = {
    classic: 300,
    tbc: 75,
    wotlk: 75,
    cata: 75,
    mop: 75,
    wod: 100,
    legion: 100,
    bfa: 175,
    sl: 100,
    df: 100,
    tww: 100,
    midnight: 100
};

const parseJsonData = (val, fallback) => {
    if (typeof val !== 'string') {
        return val || fallback;
    }
    try {
        let cleanVal = val.trim();
        if (cleanVal.startsWith("'") && cleanVal.endsWith("'")) {
            cleanVal = cleanVal.slice(1, -1);
        }
        return JSON.parse(cleanVal);
    } catch (e) {
        return fallback;
    }
};

const ProfessionList = ({ title, professions }) => {
    if (!professions || professions.length === 0) {
        return null;
    }

    return (
        <Stack gap="xl">
            <Text fw={ 700 } size="xl">
                { title }
            </Text>
            { professions.map(prof => (
                <Group key={ prof.name } px="md">
                    <Text size="lg" fw={ 600 } w={ 120 }>
                        { prof.name }
                    </Text>
                    <Group gap="xs" pl="md">
                        { Object.entries(EXPANSION_MAP).map(([ key, name ]) => {
                            const currentProgress = prof.progress?.[key] ?? 0;
                            const isMaxed = currentProgress >= (EXPANSION_MAX_SKILL[key] || 100) && currentProgress > 0;

                            return (
                                <div
                                    key={ key }
                                    style={ {
                                        backgroundColor: isMaxed ? Colours.accent.primary : "#e4e4e4",
                                        color: 'white',
                                        padding: '8px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        width: '65px'
                                    } }
                                >
                                    <Stack gap="8" align="center">
                                        <Text size="xs" fw={ 600 } ta="center" color={ isMaxed ? Colours.secondary : Colours.muted }>
                                            { name }
                                        </Text>
                                        <Text size="xs" fw={ 600 } ta="center" color={ isMaxed ? Colours.secondary : Colours.primary }>
                                            { `${ currentProgress }/${ EXPANSION_MAX_SKILL[key] }` }
                                        </Text>
                                    </Stack>
                                </div>
                            );
                        }) }
                    </Group>
                </Group>
            )) }
        </Stack>
    );
};

ProfessionList.propTypes = {
    title: PropTypes.string.isRequired,
    professions: PropTypes.array.isRequired
};

export default function WoW () {
    const [ rawData, setRawData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ selected, setSelected ] = useState([]);
    const [ sortStatus, setSortStatus ] = useState({
        columnAccessor: '',
        direction: 'asc'
    });

    useEffect(() => {
        fetch('/aether/manifest.php?table=wow_characters')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const parsedData = data.map(record => ({
                        ...record,
                        available_roles: parseJsonData(
                            record.available_roles, {}
                        ),
                        primary_professions: parseJsonData(
                            record.primary_professions, []
                        ),
                        secondary_professions: parseJsonData(
                            record.secondary_professions, []
                        ),
                        heritage_armor_unlocked: Boolean(Number(
                            record.heritage_armor_unlocked
                        ))
                    }));
                    setRawData(parsedData);
                } else {
                    notify.error('Data Error', 'The server returned an invalid format.');
                    console.error('Invalid data format:', data);
                }
                setLoading(false);
            })
            .catch(err => {
                notify.error('Fetch Error', 'Could not load reference data.');
                console.error(err);
                setLoading(false);
            });
    }, []);

    const groupedData = useMemo(() => {
        const groups = {};

        FILTER_KEYS.forEach(key => {
            groups[key] = new Set();
            rawData.forEach(record => {
                const val = record[key];
                if (Array.isArray(val)) {
                    val.forEach(v => {
                        if (v && v.name) {
                            groups[key].add(String(v.name));
                        }
                    });
                } else if (val !== undefined && val !== null) {
                    groups[key].add(String(val));
                }
            });
        });

        return Object.entries(groups).map(([ group, itemsSet ]) => ({
            group,
            items: Array.from(itemsSet).filter(Boolean)
        }));
    }, [rawData]);

    const valueToGroup = useMemo(() => {
        const map = {};
        groupedData.forEach(g => {
            g.items.forEach(item => {
                map[item] = g.group;
            });
        });
        return map;
    }, [groupedData]);

    const records = useMemo(() => {
        let filtered = rawData;

        if (selected.length > 0) {
            const selectionsByGroup = selected.reduce((acc, val) => {
                const group = valueToGroup[val];
                if (group) {
                    acc[group] ||= new Set();
                    acc[group].add(val);
                }
                return acc;
            }, {});

            filtered = filtered.filter(
                record => Object.entries(selectionsByGroup).every(
                    ([ group, valuesSet ]) => {
                        const recordVal = record[group];
                        if (Array.isArray(recordVal)) {
                            return recordVal.some(
                                val => valuesSet.has(String(val.name))
                            );
                        }
                        return valuesSet.has(String(recordVal));
                    }
                )
            );
        }

        if (sortStatus.columnAccessor) {
            const sorted = sortBy(filtered, sortStatus.columnAccessor);
            filtered = sortStatus.direction === 'desc'
                ? sorted.reverse()
                : sorted;
        }

        return filtered;
    }, [ rawData, selected, valueToGroup, sortStatus ]);

    const columns = useMemo(() => [
        { accessor: 'name', title: 'Name', sortable: true,
            render: record => (
                <Stack gap="xs">
                    <Text size="lg" fw={ FontWeight.extrabold }>
                        { record.name }
                    </Text>
                    <Text size="sm" fw={ FontWeight.semibold } disabled={ true }>
                        { record.server }
                    </Text>
                </Stack>
            )
        },
        { accessor: 'faction', title: 'Faction', sortable: true,
            render: record => (
                <Text size={ FontSize.md } fw={ 600 }>
                    { record.faction }
                </Text>
            )
        },
        { accessor: 'race', title: 'Race', sortable: true,
            titleStyle: { minWidth: 120 },
            cellsStyle: () => ({ minWidth: 120 }),
            render: record => (
                <Text size={ FontSize.md } fw={ 500 }>
                    { record.race }
                </Text>
            )
        },
        { accessor: 'class', title: 'Class', sortable: true,
            titleStyle: { minWidth: 140 },
            cellsStyle: () => ({ minWidth: 140 }),
            render: record => {
                const color = CLASS_COLORS[record.class];
                const isPriest = record.class === 'Priest';

                return (
                    <Badge
                        color={ color }
                        variant="light"
                        size="lg"
                        styles={ {
                            root: {
                                border: isPriest
                                    ? '1px solid #C4C4C4'
                                    : '1px solid transparent'
                            },
                            label: {
                                color: 'color-mix(in srgb, currentColor, black 40%)'
                            }
                        } }
                        rightSection={
                            <Box
                                w={ 6 }
                                h={ 6 }
                                style={ {
                                    borderRadius: '50%',
                                    backgroundColor: 'currentColor',
                                    marginLeft: '6px',
                                    border: isPriest
                                        ? '1px solid #C4C4C4'
                                        : undefined
                                } }
                            />
                        }
                    >
                        { record.class }
                    </Badge>
                );
            }
        },
        { accessor: 'armor_type', title: 'Armor', sortable: true,
            render: record => (
                <Text size={ FontSize.md } fw={ 500 }>
                    { record.armor_type }
                </Text>
            )
        },
        { accessor: 'level', title: 'Level', sortable: true,
            textAlign: 'center',
            render: record => (
                <Text size={ FontSize.md } fw={ 500 }>
                    { record.level }
                </Text>
            )
        },
        {
            accessor: 'available_roles',
            title: 'Roles',
            render: ({ available_roles }) => (
                <Group gap="xs">
                    { available_roles.tank && <Icon icon="IconShield" size={ 16 } /> }
                    { available_roles.healer && <Icon icon="IconPlus" size={ 16 } stroke="2" /> }
                    { available_roles.dps && <Icon icon="IconSword" size={ 16 } /> }
                </Group>
            )
        },
        {
            accessor: 'heritage_armor_unlocked',
            title: 'Heritage',
            sortable: true,
            render: ({ heritage_armor_unlocked }) => (
                <Text size={ FontSize.md } fw={ 500 }>
                    { heritage_armor_unlocked ? 'Yes' : 'No' }
                </Text>
            )
        }
    ], []);

    return (
        <Stack style={ {
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        } }>
            <LoadingOverlay
                visible={ loading }
                zIndex={ 1000 }
                overlayProps={ {
                    radius: "sm",
                    blur: 1
                } }
                loaderProps={ {
                    size: 200,
                    color: Colours.accent.primary,
                    type: 'oval'
                } }
                style={ {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0
                } }
            />
            <Stack gap="md" pt="md" style={ { flex: 1, minHeight: 0 } }>
                <FilterControls
                    data={ groupedData }
                    selected={ selected }
                    setSelected={ setSelected }
                    sortStatus={ sortStatus }
                    setSortStatus={ setSortStatus }
                />
                <div style={ { flex: 1, minHeight: 0 } }>
                    <DataTable
                        textSelectionDisabled
                        withTableBorder
                        idAccessor="id"
                        records={ records }
                        sortStatus={ sortStatus }
                        onSortStatusChange={ setSortStatus }
                        columns={ columns }
                        className="custom-table-scroll"
                        rowStyle={ () => ({ height: '80px' }) }
                        sortIcons={ {
                            sorted: <Icon
                                icon="IconChevronUp"
                                size={ 14 }
                                color={ Colours.accent.primary }
                            />,
                            unsorted: <Icon
                                icon="IconSelector"
                                size={ 14 }
                                color={ Colours.accent.primary }
                            />
                        } }
                        rowExpansion={ {
                            allowMultiple: false,
                            collapseProps: {
                                transitionDuration: 75
                            },
                            content: ({ record }) => (
                                <Stack gap="lg" p="md" mt="md">
                                    <ProfessionList title="Primary Professions" professions={ record.primary_professions } />
                                    <ProfessionList title="Secondary Professions" professions={ record.secondary_professions } />
                                </Stack>
                            )
                        } }
                    />
                </div>
            </Stack>
        </Stack>
    );
}
