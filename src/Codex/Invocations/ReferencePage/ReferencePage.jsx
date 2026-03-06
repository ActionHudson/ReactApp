import { ActionIcon, Button, Code, Group, Stack, Tabs } from '@mantine/core';
import sortBy from 'lodash/sortBy';
import { DataTable } from 'mantine-datatable';
import { useMemo, useState } from 'react';
import 'mantine-datatable/styles.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

import { Colours } from '../../ArcaneThreads/Colours';
import '../../Runes/DataTable/DataTable.css';
import { References, Temperatures } from '../../ArcaneThreads/Reference';
import Bclasses from '../../Runes/Button/Button.module.css';
import Icon from '../../Runes/Icon/Icon';
import MultiSelect from '../../Sigils/MultiSelect/MultiSelect';
import MSclasses from '../../Sigils/MultiSelect/MultiSelect.module.css';

const TAB_CONFIG = {
    vessels: {
        data: References,
        filterKeys: [ 'type', 'material', 'size' ],
        columns: [
            { accessor: 'type', title: 'Type', sortable: true },
            { accessor: 'material', title: 'Material', sortable: true },
            {
                accessor: 'weightValue',
                title: 'Weight',
                sortable: true,
                render: ({ weightValue, weightUnit }) => (
                    <span>
                        { weightValue }
                        { ' ' }
                        <Code>
                            { weightUnit }
                        </Code>
                    </span>
                )
            },
            { accessor: 'size', title: 'Size', sortable: true }
        ],
        transform: ref => ({
            id: ref.id,
            type: ref.type,
            material: ref.properties?.material,
            weightValue: ref.properties?.weight?.value,
            weightUnit: ref.properties?.weight?.unit,
            size: ref.properties?.size
        })
    },
    temperature: {
        data: Temperatures,
        filterKeys: [ 'category', 'setting' ],
        columns: [
            { accessor: 'category', title: 'Category', sortable: true },
            { accessor: 'setting', title: 'Setting', sortable: true },
            {
                accessor: 'value',
                title: 'Degrees',
                sortable: true,
                render: ({ value, unit }) => (
                    <span>
                        { value }
                        { ' ' }
                        <Code>
                            { unit || '°C' }
                        </Code>
                    </span>
                )
            }
        ],
        transform: item => ({
            id: item.id,
            category: item.category,
            setting: item.setting,
            value: item.value,
            unit: item.unit
        })
    }
};

export default function ReferencePage () {
    const [ activeTab, setActiveTab ] = useState('vessels');
    const [ selected, setSelected ] = useState([]);
    const [ sortStatus, setSortStatus ] = useState({
        columnAccessor: '',
        direction: 'asc'
    });

    const currentConfig = TAB_CONFIG[activeTab];

    const initialRecords = useMemo(() => currentConfig.data.map(
        currentConfig.transform
    ),
    [activeTab]);

    const groupedData = useMemo(() => {
        const groups = {};
        currentConfig.filterKeys.forEach(key => {
            groups[key] = new Set();
            initialRecords.forEach(record => {
                if (record[key]) {
                    groups[key].add(String(record[key]));
                }
            });
        });

        return Object.entries(groups).map(([ group, itemsSet ]) => ({
            group,
            items: Array.from(itemsSet).filter(Boolean)
        }));
    }, [ initialRecords, currentConfig ]);

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
        let filtered = initialRecords;

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
                record => Object.entries(
                    selectionsByGroup
                ).every(
                    ([ group, valuesSet ]) => {
                        const val = record[group];
                        return valuesSet.has(String(val));
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
    }, [ initialRecords, selected, valueToGroup, sortStatus ]);

    const handleTabChange = val => {
        setActiveTab(val);
        setSelected([]);
        setSortStatus({ columnAccessor: '', direction: 'asc' });
    };

    return (
        <Stack
            style={ {
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                height: '100%'
            } }
        >
            <Tabs
                color={ Colours.accent.primary }
                value={ activeTab }
                onChange={ handleTabChange }
                style={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        minHeight: 0
                    }
                }
            >
                <Tabs.List>
                    <Tabs.Tab
                        value="vessels"
                        leftSection={
                            <Icon
                                style={
                                    { color: '#FF6B9D' }
                                }
                                icon="IconBowlFilled"
                                size={ 16 }
                            />
                        }
                    >
                        Vessels
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="temperature"
                        leftSection={
                            <Icon
                                style={
                                    { color: '#FF6B9D' }
                                }
                                icon="IconTemperaturePlusFilled"
                                size={ 16 }
                            />
                        }
                    >
                        Temperature
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel
                    value={ activeTab }
                    style={
                        {
                            flex: 1,
                            minHeight: 0,
                            display: 'flex',
                            flexDirection: 'column'
                        }
                    }
                >
                    <Stack
                        gap="md"
                        pt="md"
                        style={
                            {
                                flex: 1,
                                minHeight: 0
                            }
                        }>
                        <Group gap="md" wrap="nowrap">
                            <MultiSelect
                                data={ groupedData }
                                onChange={ setSelected }
                                value={ selected }
                                style={ { flex: 1 } }
                                classNames={ {
                                    section: MSclasses.section,
                                    groupLabel: MSclasses.groupLabel,
                                    pill: MSclasses.pill,
                                    pillLabel: MSclasses.pillLabel
                                } }
                            />
                            <Button
                                onClick={ () => {
                                    setSelected([]);
                                    setSortStatus({
                                        columnAccessor: '',
                                        direction: 'asc'
                                    });
                                } }
                                className={ Bclasses.button }
                                variant="outline"
                                color="#FF6B9D"
                                size="md"
                                disabled={ selected.length === 0 && !sortStatus.columnAccessor }
                                radius="xl"
                                visibleFrom='sm'
                            >
                                Clear Sort & Filter
                            </Button>
                            <ActionIcon
                                className={ Bclasses.button }
                                variant="outline"
                                size="lg"
                                disabled={ selected.length === 0 && !sortStatus.columnAccessor }
                                hiddenFrom='sm'
                                color="#FF6B9D"
                                onClick={ () => {
                                    setSelected([]);
                                    setSortStatus({
                                        columnAccessor: '',
                                        direction: 'asc'
                                    });
                                } }
                            >
                                <Icon
                                    icon="IconFilterCancel"
                                    size={ 2 }

                                />
                            </ActionIcon>
                        </Group>
                        <div style={ { flex: 1, minHeight: 0 } }>
                            <DataTable
                                textSelectionDisabled
                                withTableBorder
                                withColumnBorders
                                striped
                                styles={ {
                                    table: {
                                        '--mantine-datatable-striped-color': '#ffbcd2',
                                        '--mantine-datatable-highlight-on-hover-color': '#ff8db3'
                                    }
                                } }
                                highlightOnHover
                                records={ records }
                                rowKey="id"
                                sortStatus={ sortStatus }
                                onSortStatusChange={ setSortStatus }
                                sortIcons={ {
                                    sorted: <Icon
                                        icon="IconChevronUp"
                                        size={ 14 } />,
                                    unsorted: <Icon
                                        icon="IconSelector"
                                        size={ 14 } />
                                } }
                                columns={ currentConfig.columns }
                                onRowClick={ ({ record, index, event }) => {
                                    console.log(
                                        'Row clicked:', record, index, event
                                    );
                                } }
                                className="custom-table-scroll"
                            />
                        </div>
                    </Stack>
                </Tabs.Panel>
            </Tabs>
        </Stack>
    );
}
