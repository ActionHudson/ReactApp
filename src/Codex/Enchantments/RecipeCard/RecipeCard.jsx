import { AspectRatio, Box, Flex, Image, Skeleton } from '@mantine/core';
import PropTypes from 'prop-types';

import Card from '../../Runes/Card/Card';
import Text from '../../Runes/Text/Text';
import ActionIcon from '../../Sigils/ActionIcon/ActionIcon';

export function RecipeCard ({
    recipeId,
    recipeTitle,
    isBookmarked,
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
                    <AspectRatio ratio={ 4 / 3 }>
                        <Image
                            src={ recipeImage }
                            fit="cover"
                            alt={ recipeTitle }
                            fallbackSrc="/INF.png"
                        />
                    </AspectRatio>
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
                    <Text fw={ 800 } size="md" lineClamp={ 2 } lh={ 1.4 }>
                        { recipeTitle }
                    </Text>
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
