import { Title as MantineTitle } from '@mantine/core';

import { FontSize } from '../../ArcaneThreads/Sizes';

export const Title = ({ children, ...props }) => (
    <MantineTitle size={ FontSize.lg } { ...props }>
        { children }
    </MantineTitle>
);
