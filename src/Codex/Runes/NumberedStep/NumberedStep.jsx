import { Group, Text } from '@mantine/core';
import PropTypes from 'prop-types';

import { Colours } from '../../ArcaneThreads/Colours';
import { Border } from '../../ArcaneThreads/Sizes';

export function NumberedStep ({ step, index }) {
    return (
        <Group wrap="nowrap" align="flex-start" gap="md">
            <div
                style={ {
                    backgroundColor: Colours.accent.primary,
                    color: 'white',
                    borderRadius: Border.radius.md,
                    minWidth: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    flexShrink: 0
                } }
            >
                { index + 1 }
            </div>
            <Text>
                { step }
            </Text>
        </Group>
    );
}

NumberedStep.propTypes = {
    step: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
};
