import {
    Badge, Box, Code, ColorInput, Group,
    Paper, SimpleGrid, Stack, Text, TextInput, Title
} from '@mantine/core';
import { useMemo, useState } from 'react';

export default function ColorLab () {
    const [ hex, setHex ] = useState('#FF6B9D');

    const getValidHex = input => {
        let s = input.replace('#', '');
        if (s.length === 3) { s = s.split('').map(c => c + c).join(''); }
        if (s.length !== 6) { return null; }
        return s;
    };

    const transform = (inputHex, lum) => {
        const clean = getValidHex(inputHex);
        if (!clean) { return '#000000'; }

        const rgb = clean.match(/.{2}/g).map(x => parseInt(x, 16));
        const transformed = rgb.map(channel => {
            const result = Math.round(channel * lum);
            return Math.min(255, Math.max(0, result)).toString(16).padStart(2, '0');
        });

        return `#${ transformed.join('') }`;
    };

    const variants = useMemo(() => {
        const isEntryValid = getValidHex(hex);
        if (!isEntryValid) { return { accent: hex, surface: '#2C2E33', submerged: '#1A1B1E' }; }

        return {
            lightStripe: transform(hex, 1.4),
            accent: transform(hex, 1.1),
            surface: transform(hex, 0.4),
            submerged: transform(hex, 0.15)
        };
    }, [hex]);

    return (
        <Stack style={ {
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        } }>
            <Paper p="md" withBorder shadow="sm">
                <Title order={ 3 } mb="xs">Colour Lab</Title>
                <Group grow align="flex-end">
                    <ColorInput
                        label="Input Brand Hex"
                        value={ hex }
                        onChange={ setHex }
                    />
                </Group>
            </Paper>

            <SimpleGrid cols={ { base: 1, md: 2 } } spacing="xl">
                <Stack>
                    <Badge variant="outline">Light Mode Preview</Badge>
                    <Paper p="xl" withBorder style={ { backgroundColor: '#FFFFFF' } }>
                        <Stack gap="xs">
                            <Box style={ { backgroundColor: hex, height: '40px', borderRadius: '4px' } } />
                            <Text size="xs" fw={ 700 }>PRIMARY ACCENT</Text>

                        </Stack>
                    </Paper>
                </Stack>

                <Stack>
                    <Badge variant="filled" color="dark">Dark Mode Preview</Badge>
                    <Paper p="xl" withBorder style={ { backgroundColor: '#0F1A20' } }>
                        <Stack gap="xs">
                            <Text size="xs" fw={ 700 } c="white">TRANSFORMED ACCENT</Text>

                            <Box style={ {
                                backgroundColor: variants.submerged,
                                padding: '15px'
                            } }>
                                <Text size="sm" style={ { color: variants.accent } }>
                                    Dark Striped Row
                                </Text>
                            </Box>
                        </Stack>
                    </Paper>
                </Stack>
            </SimpleGrid>

            <Paper p="md" withBorder>
                <Text size="xs" fw={ 700 } mb="xs">HEX OUTPUTS FOR YOUR THEME:</Text>
                <SimpleGrid cols={ 3 }>
                    <Stack gap={ 2 }>
                        <Text size="xs">Accent</Text>
                        <Code color={ variants.accent }>
                            { variants.accent }
                        </Code>
                    </Stack>
                    <Stack gap={ 2 }>
                        <Text size="xs">Surface (Border)</Text>
                        <Code color={ variants.surface }>
                            { variants.surface }
                        </Code>
                    </Stack>
                    <Stack gap={ 2 }>
                        <Text size="xs">Submerged (Row)</Text>
                        <Code color={ variants.submerged }>
                            { variants.submerged }
                        </Code>
                    </Stack>
                </SimpleGrid>
            </Paper>
        </Stack>
    );
}
