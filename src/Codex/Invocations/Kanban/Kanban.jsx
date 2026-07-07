import { ActionIcon, Button, Card, Group, Modal, Select, SimpleGrid, Stack, Switch, Text, Textarea, TextInput, Title } from '@mantine/core';
import { IconArrowLeft, IconArrowRight, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

const COLUMNS = [ 'Blocked', 'To Do', 'In Progress', 'In Test', 'Done' ];

const initialTasks = [
    {
        id: '1',
        title: 'Settings Page',
        body: 'Make settings page to do list.',
        status: 'Done'
    },
    {
        id: '2',
        title: 'Database Management',
        body: 'Clear indexedDB data. (Recipe Favorites)',
        status: 'Done'
    },
    {
        id: '3',
        title: 'User Confirmation',
        body: 'Add modal confirmation before clearing data.',
        status: 'Done'
    },
    {
        id: '4',
        title: 'Data Expansion',
        body: 'Add/Update reference data.\nAdd/Update planting data.',
        status: 'Done'
    },
    {
        id: '5',
        title: 'Recipe Infrastructure',
        body: 'Finish recipe details page.\nFinish update recipes page.\nFinish add new recipe page.',
        status: 'To Do'
    },
    {
        id: '6',
        title: 'Table Refactoring',
        body: 'Align aethereditor page look and naming.\nSecure the add/update functionality.',
        status: 'To Do'
    },
    {
        id: '7',
        title: 'Advanced Features',
        body: 'Logged in/Hidden area?\nTimeline of life events (moving, jobs, etc).\nFigure out what else I can add.',
        status: 'To Do'
    }
];

export default function Kanban () {
    const [ tasks, setTasks ] = useState(initialTasks);
    const [ opened, setOpened ] = useState(false);
    const [ hideDone, setHideDone ] = useState(false);
    const [ newTask, setNewTask ] = useState({ title: '', body: '', status: 'To Do' });

    const displayedColumns = hideDone ? COLUMNS.filter(c => c !== 'Done') : COLUMNS;

    const handleMove = (id, direction) => {
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                const currentIndex = COLUMNS.indexOf(task.status);
                const newIndex = currentIndex + direction;
                if (newIndex >= 0 && newIndex < COLUMNS.length) {
                    return { ...task, status: COLUMNS[newIndex] };
                }
            }
            return task;
        }));
    };

    const handleDelete = id => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const handleAdd = () => {
        if (!newTask.title.trim()) { return; }
        const task = {
            ...newTask,
            id: Date.now().toString()
        };
        setTasks([ ...tasks, task ]);
        setNewTask({ title: '', body: '', status: 'To Do' });
        setOpened(false);
    };

    return (
        <>
            <Group justify="space-between" mb="xl">
                <Title order={ 2 }>Kanban Board</Title>
                <Group>
                    <Switch
                        label="Hide Done"
                        checked={ hideDone }
                        onChange={ event => setHideDone(event.currentTarget.checked) }
                    />
                    <Button leftSection={ <IconPlus size={ 16 } /> } onClick={ () => setOpened(true) }>
                        Add Task
                    </Button>
                </Group>
            </Group>

            <SimpleGrid cols={ { base: 1, sm: 2, md: displayedColumns.length } } spacing="md">
                { displayedColumns.map(column => (
                    <Stack key={ column } gap="sm">
                        <Card shadow="sm" p="sm" withBorder bg="var(--mantine-color-gray-1)">
                            <Text fw={ 700 } ta="center">
                                { column }
                            </Text>
                        </Card>

                        { tasks.filter(t => t.status === column).map(task => (
                            <Card key={ task.id } shadow="sm" p="md" withBorder>
                                <Group justify="space-between" mb="xs" wrap="nowrap">
                                    <Text fw={ 500 } truncate>
                                        { task.title }
                                    </Text>
                                    <ActionIcon color="red" variant="subtle" onClick={ () => handleDelete(task.id) }>
                                        <IconTrash size={ 16 } />
                                    </ActionIcon>
                                </Group>
                                <Text size="sm" c="dimmed" mb="md" style={ { whiteSpace: 'pre-wrap' } }>
                                    { task.body }
                                </Text>

                                <Group justify="space-between">
                                    <ActionIcon
                                        variant="light"
                                        disabled={ COLUMNS.indexOf(task.status) === 0 }
                                        onClick={ () => handleMove(task.id, -1) }
                                    >
                                        <IconArrowLeft size={ 16 } />
                                    </ActionIcon>
                                    <ActionIcon
                                        variant="light"
                                        disabled={ COLUMNS.indexOf(task.status) === COLUMNS.length - 1 }
                                        onClick={ () => handleMove(task.id, 1) }
                                    >
                                        <IconArrowRight size={ 16 } />
                                    </ActionIcon>
                                </Group>
                            </Card>
                        )) }
                    </Stack>
                )) }
            </SimpleGrid>

            <Modal opened={ opened } onClose={ () => setOpened(false) } title="Add New Task">
                <TextInput
                    label="Title"
                    placeholder="Task title"
                    value={ newTask.title }
                    onChange={ e => setNewTask({ ...newTask, title: e.target.value }) }
                    mb="md"
                    required
                />
                <Textarea
                    label="Body"
                    placeholder="Task description"
                    value={ newTask.body }
                    onChange={ e => setNewTask({ ...newTask, body: e.target.value }) }
                    mb="md"
                />
                <Select
                    label="Status"
                    data={ COLUMNS }
                    value={ newTask.status }
                    onChange={ val => setNewTask({ ...newTask, status: val }) }
                    mb="xl"
                    allowDeselect={ false }
                />
                <Button fullWidth onClick={ handleAdd }>
                    Save Task
                </Button>
            </Modal>
        </>
    );
}
