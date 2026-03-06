import { Box, Paper, Stack, Text } from "@mantine/core";
import PropTypes from "prop-types";

import SimpleGrid from "./SimpleGrid";

export default {
    title: "Components/Runes/SimpleGrid",
    component: SimpleGrid,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "A responsive grid layout wrapper. The preview at the top updates in real-time as you adjust the controls below."
            }
        }
    },
    argTypes: {
        cols: {
            name: "cols",
            description: "Number of columns.",
            control: { type: "number", min: 1, max: 6 },
            table: { category: "Layout" }
        },
        spacing: {
            name: "spacing",
            description: "Spacing between items.",
            control: "select",
            options: [ "xs", "sm", "md", "lg", "xl" ],
            table: { category: "Layout" }
        }
    }
};

const GridItem = ({ children }) => (
    <Paper
        p="md"
        withBorder
        style={ {
            backgroundColor: "var(--mantine-color-blue-light)",
            textAlign: "center"
        } }
    >
        <Text size="xs" fw={ 700 }>
            { children }
        </Text>
    </Paper>
);

GridItem.propTypes = {
    children: PropTypes.node.isRequired
};

const Template = args => (
    <SimpleGrid { ...args }>
        <GridItem>1</GridItem>
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>
        <GridItem>4</GridItem>
        <GridItem>5</GridItem>
        <GridItem>6</GridItem>
        <GridItem>7</GridItem>
        <GridItem>8</GridItem>
        <GridItem>9</GridItem>
    </SimpleGrid>
);

export const Primary = Template.bind({});
Primary.args = {
    cols: 3,
    spacing: "md"
};

export const AllVariants = args => {
    const spacings = [ "xs", "md", "xl" ];

    return (
        <Stack gap="xl">
            <Box>
                <Stack gap="lg">
                    { spacings.map(s => (
                        <Box key={ s }>
                            <Text size="xs" c="dimmed" mb="xs">
                                Fixed Spacing:
                                { ' ' }
                                { s }
                            </Text>
                            <SimpleGrid cols={ args.cols } spacing={ s }>
                                <GridItem>1</GridItem>
                                <GridItem>2</GridItem>
                                <GridItem>3</GridItem>
                            </SimpleGrid>
                        </Box>
                    )) }
                </Stack>
            </Box>
        </Stack>
    );
};

AllVariants.args = {
    cols: 3,
    spacing: "md"
};

export const TwoColumn = Template.bind({});
TwoColumn.args = {
    cols: 2,
    spacing: "md"
};

export const LargeSpacing = Template.bind({});
LargeSpacing.args = {
    cols: 3,
    spacing: "xl"
};
