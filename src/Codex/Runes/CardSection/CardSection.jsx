import { Card as MantineCard } from '@mantine/core';
import PropTypes from 'prop-types';

export default function CardSection ({
    children
}) {
    return (
        <MantineCard.Section>
            { children }
        </MantineCard.Section>
    );
}

CardSection.propTypes = {
    children: PropTypes.node.isRequired
};
