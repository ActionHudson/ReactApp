import { Button, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { notify } from '../../ArcaneThreads/Notify';
import { MainLayout } from '../../Grimoires/MainLayout/Mainlayout';
import Icon from '../../Runes/Icon/Icon';

export default function LandingPage () {

    return (
        <MainLayout>
            { /* <Stack gap="md">

                <Button
                    onClick={ () => notify.success('Saved!', 'Your changes have been saved.') }
                >
                    Notifications Provider timeout
                </Button>

                <Button
                    onClick={ () => notify.error('Error!', 'An error occurred while saving your changes.') }
                >
                    Show error notification
                </Button>

                <Button
                    onClick={ () => notify.info('Info', 'This is an informational message.') }
                >
                    Show info notification
                </Button>
                <Button
                    onClick={ () => {
                        const id = notifications.show({
                            loading: true,
                            title: 'Loading your data',
                            message: 'Data will be loaded in 3 seconds, you cannot close this yet',
                            autoClose: false,
                            withCloseButton: false
                        });

                        setTimeout(() => {
                            notifications.update({
                                id,
                                color: 'teal',

                                // title: 'Data was loaded',
                                message: 'Notification will close in 2 seconds, you can close this notification now',
                                icon: <Icon size={ 18 } />,
                                loading: false,
                                autoClose: 2000
                            });
                        }, 3000);
                    } }
                >
                    Show update notification
                </Button>
            </Stack> */ }
        </MainLayout>
    );
}
