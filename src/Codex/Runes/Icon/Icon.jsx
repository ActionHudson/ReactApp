import * as TablerIcons from '@tabler/icons-react';
import PropTypes from 'prop-types';

import { FontSize } from '../../ArcaneThreads/Sizes';

/**
 * Dynamically renders a Tabler Icon based on the provided exact export name,
 * or a custom image from the public folder.
 * @example
 * <Icon icon="IconHome" size="lg" stroke={2} color="blue" />
 * <Icon icon="Custom" customIcon="/icons/my-icon.png" size="lg" />
 * @param {Object} props
 * @param {string} [props.icon="IconMoodPuzzled"] The exact export name of the Tabler Icon, or "Custom".
 * @param {string} [props.customIcon] The path to the custom icon image (used when icon is "Custom").
 * @param {number} [props.stroke=1.5] The stroke width of the icon.
 * @param {string} [props.size="md"] The size of the icon, mapped to the FontSize design tokens.
 */
export default function Icon ({
    icon = 'IconMoodPuzzled',
    customIcon = undefined,
    stroke = 1.5,
    size = 'md',
    ...props
}) {
    if (icon === 'Custom' && customIcon) {
        return (
            <img
                src={ `/customIcons/${ customIcon }` }
                alt="Custom icon"
                { ...props }
            />
        );
    }

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
    customIcon: PropTypes.string,
    size: PropTypes.oneOf(Object.keys(FontSize)),
    stroke: PropTypes.number
};
