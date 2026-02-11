import { AppShell, Container } from '@mantine/core';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { Nav } from '../../ArcaneThreads/Nav';
import NavBar from '../../Enchantments/NavBar/NavBar';

export const MainLayout = ({ children }) => {
    const location = useLocation();
    const navlinksWithActive = (Nav || []).map(link => {
        const linkPath = link.path || link.link || '';

        return {
            ...link,
            active: location.pathname === linkPath || location.pathname.startsWith(`${ linkPath }/`)
        };
    });

    return (
        <AppShell size="md">
            <AppShell.Main bg="#e4e4e4">
                <Container p="md">
                    { children }
                </Container>
            </AppShell.Main>
            <AppShell.Footer>
                <NavBar navlinks={ navlinksWithActive } />
            </AppShell.Footer>
        </AppShell>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    navlinks: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        label: PropTypes.string,
        path: PropTypes.string,
        link: PropTypes.string
    })).isRequired
};
