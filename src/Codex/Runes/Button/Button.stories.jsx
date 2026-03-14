import { Group } from "@mantine/core";

import Icon from "../../Runes/Icon/Icon";

import Button from "./Button";

export default {
    title: "Components/Runes/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "A customized Mantine Button component with predefined variants and states."
            }
        }
    },
    argTypes: {
        label: {
            description: "The text to display inside the button.",
            control: "text",
            table: { category: "Content" }
        },
        variant: {
            description: "The visual style of the button.",
            control: "select",
            options: [ "gradient", "outline", "filled" ],
            table: { category: "Appearance" }
        },
        isDisabled: {
            description: "Whether the button is disabled.",
            control: "boolean",
            table: { category: "State" }
        },
        isLoading: {
            description: "Shows a loading spinner and disables the button when true.",
            control: "boolean",
            table: { category: "State" }
        },
        isFullWidth: {
            description: "Makes the button take up 100% of its container width when true.",
            control: "boolean",
            table: { category: "Appearance" }
        },
        isSubmit: {
            description: "Sets the button HTML type to \"submit\" when true.",
            control: "boolean",
            table: { category: "Behavior" }
        },
        onClick: {
            description: "The callback function fired when the button is clicked.",
            action: "clicked",
            table: { category: "Events" }
        }
    }
};

const Template = args => <Button { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
    label: "Submit",
    variant: "gradient",
    isDisabled: false,
    isLoading: false,
    isFullWidth: false,
    isSubmit: false
};

export const AllVariants = args => {
    const variants = [ "gradient", "outline", "filled" ];
    return (
        <Group>
            { variants.map(v => (
                <Button key={ v } { ...args } variant={ v } label={ v } />
            )) }
        </Group>
    );
};
AllVariants.args = {
    isDisabled: false,
    isLoading: false,
    isFullWidth: false
};

export const States = args => (
    <Group>
        <Button { ...args } label="Normal" />
        <Button { ...args } label="Loading" isLoading={ true } />
        <Button { ...args } label="Disabled" isDisabled={ true } />
    </Group>
);
States.args = {
    variant: "filled",
    isFullWidth: false
};

export const WithProps = args => (
    <Button
        { ...args }
        variant="filled"
        label="Upload"
        isSubmit={ true }
        rightSection={
            <Icon
                icon="IconCloudUpload"
                stroke={ 2.5 }
            />
        }
    />
);

export const FullWidth = Template.bind({});
FullWidth.args = {
    label: "Full Width Button",
    variant: "gradient",
    isFullWidth: true
};
