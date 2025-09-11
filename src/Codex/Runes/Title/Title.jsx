import { Title as MantineTitle } from '@mantine/core';

import { fontSizes } from '../../ArcaneThreads/Sizes';

export const Title = ({ children, ...props }) => (
    <MantineTitle size={ fontSizes.title } { ...props }>
        { children }
    </MantineTitle>
);
