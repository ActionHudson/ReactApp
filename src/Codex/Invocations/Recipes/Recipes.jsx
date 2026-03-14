import {
    LoadingOverlay,
    Stack
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import {
    addFavorite,
    getAllFavorites,
    removeFavorite
} from '../../../Helpers/IndexedDB';
import { Colours } from '../../ArcaneThreads/Colours';
import { notify } from '../../ArcaneThreads/Notify';
import { RecipeCard } from '../../Enchantments/RecipeCard/RecipeCard';
import ScrollArea from '../../Runes/ScrollArea/ScrollArea';
import SimpleGrid from '../../Runes/SimpleGrid/SimpleGrid';

export default function Recipes () {
    const [ favorites, setFavorites ] = useState(new Set());
    const [ items, setItems ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetch('/aether/manifest.php?table=recipes')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setItems(data);

                    if (data.length === 0) {
                        setLoading(false);
                        return;
                    }

                    const imagePromises = data.map(recipe => new Promise(resolve => {
                        const img = new window.Image();
                        img.src = `/data/recipeImages/${ recipe.image_filename }`;
                        img.onload = resolve;
                        img.onerror = resolve;
                    }));

                    Promise.all(imagePromises).then(() => {
                        setLoading(false);
                    });
                }
            })
            .catch(err => {
                notify.error('Error!', 'Failed to connect to database.');
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const initPage = async () => {
            const savedFavorites = await getAllFavorites();
            setFavorites(new Set(savedFavorites));
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
    const isLarge = useMediaQuery('(min-width: 1200px)');

    return (
        <Stack
            gap={ 0 }
            style={ {
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                height: '100%',
                position: 'relative',
                width: '100%'
            } }
        >
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
            <ScrollArea style={ { flex: 1, minHeight: 0 } }>
                <SimpleGrid
                    cols={ isSmall ? isLarge ? 6 : 3 : 1 }
                    spacing="xs"
                >
                    { items.map(recipe => {
                        const isBookmarked = favorites.has(recipe.id);

                        return (
                            <RecipeCard
                                key={ recipe.id }
                                recipeId={ recipe.id }
                                recipeTitle={ recipe.recipe_name }
                                recipeImage={
                                    `/data/recipeImages/${ recipe.image_filename }`
                                }
                                isBookmarked={ isBookmarked }
                                handleBookmarkToggle={ handleBookmarkToggle }
                            />
                        );
                    }) }
                </SimpleGrid>
            </ScrollArea>

        </Stack>
    );
}
