import { AspectRatio, Box, Flex, Image, Skeleton } from '@mantine/core';
import PropTypes from 'prop-types';

import Card from '../../Runes/Card/Card';
import Text from '../../Runes/Text/Text';
import ActionIcon from '../../Sigils/ActionIcon/ActionIcon';

export function RecipeCard ({
    recipeId,
    recipeTitle,
    isBookmarked,
    loading = false,
    handleBookmarkToggle = undefined,
    recipeImage = "/INF.png"
}) {
    const boxContainerStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '1rem'
    };

    return (
        <Card
            component="a"
            href={ `${ window.location.pathname }/${ recipeId }` }
            shadow="sm"
            padding={ 0 }
            style={ { overflow: 'hidden' } }
        >
            <Flex direction={ { base: 'row', sm: 'column' } }>
                <Box w={ { base: '30%', sm: '100%' } } pos="relative">
                    <Skeleton visible={ loading } radius={ 0 }>
                        <AspectRatio ratio={ 4 / 3 }>
                            <Image
                                src={ recipeImage }
                                fit="cover"
                                alt={ recipeTitle }
                                fallbackSrc="/INF.png"
                            />
                        </AspectRatio>
                    </Skeleton>

                    <ActionIcon
                        variant="filled"
                        id={ recipeId }
                        onClick={ e => handleBookmarkToggle(e, recipeId) }
                        pos="absolute"
                        radius="xl"
                        top={ 5 }
                        right={ 5 }
                        style={ { zIndex: 1 } }
                        icon={ isBookmarked ? "IconBookmarkFilled" : "IconBookmark" }
                    />
                </Box>

                <Box style={ boxContainerStyle }>
                    { loading ? (
                        <Box>
                            <Skeleton h={ 15 } w="100%" radius="sm" />
                            <Skeleton h={ 15 } mt={ 4 } w="100%" radius="sm" />
                            <Skeleton h={ 15 } mt={ 4 } w="80%" radius="sm" />
                        </Box>
                    ) : (
                        <Text fw={ 800 } size="md" lineClamp={ 2 }>
                            { recipeTitle }
                        </Text>
                    ) }
                </Box>
            </Flex>
        </Card>
    );
}

RecipeCard.propTypes = {
    recipeId: PropTypes.number.isRequired,
    recipeTitle: PropTypes.string.isRequired,
    isBookmarked: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    handleBookmarkToggle: PropTypes.func,
    recipeImage: PropTypes.string
};
