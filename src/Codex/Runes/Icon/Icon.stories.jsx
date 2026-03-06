import { Group, Stack, Text } from "@mantine/core";

import { FontSize } from "../../ArcaneThreads/Sizes";

import Icon from "./Icon";

export default {
    title: "Components/Runes/Icon",
    component: Icon,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Dynamically renders a Tabler Icon based on the provided exact export name with custom size and stroke tokens."
            }
        }
    },
    argTypes: {
        icon: {
            name: "icon",
            description: "The exact export name of the Tabler Icon.",
            control: "text",
            table: { category: "Appearance" }
        },
        size: {
            name: "size",
            description: "The size of the icon.",
            control: "select",
            options: Object.keys(FontSize),
            table: { category: "Appearance" }
        },
        stroke: {
            name: "stroke",
            description: "The stroke width of the icon.",
            control: { type: "number", min: 0.5, max: 3, step: 0.5 },
            table: { category: "Appearance" }
        }
    }
};

const Template = args => <Icon { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
    icon: "IconMoodPuzzled",
    size: "md",
    stroke: 1.5
};

export const AllSizes = args => {
    const sizes = Object.keys(FontSize);

    return (
        <Group align="flex-end" gap="lg">
            { sizes.map(s => (
                <Stack key={ s } align="center" gap="xs">
                    <Icon icon={ args.icon } size={ s } stroke={ args.stroke } />
                    <Text size="xs" c="dimmed">
                        { s }
                    </Text>
                </Stack>
            )) }
        </Group>
    );
};
AllSizes.args = {
    icon: "IconHeart",
    stroke: 1.5
};

export const DifferentStrokes = args => {
    const strokes = [ 1, 1.5, 2, 2.5 ];

    return (
        <Group align="flex-end" gap="lg">
            { strokes.map(s => (
                <Stack key={ s } align="center" gap="xs">
                    <Icon icon={ args.icon } size={ args.size } stroke={ s } />
                    <Text size="xs" c="dimmed">
                        Stroke
                        { s }
                    </Text>
                </Stack>
            )) }
        </Group>
    );
};
DifferentStrokes.args = {
    icon: "IconStar",
    size: "xl"
};
