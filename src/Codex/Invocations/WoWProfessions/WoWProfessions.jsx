import { Badge, Box, Group, Image, LoadingOverlay, Stack } from '@mantine/core';
import sortBy from 'lodash/sortBy';
import { DataTable } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';

import { Class_Colours, Colours, Faction_Colours } from '../../ArcaneThreads/Colours.js';
import { notify } from '../../ArcaneThreads/Notify.js';
import { FontSize, FontWeight } from '../../ArcaneThreads/Sizes.js';
import Icon from '../../Runes/Icon/Icon.jsx';
import Text from '../../Runes/Text/Text.jsx';

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

export default function WoWCharacters () {
    const [ rawData, setRawData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
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
                        primary_professions: parseJsonData(
                            record.primary_professions, []
                        ),
                        secondary_professions: parseJsonData(
                            record.secondary_professions, []
                        )
                    }));
                    setRawData(parsedData);
                } else {
                    notify.error(
                        'Data Error',
                        'The server returned an invalid format.'
                    );
                }
                setLoading(false);
            })
            .catch(() => {
                notify.error('Fetch Error', 'Could not load reference data.');
                setLoading(false);
            });
    }, []);

    const records = useMemo(() => rawData.map(char => {
        const allProfs = [
            ...char.primary_professions || [],
            ...char.secondary_professions || []
        ];

        const professionFlags = allProfs.reduce((flags, prof) => {
            if (prof && prof.name) {
                const key = prof.name.toLowerCase().replace(/\s+/g, '_');
                flags[key] = true;
            }
            return flags;
        }, {});

        return {
            id: char.id,
            character: `${ char.faction } ${ char.name } ${ char.class }`,
            rawFaction: char.faction,
            rawName: char.name,
            rawClass: char.class,
            ...professionFlags
        };
    }), [rawData]);

    const sortedRecords = useMemo(() => {
        if (!sortStatus.columnAccessor) {
            return records;
        }

        const sorted = sortBy(records, sortStatus.columnAccessor);

        return sortStatus.direction === 'desc' ? sorted.reverse() : sorted;
    }, [ records, sortStatus ]);

    const columns = useMemo(() => [
        {
            accessor: 'id',
            title: '',
            titleStyle: { maxWidth: 24 },
            cellsStyle: () => ({ maxWidth: 24 }),
            render: record => (
                <Text size="sm" disabled={ true }>
                    { record.id }
                </Text>
            )
        },
        {
            accessor: 'character',
            title: 'Character',
            titleStyle: { minWidth: 240 },
            cellsStyle: () => ({ minWidth: 240 }),
            sortable: true,
            noWrap: true,
            render: record => {
                const color = Class_Colours[record.rawClass];
                const isPriest = record.rawClass === 'Priest';

                return (
                    <Group
                        gap="md"
                        align="center"
                        wrap="nowrap"
                    >
                        <Image
                            src={ `/customIcons/${ record.rawFaction }Logo.webp` }
                            h="auto"
                            w={ 16 }
                            fit="contain"
                        />
                        <Stack
                            gap="xs"
                            align="flex-start"
                            justify="center"
                            style={ { flexShrink: 0 } }
                        >
                            <Text
                                size="lg"
                                fw={ FontWeight.extrabold }
                                style={ { whiteSpace: 'nowrap' } }
                            >
                                { record.rawName }
                            </Text>
                            <Badge
                                color={ color }
                                variant="light"
                                size="lg"
                                style={ { flexShrink: 0 } }
                                styles={ {
                                    root: {
                                        border: isPriest
                                            ? '1px solid #C4C4C4'
                                            : '1px solid transparent'
                                    },
                                    label: {
                                        color: 'color-mix(in srgb, ' +
                                    'currentColor, black 40%)'
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
                                { record.rawClass }
                            </Badge>
                        </Stack>
                    </Group>
                );
            }
        },
        {
            accessor: 'alchemy',
            title: 'Alchemy',
            sortable: true,
            textAlign: 'center',
            render: record => (record.alchemy ? (
                    <Icon
                        icon="IconCheck"
                        size={ 20 }
                        style={ { color: Colours.accent.primary } }
                    />
                ) : (
                    <Text disabled={ true }>-</Text>
                ))

        },
        {
            accessor: 'blacksmithing',
            title: 'Blacksmithing',
            sortable: true,
            textAlign: 'center',
            render: record => (record.blacksmithing ? (
                    <Icon
                        icon="IconCheck"
                        size={ 20 }
                        style={ { color: Colours.accent.primary } }
                    />
                ) : (
                    <Text disabled={ true }>-</Text>
                ))

        },
        {
            accessor: 'enchanting',
            title: 'Enchanting',
            sortable: true,
            textAlign: 'center',
            render: record => (record.enchanting ? (
                    <Icon
                        icon="IconCheck"
                        size={ 20 }
                        style={ { color: Colours.accent.primary } }
                    />
                ) : (
                    <Text disabled={ true }>-</Text>
                ))

        },
        {
            accessor: 'engineering',
            title: 'Engineering',
            sortable: true,
            textAlign: 'center',
            render: record => (record.engineering ? (
                    <Icon
                        icon="IconCheck"
                        size={ 20 }
                        style={ { color: Colours.accent.primary } }
                    />
                ) : (
                    <Text disabled={ true }>-</Text>
                ))

        },
        {
            accessor: 'herbalism',
            title: 'Herbalism',
            sortable: true,
            textAlign: 'center',
            render: record => (record.herbalism ? (
                    <Icon
                        icon="IconCheck"
                        size={ 20 }
                        style={ { color: Colours.accent.primary } }
                    />
                ) : (
                    <Text disabled={ true }>-</Text>
                ))

        },
        {
            accessor: 'inscription',
            title: 'Inscription',
            sortable: true,
            textAlign: 'center',
            render: record => (record.inscription ? (
                    <Icon
                        icon="IconCheck"
                        size={ 20 }
                        style={ { color: Colours.accent.primary } }
                    />
                ) : (
                    <Text disabled={ true }>-</Text>
                ))

        },
        {
            accessor: 'jewelcrafting',
            title: 'Jewelcrafting',
            sortable: true,
            textAlign: 'center',
            render: record => (record.jewelcrafting ? (
                    <Icon
                        icon="IconCheck"
                        size={ 20 }
                        style={ { color: Colours.accent.primary } }
                    />
                ) : (
                    <Text disabled={ true }>-</Text>
                ))

        },
        {
            accessor: 'leatherworking',
            title: 'Leatherworking',
            sortable: true,
            textAlign: 'center',
            render: record => (record.leatherworking ? (
                    <Icon
                        icon="IconCheck"
                        size={ 20 }
                        style={ { color: Colours.accent.primary } }
                    />
                ) : (
                    <Text disabled={ true }>-</Text>
                ))

        },
        {
            accessor: 'mining',
            title: 'Mining',
            sortable: true,
            textAlign: 'center',
            render: record => (record.mining ? (
                    <Icon
                        icon="IconCheck"
                        size={ 20 }
                        style={ { color: Colours.accent.primary } }
                    />
                ) : (
                    <Text disabled={ true }>-</Text>
                ))

        },
        {
            accessor: 'skinning',
            title: 'Skinning',
            sortable: true,
            textAlign: 'center',
            render: record => (record.skinning ? (
                    <Icon
                        icon="IconCheck"
                        size={ 20 }
                        style={ { color: Colours.accent.primary } }
                    />
                ) : (
                    <Text disabled={ true }>-</Text>
                ))

        },
        {
            accessor: 'tailoring',
            title: 'Tailoring',
            sortable: true,
            textAlign: 'center',
            render: record => (record.tailoring ? (
                    <Icon
                        icon="IconCheck"
                        size={ 20 }
                        style={ { color: Colours.accent.primary } }
                    />
                ) : (
                    <Text disabled={ true }>-</Text>
                ))

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
                <div style={ { flex: 1, minHeight: 0 } }>
                    <DataTable
                        textSelectionDisabled
                        withTableBorder
                        idAccessor="id"
                        records={ sortedRecords }
                        sortStatus={ sortStatus }
                        onSortStatusChange={ setSortStatus }
                        columns={ columns }
                        className="custom-table-scroll"
                        rowStyle={ () => ({ height: '80px' }) }
                        sortIcons={ {
                            sorted: <Icon
                                icon="IconChevronUp"
                                size={ 14 }
                                style={ { color: Colours.accent.primary } }
                            />,
                            unsorted: <Icon
                                icon="IconSelector"
                                size={ 14 }
                                style={ { color: Colours.accent.primary } }
                            />
                        } }
                    />
                </div>
            </Stack>
        </Stack>
    );
}
