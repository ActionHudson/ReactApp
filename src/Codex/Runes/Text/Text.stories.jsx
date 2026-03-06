import Text from './Text';

export default {
    title: 'Components/Runes/Text',
    component: Text,
    argTypes: {
        size: {
            control: 'select',
            options: [ 'xs', 'sm', 'md', 'lg', 'xl' ]
        },
        dimmed: {
            control: 'boolean'
        }
    }
};

const Template = args => <Text { ...args } />;

export const Default = Template.bind({});
Default.args = {
    children: 'This is the default text style.',
    size: 'md',
    dimmed: false
};

export const Large = Template.bind({});
Large.args = {
    children: 'This is large text.',
    size: 'lg',
    dimmed: false
};

export const Dimmed = Template.bind({});
Dimmed.args = {
    children: 'This text is currently dimmed.',
    size: 'md',
    dimmed: true
};

export const CustomColor = Template.bind({});
CustomColor.args = {
    children: 'This text has a custom color prop.',
    size: 'md',
    dimmed: false,
    c: 'blue'
};
