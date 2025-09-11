import { Button as MantineButton } from '@mantine/core';
import PropTypes from 'prop-types';

export const Button = ({ variant = 'filled', children, ...props }) => (
    <MantineButton size="lg" variant={ variant } { ...props }>
        { children }
    </MantineButton>
);

Button.propTypes = {
    variant: PropTypes.oneOf([ 'filled', 'outline' ]),
    children: PropTypes.node.isRequired
};
