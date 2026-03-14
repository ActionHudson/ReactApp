import FilterControls from "./FilterControls";

export default {
    title: "Components/Molecules/FilterControls",
    component: FilterControls,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "A composite control bar that manages data filtering and sorting states with responsive clear actions."
            }
        }
    },
    argTypes: {
        data: {
            description: "Array of objects for the MultiSelect dropdown options.",
            control: "object",
            table: { category: "Data" }
        },
        selected: {
            description: "Array of currently selected filter values.",
            control: "object",
            table: { category: "State" }
        },
        setSelected: {
            description: "Callback function to update the selected filters.",
            action: "setSelected",
            table: { category: "Events" }
        },
        sortStatus: {
            description: "Object containing columnAccessor and direction.",
            control: "object",
            table: { category: "State" }
        },
        setSortStatus: {
            description: "Callback function to update the sorting state.",
            action: "setSortStatus",
            table: { category: "Events" }
        }
    }
};

const Template = args => <FilterControls { ...args } />;

export const Default = Template.bind({});
Default.args = {
    data: [
        { group: 'Status', items: [ { value: 'active', label: 'Active' }, { value: 'pending', label: 'Pending' } ] },
        { group: 'Category', items: [ { value: 'web', label: 'Web' }, { value: 'mobile', label: 'Mobile' } ] }
    ],
    selected: [],
    sortStatus: {
        columnAccessor: '',
        direction: 'asc'
    }
};

export const ActiveFilters = Template.bind({});
ActiveFilters.args = {
    ...Default.args,
    selected: [ 'active', 'web' ],
    sortStatus: {
        columnAccessor: 'name',
        direction: 'desc'
    }
};
