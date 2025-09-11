import { Stack } from '@mantine/core';

import { Text } from '../../Runes/Text/Text';
import { Title } from '../../Runes/Title/Title';

export const HeroText = ({ title, description }) => (
    <Stack align="center" gap="xl">
        <Title ta="center">
            { title }
        </Title>
        <Text ta="center" c="dimmed">
            { description }
        </Text>
    </Stack>
);
