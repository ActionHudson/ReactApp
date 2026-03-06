import { Box, Flex, Image, Skeleton } from '@mantine/core';
import PropTypes from 'prop-types';

import Card from '../../Runes/Card/Card';
import Text from '../../Runes/Text/Text';
import ActionIcon from '../../Sigils/ActionIcon/ActionIcon';

export function RecipeCard ({
    recipeId,
    recipeTitle,
    isBookmarked,
    loading = false,
    handleBookmarkToggle = undefined
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
        >
            <Flex direction={ { base: 'row', sm: 'column' } } m="-md">
                <Skeleton
                    visible={ loading }
                    w={ { base: '30%', sm: '100%' } }
                    h="100%"
                    radius={ 0 }
                >
                    <Box w="100%" h="100%" pos="relative">
                        <Image
                            src="/INF.png"
                            h="100%"
                            w="100%"
                            fit="cover"
                            fallbackSrc="/INF.png"
                        />
                    </Box>
                </Skeleton>

                <Box style={ boxContainerStyle }>
                    <ActionIcon
                        variant={ isBookmarked ? 'filled' : 'outline' }
                        id={ recipeId }
                        onClick={ handleBookmarkToggle }
                        pos="absolute"
                        radius="xl"
                        top={ 5 }
                        right={ 5 }
                        style={ { zIndex: 1 } }
                        icon={
                            isBookmarked ? "IconBookmarkFilled" : "IconBookmark"
                        }
                    />

                    { loading ? (
                        <Box mb="sm">
                            <Skeleton h={ 15 } w="100%" radius="sm" />
                            <Skeleton h={ 15 } mt={ 4 } w="100%" radius="sm" />
                            <Skeleton h={ 15 } mt={ 4 } w="80%" radius="sm" />
                        </Box>
                    ) : (
                        <>
                            <Text fw={ 800 } size="md" lineClamp={ 3 }>
                                { recipeTitle }
                            </Text>
                        </>
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
    handleBookmarkToggle: PropTypes.func
};
