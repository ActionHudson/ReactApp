// src/Codex/Runes/NavBar/NavBar.jsx
import { AppShell, Burger, Group, UnstyledButton } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconHome, IconSearch, IconSettings, IconUser } from '@tabler/icons-react';
import { useState } from 'react';
import '../NavBar/NavBar.css';

const navItems = [
    { icon: IconHome, label: 'Home', path: '/' },
    { icon: IconSearch, label: 'Search', path: '/search' },
    { icon: IconUser, label: 'Profile', path: '/profile' },
    { icon: IconSettings, label: 'Settings', path: '/settings' }
];

export const NavBar = ({ children }) => {
    const [ opened, { toggle } ] = useDisclosure();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [ activeTab, setActiveTab ] = useState(0);

    if (isMobile) {
        return (
            <>
                <main style={ { paddingBottom: '80px' } }>
                    { children }
                </main>
                <div className="mobile-navbar">
                    { navItems.map((item, index) => (
                        <UnstyledButton
                            key={ item.path }
                            className={ `mobile-nav-item ${ activeTab === index ? 'active' : '' }` }
                            onClick={ () => setActiveTab(index) }
                        >
                            <item.icon size={ 24 } />
                            <span className="nav-label">
                                { item.label }
                            </span>
                        </UnstyledButton>
                    )) }
                </div>
            </>
        );
    }

    return (
        <AppShell
            header={ { height: 60 } }
            navbar={ { width: opened ? 200 : 0, breakpoint: 'sm' } }
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger opened={ opened } onClick={ toggle } hiddenFrom="sm" size="sm" />
                        <div style={ { fontWeight: 600, fontSize: '1.2rem' } }>ActionSite</div>
                    </Group>
                    <Group gap="lg" visibleFrom="sm">
                        { navItems.map((item, index) => (
                            <UnstyledButton
                                key={ item.path }
                                className={ `desktop-nav-item ${ activeTab === index ? 'active' : '' }` }
                                onClick={ () => setActiveTab(index) }
                            >
                                <Group gap="xs">
                                    <item.icon size={ 18 } />
                                    <span>
                                        { item.label }
                                    </span>
                                </Group>
                            </UnstyledButton>
                        )) }
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md" hiddenFrom="sm">
                { navItems.map((item, index) => (
                    <UnstyledButton
                        key={ item.path }
                        className={ `sidebar-nav-item ${ activeTab === index ? 'active' : '' }` }
                        onClick={ () => setActiveTab(index) }
                        mb="xs"
                    >
                        <Group gap="sm">
                            <item.icon size={ 18 } />
                            <span>
                                { item.label }
                            </span>
                        </Group>
                    </UnstyledButton>
                )) }
            </AppShell.Navbar>

            <AppShell.Main>
                { children }
            </AppShell.Main>
        </AppShell>
    );
};
