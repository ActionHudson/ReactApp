import { Card as MantineCard } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Card ({
    key,
    to,
    children,
    ...props
}) {
    return (
        <MantineCard
            key={ key }
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
    key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};
