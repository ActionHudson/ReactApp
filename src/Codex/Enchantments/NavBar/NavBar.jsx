import { ActionIcon, Group, Menu, Stack, ThemeIcon, UnstyledButton } from '@mantine/core';
import { modals } from '@mantine/modals';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../Auth/useAuth';
import { Colours } from '../../ArcaneThreads/Colours';
import { Border, MinSiteWidth } from '../../ArcaneThreads/Sizes';
import Icon from '../../Runes/Icon/Icon';
import { Modal } from '../../Runes/Modal/Modal';
import SimpleGrid from '../../Runes/SimpleGrid/SimpleGrid';
import Text from '../../Runes/Text/Text';
import NavItem from '../../Sigils/NavItem/NavItem';

export default function NavBar ({ navlinks }) {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, openLoginModal, role, setRole } =
        useAuth();
    const filteredLinks = navlinks.filter(
        link => !link.visibleTo ||
            link.visibleTo && link.visibleTo.includes(role)
    );

    const limit = 5;
    const totalItems = filteredLinks.length + 1;
    const showMenu = totalItems > limit;

    const visibleLinks = showMenu
        ? filteredLinks.slice(0, limit - 1)
        : filteredLinks;

    const menuLinks = showMenu ? filteredLinks.slice(limit - 1) : [];
    const isMenuChildActive = menuLinks.some(link => link.active);

    const handleAuthClick = async () => {
        if (isLoggedIn) {
            try {
                await fetch('/aether/logout.php', {
                    method: 'POST',
                    credentials: 'include'
                });
                setIsLoggedIn(false);
                setRole(null);
            } catch (error) {
                console.error(error);
            }
        } else {
            openLoginModal();
        }
    };

    const NavOption = ({ opt }) => {
        const [ isHovered, setIsHovered ] = useState(false);

        return (
            <UnstyledButton
                onMouseEnter={ () => setIsHovered(true) }
                onMouseLeave={ () => setIsHovered(false) }
                onClick={ () => {
                    navigate(opt.link);
                    modals.closeAll();
                } }
                style={ {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    width: '100%',
                    border: `${ Border.size.lg } ` +
            `${ Border.type.solid } ${
                isHovered
                    ? Colours.accent.primary
                    : `color-mix(in srgb, ${ Colours.border } 50%, transparent)`
            }`,
                    borderRadius: Border.radius.lg,
                    cursor: 'pointer'
                } }
            >
                <Group wrap="nowrap" style={ { width: '100%' } }>
                    { opt.icon && (
                        <ThemeIcon
                            variant="light"
                            color={
                                isHovered
                                    ? Colours.accent.primary
                                    : Colours.disabled
                            }
                            size="xl"
                            radius="md"
                        >
                            <Icon
                                icon={ opt.icon }
                                size="lg"
                                stroke={ 2 }
                                style={ {
                                    color: isHovered
                                        ? Colours.accent.primary
                                        : Colours.primary
                                } }
                            />
                        </ThemeIcon>
                    ) }

                    <Stack gap="xs" style={ { flex: 1 } }>
                        <Text
                            style={ {
                                fontWeight: 500
                            } }
                        >
                            { opt.title }
                        </Text>
                        <Text
                            size="sm"
                            disabled={ true }
                        >
                            { opt.text }
                        </Text>
                    </Stack>

                    <Icon
                        icon="IconChevronRight"
                        size="lg"
                        stroke={ 2 }
                        style={ {
                            color: isHovered
                                ? Colours.accent.primary
                                : Colours.disabled
                        } }
                    />
                </Group>
            </UnstyledButton>
        );
    };

    const openNavModal = modalConfig => {
        Modal({
            title: modalConfig.title,
            centered: true,
            children: (
                <div
                    style={ {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    } }
                >
                    <Text disabled={ true }>
                        { modalConfig.text }
                    </Text>

                    <SimpleGrid
                        cols={ 1 }
                        spacing="sm"
                    >
                        { modalConfig.options.map((opt, i) => (
                            <NavOption
                                key={ i }
                                opt={ opt }
                            />
                        )) }
                    </SimpleGrid>
                </div>
            )
        });
    };

    return (
        <SimpleGrid
            cols={ showMenu ? limit : totalItems }
            spacing="xs"
            style={ { minWidth: MinSiteWidth } }
        >
            { visibleLinks.map((item, index) => {
                const isModal = Boolean(item.modal);

                return (
                    <NavItem
                        key={ index }
                        icon={ item.icon }
                        customIcon={ item.customIcon }
                        label={ item.label }
                        path={ isModal ? undefined : item.path }
                        active={ item.active || false }
                        disabled={ item.disabled || false }
                        onClick={ isModal
                            ? () => openNavModal(item.modal)
                            : undefined }
                    />
                );
            }) }

            { !showMenu && (
                <UnstyledButton
                    style={ {
                        marginTop: '16px',
                        marginBottom: '16px'
                    } }
                    onClick={ handleAuthClick }
                >
                    <div
                        style={ {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        } }
                    >
                        <Icon
                            icon={ isLoggedIn ? "IconLogout" : "IconLogin" }
                            size="xl"
                            style={ { color: Colours.primary } }
                        />
                        <Text
                            size="sm"
                            style={ { color: Colours.primary } }
                        >
                            { isLoggedIn ? "Sign Out" : "Sign In" }
                        </Text>
                    </div>
                </UnstyledButton>
            ) }

            { showMenu && (
                <Menu
                    shadow="md"
                    width={ 200 }
                    position="bottom-end"
                >
                    <Menu.Target>
                        <UnstyledButton
                            style={ {
                                marginTop: '16px',
                                marginBottom: '16px'
                            } }
                        >
                            <div
                                style={ {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                } }
                            >
                                <Icon
                                    icon="IconDots"
                                    size="xl"
                                    style={ {
                                        color: isMenuChildActive
                                            ? Colours.accent.primary
                                            : Colours.primary
                                    } }
                                />
                                <Text
                                    size="sm"
                                    style={ { color: Colours.primary } }
                                >
                                    More
                                </Text>
                            </div>
                        </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                        { menuLinks.map((item, index) => {
                            const isModal = Boolean(item.modal);

                            return (
                                <Menu.Item
                                    key={ index }
                                    component={ isModal ? 'button' : Link }
                                    to={ isModal
                                        ? undefined
                                        : item.disabled ? '#' : item.path }
                                    onClick={ isModal
                                        ? () => openNavModal(item.modal)
                                        : undefined }
                                    leftSection={
                                        <Icon
                                            icon={ item.icon }
                                            customIcon={ item.customIcon }
                                            size={ 16 }
                                            style={ {
                                                color: item.active
                                                    ? Colours.accent.primary
                                                    : Colours.primary
                                            } }
                                        />
                                    }
                                    disabled={ item.disabled }
                                    style={ { color: Colours.primary } }
                                >
                                    { item.label }
                                </Menu.Item>
                            );
                        }) }

                        { menuLinks.length > 0 && <Menu.Divider /> }

                        <Menu.Item
                            onClick={ handleAuthClick }
                            leftSection={
                                <Icon
                                    icon={ isLoggedIn
                                        ? "IconLogout"
                                        : "IconLogin" }
                                    size={ 16 }
                                    style={ { color: Colours.primary } }
                                />
                            }
                            style={ { color: Colours.primary } }
                        >
                            { isLoggedIn ? "Sign Out" : "Sign In" }
                        </Menu.Item>
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
        path: PropTypes.string,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        visibleTo: PropTypes.arrayOf(PropTypes.string),
        modal: PropTypes.shape({
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
                link: PropTypes.string.isRequired,
                icon: PropTypes.string
            })).isRequired
        })
    })).isRequired
};
