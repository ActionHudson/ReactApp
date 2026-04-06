import { Box, ColorSwatch, Group, LoadingOverlay, Stack, Table, Text } from "@mantine/core";
import sortBy from 'lodash/sortBy';
import { DataTable } from 'mantine-datatable';
import 'mantine-datatable/styles.layer.css';
import { useEffect, useMemo, useState } from 'react';

import { Colours } from '../../ArcaneThreads/Colours';
import { notify } from '../../ArcaneThreads/Notify';
import Icon from "../../Runes/Icon/Icon";

export default function PlantingChart () {
    const [ plantData, setPlantData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ sortStatus, setSortStatus ] = useState({});
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
                        color={ statusColors[status]?.color || "#eee" }
                        size={ 16 }
                    />
                )) }
            </Group>
        );
    };

    const months = [ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" ];

    useEffect(() => {
        let isMounted = true;

        fetch('/aether/manifest.php?table=plants')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(rawData => {
                if (isMounted) {
                    if (Array.isArray(rawData)) {
                        const processedData = rawData.map(item => ({
                            ...item,
                            schedule: typeof item.schedule === 'string' ? JSON.parse(item.schedule) : item.schedule
                        }));
                        setPlantData(processedData);
                    }
                    setLoading(false);
                }
            })
            .catch(err => {
                if (isMounted) {
                    notify.error('Error!', 'Failed to connect to database.');
                    console.warn("Fetch failed, entering local dev fallback mode:", err);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const columns = [
        {
            accessor: "id",
            title: "",
            sortable: false,
            width: 20,
            render: ({ id }) => (
                <Text size="xs" c="dimmed">
                    { id }
                </Text>
            )
        },
        {
            accessor: "name",
            title: "Name",
            sortable: true,
            render: ({ name, variant }) => (
                <Group gap={ 4 }>
                    <Text size="sm" fw={ 500 }>
                        { name }
                    </Text>
                    { variant && (
                        <Text size="xs" c="dimmed">
                            (
                            { variant }
                            )
                        </Text>
                    ) }
                </Group>
            )
        },
        ...months.map(month => ({
            accessor: `schedule.${ month }`,
            title: month.charAt(0).toUpperCase() + month.slice(1),
            textAlign: "center",
            render: record => renderStatus(record.schedule?.[month])
        }))
    ];

    const records = useMemo(() => {
        const sorted = sortBy(plantData, sortStatus.columnAccessor);
        return sortStatus.direction === 'desc' ? sorted.reverse() : sorted;
    }, [ plantData, sortStatus ]);

    return (
        <Stack
            gap={ 0 }
            style={ {
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                height: '100%',
                position: 'relative'
            } }
        >
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
            <Group gap="xs" py="1rem">
                { Object.entries(statusColors).map(([ key, { color, label } ]) => (
                    <Group key={ key } gap={ 4 }>
                        <ColorSwatch color={ color } size={ 14 } />
                        <Text size="sm" c="dimmed" fw={ 500 }>
                            { label }
                        </Text>
                    </Group>
                )) }
            </Group>
            <DataTable
                textSelectionDisabled
                withTableBorder
                highlightOnHover
                records={ records }
                sortStatus={ sortStatus }
                onSortStatusChange={ setSortStatus }
                sortIcons={ {
                    sorted: <Icon icon="IconChevronUp" size={ 14 } />,
                    unsorted: <Icon icon="IconSelector" size={ 14 } />
                } }
                columns={ columns }
                className="custom-table-scroll"
                rowExpansion={ {
                    allowMultiple: false,
                    collapseProps: {
                        transitionDuration: 75
                    },
                    content: ({ record }) => (
                        <Box p="md">
                            <Table withRowBorders={ false }>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th c="blue">DETAILS</Table.Th>
                                        <Table.Th c="blue">PLANT DEPTH</Table.Th>
                                        <Table.Th c="blue">PLANT HEIGHT</Table.Th>
                                        <Table.Th c="blue">PLANT SPACING</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="sm">
                                                <Text component="span" c="dimmed">Variant: </Text>
                                                { record.variant || 'N/A' }
                                            </Text>
                                            <Text size="sm">
                                                <Text component="span" c="dimmed">Brand: </Text>
                                                { record.brand || 'N/A' }
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm">
                                                <Text component="span" c="dimmed">Max: </Text>
                                                { record.plant_depth_max_mm ? `${ record.plant_depth_max_mm } mm` : 'N/A' }
                                            </Text>
                                            <Text size="sm">
                                                <Text component="span" c="dimmed">Min: </Text>
                                                { record.plant_depth_min_mm ? `${ record.plant_depth_min_mm } mm` : 'N/A' }
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm">
                                                <Text component="span" c="dimmed">Max: </Text>
                                                { record.plant_height_max_mm ? `${ record.plant_height_max_mm } mm` : 'N/A' }
                                            </Text>
                                            <Text size="sm">
                                                <Text component="span" c="dimmed">Min: </Text>
                                                { record.plant_height_min_mm ? `${ record.plant_height_min_mm } mm` : 'N/A' }
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm">
                                                <Text component="span" c="dimmed">Max: </Text>
                                                { record.plant_spacing_max_mm ? `${ record.plant_spacing_max_mm } mm` : 'N/A' }
                                            </Text>
                                            <Text size="sm">
                                                <Text component="span" c="dimmed">Min: </Text>
                                                { record.plant_spacing_min_mm ? `${ record.plant_spacing_min_mm } mm` : 'N/A' }
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td colSpan={ 4 } pt="xl">
                                            <Stack gap="xs">
                                                <Text fw={ 700 } size="sm" c="blue" tt="uppercase">Sowing Info</Text>
                                                <Text size="sm">
                                                    { record.sowing_info || 'N/A' }
                                                </Text>
                                            </Stack>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td colSpan={ 4 } pb="md">
                                            <Stack gap="xs">
                                                <Text fw={ 700 } size="sm" c="blue" tt="uppercase">Harvest Info</Text>
                                                <Text size="sm">
                                                    { record.harvest_info || 'N/A' }
                                                </Text>
                                            </Stack>
                                        </Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </Box>
                    )
                } }
            />
        </Stack>
    );
}
