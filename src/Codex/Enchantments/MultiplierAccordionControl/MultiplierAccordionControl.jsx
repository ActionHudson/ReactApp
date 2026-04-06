import { Accordion } from '@mantine/core';
import PropTypes from 'prop-types';

import ActionIcon from '../../Sigils/ActionIcon/ActionIcon';

export function MultiplierAccordionControl (
    { children, multiplierIcon, onMultiplierClick, ...props }
) {
    return (
        <Accordion.Control { ...props }>
            <div
                style={ {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                } }
            >
                <span>
                    { children }
                </span>
                <ActionIcon
                    component="div"
                    size="lg"
                    variant="subtle"
                    color="gray"
                    onClick={ onMultiplierClick }
                    icon={ multiplierIcon }
                    iconSize="xl"
                />
            </div>
        </Accordion.Control>
    );
}

MultiplierAccordionControl.propTypes = {
    children: PropTypes.node.isRequired,
    multiplierIcon: PropTypes.string.isRequired,
    onMultiplierClick: PropTypes.func.isRequired
};
