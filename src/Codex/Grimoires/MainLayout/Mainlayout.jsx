import { AppShell } from '@mantine/core';
import PropTypes from 'prop-types';

import NavBar from '../../Enchantments/NavBar/NavBar';

export const MainLayout = ({ navlinks, children }) => (
    <AppShell size="md">
        <AppShell.Main bg="#e4e4e4">
            { children }
        </AppShell.Main>
        <AppShell.Footer>
            <NavBar navlinks={ navlinks } />
        </AppShell.Footer>
    </AppShell>
);

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    navlinks: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    })).isRequired
};
