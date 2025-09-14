import { Stack } from "@mantine/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Icon from "../../Runes/Icon/Icon";
import Text from "../../Runes/Text/Text";

export default function NavItem ({
    icon,
    label,
    path = undefined,
    disabled = false,
    active = false,
    ...props
}) {
    return (
        <Link
            to={ disabled || !path ? "#" : path }
            style={ {
                textDecoration: "none",
                marginTop: "1rem",
                marginBottom: "1rem",
                pointerEvents: disabled ? "none" : "auto",
                opacity: disabled ? 0.5 : 1
            } }
        >
            <Stack
                justify="center"
                align="center"
                style={ { color: active ? "red" : "black" } }
                gap="xs"
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
    key: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    path: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool
};
