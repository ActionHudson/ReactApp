import { Stack } from '@mantine/core';
import PropTypes from 'prop-types';

import Icon from '../../Runes/Icon/Icon';
import Text from '../../Runes/Text/Text';

export default function NavItem ({
    icon,
    label,
    link = undefined,
    disabled = false,
    active = false,
    ...props
}) {
    return (
        <div
            onClick={ () => {
                if (!disabled && link) {
                    window.location.href = link;
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
                style={ { } }
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
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    link: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool
};
