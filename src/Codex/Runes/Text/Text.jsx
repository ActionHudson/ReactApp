import { Text as MantineText } from '@mantine/core';
import PropTypes from 'prop-types';

import { FontSize } from '../../ArcaneThreads/Sizes';

export default function Text ({
    children,
    size = 'md',
    dimmed = false,
    ...props
}) {
    return (
        <MantineText
            component="span"
            size={ FontSize[size] }
            c={ dimmed ? 'dimmed' : undefined }
            { ...props }
        >
            { children }
        </MantineText>

    );
}

Text.propTypes = {
    children: PropTypes.string.isRequired,
    size: PropTypes.oneOf(Object.keys(FontSize)),
    dimmed: PropTypes.bool
};
