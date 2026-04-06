import { Text } from '@mantine/core';
import PropTypes from 'prop-types';

import { Border, Spacing } from '../../ArcaneThreads/Sizes';

export function RecipeStatBox ({ label, value }) {
    return (
        <div style={
            {
                backgroundColor: "#F4F4F4",
                borderRadius: Border.radius.md,
                padding: Spacing.sm,
                paddingTop: Spacing.md
            }
        }>
            <Text size="xs" tt="uppercase" ta="center" fw={ 600 }>
                { label }
            </Text>
            <Text fw={ 500 } ta="center">
                { value }
            </Text>
        </div>
    );
}

RecipeStatBox.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType(
        [ PropTypes.string, PropTypes.number ]
    ).isRequired
};
