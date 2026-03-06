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
                    { [...Array(50)].map((_, i) => {
                        const recipeId = i + 1;
                        const isBookmarked = favorites.has(recipeId);
                        const recipeTitle = `Cast-Iron Blackened Ribeye Steak with a Smoked Gouda Potato Gratin and Charred Asparagus Spears`;

                        return (
                            <RecipeCard
                                key={ recipeId }
                                recipeId={ recipeId }
                                recipeTitle={ recipeTitle }
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
