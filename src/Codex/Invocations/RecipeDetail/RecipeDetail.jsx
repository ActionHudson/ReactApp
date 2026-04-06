import {
    Accordion, Group, Image,
    LoadingOverlay, Rating, SimpleGrid, Space,
    Stack, Text, Title
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
    addFavorite,
    getFavoriteById,
    removeFavorite
} from '../../../Helpers/IndexedDB';
import { Colours } from '../../ArcaneThreads/Colours';
import { notify } from '../../ArcaneThreads/Notify';
import { Border, Spacing } from '../../ArcaneThreads/Sizes';
import { MultiplierAccordionControl }
    from '../../Enchantments/MultiplierAccordionControl/MultiplierAccordionControl';
import Icon from '../../Runes/Icon/Icon';
import { NumberedStep } from '../../Runes/NumberedStep/NumberedStep';
import { RecipeIngredientList }
    from '../../Runes/RecipeIngredientList/RecipeIngredientList';
import { RecipeStatBox } from '../../Runes/RecipeStatBox/RecipeStatBox';
import ScrollArea from '../../Runes/ScrollArea/ScrollArea';
import ActionIcon from '../../Sigils/ActionIcon/ActionIcon';

export default function RecipeDetail () {
    const { id } = useParams();

    const [ loading, setLoading ] = useState(true);
    const [ item, setItem ] = useState(null);
    const [ isBookmarked, setIsBookmarked ] = useState(false);

    const [
        ingredientMultiplier,
        setIngredientMultiplier
    ] = useState({ multiplier: 1, icon: 'IconMultiplier1x' });

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);

            try {
                const [ favStatus, recipeRes ] = await Promise.all([
                    getFavoriteById(id).catch(() => false),
                    fetch(`/aether/scry.php?table=recipes&id=${ id }`)
                ]);

                if (!recipeRes.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await recipeRes.json();

                if (isMounted) {
                    if (favStatus) {
                        setIsBookmarked(true);
                    }

                    if (data && !data.error) {
                        [ 'ingredients', 'method', 'notes' ].forEach(field => {
                            if (typeof data[field] === 'string') {
                                try {
                                    data[field] = JSON.parse(data[field]);
                                } catch {
                                    data[field] = [];
                                }
                            }
                        });

                        setItem(data);

                        if (!data.image_filename) {
                            setLoading(false);
                            return;
                        }

                        const img = new window.Image();
                        img.src = `/data/recipeImages/${ data.image_filename }`;
                        img.onload = () => {
                            if (isMounted) {
                                setLoading(false);
                            }
                        };
                        img.onerror = () => {
                            if (isMounted) {
                                setLoading(false);
                            }
                        };

                    } else {
                        setLoading(false);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    notify.error('Error!', 'Failed to load recipe data.');
                    console.error("Fetch error:", err);
                    setLoading(false);
                }
            }
        };

        if (id) {
            fetchData();
        }

        return () => {
            isMounted = false;
        };
    }, [id]);

    const handleMultiplierClick = e => {
        if (e) {
            e.stopPropagation();
        }
        setIngredientMultiplier(prev => {
            const sequence = [
                { match: 1, m: 1.5, i: 'IconMultiplier15x' },
                { match: 1.5, m: 2, i: 'IconMultiplier2x' },
                { match: 2, m: 0.5, i: 'IconMultiplier05x' },
                { match: 0.5, m: 1, i: 'IconMultiplier1x' }
            ];
            const next = sequence.find(
                s => s.match === prev.multiplier
            ) || sequence[3];
            return { multiplier: next.m, icon: next.i };
        });
    };

    const handleBookmarkToggle = async e => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        try {
            if (isBookmarked) {
                await removeFavorite(id);
                setIsBookmarked(false);
            } else {
                await addFavorite(id);
                setIsBookmarked(true);
            }
        } catch (err) {
            notify.error('Error', 'Failed to update favorites.');
            console.error(err);
        }
    };

    return (
        <>
            <LoadingOverlay
                visible={ loading }
                zIndex={ 1000 }
                overlayProps={ { radius: "sm", blur: 1 } }
                loaderProps={
                    { size: 200, color: Colours.accent.primary, type: 'oval' }
                }
                style={
                    { flex: 1, display: 'flex',
                        flexDirection: 'column', minHeight: 0 }
                }
            />
            <ScrollArea
                style={
                    {
                        flex: 1,
                        minHeight: 0,
                        maxWidth: "800px",
                        width: "100%",
                        margin: "0 auto"
                    }
                } >
                { item && (
                    <Accordion
                        variant="separated"
                        radius="md"
                        multiple
                        defaultValue={ ['overview'] }
                        chevronPosition="right"
                    >
                        <Accordion.Item value="overview">
                            <Accordion.Control>
                                <Title style={ { margin: "10px" } } order={ 3 }>
                                    { item.recipe_name }
                                </Title>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Stack gap="lg">
                                    <Group justify="space-between">
                                        <Rating
                                            size="sm"
                                            color={ Colours.accent.primary }
                                            defaultValue={ item.rating }
                                            readOnly
                                        />
                                        <ActionIcon
                                            variant="filled"
                                            id={ id }
                                            onClick={ handleBookmarkToggle }
                                            radius="xl"
                                            style={ { zIndex: 1 } }
                                            icon={
                                                isBookmarked
                                                    ? "IconBookmarkFilled"
                                                    : "IconBookmark"
                                            }
                                        />
                                    </Group>
                                    <SimpleGrid
                                        cols={ 4 }
                                        style={ {
                                            backgroundColor: "#F4F4F4",
                                            borderRadius: Border.radius.md,
                                            padding: Spacing.md
                                        } }
                                    >
                                        <div>
                                            <Text
                                                size="xs"
                                                tt="uppercase"
                                                ta="center"
                                                fw={ 600 }
                                            >
                                                Prep
                                            </Text>
                                            <Text fw={ 500 } ta="center">
                                                { item.prep_time }
                                                m
                                            </Text>
                                        </div>

                                        <div>
                                            <Text
                                                size="xs"
                                                tt="uppercase"
                                                ta="center"
                                                fw={ 600 }
                                            >
                                                Cook
                                            </Text>
                                            <Text fw={ 500 } ta="center">
                                                { item.cook_time }
                                                m
                                            </Text>
                                        </div>

                                        <div>
                                            <Text
                                                size="xs"
                                                tt="uppercase"
                                                ta="center"
                                                fw={ 600 }
                                            >
                                                Serves
                                            </Text>
                                            <Text fw={ 500 } ta="center">
                                                { item.serves === 0
                                                    ? item.serves
                                                    : <Icon
                                                        icon="IconInfinityOff"
                                                        size="lg"
                                                    /> }
                                            </Text>
                                        </div>

                                        <div>
                                            <Text
                                                size="xs"
                                                tt="uppercase"
                                                ta="center"
                                                fw={ 600 }
                                            >
                                                Type
                                            </Text>
                                            <Text
                                                fw={ 500 }
                                                tt="capitalize"
                                                ta="center"
                                            >
                                                { item.recipe_type }
                                            </Text>
                                        </div>
                                    </SimpleGrid>
                                    <div
                                        style={
                                            {
                                                width: '100%',
                                                aspectRatio: '16/9',
                                                overflow: 'hidden',
                                                borderRadius: Border.radius.md
                                            }
                                        }
                                    >
                                        <Image
                                            src={ `/data/recipeImages/${ item.image_filename }` }
                                            w="100%"
                                            h="100%"
                                            fit="cover"
                                            fallbackSrc="/INF.png"
                                        />
                                    </div>
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="nutrition">
                            <Accordion.Control
                                icon={
                                    <Icon
                                        stroke={ 2 }
                                        size="lg"
                                        icon="IconChartHistogram"
                                        color={ Colours.accent.primary }
                                    />
                                }
                            >
                                <Title
                                    style={
                                        {
                                            margin: "10px"
                                        }
                                    }
                                    order={ 3 }
                                >
                                    Nutrition
                                </Title>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Text size="sm" c="dimmed">/Per Serving</Text>
                                <Space h="md" />
                                <SimpleGrid cols={ { base: 4, xs: 4, sm: 8 } }>
                                    <RecipeStatBox
                                        label="Kcal"
                                        value={ item.kcal }
                                    />
                                    <RecipeStatBox
                                        label="Fat"
                                        value={ item.fat }
                                    />
                                    <RecipeStatBox
                                        label="Sat-Fat"
                                        value={ item.saturates }
                                    />
                                    <RecipeStatBox
                                        label="Carbs"
                                        value={ item.carbs }
                                    />
                                    <RecipeStatBox
                                        label="Sugars"
                                        value={ item.sugars }
                                    />
                                    <RecipeStatBox
                                        label="Fibre"
                                        value={ item.fibre }
                                    />
                                    <RecipeStatBox
                                        label="Protein"
                                        value={ item.protein }
                                    />
                                    <RecipeStatBox
                                        label="Salt"
                                        value={ item.salt }
                                    />
                                </SimpleGrid>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="ingredients">
                            <MultiplierAccordionControl
                                icon={
                                    <Icon
                                        stroke={ 2 }
                                        size="lg"
                                        icon="IconBasket"
                                        color={ Colours.accent.primary }
                                    />
                                }
                                multiplierIcon={ ingredientMultiplier.icon }
                                onMultiplierClick={ handleMultiplierClick }
                            >
                                <Title
                                    style={
                                        { margin: "10px" }
                                    }
                                    order={ 3 }
                                >
                                    Ingredients
                                </Title>
                            </MultiplierAccordionControl>
                            <Accordion.Panel>
                                <RecipeIngredientList
                                    ingredients={ item.ingredients }
                                    multiplier={
                                        ingredientMultiplier.multiplier
                                    }
                                />
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="instructions">
                            <Accordion.Control
                                icon={
                                    <Icon
                                        stroke={ 2 }
                                        size="lg"
                                        icon="IconCooker"
                                        color={ Colours.accent.primary }
                                    />
                                }
                            >
                                <Title
                                    style={
                                        {
                                            margin: "10px"
                                        }
                                    }
                                    order={ 3 }
                                >
                                    Instructions
                                </Title>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Stack gap="lg">
                                    { item.method && Array.isArray(
                                        item.method
                                    ) && item.method.map(
                                        (step, index) => (
                                            <NumberedStep
                                                key={ index }
                                                step={ step }
                                                index={ index }
                                            />
                                        )
                                    ) }
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>

                        { item?.notes?.length > 0 && (
                            <Accordion.Item value="notes">
                                <Accordion.Control
                                    icon={
                                        <Icon
                                            stroke={ 2 }
                                            size="lg"
                                            icon="IconNotes"
                                            color={ Colours.accent.primary }
                                        />
                                    }
                                >
                                    <Title
                                        style={
                                            {
                                                margin: "10px"
                                            }
                                        }
                                        order={ 3 }
                                    >
                                        Notes
                                    </Title>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <Stack gap="lg">
                                        { item.notes.map((note, index) => (
                                            <NumberedStep
                                                key={ index }
                                                step={ note }
                                                index={ index }
                                            />
                                        )) }
                                    </Stack>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ) }
                    </Accordion>
                ) }
            </ScrollArea>
        </>
    );
}
