import {
    Accordion, ActionIcon, Center, Code, Image,
    List, SimpleGrid, Skeleton, Space, Stack, Text, Title
} from '@mantine/core';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { MainLayout } from '../../Grimoires/MainLayout/Mainlayout';
import Icon from '../../Runes/Icon/Icon';
export default function RecipeDetail () {
    const [
        ingredientMultiplier,
        setIngredientMultiplier
    ] = useState({ multiplier: 1, icon: 'IconMultiplier1x' });

    const [ loading, setLoading ] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1_000);

        return () => clearTimeout(timer);
    }, []);

    const handleMultiplierClick = () => {
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

    function AccordionControl ({ children, ...props }) {
        return (
            <Center>
                <Accordion.Control { ...props }>
                    { children }
                </Accordion.Control>
                <ActionIcon
                    size="lg"
                    variant="subtle"
                    color="gray"
                    style={ { marginRight: '1rem' } }
                    onClick={ handleMultiplierClick }
                >
                    <Icon icon={ ingredientMultiplier.icon } size={ 20 } />
                </ActionIcon>
            </Center>
        );
    }
    AccordionControl.propTypes = {
        children: PropTypes.node.isRequired
    };

    return (
        <MainLayout>
            <Stack
                gap="md"
                style={ {
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '5rem'
                } }>
                <Title order={ 1 }>Recipe Title Would Go Here !</Title>
                <Accordion variant="separated" radius="md" multiple defaultValue={ ['overview'] } chevronPosition="left">
                    <Accordion.Item value="overview">
                        <Accordion.Control>
                            Overview
                        </Accordion.Control>
                        <Accordion.Panel>
                            <SimpleGrid cols={ 2 }>
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
                                        fallbackSrc="/INF.png"
                                    />
                                ) }
                                <Stack gap="xs">
                                    { loading ? (
                                        <>
                                            <Skeleton
                                                key={ 1 }
                                                radius="xl"
                                                h="1.5rem"
                                                w="100%"
                                            />
                                            <Skeleton
                                                key={ 2 }
                                                radius="xl"
                                                h="1.5rem"
                                                w="100%"
                                            />
                                            <Skeleton
                                                key={ 3 }
                                                radius="xl"
                                                h="1.5rem"
                                                w="100%"
                                            />
                                            <Skeleton
                                                key={ 4 }
                                                radius="xl"
                                                h="1.5rem"
                                                w="100%"
                                            />
                                            <Skeleton
                                                key={ 5 }
                                                radius="xl"
                                                h="1.5rem"
                                                w="100%"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Text>
                                                Rating:
                                                <Icon icon="IconStarFilled" />
                                                <Icon icon="IconStarFilled" />
                                                <Icon icon="IconStarFilled" />
                                                <Icon icon="IconStarFilled" />
                                                <Icon icon="IconStar" />
                                            </Text>
                                            <Text>Prep: 45m</Text>
                                            <Text>Cook: 180m</Text>
                                            <Text>Serves: 6</Text>
                                            <Text>Meal Type: Dinner</Text>
                                        </>
                                    ) }
                                </Stack>
                            </SimpleGrid>
                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="nutrition">
                        <Accordion.Control disabled={ loading }>
                            Nutrition
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Text size="sm" c="dimmed">/Per Serving</Text>
                            <Space h="md" />
                            <SimpleGrid cols={ { base: 4, xs: 5, sm: 8 } } >
                                <Code>
                                    200
                                    <br />
                                    Kcal
                                </Code>
                                <Code>
                                    20g
                                    <br />
                                    Fat
                                </Code>
                                <Code>
                                    6g
                                    <br />
                                    Sat-Fat
                                </Code>
                                <Code>
                                    40g
                                    <br />
                                    Carbs
                                </Code>
                                <Code>
                                    8g
                                    <br />
                                    Sugars
                                </Code>
                                <Code>
                                    4g
                                    <br />
                                    Fibre
                                </Code>
                                <Code>
                                    13g
                                    <br />
                                    Protein
                                </Code>
                                <Code>
                                    1.4g
                                    <br />
                                    Salt
                                </Code>
                            </SimpleGrid>
                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="ingredients">
                        <AccordionControl disabled={ loading }>
                            Ingredients
                        </AccordionControl>
                        <Accordion.Panel>
                            <List>
                                <List.Item>300ml red wine</List.Item>
                                <List.Item>½ onion, finely chopped</List.Item>
                                <List.Item>1 carrot, peeled and finely diced</List.Item>
                                <List.Item>1 celery stick, trimmed and finely diced</List.Item>
                                <List.Item>4 garlic cloves, chopped</List.Item>
                                <List.Item>a few sprigs of thyme</List.Item>
                                <List.Item>2 bay leaves</List.Item>
                                <List.Item>1 clove</List.Item>
                                <List.Item>1 tbsp plain flour</List.Item>
                                <List.Item>4 bone-in, skinless chicken thighs</List.Item>
                                <List.Item>4 skinless chicken drumsticks</List.Item>
                                <List.Item>1 tbsp olive oil</List.Item>
                                <List.Item>4 rashers of back bacon, diced</List.Item>
                                <List.Item>400g button onions or shallots, peeled</List.Item>
                                <List.Item>250g button mushrooms, wiped clean</List.Item>
                                <List.Item>500ml chicken stock</List.Item>
                                <List.Item>1 tbsp redcurrant jelly</List.Item>
                                <List.Item>finely chopped parsley, to serve</List.Item>
                                <List.Item>flaked sea salt</List.Item>
                                <List.Item>freshly ground black pepper</List.Item>
                            </List>

                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="instructions">
                        <Accordion.Control disabled={ loading }>
                            Instructions
                        </Accordion.Control>
                        <Accordion.Panel>
                            <h2>Step 1</h2>
                            <p>Pour the wine into a saucepan and add the onion, carrot, celery, garlic, herbs, and clove. Bring to the boil and boil fiercely for about 5 minutes to reduce the liquid a little and concentrate the flavors. Remove the pan from the heat and leave to cool.</p>

                            <h2>Step 2</h2>
                            <p>Put the chicken in a dish and once the liquid is cool, pour it over the chicken and leave to marinate for at least a few hours, or overnight if possible.</p>

                            <h2>Step 3</h2>
                            <p>Spread the flour on a plate and season it with salt and pepper. Remove the chicken pieces from the red wine marinade and pat them dry with kitchen paper. Set the marinade aside for later. Dust the chicken pieces in flour and set aside.</p>

                            <h2>Step 4</h2>
                            <p>Heat the oil in a large casserole dish. Add the bacon and brown it quickly, then transfer it to a plate with a slotted spoon and add the button onions, or shallots, and the mushrooms to the pan. Fry over a high heat for a minute, then turn the heat down and cook for about 10 minutes, stirring regularly, until the onions are nicely golden. Remove the onions and mushrooms from the dish, leaving behind as much oil as you can for browning the chicken.</p>

                            <h2>Step 5</h2>
                            <p>Add the chicken pieces and brown them on each side. Put the bacon, onions, and mushrooms back in the casserole dish, then strain the marinade through a sieve and pour this into the dish. Add the stock and redcurrant jelly. Bring everything to the boil, then turn the heat down to the lowest of simmers and cook, uncovered, for about an hour.</p>

                            <h2>Step 6</h2>
                            <p>After an hour, everything should be tender and the sauce should be reduced. If you want a slightly thicker sauce, remove the chicken, bacon, and vegetables with a slotted spoon and put them on a warm serving dish. Bring the remaining liquid back to the boil and cook for a few minutes until it has reduced further, then pour it over the chicken. Check the seasoning and sprinkle with parsley before serving.</p>

                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </Stack>
        </MainLayout>
    );
}
