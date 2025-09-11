import { Stack } from '@mantine/core';

import { HeroButtons } from '../../Sigils/HeroButtons/HeroButtons';
import { HeroText } from '../../Sigils/HeroText/HeroText';

export const HeroSection = () => (
    <Stack align="center" gap="xl">
        <HeroText
            title="Welcome to ActionSite"
            description="Build amazing applications with React, Vite, and Mantine. Get started with our modern development stack."
        />
        <HeroButtons />
    </Stack>
);
