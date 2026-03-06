import { Box, Paper, Stack, Text } from "@mantine/core";

import ScrollArea from "./ScrollArea";

export default {
    title: "Components/Runes/ScrollArea",
    component: ScrollArea,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "A custom wrapper for Mantine's ScrollArea, pre-configured with flex styling, small scrollbars, and custom scoped CSS classes."
            }
        },
        layout: "fullscreen"
    },
    argTypes: {
        children: {
            control: false,
            table: {
                type: { summary: 'ReactNode' }
            }
        }
    },
    decorators: [
        Story => (
            <Box p="md" style={ { height: "40vh", display: "flex", flexDirection: "column" } }>
                <Text size="xs" c="dimmed" mb="xs">Header Area (Fixed)</Text>
                <Paper withBorder style={ { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" } }>
                    <Story />
                </Paper>
                <Text size="xs" c="dimmed" mt="xs">Footer Area (Fixed)</Text>
            </Box>
        )
    ]
};

const TallContent = () => (
    <Stack p="md">
        { [...Array(20)].map((_, i) => (
            <Paper key={ i } p="xl" withBorder style={ { backgroundColor: "var(--mantine-color-gray-0)" } }>
                <Text>
                    Scrollable Item
                    { i + 1 }
                </Text>
            </Paper>
        )) }
    </Stack>
);

const Template = args => <ScrollArea { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
    children: <TallContent />
};

export const HorizontalScrolling = Template.bind({});
HorizontalScrolling.args = {
    type: "always",
    children: (
        <Box p="md" style={ { width: "1500px", backgroundColor: "var(--mantine-color-blue-light)" } }>
            <Text fw={ 700 } p="xl">
                This content is very wide, forcing a horizontal scrollbar.
            </Text>
        </Box>
    )
};
