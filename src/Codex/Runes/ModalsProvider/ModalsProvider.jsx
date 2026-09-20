import { ModalsProvider as MantineModalsProvider } from '@mantine/modals';
import PropTypes from 'prop-types';

import { Colours } from '../../ArcaneThreads/Colours';

export default function ModalsProvider ({ children }) {
    return (
        <MantineModalsProvider
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
        </MantineModalsProvider>
    );
}

ModalsProvider.propTypes = {
    children: PropTypes.node.isRequired
};
