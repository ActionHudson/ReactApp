import * as TablerIcons from '@tabler/icons-react';
import PropTypes from 'prop-types';

import { FontSize } from '../../ArcaneThreads/Sizes';

/**
 * Dynamically renders a Tabler Icon based on the provided exact export name.
 * @example
 * <Icon icon="IconHome" size="lg" stroke={2} color="blue" />
 * @param {Object} props
 * @param {string} [props.icon="IconMoodPuzzled"] The exact export name of the Tabler Icon.
 * @param {number} [props.stroke=1.5] The stroke width of the icon.
 * @param {string} [props.size="md"] The size of the icon, mapped to the FontSize design tokens.
 */

export default function Icon ({
    icon = 'IconMoodPuzzled',
    stroke = 1.5,
    size = 'md',
    ...props
}) {
    const IconComponent = TablerIcons[icon];
    return (
        <IconComponent
            size={ FontSize[size] }
            stroke={ stroke }
            { ...props }
        />
    );
}

Icon.propTypes = {
    icon: PropTypes.string,
    size: PropTypes.oneOf(Object.keys(FontSize)),
    stroke: PropTypes.number
};
