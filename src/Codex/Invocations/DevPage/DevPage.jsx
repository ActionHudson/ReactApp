import { Button, Group, JsonInput, NumberInput, Select, Stack, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function DevPage () {
    const [ id, setId ] = useState(1);
    const [ field, setField ] = useState('ingredients');
    const [ jsonContent, setJsonContent ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ saving, setSaving ] = useState(false);

    useEffect(() => {
        if (!id) { return; }
        setLoading(true);

        fetch(`/aether/scry.php?table=recipes&id=${ id }`)
            .then(res => {
                if (!res.ok) { throw new Error('Network response was not ok'); }
                return res.json();
            })
            .then(data => {
                if (data && !data.error) {
                    const value = data[field];
                    setJsonContent(typeof value === 'object' ? JSON.stringify(value, null, 2) : value || '');
                }
            })
            .catch(err => {
                console.error("Fetch error:", err);
            })
            .finally(() => setLoading(false));
    }, [ id, field ]);

    const handleSave = async () => {
        setSaving(true);
        try {
            let parsedData;
            try {
                parsedData = JSON.parse(jsonContent);
            } catch (e) {
                console.error("Invalid JSON format");
                return;
            }

            const payload = {
                [field]: parsedData
            };

            const res = await fetch(`/aether/update.php?table=recipes&id=${ id }`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Server responded with ${ res.status }: ${ errorText }`);
            }

            const result = await res.json();
            alert('Saved successfully');

        } catch (err) {
            console.error("Save error:", err);
            alert(`Save failed: ${ err.message }`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Stack
            style={ {
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            } }
        >
            <Title order={ 3 }>Quick Recipe Editor</Title>

            <Group grow>
                <NumberInput
                    label="Recipe ID"
                    value={ id }
                    onChange={ val => setId(Number(val)) }
                    min={ 1 }
                />
                <Select
                    label="Field to Edit"
                    value={ field }
                    onChange={ val => setField(val) }
                    data={ [
                        { value: 'ingredients', label: 'Ingredients' },
                        { value: 'method', label: 'Method' }
                    ] }
                />
            </Group>

            <JsonInput
                label={ `Editing: ${ field }` }
                placeholder="JSON data here..."
                validationError="Invalid JSON"
                formatOnBlur
                autosize
                minRows={ 10 }
                maxRows={ 25 }
                value={ jsonContent }
                onChange={ setJsonContent }
                disabled={ loading }
                style={ { flex: 1 } }
            />

            <Button
                onClick={ handleSave }
                loading={ saving || loading }
                variant="filled"
                color="blue"
            >
                Update Database
            </Button>
        </Stack>
    );
}
