import { AppShell, Container } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Outlet, useLocation } from 'react-router-dom';

import { Colours } from '../../ArcaneThreads/Colours';
import { Nav } from '../../ArcaneThreads/Nav';
import { Spacing } from '../../ArcaneThreads/Sizes';
import NavBar from '../../Enchantments/NavBar/NavBar';

export const MainLayout = () => {

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
            padding={ Spacing.none }
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

            <AppShell.Main bg={ Colours.background } h="100vh">
                <Container
                    fluid
                    p={ Spacing.md }
                    h="100%"
                    style={ { overflowY: 'auto', overflowX: 'hidden' } }
                >
                    <Outlet />
                </Container>
            </AppShell.Main>

            <AppShell.Footer>
                <NavBar navlinks={ navlinksWithActive } />
            </AppShell.Footer>
        </AppShell>
    );
};
