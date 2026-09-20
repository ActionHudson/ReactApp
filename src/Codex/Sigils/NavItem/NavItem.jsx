import { Stack, UnstyledButton } from "@mantine/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Colours } from "../../ArcaneThreads/Colours";
import { Spacing } from "../../ArcaneThreads/Sizes";
import Icon from "../../Runes/Icon/Icon";
import Text from "../../Runes/Text/Text";

/**
 * A visual navigation element that acts as a React Router link or a button.
 * @example
 * <NavItem icon="home" label="Home" path="/home" active={true} />
 * @param {Object} props
 * @param {string} props.icon
 * @param {string} props.label
 * @param {string} [props.path]
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.active=false]
 * @param {function} [props.onClick]
 */
export default function NavItem ({
    icon,
    customIcon = undefined,
    label,
    path = undefined,
    disabled = false,
    active = false,
    onClick = undefined,
    ...props
}) {
    const itemStyle = {
        textDecoration: "none",
        marginTop: Spacing.md,
        marginBottom: Spacing.md,
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.5 : 1,
        display: "block"
    };

    const stackContent = (
        <Stack
            justify="center"
            align="center"
            style={ {
                color: active ? Colours.accent.primary : Colours.primary
            } }
            gap={ Spacing.sm }
            { ...props }
        >
            <Icon
                icon={ icon }
                customIcon={ customIcon }
                size="xl"
            />
            <Text size="sm">
                { label }
            </Text>
        </Stack>
    );

    if (onClick || !path) {
        return (
            <UnstyledButton
                onClick={ onClick }
                disabled={ disabled }
                style={ { ...itemStyle, width: "100%" } }
            >
                { stackContent }
            </UnstyledButton>
        );
    }

    return (
        <Link
            to={ disabled ? "#" : path }
            style={ itemStyle }
        >
            { stackContent }
        </Link>
    );
}

NavItem.propTypes = {
    icon: PropTypes.string.isRequired,
    customIcon: PropTypes.string,
    label: PropTypes.string.isRequired,
    path: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    onClick: PropTypes.func
};
