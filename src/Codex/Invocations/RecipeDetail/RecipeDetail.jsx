import {
    Accordion, ActionIcon, Checkbox, Group, Image,
    LoadingOverlay, Rating, SimpleGrid, Space,
    Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Colours } from '../../ArcaneThreads/Colours';
import { notify } from '../../ArcaneThreads/Notify';
import { Border, Spacing } from '../../ArcaneThreads/Sizes';
import Icon from '../../Runes/Icon/Icon';
import ScrollArea from '../../Runes/ScrollArea/ScrollArea';

function MultiplierAccordionControl (
    { children, multiplierIcon, onMultiplierClick, ...props }
) {
    return (
        <Accordion.Control { ...props }>
            <div
                style={
                    {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                    }
                }>
                <span>
                    { children }
                </span>
                <ActionIcon
                    component="div"
                    size="lg"
                    variant="subtle"
                    color="gray"
                    onClick={ onMultiplierClick }
                >
                    <Icon icon={ multiplierIcon } size={ 20 } />
                </ActionIcon>
            </div>
        </Accordion.Control>
    );
}

MultiplierAccordionControl.propTypes = {
    children: PropTypes.node.isRequired,
    multiplierIcon: PropTypes.string.isRequired,
    onMultiplierClick: PropTypes.func.isRequired
};

export default function RecipeDetail () {

    const { id } = useParams();

    const [ loading, setLoading ] = useState(true);
    const [ item, setItem ] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchRecipe = async () => {
            setLoading(true);

            try {
                const res = await fetch(`/aether/scry.php?table=recipes&id=${ id }`);

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await res.json();

                if (isMounted) {
                    if (data && !data.error) {

                        if (typeof data.ingredients === 'string') {
                            try {
                                data.ingredients = JSON.parse(data.ingredients);
                            } catch {
                                data.ingredients = [];
                            }
                        }

                        if (typeof data.method === 'string') {
                            try {
                                data.method = JSON.parse(data.method);
                            } catch {
                                data.method = [];
                            }
                        }

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
                    notify.error('Error!', 'Failed to connect to database.');
                    console.error("Fetch error:", err);
                    setLoading(false);
                }
            }
        };

        fetchRecipe();

        return () => {
            isMounted = false;
        };
    }, [id]);

    console.log(item);

    const [
        ingredientMultiplier,
        setIngredientMultiplier
    ] = useState({ multiplier: 1, icon: 'IconMultiplier1x' });

    const handleMultiplierClick = e => {
        if (e) {
            e.stopPropagation();
        }
        setIngredientMultiplier(prev => {
            let newMultiplier = 1;
            let newIcon = 'IconMultiplier1x';
            switch (prev.multiplier) {
                case 1:
                    newMultiplier = 1.5;
                    newIcon = 'IconMultiplier15x';
                    break;
                case 1.5:
                    newMultiplier = 2;
                    newIcon = 'IconMultiplier2x';
                    break;
                case 2:
                    newMultiplier = 0.5;
                    newIcon = 'IconMultiplier05x';
                    break;
                default:
                    newMultiplier = 1;
                    newIcon = 'IconMultiplier1x';
            }
            return { multiplier: newMultiplier, icon: newIcon };
        });
    };

    return (
        <>
            <LoadingOverlay
                visible={ loading }
                zIndex={ 1000 }
                overlayProps={ {
                    radius: "sm",
                    blur: 1
                } }
                loaderProps={ {
                    size: 200,
                    color: Colours.accent.primary,
                    type: 'oval'
                } }
                style={ {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0
                } }
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
                                    <Rating
                                        size="sm"
                                        color={ Colours.accent.primary }
                                        defaultValue={ item.rating }
                                        readOnly
                                    />

                                    <SimpleGrid
                                        cols={ 4 }
                                        style={ {
                                            backgroundColor: "#f4f4f4",
                                            borderRadius: Border.radius.md,
                                            padding: Spacing.md
                                        } }
                                    >
                                        <div>
                                            <Text size="xs" tt="uppercase" ta="center" fw={ 600 }>
                                                Prep
                                            </Text>
                                            <Text fw={ 500 } ta="center">
                                                { item.prep_time }
                                                m
                                            </Text>
                                        </div>

                                        <div>
                                            <Text size="xs" tt="uppercase" ta="center" fw={ 600 }>
                                                Cook
                                            </Text>
                                            <Text fw={ 500 } ta="center">
                                                { item.cook_time }
                                                m
                                            </Text>
                                        </div>

                                        <div>
                                            <Text size="xs" tt="uppercase" ta="center" fw={ 600 }>
                                                Serves
                                            </Text>
                                            <Text fw={ 500 } ta="center">
                                                { item.serves === 0
                                                    ? item.serves
                                                    : <Icon icon="IconInfinityOff" size="lg" /> }
                                            </Text>
                                        </div>

                                        <div>
                                            <Text size="xs" tt="uppercase" ta="center" fw={ 600 }>
                                                Type
                                            </Text>
                                            <Text fw={ 500 } tt="capitalize" ta="center">
                                                { item.recipe_type }
                                            </Text>
                                        </div>
                                    </SimpleGrid>
                                    <Image
                                        src={ `/data/recipeImages/${
                                            item.image_filename
                                        }` }
                                        w="100%"
                                        fallbackSrc="/INF.png"
                                    />
                                </Stack>

                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="nutrition">
                            <Accordion.Control icon={ <Icon stroke={ 2 } size="lg" icon="IconDeviceDesktopAnalytics" color={ Colours.accent.primary } /> }>
                                <Title style={ { margin: "10px" } } order={ 3 }>
                                    Nutrition
                                </Title>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Text size="sm" c="dimmed">/Per Serving</Text>
                                <Space h="md" />
                                <SimpleGrid cols={ { base: 4, xs: 5, sm: 8 } }>
                                    <div style={ { backgroundColor: "#f4f4f4", borderRadius: Border.radius.md, padding: Spacing.md } }>
                                        <Text size="xs" ta="center" fw={ 600 }>Kcal</Text>
                                        <Text fw={ 500 } ta="center">
                                            { item.kcal }
                                        </Text>
                                    </div>

                                    <div style={ { backgroundColor: "#f4f4f4", borderRadius: Border.radius.md, padding: Spacing.md } }>
                                        <Text size="xs" ta="center" fw={ 600 }>Fat</Text>
                                        <Text fw={ 500 } ta="center">
                                            { item.fat }
                                        </Text>
                                    </div>

                                    <div style={ { backgroundColor: "#f4f4f4", borderRadius: Border.radius.md, padding: Spacing.md } }>
                                        <Text size="xs" ta="center" fw={ 600 }>Sat-Fat</Text>
                                        <Text fw={ 500 } ta="center">
                                            { item.saturates }
                                        </Text>
                                    </div>

                                    <div style={ { backgroundColor: "#f4f4f4", borderRadius: Border.radius.md, padding: Spacing.md } }>
                                        <Text size="xs" ta="center" fw={ 600 }>Carbs</Text>
                                        <Text fw={ 500 } ta="center">
                                            { item.carbs }
                                        </Text>
                                    </div>

                                    <div style={ { backgroundColor: "#f4f4f4", borderRadius: Border.radius.md, padding: Spacing.md } }>
                                        <Text size="xs" ta="center" fw={ 600 }>Sugars</Text>
                                        <Text fw={ 500 } ta="center">
                                            { item.sugars }
                                        </Text>
                                    </div>

                                    <div style={ { backgroundColor: "#f4f4f4", borderRadius: Border.radius.md, padding: Spacing.md } }>
                                        <Text size="xs" ta="center" fw={ 600 }>Fibre</Text>
                                        <Text fw={ 500 } ta="center">
                                            { item.fibre }
                                        </Text>
                                    </div>

                                    <div style={ { backgroundColor: "#f4f4f4", borderRadius: Border.radius.md, padding: Spacing.md } }>
                                        <Text size="xs" ta="center" fw={ 600 }>Protein</Text>
                                        <Text fw={ 500 } ta="center">
                                            { item.protein }
                                        </Text>
                                    </div>

                                    <div style={ { backgroundColor: "#f4f4f4", borderRadius: Border.radius.md, padding: Spacing.md } }>
                                        <Text size="xs" ta="center" fw={ 600 }>Salt</Text>
                                        <Text fw={ 500 } ta="center">
                                            { item.salt }
                                        </Text>
                                    </div>
                                </SimpleGrid>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="ingredients">
                            <MultiplierAccordionControl
                                icon={ <Icon stroke={ 2 } size="lg" icon="IconShoppingCart" color={ Colours.accent.primary } /> }
                                multiplierIcon={ ingredientMultiplier.icon }
                                onMultiplierClick={ handleMultiplierClick }
                            >
                                <Title style={ { margin: "10px" } } order={ 3 }>
                                    Ingredients
                                </Title>
                            </MultiplierAccordionControl>
                            <Accordion.Panel>
                                <Stack gap="sm">
                                    { item.ingredients && Array.isArray(item.ingredients) && item.ingredients.map((ing, index) => {
                                        const calculatedAmount = ing.amount
                                            ? parseFloat((ing.amount * ingredientMultiplier.multiplier).toFixed(2))
                                            : '';

                                        return (
                                            <Checkbox
                                                key={ index }
                                                color={ Colours.accent.primary }
                                                styles={ {
                                                    input: { borderColor: Colours.accent.primary },
                                                    body: { alignItems: 'center' }
                                                } }
                                                label={
                                                    <Text fw={ 500 }>
                                                        { calculatedAmount }
                                                        { ' ' }
                                                        { ing.unit }
                                                        { ' ' }
                                                        { ing.item }
                                                        { ing.prep && (
                                                            <Text component="span" c="dimmed">
                                                                ,
                                                                { ' ' }
                                                                { ing.prep }
                                                            </Text>
                                                        ) }
                                                    </Text>
                                                }
                                            />
                                        );
                                    }) }
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="instructions">
                            <Accordion.Control icon={ <Icon stroke={ 2 } size="lg" icon="IconCooker" color={ Colours.accent.primary } /> }>
                                <Title style={ { margin: "10px" } } order={ 3 }>
                                    Instructions
                                </Title>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Stack gap="lg">
                                    { item.method && Array.isArray(item.method) && item.method.map((step, index) => (
                                        <Group key={ index } wrap="nowrap" align="flex-start" gap="md">
                                            <div
                                                style={ {
                                                    backgroundColor: Colours.accent.primary,
                                                    color: 'white',
                                                    borderRadius: Border.radius.md,
                                                    minWidth: '32px',
                                                    height: '32px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 600,
                                                    fontSize: '0.875rem',
                                                    flexShrink: 0
                                                } }
                                            >
                                                { index + 1 }
                                            </div>
                                            <Text>
                                                { step }
                                            </Text>
                                        </Group>
                                    )) }
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                ) }

            </ScrollArea>
        </>
    );
}
