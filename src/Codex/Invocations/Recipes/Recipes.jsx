import { Affix, Avatar, Card, Center, Container, Image, Popover, SimpleGrid, Skeleton, Stack, UnstyledButton } from '@mantine/core';
import { IconColumns1Filled, IconColumns2Filled, IconColumns3Filled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { NavConfig } from '../../ArcaneThreads/NavConfig';
import { MainLayout } from '../../Grimoires/MainLayout/Mainlayout';
import Icon from '../../Runes/Icon/Icon';
import Text from '../../Runes/Text/Text';

// w:idth: 443px, Height: 828px
const cardConfig = {
    1: { cardHeight: "30rem", cardImageHeight: "20rem", cardTextHeight: "xl", lineClamp: 5 },
    2: { cardHeight: "18rem", cardImageHeight: "11rem", cardTextHeight: "lg", lineClamp: 4 },
    3: { cardHeight: "12rem", cardImageHeight: "7rem", cardTextHeight: "md", lineClamp: 3 }
};
export default function Recipes () {
    const location = useLocation();
    const [ opened, setOpened ] = useState(false);

    const navlinksWithActive = NavConfig.map(link => ({
        ...link,
        active: location.pathname === link.path
    }));

    const [ activeCol, setActiveCol ] = useState(() => {
        const saved = localStorage.getItem('activeCol');
        return saved ? parseInt(saved, 10) : 3;
    });
    const [ cardHeight, setCardHeight ] = useState();
    const [ cardImageHeight, setCardImageHeight ] = useState();
    const [ cardTextHeight, setCardTextHeight ] = useState();
    const [ lineClamp, setLineClamp ] = useState();

    useEffect(() => {
        localStorage.setItem('activeCol', activeCol);

        const config = cardConfig[activeCol];
        if (config) {
            setCardHeight(config.cardHeight);
            setCardImageHeight(config.cardImageHeight);
            setCardTextHeight(config.cardTextHeight);
            setLineClamp(config.lineClamp);
        }
    }, [activeCol]);

    return (
        <MainLayout navlinks={ navlinksWithActive }>
            <Container pt="md">
                <SimpleGrid cols={ activeCol } spacing="xs">
                    { [...Array(50)].map((_, i) => (
                        <>
                            <Card
                                key={ i }
                                shadow="sm"
                                padding="md"

                                // component="a"
                                // href="/"
                                // target="_blank"
                                radius="lg"
                                withBorder
                                style={ { height: cardHeight } }
                            >
                                <Card.Section>
                                    <Skeleton visible={ true } h={ cardImageHeight } radius={ 0 }>

                                    </Skeleton>
                                </Card.Section>

                                <Text size={ cardTextHeight } align="center" pt='xs' lineClamp={ lineClamp }>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget.
                                </Text>

                            </Card>
                        </>
                    )) }
                </SimpleGrid>
            </Container>

            <Affix position={ { bottom: '90px', right: '2vw' } }>
                <Popover
                    opened={ opened }
                    onChange={ setOpened }
                    position="top"
                    zIndex={ 10001 }
                    offset={ { mainAxis: 10, crossAxis: 0 } }
                >
                    <Popover.Target>
                        <UnstyledButton
                            onClick={ () => setOpened(o => !o) }
                        >
                            <Avatar color="#DF6D9C" radius="xl" size={ 55 }>
                                <Icon icon={ `IconColumns${ activeCol }Filled` } size="xxl" />
                            </Avatar>
                        </UnstyledButton>
                    </Popover.Target>

                    <Popover.Dropdown
                        style={ {
                            backgroundColor: 'transparent',
                            border: 'none',
                            boxShadow: 'none',
                            padding: 0
                        } }
                    >
                        <Stack spacing="xs">
                            <UnstyledButton
                                onClick={ () => {
                                    setOpened(o => !o);
                                    setActiveCol(3);
                                } }
                            >
                                <Avatar color="#E072A4" radius="xl" size={ 45 }>
                                    <IconColumns3Filled size={ 25 } />
                                </Avatar >
                            </UnstyledButton>
                            <UnstyledButton
                                onClick={ () => {
                                    setOpened(o => !o);
                                    setActiveCol(2);
                                } }
                            >
                                <Avatar color="#E072A4" radius="xl" size={ 45 }>
                                    <IconColumns2Filled size={ 25 } />
                                </Avatar >
                            </UnstyledButton>
                            <UnstyledButton
                                onClick={ () => {
                                    setOpened(o => !o);
                                    setActiveCol(1);
                                } }
                            >
                                <Avatar color="#E072A4" radius="xl" size={ 45 }>
                                    <IconColumns1Filled size={ 25 } />
                                </Avatar >
                            </UnstyledButton>

                        </Stack>
                    </Popover.Dropdown>
                </Popover>

            </Affix>
        </MainLayout>
    );
}
