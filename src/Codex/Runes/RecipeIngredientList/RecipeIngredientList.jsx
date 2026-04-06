import { Checkbox, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';

import { Colours } from '../../ArcaneThreads/Colours';

export function RecipeIngredientList (
    { ingredients = null, multiplier = 1 }
) {

    return (
        <Stack gap="sm">
            { ingredients.map((ing, index) => {
                const calculatedAmount = ing.amount
                    ? parseFloat((ing.amount * multiplier).toFixed(2))
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
                            <>
                                <Text fw={ 500 } component="span">
                                    { calculatedAmount }
                                    { ' ' }
                                    { ing.unit }
                                    { ' ' }
                                    { ing.item }
                                </Text>
                                { ing.prep && (
                                    <Text component="span" c="dimmed">
                                        ,
                                        { ' ' }
                                        { ing.prep }
                                    </Text>
                                ) }
                            </>
                        }
                    />
                );
            }) }
        </Stack>
    );
}

RecipeIngredientList.propTypes = {
    ingredients: PropTypes.array,
    multiplier: PropTypes.number
};
