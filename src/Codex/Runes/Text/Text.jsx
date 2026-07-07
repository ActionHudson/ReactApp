import { Text as MantineText } from '@mantine/core';
import PropTypes from 'prop-types';

import { Colours } from '../../ArcaneThreads/Colours';
import { FontSize } from '../../ArcaneThreads/Sizes';

/**
 * A custom wrapper for Mantine's Text component that enforces custom sizing tokens.
 * Renders as an inline `span` by default.
 * @example
 * <Text size="lg" dimmed={true}>Arcane Secrets</Text>
 * <Text size="1rem">Arcane Not So Secrets</Text>
 * @param {Object} props
 * @param {string} props.children The text content to display.
 * @param {string} [props.size="md"] The size of the text, mapped to the FontSize design tokens.
 * @param {boolean} [props.dimmed=false] Whether the text color should appear dimmed.
 * @param {string} [props.colour="#ffffff"] The colour of the text.
*/

export default function Text ({
    children,
    size = FontSize.md,
    disabled = false,
    colour = Colours.primary,
    ...props
}) {
    return (
        <MantineText
            component="span"
            size={ FontSize[size] }
            c={ disabled ? Colours.disabled : colour }
            { ...props }
        >
            { children }
        </MantineText>

    );
}

Text.propTypes = {
    children: PropTypes.string.isRequired,
    size: PropTypes.oneOf(Object.keys(FontSize)),
    disabled: PropTypes.bool,
    colour: PropTypes.string
};
