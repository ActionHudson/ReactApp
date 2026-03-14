import PropTypes from 'prop-types';

import { MinSiteWidth } from '../../ArcaneThreads/Sizes';
import SimpleGrid from '../../Runes/SimpleGrid/SimpleGrid';
import NavItem from '../../Sigils/NavItem/NavItem';

/**
 * Renders a horizontal navigation bar dynamically populated by an array of link objects.
 * @example
 * const links = [{ icon: "home", label: "Home", path: "/", active: true }];
 * <NavBar navlinks={links} />
 * @param {Object} props
 * @param {Array<Object>} props.navlinks
 * @param {string} props.navlinks[].icon
 * @param {string} props.navlinks[].label
 * @param {string} props.navlinks[].path
 * @param {boolean} [props.navlinks[].active=false]
 * @param {boolean} [props.navlinks[].disabled=false]
 */

export default function NavBar ({ navlinks }) {
    return (
        <SimpleGrid cols={ navlinks.length } spacing="xs" style={ { minWidth: MinSiteWidth } }>
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
