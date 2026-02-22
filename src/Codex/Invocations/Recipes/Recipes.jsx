import { ActionIcon, Affix, Image, ScrollArea, SimpleGrid, Skeleton, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';

import { addFavorite, getAllFavorites, removeFavorite } from '../../../IndexedDBHelper';
import { MainLayout } from '../../Grimoires/MainLayout/Mainlayout';
import Card from '../../Runes/Card/Card';
import CardSection from '../../Runes/CardSection/CardSection';
import Icon from '../../Runes/Icon/Icon';
import classes from '../../Runes/ScrollArea/ScrollArea.module.css';
import Text from '../../Runes/Text/Text';
import SimpleGridControl from '../../Sigils/SimpleGridControl/SimpleGridControl';

const cardConfig = {
    1: { cardTextHeight: "2rem", lineClamp: 3, cardBodySpacing: "md" },
    2: { cardTextHeight: "1.5rem", lineClamp: 3, cardBodySpacing: "sm" },
    3: { cardTextHeight: "1rem", lineClamp: 3, cardBodySpacing: "xs" }
};

const gridConfig = {
    1: { cols: 1, icon: 'IconColumns1Filled' },
    2: { cols: 2, icon: 'IconColumns2Filled' },
    3: { cols: 3, icon: 'IconColumns3Filled' }
};

export default function Recipes () {
    const [ opened, setOpened ] = useState(false);
    const [ favorites, setFavorites ] = useState(new Set());
    const [ activeCol, setActiveCol ] = useState(() => {
        const saved = localStorage.getItem('activeCol');
        return saved ? parseInt(saved, 10) : 3;
    });

    const [ cardTextHeight, setCardTextHeight ] = useState();
    const [ lineClamp, setLineClamp ] = useState();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        localStorage.setItem('activeCol', activeCol);
        const config = cardConfig[activeCol];
        if (config) {
            setCardTextHeight(config.cardTextHeight);
            setLineClamp(config.lineClamp);
        }
    }, [activeCol]);

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
                        cols={ activeCol }
                        spacing="xs"
                    >
                        { [...Array(50)].map((_, i) => {
                            const recipeId = i + 1;
                            const isBookmarked = favorites.has(recipeId);

                            return (
                                <Card
                                    key={ i }
                                    to={ `${ window.location.pathname }/${ recipeId }` }
                                    gap={ cardConfig[activeCol]?.cardBodySpacing }
                                    padding={ cardConfig[activeCol]?.cardBodySpacing }
                                    shadow="sm"
                                >
                                    <Stack gap={ cardConfig[activeCol]?.cardBodySpacing }>
                                        <CardSection style={ { position: 'relative' } }>
                                            { loading ? (
                                                <Skeleton
                                                    visible
                                                    radius={ 0 }
                                                    w="100%"
                                                    style={ { aspectRatio: "1 / 1" } }
                                                />
                                            ) : (
                                                <>
                                                    <ActionIcon
                                                        variant="filled"
                                                        color={ isBookmarked ? "#ff6b9d" : "grey" }
                                                        onClick={ e => handleBookmarkToggle(e, recipeId) }
                                                        style={ {
                                                            position: 'absolute',
                                                            top: 10,
                                                            left: 10,
                                                            zIndex: 10
                                                        } }
                                                        size="xl"
                                                        radius="xl"
                                                    >
                                                        <Icon
                                                            icon={ isBookmarked ? "IconBookmarkFilled" : "IconBookmark" }
                                                            style={ { width: '70%', height: '70%' } }
                                                            stroke={ 1.5 }
                                                        />
                                                    </ActionIcon>
                                                    <Image
                                                        src="/src/INF.png"
                                                        w="100%"
                                                        style={ { aspectRatio: "1 / 1" } }
                                                    />
                                                </>
                                            ) }
                                        </CardSection>

                                        { loading ? (
                                            <Stack gap="0.5rem" align="left">
                                                { Array.from({ length: lineClamp }).map((__, lineIndex) => (
                                                    <Skeleton
                                                        key={ lineIndex }
                                                        radius="xl"
                                                        h={ cardTextHeight }
                                                        w={ lineIndex === lineClamp - 1 ? '70%' : '100%' }
                                                    />
                                                )) }
                                            </Stack>
                                        ) : (
                                            <Text
                                                style={ { fontSize: cardTextHeight } }
                                                align="left"
                                                lineClamp={ lineClamp }
                                                lh={ 1.3 }
                                            >
                                                Slow-Roasted Garlic & Herb Chicken with Lemon Pan Jus and Crispy Potatoes
                                            </Text>
                                        ) }
                                    </Stack>
                                </Card>
                            );
                        }) }
                    </SimpleGrid>
                </ScrollArea>
            </Stack>
            <Affix position={ { bottom: '90px', right: '2vw' } }>
                <SimpleGridControl
                    opened={ opened }
                    setOpened={ setOpened }
                    activeCol={ activeCol }
                    setActiveCol={ setActiveCol }
                    activeColIcon={ gridConfig[activeCol]?.icon || '' }
                    gridConfig={ gridConfig }
                />
            </Affix>
        </MainLayout>
    );
}
