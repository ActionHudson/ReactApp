import { Text as MantineText } from '@mantine/core';

import { maxWidths } from '../../ArcaneThreads/Sizes';

export const Text = ({ children, ...props }) => (
    <MantineText size="lg" maw={ maxWidths.text } { ...props }>
        { children }
    </MantineText>
);
