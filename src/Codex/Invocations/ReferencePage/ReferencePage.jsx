import { Code, Stack } from '@mantine/core';
import sortBy from 'lodash/sortBy';
import { DataTable } from 'mantine-datatable';
import { useMemo, useState } from 'react';

import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import { References } from '../../ArcaneThreads/Reference';
import { MainLayout } from '../../Grimoires/MainLayout/Mainlayout';
import Icon from '../../Runes/Icon/Icon';
import MultiSelect from '../../Sigils/MultiSelect/MultiSelect';

export default function ReferencePage () {
    const initialRecords = useMemo(
        () => References.map((ref, index) => ({
            _key: index,
            type: ref.type,
            material: ref.properties.material,
            weightValue: ref.properties.weight.value,
            weightUnit: ref.properties.weight.unit,
            size: ref.properties.size
        })),
        []
    );

    const groupedData = useMemo(() => {
        const groups = {};

        initialRecords.forEach(record => {
            if (record.type) {
                groups.type ||= new Set();
            }
            record.type && groups.type.add(String(record.type));

            if (record.material) {
                groups.material ||= new Set();
            }
            record.material && groups.material.add(String(record.material));

            if (record.size) {
                groups.size ||= new Set();
            }
            record.size && groups.size.add(String(record.size));
        });

        return Object.entries(groups).map(([ group, itemsSet ]) => ({
            group,
            items: Array.from(itemsSet).filter(Boolean)
        }));
    }, [initialRecords]);

    const [ selected, setSelected ] = useState([]);
    const [ sortStatus, setSortStatus ] = useState({
        columnAccessor: '',
        direction: 'asc'
    });

    const valueToGroup = useMemo(() => {
        const map = {};
        groupedData.forEach(g => {
            g.items.forEach(item => {
                map[item] = g.group;
            });
        });
        return map;
    }, [groupedData]);

    const selectedWithGroup = useMemo(
        () => selected.map(value => ({ value, group: valueToGroup[value] })),
        [ selected, valueToGroup ]
    );

    const records = useMemo(() => {
        let filtered = initialRecords;

        if (selectedWithGroup.length > 0) {
            const selectionsByGroup = selectedWithGroup.reduce((acc, sel) => {
                acc[sel.group] ||= new Set();
                acc[sel.group].add(sel.value);
                return acc;
            }, {});

            filtered = filtered.filter(
                record => Object.entries(selectionsByGroup).every(
                    ([ group, valuesSet ]) => {
                        const val = record[group];
                        if (Array.isArray(val)) {
                            return val.some(v => valuesSet.has(v));
                        }
                        return valuesSet.has(val);
                    }
                )
            );
        }

        if (sortStatus.columnAccessor) {
            const sorted = sortBy(filtered, sortStatus.columnAccessor);
            filtered =
                sortStatus.direction === 'desc' ? sorted.reverse() : sorted;
        }

        return filtered;
    }, [ initialRecords, selectedWithGroup, sortStatus ]);

    return (
        <MainLayout>
            <Stack
                gap="md"
                style={ {
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '5rem'
                } }>
                <MultiSelect
                    data={ groupedData }
                    onChange={ setSelected }
                    value={ selected }
                />
                <DataTable
                    striped
                    highlightOnHover
                    records={ records }
                    rowkey="_key"
                    sortStatus={ sortStatus }
                    onSortStatusChange={ setSortStatus }
                    sortIcons={ {
                        sorted: <Icon icon="IconChevronUp" size={ 14 } />,
                        unsorted: <Icon icon="IconSelector" size={ 14 } />
                    } }
                    columns={ [
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
                    ] }
                />
            </Stack>
        </MainLayout>
    );
}
