import { Stack } from "@mantine/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Colours } from "../../ArcaneThreads/Colours";
import { Spacing } from "../../ArcaneThreads/Sizes";
import Icon from "../../Runes/Icon/Icon";
import Text from "../../Runes/Text/Text";

/**
 * A visual navigation element that acts as a React Router link.
 * @example
 * <NavItem icon="home" label="Home" path="/home" active={true} />
 * @param {Object} props
 * @param {string} props.icon
 * @param {string} props.label
 * @param {string} [props.path]
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.active=false]
 */

export default function NavItem ({
    icon,
    label,
    path = undefined,
    disabled = false,
    active = false,
    ...props
}) {
    const linkStyle = {
        textDecoration: "none",
        marginTop: Spacing.md,
        marginBottom: Spacing.md,
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.5 : 1
    };

    return (
        <Link
            to={ disabled || !path ? "#" : path }
            style={ linkStyle }
        >
            <Stack
                justify="center"
                align="center"
                style={
                    { color: active ? Colours.accent.primary : Colours.primary }
                }
                gap={ Spacing.sm }
                { ...props }
            >
                <Icon icon={ icon } size="xl" />
                <Text size="sm">
                    { label }
                </Text>
            </Stack>
        </Link>
    );
}

NavItem.propTypes = {
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    path: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool
};
