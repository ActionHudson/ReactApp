import { SimpleGrid as MantineSimpleGrid } from "@mantine/core";
import PropTypes from 'prop-types';

import { Spacing } from "../../ArcaneThreads/Sizes";

/**
 * Custom SimpleGrid component wrapper for Mantine.
 * @example
 * <SimpleGrid cols={3} spacing="lg">
 * <div>1</div>
 * <div>2</div>
 * </SimpleGrid>
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} [props.spacing="md"] Defaults to "md".
 * @param {number} props.cols
 */

export default function SimpleGrid ({
    children,
    spacing = Spacing.md,
    cols,
    ...props
}) {
    return (
        <MantineSimpleGrid
            spacing={ spacing }
            cols={ cols }
            { ...props }
        >
            { children }
        </MantineSimpleGrid>
    );
}

SimpleGrid.propTypes = {
    children: PropTypes.node.isRequired,
    spacing: PropTypes.oneOf([ "xs", "sm", "md", "lg", "xl" ]),
    cols: PropTypes.number.isRequired
};
