import { AppShell, Container } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
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
    const isLarge = useMediaQuery('(min-width: 1200px)');
    return (
        <AppShell
            padding={ 0 }
            header={ {
                height: 80,
                collapsed: !isLarge,
                offset: isLarge
            } }
            footer={ {
                height: 80,
                collapsed: isLarge,
                offset: !isLarge
            } }
        >
            <AppShell.Header>
                <NavBar navlinks={ navlinksWithActive } />
            </AppShell.Header>

            <AppShell.Main bg="#E4E4E4" h="100vh">
                <Container
                    fluid
                    p={ 16 }
                    h="100%"
                    style={ { overflowY: 'auto', overflowX: 'hidden' } }
                >
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
