import { Button, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';

import { notify } from '../../ArcaneThreads/Notify';

// import Icon from '../../Runes/Icon/Icon';

export default function LandingPage () {
    const [ items, setItems ] = useState([]);

    useEffect(() => {
        fetch('/api/fetchAll.php?recipes')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.error("Fetch error:", err));
    }, []);

    console.log(items);

    return (

        <Stack gap="md">

            <Button
                onClick={ () => notify.success('Saved!') }
            >
                Show success notification
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
                onClick={ () => notify.warning('Warning!', 'This is a warning message.') }
            >
                Show warning notification
            </Button>
            { /* <Button
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
        </Stack>
    );
}
