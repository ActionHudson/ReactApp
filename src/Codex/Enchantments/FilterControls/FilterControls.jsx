import { Group } from '@mantine/core';
import PropTypes from 'prop-types';

import Button from '../../Runes/Button/Button';
import ActionIcon from '../../Sigils/ActionIcon/ActionIcon';
import MultiSelect from '../../Sigils/MultiSelect/MultiSelect';

/**
 * A composite control bar that manages data filtering and sorting states.
 * @example
 * <FilterControls 
 * data={items} 
 * selected={selectedArray} 
 * setSelected={setSelectedFn} 
 * sortStatus={status} 
 * setSortStatus={setStatusFn} 
 * />
 * @param {Object} props
 * @param {Array} props.data Array of objects for the MultiSelect dropdown options.
 * @param {Array} props.selected Array of currently selected filter values.
 * @param {function} props.setSelected Callback function to update the selected filters.
 * @param {Object} props.sortStatus Object containing columnAccessor and direction.
 * @param {string} props.sortStatus.columnAccessor The key of the column currently being sorted.
 * @param {string} props.sortStatus.direction The sort direction, e.g., 'asc' or 'desc'.
 * @param {function} props.setSortStatus Callback function to update the sorting state.
 */

export default function FilterControls ({
    data,
    selected,
    setSelected,
    sortStatus,
    setSortStatus,
    ...props
}) {
    const isFiltered = selected.length > 0 || !!sortStatus.columnAccessor;

    const handleClear = () => {
        setSelected([]);
        setSortStatus({
            columnAccessor: '',
            direction: 'asc'
        });
    };

    return (
        <Group gap="md" wrap="nowrap" { ...props }>
            <MultiSelect
                data={ data }
                onChange={ setSelected }
                selected={ selected }
                style={ { flex: 1 } }
            />

            <Button
                label="Clear Sort & Filter"
                onClick={ handleClear }
                variant="outline"
                size="md"
                isDisabled={ !isFiltered }
                radius="xl"
                visibleFrom="sm"
            />

            <ActionIcon
                variant="outline"
                size="xl"
                isDisabled={ !isFiltered }
                onClick={ handleClear }
                icon="IconFilterCancel"
                iconSize="xl"
                hiddenFrom="sm"
            />
        </Group>
    );
}

FilterControls.propTypes = {
    data: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    setSelected: PropTypes.func.isRequired,
    sortStatus: PropTypes.shape({
        columnAccessor: PropTypes.string,
        direction: PropTypes.string
    }).isRequired,
    setSortStatus: PropTypes.func.isRequired
};
