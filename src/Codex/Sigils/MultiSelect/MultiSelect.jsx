import { MultiSelect as MantineMultiSelect } from '@mantine/core';
import PropTypes from 'prop-types';

import Icon from '../../Runes/Icon/Icon';

export default function MultiSelect ({
    data,
    onChange,
    selected,
    ...props
}) {
    return (
        <MantineMultiSelect
            data={ data }
            searchable
            clearable
            nothingFoundMessage="Nothing found..."
            hidePickedOptions
            maxDropdownHeight={ 400 }
            comboboxProps={ { shadow: 'md' } }
            leftSectionPointerEvents="none"
            leftSection={ <Icon icon="IconSearch" size={ 16 } /> }
            radius="xl"
            size='md'
            onChange={ onChange }
            value={ selected }
            { ...props }
        />

    );
}

MultiSelect.propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired
};
