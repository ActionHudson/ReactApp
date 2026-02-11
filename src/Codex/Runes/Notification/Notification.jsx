import { Notifications as MantineNotifications } from '@mantine/notifications';
import PropTypes from 'prop-types';

export default function Notifications ({
    position = 'top-center',
    autoClose = 4000,
    limit = 5,
    zIndex = 1000,
    title,
    message = ""
}) {
    return (

        <MantineNotifications
            position={ position }
            autoClose={ autoClose }
            limit={ limit }
            zIndex={ zIndex }
            radius="md"
            title={ title }
            message={ message }
        />

    );
}

Notifications.propTypes = {
    position: PropTypes.string,
    autoClose: PropTypes.oneOfType([ PropTypes.bool, PropTypes.number ]),
    limit: PropTypes.number,
    zIndex: PropTypes.number,
    title: PropTypes.string.isRequired,
    message: PropTypes.string
};
