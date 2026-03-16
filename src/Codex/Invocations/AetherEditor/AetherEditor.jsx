import {
    Button, Divider, Group, Paper,
    Select, Stack, TextInput, Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

import { Colours } from '../../ArcaneThreads/Colours';
import { notify } from '../../ArcaneThreads/Notify';
import Icon from '../../Runes/Icon/Icon';
import ScrollArea from '../../Runes/ScrollArea/ScrollArea';

export default function AetherEditor () {
    const [ tableName, setTableName ] = useState('');
    const [ mode, setMode ] = useState('insert');
    const [ targetId, setTargetId ] = useState('');
    const [ isEditing, setIsEditing ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const form = useForm({
        initialValues: {}
    });

    const handleBack = () => {
        setIsEditing(false);
        form.reset();
    };

    const loadStructure = async () => {
        if (!tableName) { return notify.error('Enter a table name'); }
        if (mode === 'update' && !targetId) { return notify.error('Enter an ID for update'); }

        setLoading(true);
        try {
            const url = mode === 'update'
                ? `/aether/aether.php?table=${ tableName }&id=${ targetId }`
                : `/aether/aether.php?table=${ tableName }`;

            const res = await fetch(url);
            const data = await res.json();

            if (data.error) { throw new Error(data.error); }

            form.setValues(data);
            setIsEditing(true);
        } catch (err) {
            notify.error('Load Failed', err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async values => {
        setLoading(true);
        try {
            const url = mode === 'update'
                ? `/aether/aether.php?table=${ tableName }&id=${ targetId }`
                : `/aether/aether.php?table=${ tableName }`;

            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    table: tableName,
                    data: values
                })
            });

            const result = await res.json();
            if (result.error) { throw new Error(result.error); }

            notify.success(mode === 'update' ? 'Entry Updated' : 'Entry Inscribed');

            if (mode === 'insert') {
                handleBack();
                setTableName('');
            }
        } catch (err) {
            notify.error('Save Failed', err.message);
        } finally {
            setLoading(false);
        }
    };

    const fieldList = Object.keys(form.values);

    return (
        <Stack p="md" style={ { backgroundColor: 'white', borderRadius: '0.5rem', minHeight: '100%' } }>
            <Title order={ 2 } c={ Colours.primary }>Aether Database Bridge</Title>

            { !isEditing ? (
                <Paper withBorder p="md" radius="md">
                    <Stack gap="md">
                        <TextInput
                            label="Target Table"
                            placeholder="e.g. recipes"
                            value={ tableName }
                            onChange={ e => setTableName(e.currentTarget.value) }
                        />
                        <Select
                            label="Operation"
                            data={ [
                                { value: 'insert', label: 'Inscribe New' },
                                { value: 'update', label: 'Modify Existing' }
                            ] }
                            value={ mode }
                            onChange={ setMode }
                        />
                        { mode === 'update' && (
                            <TextInput
                                label="Target ID"
                                placeholder="Row ID"
                                value={ targetId }
                                onChange={ e => setTargetId(e.currentTarget.value) }
                            />
                        ) }
                        <Button
                            fullWidth
                            onClick={ loadStructure }
                            loading={ loading }
                            color={ Colours.accent.primary }
                        >
                            Connect to Aether
                        </Button>
                    </Stack>
                </Paper>
            ) : (
                <Stack style={ { flex: 1, minHeight: 0 } }>
                    <Group justify="space-between">
                        <Button
                            variant="subtle"
                            onClick={ handleBack }
                            leftSection={ <Icon icon="IconArrowLeft" /> }
                        >
                            Back
                        </Button>
                        <Title order={ 4 } c="dimmed">
                            { mode.toUpperCase() }
                            :
                            { tableName }
                        </Title>
                    </Group>

                    <Divider />

                    <ScrollArea style={ { flex: 1 } }>
                        <form onSubmit={ form.onSubmit(handleSave) }>
                            <Stack gap="xs" p="xs">
                                { fieldList.map(key => (
                                    <TextInput
                                        key={ key }
                                        label={ key.replace('_', ' ').toUpperCase() }
                                        disabled={ key === 'id' }
                                        { ...form.getInputProps(key) }
                                    />
                                )) }
                                <Button
                                    type="submit"
                                    mt="xl"
                                    loading={ loading }
                                    color={ mode === 'update' ? Colours.status.info : Colours.status.success }
                                >
                                    Commit Changes
                                </Button>
                            </Stack>
                        </form>
                    </ScrollArea>
                </Stack>
            ) }
        </Stack>
    );
}
