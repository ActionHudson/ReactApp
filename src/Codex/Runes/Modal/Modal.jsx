import { Box, Group } from '@mantine/core';
import { modals } from '@mantine/modals';

import { Colours } from '../../ArcaneThreads/Colours';

export const Modal = settings => {
    const { title, ...restSettings } = settings;

    modals.open({
        ...restSettings,
        title: title ? (
            <Group spacing="xs">
                <Box
                    w={ 10 }
                    h={ 10 }
                    style={ {
                        borderRadius: '50%',
                        backgroundColor: Colours.accent.primary,
                        border: Colours.accent.primary
                    } }
                />
                { title }
            </Group>
        ) : undefined
    });
};
