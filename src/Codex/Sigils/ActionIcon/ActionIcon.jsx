import { ActionIcon as MantineActionIcon } from '@mantine/core';
import PropTypes from "prop-types";

import { Colours } from '../../ArcaneThreads/Colours';
import Icon from "../../Runes/Icon/Icon";
import classes from '../../Sigils/ActionIcon/ActionIcon.module.css';

/**
 * ActionIcon component.
 * @example
 * <ActionIcon isBookmarked={true} id={42} onClick={handleBookmarkToggle} />
 * @param {Object} props
 * @param {string} [props.variant="outline"] The visual variant of the icon.
 * @param {number} props.id The ID of the recipe being bookmarked.
 * @param {Function} props.onClick The function to call when the icon is clicked. Receives (event, id).
 * @param {string} [props.size="md"] The size of the icon button.
 * @param {string} [props.iconSize="lg"] The size of the icon inside the button.
 * @param {string} [props.color] The color of the icon button. Defaults to Colours.accent.primary.
 * @param {string} props.icon The string name of the Tabler icon to render.
 */

export default function ActionIcon ({
    variant = "filled",
    id = null,
    onClick = undefined,
    size = "md",
    iconSize = "lg",
    color = Colours.accent.primary,
    icon,
    isDisabled = false,
    ...props
}) {
    return (
        <MantineActionIcon
            variant={ variant }
            size={ size }
            color={ color }
            onClick={ e => onClick?.(e, id) }
            className={ classes.button }
            disabled={ isDisabled }
            { ...props }
        >
            <Icon
                icon={ icon }
                size={ iconSize }
            />
        </MantineActionIcon>
    );
}

ActionIcon.propTypes = {
    variant: PropTypes.oneOf([ "outline", "filled" ]),
    id: PropTypes.number,
    onClick: PropTypes.func,
    size: PropTypes.string,
    iconSize: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool
};
