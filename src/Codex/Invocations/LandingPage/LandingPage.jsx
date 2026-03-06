import { Button, Card, Group, Image, SimpleGrid, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

import { notify } from '../../ArcaneThreads/Notify';

export default function LandingPage () {
    const [ items, setItems ] = useState([]);

    useEffect(() => {
        fetch('/api/fetchAll.php?table=recipes')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setItems(data);
                }
            })
            .catch(err => console.error("Fetch error:", err));
    }, []);

    return (
        <Stack gap="xl" p="md">

            <Group justify="center" gap="sm">
                <Button variant="light" color="teal" onClick={ () => notify.success('Saved!') }>
                    Success
                </Button>
                <Button variant="light" color="red" onClick={ () => notify.error('Error!', 'Failed to save.') }>
                    Error
                </Button>
                <Button variant="light" color="blue" onClick={ () => notify.info('Info', 'Important update.') }>
                    Info
                </Button>
                <Button variant="light" color="orange" onClick={ () => notify.warning('Warning!', 'Check this.') }>
                    Warning
                </Button>
            </Group>

            <hr style={ { width: '100%', opacity: 0.2 } } />

            <SimpleGrid cols={ { base: 1, sm: 2, lg: 4 } } spacing="lg">
                { items.map((recipe, index) => (
                    <Card key={ recipe.id || index } shadow="sm" padding="xs" radius="md" withBorder>
                        <Card.Section>
                            <Image
                                src={ `/data/recipeImages/${ recipe.image_filename }` }
                                height={ 120 }
                                alt={ recipe.title }
                                fallbackSrc="https://placehold.co/200x120?text=No+Image"
                            />
                        </Card.Section>
                        <Text fw={ 500 } size="sm" mt="sm" ta="center" truncate="end">
                            { recipe.title || "Untitled" }
                        </Text>
                    </Card>
                )) }
            </SimpleGrid>

        </Stack>
    );
}
