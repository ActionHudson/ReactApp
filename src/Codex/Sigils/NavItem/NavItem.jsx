import { Stack } from '@mantine/core';
import PropTypes from 'prop-types';

import Icon from '../../Runes/Icon/Icon';
import Text from '../../Runes/Text/Text';

export default function NavItem ({
    icon,
    label,
    path = undefined,
    disabled = false,
    active = false,
    ...props
}) {

    return (
        <div
            onClick={ () => {
                if (!disabled && path) {
                    window.location.href = path;
                }
            } }
            style={ {
                width: '100%',
                marginTop: '1rem',
                marginBottom: '1rem',
                height: '100%', cursor: 'pointer'
            } }
            { ...props }
        >
            <Stack
                justify="center"
                align="center"
                style={ { color: active ? "red" : "black" } }
                gap="xs"
            >
                <Icon icon={ icon } size='xl' />
                <Text size="sm">
                    { label }
                </Text>
            </Stack>
        </div>
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
