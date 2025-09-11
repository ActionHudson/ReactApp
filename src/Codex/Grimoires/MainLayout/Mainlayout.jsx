import { AppShell, SimpleGrid } from '@mantine/core';

import NavItem from '../../Sigils/NavItem/NavItem';
export const MainLayout = ({ children }) => (
    <AppShell size="md" py="xl">
        <AppShell.Main>
            { children }
        </AppShell.Main>
        <AppShell.Footer>
            <SimpleGrid cols={ 5 } spacing="xs">
                <NavItem icon='IconAdCircle' label='Home' link='/Test' />
                <NavItem icon='IconAdCircle' label='Home' link='/Test' />
                <NavItem icon='IconAdCircle' label='Home' link='/Test' />
                <NavItem icon='IconAdCircle' label='Home' link='/Test' />
                <NavItem icon='IconAdCircle' label='Home' link='/Test' />
            </SimpleGrid>
        </AppShell.Footer>
    </AppShell>
);
