import { Code, LoadingOverlay, Stack, Tabs } from '@mantine/core';
import sortBy from 'lodash/sortBy';
import { DataTable } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import 'mantine-datatable/styles.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

import { Colours } from '../../ArcaneThreads/Colours';
import '../../Runes/DataTable/DataTable.css';
import { notify } from '../../ArcaneThreads/Notify';
import FilterControls from '../../Enchantments/FilterControls/FilterControls';
import Icon from '../../Runes/Icon/Icon';

const TAB_CONFIG = {
    vessels: {
        dbType: 'vessel',
        filterKeys: [ 'vesselType', 'material', 'size' ],
        columns: [
            { accessor: 'vesselType', title: 'Type', sortable: true },
            { accessor: 'material', title: 'Material', sortable: true },
            {
                accessor: 'weightValue',
                title: 'Weight',
                sortable: true,
                render: ({ weightValue, weightUnit }) => (
                    <span>
                        { weightValue }
                        { ' ' }
                        { ' ' }
                        <Code>
                            { weightUnit }
                        </Code>
                    </span>
                )
            },
            { accessor: 'size', title: 'Size', sortable: true }
        ],
        transform: item => {
            const parsed = typeof item.data === 'string'
                ? JSON.parse(item.data)
                : item.data;
            return {
                id: item.id,
                ...parsed,
                vesselType: parsed.type,
                weightValue: parsed.weight?.value,
                weightUnit: parsed.weight?.unit,
                capacityValue: parsed.capacity?.value,
                capacityUnit: parsed.capacity?.unit
            };
        }
    },
    temperature: {
        dbType: 'temp',
        filterKeys: ['category'],
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
                        { ' ' }
                        <Code>
                            { unit || '°C' }
                        </Code>
                    </span>
                )
            }
        ],
        transform: item => {
            const parsed = typeof item.data === 'string'
                ? JSON.parse(item.data)
                : item.data;
            return {
                id: item.id,
                ...parsed,
                category: parsed.category,
                setting: parsed.setting,
                value: parsed.value,
                unit: parsed.unit
            };
        }
    }
};

export default function Reference () {
    const [ activeTab, setActiveTab ] = useState('vessels');
    const [ rawData, setRawData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ selected, setSelected ] = useState([]);
    const [ sortStatus, setSortStatus ] = useState({
        columnAccessor: '',
        direction: 'asc'
    });

    useEffect(() => {
        setLoading(true);
        fetch('/aether/manifest.php?table=references')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setRawData(data);
                }
                setLoading(false);
            })
            .catch(err => {
                notify.error('Fetch Error', 'Could not load reference data.');
                setLoading(false);
            });
    }, []);

    const currentConfig = TAB_CONFIG[activeTab];

    const initialRecords = useMemo(() => rawData
        .filter(item => item.type === currentConfig.dbType)
        .map(currentConfig.transform), [ activeTab, rawData, currentConfig ]);

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
                record => Object.entries(selectionsByGroup).every(
                    ([ group, valuesSet ]) => valuesSet.has(String(record[group]))
                )
            );
        }

        if (sortStatus.columnAccessor) {
            const sorted = sortBy(filtered, sortStatus.columnAccessor);
            filtered = sortStatus.direction === 'desc' ? sorted.reverse() : sorted;
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
                height: '100%',
                position: 'relative'
            } }
        >
            <LoadingOverlay visible={ loading } overlayProps={ { blur: 1 } } />
            <Tabs
                color={ Colours.accent.primary }
                value={ activeTab }
                onChange={ handleTabChange }
                style={ { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 } }
            >
                <Tabs.List>
                    <Tabs.Tab
                        value="vessels"
                        leftSection={ <Icon style={ { color: '#FF6B9D' } } icon="IconBowlFilled" size={ 16 } /> }
                    >
                        Vessels
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="temperature"
                        leftSection={ <Icon style={ { color: '#FF6B9D' } } icon="IconTemperaturePlusFilled" size={ 16 } /> }
                    >
                        Temperature
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel
                    value={ activeTab }
                    style={ { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' } }
                >
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
                                withColumnBorders
                                striped
                                highlightOnHover
                                records={ records }
                                sortStatus={ sortStatus }
                                onSortStatusChange={ setSortStatus }
                                columns={ currentConfig.columns }
                                className="custom-table-scroll"
                                styles={ {
                                    table: {
                                        '--mantine-datatable-striped-color': '#ffe9f0',
                                        '--mantine-datatable-highlight-on-hover-color': '#ffd0df'
                                    }
                                } }
                                sortIcons={ {
                                    sorted: <Icon icon="IconChevronUp" size={ 14 } color={ Colours.accent.primary } />,
                                    unsorted: <Icon icon="IconSelector" size={ 14 } color={ Colours.accent.primary } />
                                } }
                                onRowClick={ ({ record, index, event }) => {
                                    console.log(
                                        'Row clicked:', record, index, event
                                    );
                                } }
                            />
                        </div>
                    </Stack>
                </Tabs.Panel>
            </Tabs>
        </Stack>
    );
}
