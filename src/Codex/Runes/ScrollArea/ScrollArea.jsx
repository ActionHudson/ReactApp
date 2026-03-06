import { ScrollArea as MantineScrollArea } from "@mantine/core";
import PropTypes from 'prop-types';

import SAclasses from './ScrollArea.module.css';

/**
 * A custom wrapper for Mantine's ScrollArea component, applying default flex styling, custom scrollbar sizing, and scoped CSS classes.
 * @example
 * <ScrollArea>
 * <div>Scrollable content goes here...</div>
 * </ScrollArea>
 * @param {Object} props
 * @param {React.ReactNode} props.children The content to be rendered inside the scroll area.
 */

export default function ScrollArea ({
    children,
    ...props
}) {
    return (
        <MantineScrollArea
            style={ { flex: 1 } }
            scrollbarSize={ 6 }
            classNames={ SAclasses }
            { ...props }
        >
            { children }
        </MantineScrollArea>
    );
}

ScrollArea.propTypes = {
    children: PropTypes.node.isRequired
};
