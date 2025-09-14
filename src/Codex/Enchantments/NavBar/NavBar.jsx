import { SimpleGrid } from '@mantine/core';
import PropTypes from 'prop-types';

import NavItem from '../../Sigils/NavItem/NavItem';

export default function NavBar ({ navlinks }) {
    return (
        <SimpleGrid cols={ 5 } spacing="xs">
            { navlinks.map((item, index) => (
                <NavItem
                    key={ index }
                    icon={ item.icon }
                    label={ item.label }
                    path={ item.path }
                    active={ item.active || false }
                    disabled={ item.disabled || false }
                />
            )) }
        </SimpleGrid>
    );
}

NavBar.propTypes = {
    navlinks: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    })).isRequired
};
