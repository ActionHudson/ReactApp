import { Menu, UnstyledButton } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Colours } from '../../ArcaneThreads/Colours';
import { MinSiteWidth } from '../../ArcaneThreads/Sizes';
import Icon from '../../Runes/Icon/Icon';
import SimpleGrid from '../../Runes/SimpleGrid/SimpleGrid';
import Text from '../../Runes/Text/Text';
import NavItem from '../../Sigils/NavItem/NavItem';

export default function NavBar ({ navlinks }) {
    const limit = 5;
    const showMenu = navlinks.length > limit;

    const visibleLinks = showMenu ? navlinks.slice(0, limit - 1) : navlinks;
    const menuLinks = showMenu ? navlinks.slice(limit - 1) : [];
    const isMenuChildActive = menuLinks.some(link => link.active);

    return (
        <SimpleGrid cols={ showMenu ? limit : navlinks.length } spacing="xs" style={ { minWidth: MinSiteWidth } }>
            { visibleLinks.map((item, index) => (
                <NavItem
                    key={ index }
                    icon={ item.icon }
                    label={ item.label }
                    path={ item.path }
                    active={ item.active || false }
                    disabled={ item.disabled || false }
                />
            )) }

            { showMenu && (
                <Menu shadow="md" width={ 200 } position="bottom-end">
                    <Menu.Target>
                        <UnstyledButton style={ { marginTop: '16px', marginBottom: '16px' } }>
                            <div style={ {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            } }>
                                <Icon
                                    icon="IconDots"
                                    size="xl"
                                    style={ { color: isMenuChildActive ? Colours.accent.primary : Colours.primary } }
                                />
                                <Text size="sm" style={ { color: Colours.primary } }>
                                    More
                                </Text>
                            </div>
                        </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                        { menuLinks.map((item, index) => (
                            <Menu.Item
                                key={ index }
                                component={ Link }
                                to={ item.disabled ? '#' : item.path }
                                leftSection={
                                    <Icon
                                        icon={ item.icon }
                                        size={ 16 }
                                        style={ { color: item.active ? Colours.accent.primary : Colours.primary } }
                                    />
                                }
                                disabled={ item.disabled }
                                style={ {
                                    color: Colours.primary
                                } }
                            >
                                { item.label }
                            </Menu.Item>
                        )) }
                    </Menu.Dropdown>
                </Menu>
            ) }
        </SimpleGrid>
    );
}

NavBar.propTypes = {
    navlinks: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        active: PropTypes.bool,
        disabled: PropTypes.bool
    })).isRequired
};
