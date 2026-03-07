import {
    Stack
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import {
    addFavorite,
    getAllFavorites,
    removeFavorite
} from '../../../Helpers/IndexedDB';
import { RecipeCard } from '../../Enchantments/RecipeCard/RecipeCard';
import ScrollArea from '../../Runes/ScrollArea/ScrollArea';
import SimpleGrid from '../../Runes/SimpleGrid/SimpleGrid';

export default function Recipes () {
    const [ favorites, setFavorites ] = useState(new Set());

    const [ items, setItems ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    // useEffect(() => {
    //     fetch('/api/fetchAll.php?table=recipes')
    //         .then(res => res.json())
    //         .then(data => {
    //             if (Array.isArray(data)) {
    //                 setItems(data);

    //                 if (data.length === 0) {
    //                     setLoading(false);
    //                     return;
    //                 }

    //                 const imagePromises = data.map(recipe => new Promise(resolve => {
    //                     const img = new window.Image();
    //                     img.src = `/data/recipeImages/${ recipe.image_filename }`;
    //                     img.onload = resolve;
    //                     img.onerror = resolve;
    //                 }));

    //                 Promise.all(imagePromises).then(() => {
    //                     setLoading(false);
    //                 });
    //             }
    //         })
    //         .catch(err => {
    //             console.error("Fetch error:", err);
    //             setLoading(false);
    //         });
    // }, []);

    // useEffect(() => {
    //     const initPage = async () => {
    //         const savedFavorites = await getAllFavorites();
    //         setFavorites(new Set(savedFavorites));

    //         setTimeout(() => {
    //             setLoading(false);
    //         }, 1000);
    //     };
    //     initPage();
    // }, []);

    useEffect(() => {
        const initPage = async () => {
            setLoading(true);
            const preloadImages = data => {
                const promises = data.map(recipe => new Promise(resolve => {
                    const img = new window.Image();
                    img.src = `/data/recipeImages/${ recipe.image_filename }`;
                    img.onload = resolve;
                    img.onerror = resolve;
                }));
                return Promise.all(promises);
            };
            try {

                const savedFavorites = await getAllFavorites();
                setFavorites(new Set(savedFavorites));

                const res = await fetch('/api/fetchAll.php?table=recipes');

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await res.json();

                if (Array.isArray(data)) {
                    setItems(data);
                    await preloadImages(data);
                }
            } catch (err) {

                console.warn("Fetch failed, entering local dev fallback mode:", err);

                const dummyData = [...Array(50)].map((_, i) => ({
                    id: i + 999,
                    recipe_name: `Local Dev Recipe #${ i + 1 }`,
                    image_filename: 'missing.jpg'
                }));

                setItems(dummyData);
            } finally {
                setLoading(false);
            }
        };

        initPage();
    }, []);

    //
    //
    // Ditch above as its for dev move no db testing
    //
    //

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
            style={ {
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            } }
        >
            <ScrollArea>
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
                                recipeImage={ `/data/recipeImages/${ recipe.image_filename }` }
                                isBookmarked={ isBookmarked }
                                loading={ loading }
                                handleBookmarkToggle={ handleBookmarkToggle }
                            />
                        );
                    }) }
                </SimpleGrid>
            </ScrollArea>
        </Stack>
    );
}
