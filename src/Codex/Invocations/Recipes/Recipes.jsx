import { ActionIcon, Affix, Box, Divider, Flex, Image, ScrollArea, SimpleGrid, Skeleton, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import { addFavorite, getAllFavorites, removeFavorite } from '../../../IndexedDBHelper';
import { MainLayout } from '../../Grimoires/MainLayout/Mainlayout';
import Bclasses from '../../Runes/Button/Button.module.css';
import Card from '../../Runes/Card/Card';
import CardSection from '../../Runes/CardSection/CardSection';
import Icon from '../../Runes/Icon/Icon';
import classes from '../../Runes/ScrollArea/ScrollArea.module.css';
import Text from '../../Runes/Text/Text';
import SimpleGridControl from '../../Sigils/SimpleGridControl/SimpleGridControl';

// const cardConfig = {
//     1: { cardTextHeight: "2rem", lineClamp: 3, cardBodySpacing: "md" },
//     2: { cardTextHeight: "1.5rem", lineClamp: 3, cardBodySpacing: "sm" },
//     3: { cardTextHeight: "1rem", lineClamp: 3, cardBodySpacing: "xs" }
// };

export default function Recipes () {
    const [ favorites, setFavorites ] = useState(new Set());

    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const initPage = async () => {
            const savedFavorites = await getAllFavorites();
            setFavorites(new Set(savedFavorites));

            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };
        initPage();
    }, []);

    const handleBookmarkToggle = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        const newFavorites = new Set(favorites);
        if (newFavorites.has(id)) {
            newFavorites.delete(id);
            await removeFavorite(id);
        } else {
            newFavorites.add(id);
            await addFavorite(id);
        }
        setFavorites(newFavorites);
    };
    const isSmall = useMediaQuery('(min-width: 768px)');
    const isMedium = useMediaQuery('(min-width: 992px)');
    const isLarge = useMediaQuery('(min-width: 1200px)');
    return (
        <MainLayout>
            <Stack
                style={ {
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                } }
            >
                <ScrollArea style={ { flex: 1 } } scrollbarSize={ 6 } classNames={ classes }>
                    <SimpleGrid
                        cols={ isSmall ? isLarge ? 6 : 3 : 1 }
                        spacing="xs"
                    >
                        { [...Array(50)].map((_, i) => {
                            const recipeId = i + 1;

                            const isBookmarked = favorites.has(recipeId);

                            return (
                                <Card
                                    key={ i }
                                    component="a"
                                    href={ `${ window.location.pathname }/${ recipeId }` }
                                    shadow="sm"

                                >
                                    <Flex
                                        direction={ { base: 'row', sm: 'column' } }
                                        m="-md"
                                    >
                                        <Skeleton
                                            visible={ loading }
                                            w={ { base: '30%', sm: '100%' } }
                                            h="100%"
                                            radius={ 0 }
                                        >
                                            <Box
                                                w="100%"
                                                h="100%"
                                                pos="relative"
                                            >
                                                <ActionIcon
                                                    variant={ isBookmarked ? 'filled' : 'outline' }
                                                    size="lg"
                                                    color="#FF6B9D"
                                                    onClick={ e => { handleBookmarkToggle(e, recipeId); } }
                                                    pos="absolute"
                                                    radius="xl"
                                                    top={ 10 }
                                                    left={ 10 }
                                                    style={ { zIndex: 1 } }
                                                >
                                                    <Icon
                                                        icon={ isBookmarked ? "IconBookmarkFilled" : "IconBookmark" }
                                                        size={ 2 }
                                                    />
                                                </ActionIcon>

                                                <Image
                                                    src="/INF.png"
                                                    h="100%"
                                                    w="100%"
                                                    fit="cover"
                                                    fallbackSrc="/INF.png"
                                                />
                                            </Box>
                                        </Skeleton>
                                        <Box
                                            style={ {
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                padding: '1rem'
                                            } }
                                        >
                                            { loading ? (
                                                <Box mb="sm">
                                                    <Skeleton h={ 15 } w="100%" radius="sm" />
                                                    <Skeleton h={ 15 } mt={ 4 } w="100%" radius="sm" />
                                                    <Skeleton h={ 15 } mt={ 4 } w="80%" radius="sm" />
                                                </Box>
                                            ) : (
                                                <Text fw={ 800 } size="md" lineClamp={ 3 }>
                                                    Slow-Roasted Garlic & Herb Chicken with Lemon Pan Jus and Crispy Potatoes
                                                </Text>
                                            ) }
                                        </Box>
                                    </Flex>
                                </Card>
                            );
                        }) }
                    </SimpleGrid>
                </ScrollArea>
            </Stack>

        </MainLayout>
    );
}
