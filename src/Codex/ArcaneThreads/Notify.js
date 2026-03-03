import { notifications } from '@mantine/notifications';

import { Colours } from './Colours';

export const notify = {
    success: (title, message) => notifications.show({
        color: Colours.status.success,
        title,
        message
    }),
    info: (title, message) => notifications.show({
        color: Colours.status.info,
        title,
        message,
        autoClose: 8000
    }),
    warning: (title, message) => notifications.show({
        color: Colours.status.warning,
        title,
        message,
        autoClose: false
    }),
    error: (title, message) => notifications.show({
        color: Colours.status.error,
        title,
        message,
        autoClose: false
    })
};
