import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { MainLayout } from '../../Grimoires/MainLayout/Mainlayout';
import Icon from '../../Runes/Icon/Icon';
export default function LandingPage () {

    return (
        <MainLayout>
            { /* <Button
                onClick={ () => notifications.show({ 
                message: 'I will cloawdse in 4 seconds' 
                }) }
            >
                Notifications Provider timeout
            </Button>

            <Button
                onClick={ () => notifications.show({
                    color: 'blue',
                    title: 'I will never close',

                    // message: 'unless yoawdawdu click X',
                    autoClose: false
                }) }
            >
                Never closes automatically
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
            </Button> */ }
        </MainLayout>
    );
}
