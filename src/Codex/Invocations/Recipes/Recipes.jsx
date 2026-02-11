import { Affix, Image, SimpleGrid, Skeleton, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';

import { MainLayout } from '../../Grimoires/MainLayout/Mainlayout';
import Card from '../../Runes/Card/Card';
import CardSection from '../../Runes/CardSection/CardSection';
import Text from '../../Runes/Text/Text';
import SimpleGridControl from '../../Sigils/SimpleGridControl/SimpleGridControl';

const cardConfig = {
    1: { cardTextHeight: "2rem", lineClamp: 3 },
    2: { cardTextHeight: "1.5rem", lineClamp: 3 },
    3: { cardTextHeight: "1rem", lineClamp: 3 }
};

const gridConfig = {
    1: { cols: 1, icon: 'IconColumns1Filled' },
    2: { cols: 2, icon: 'IconColumns2Filled' },
    3: { cols: 3, icon: 'IconColumns3Filled' }
};

export default function Recipes () {
    const [ opened, setOpened ] = useState(false);

    const [ activeCol, setActiveCol ] = useState(() => {
        const saved = localStorage.getItem('activeCol');
        return saved ? parseInt(saved, 10) : 3;
    });

    const [ cardTextHeight, setCardTextHeight ] = useState();
    const [ lineClamp, setLineClamp ] = useState();

    useEffect(() => {
        localStorage.setItem('activeCol', activeCol);

        const config = cardConfig[activeCol];
        if (config) {
            setCardTextHeight(config.cardTextHeight);
            setLineClamp(config.lineClamp);
        }
    }, [activeCol]);

    const [ loading, setLoading ] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1_000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <MainLayout>
            <SimpleGrid cols={ activeCol } spacing="xs" style={ { paddingBottom: "5rem" } }>
                { [...Array(50)].map((_, i) => (
                    <Card
                        key={ i }
                        to={ `${ window.location.pathname }/${ i + 1 }` }
                    >
                        <Stack gap="md">
                            <CardSection>
                                { loading ? (
                                    <Skeleton
                                        visible
                                        radius={ 0 }
                                        w="100%"
                                        style={ { aspectRatio: "1 / 1" } }
                                    />
                                ) : (
                                    <Image
                                        src="/src/INF.png"
                                        w="100%"
                                        style={ { aspectRatio: "1 / 1" } }
                                    />
                                ) }
                            </CardSection>

                            { loading ? (
                                <Stack gap="0.5rem" align="center">
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
                                    style={ { fontSize: cardConfig[activeCol]?.cardTextHeight } }
                                    align="center"
                                    lineClamp={ lineClamp }
                                    lh={ 1.3 }
                                >
                                    Slow-Roasted Garlic & Herb Chicken with Lemon Pan Jus and Crispy Potatoes
                                </Text>
                            ) }

                        </Stack>
                    </Card>
                )) }
            </SimpleGrid>

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
