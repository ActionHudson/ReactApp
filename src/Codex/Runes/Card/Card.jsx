import { Card as MantineCard } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Card ({
    to,
    children,
    ...props
}) {
    return (
        <MantineCard
            component={ Link }
            to={ to }
            shadow="sm"
            padding="md"
            radius="lg"
            withBorder
            style={ { height: "auto" } }
            { ...props }
        >
            { children }
        </MantineCard>
    );
}

Card.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};
