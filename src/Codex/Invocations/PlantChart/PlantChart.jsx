import { ColorSwatch, Group, Stack, Text } from "@mantine/core";
import sortBy from 'lodash/sortBy';
import { DataTable } from 'mantine-datatable';
import 'mantine-datatable/styles.layer.css';
import { useMemo, useState } from 'react';

import { initialData } from "../../ArcaneThreads/PlantingData.js";
import Icon from "../../Runes/Icon/Icon";

export default function PlantChart () {
    const statusColors = {
        SAH: { color: "#a4d13a", label: "Sow at Home" },
        SO: { color: "#eee296", label: "Sow Outside" },
        HAR: { color: "#eb9911", label: "Harvest" }
    };

    const renderStatus = val => {
        if (!val) {
            return null;
        }

        const values = Array.isArray(val) ? val : [val];

        return (
            <Group gap={ 4 } justify="center" wrap="nowrap">
                { values.map((status, i) => (
                    <ColorSwatch
                        key={ i }
                        color={ statusColors[status].color }
                        size={ 16 }
                    />
                )) }
            </Group>
        );
    };

    const months = [ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" ];

    const columns = [
        {
            accessor: "name",
            title: "Name",
            sortable: true,
            render: ({ name }) => (<Text size="sm" fw={ 500 }>
                { name }
            </Text>)
        },
        ...months.map(month => ({
            accessor: month,
            title: month.charAt(0).toUpperCase() + month.slice(1),
            textAlign: "center",
            render: record => renderStatus(record[month])
        }))
    ];

    const [ sortStatus, setSortStatus ] = useState({
        columnAccessor: 'name',
        direction: 'asc'
    });

    const records = useMemo(() => {
        const data = sortBy(initialData, sortStatus.columnAccessor);
        return sortStatus.direction === 'desc' ? data.reverse() : data;
    }, [sortStatus]);

    return (
        <Stack
            style={ {
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                height: '100%'
            } }
        >
            <Group gap="xs">
                { Object.entries(statusColors).map(([ key, { color, label } ]) => (
                    <>
                        <ColorSwatch color={ color } size={ 14 } />
                        <Text size="sm" c="dimmed" fw={ 500 }>
                            { label }
                        </Text>
                    </>
                )) }
            </Group>
            <DataTable
                textSelectionDisabled
                withTableBorder
                highlightOnHover
                records={ records }
                rowKey="id"
                sortStatus={ sortStatus }
                onSortStatusChange={ setSortStatus }
                sortIcons={ {
                    sorted: <Icon icon="IconChevronUp" size={ 14 } />,
                    unsorted: <Icon icon="IconSelector" size={ 14 } />
                } }
                columns={ columns }
                className="custom-table-scroll"
            />
        </Stack>
    );
}
