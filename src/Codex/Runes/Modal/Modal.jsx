import { ModalsProvider } from '@mantine/modals';
import PropTypes from 'prop-types';

import { Colours } from '../../ArcaneThreads/Colours';

export default function Modal ({ children }) {
    return (
        <ModalsProvider
            modalProps={ {
                centered: true,
                overlayProps: {
                    backgroundOpacity: 0.55,
                    blur: 3
                },
                styles: {
                    content: { backgroundColor: Colours.secondary },
                    header: { backgroundColor: Colours.secondary },
                    title: { color: Colours.primary, fontWeight: 700 }
                }
            } }
        >
            { children }
        </ModalsProvider>
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired
};
