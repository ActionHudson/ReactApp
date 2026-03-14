import {
    Box, Button, Fieldset, Group, Input, JsonInput, NumberInput,
    Progress, Rating, Select, Slider, Stack, TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMemo, useState } from 'react';

import { Colours } from '../../ArcaneThreads/Colours';
import { notify } from '../../ArcaneThreads/Notify';
import Icon from '../../Runes/Icon/Icon';
import NIclasses from '../../Runes/NumberInput/NumberInput.module.css';
import ScrollArea from '../../Runes/ScrollArea/ScrollArea';
import MSclasses from '../../Sigils/MultiSelect/MultiSelect.module.css';

const errorInputStyles = {
    error: { color: Colours.status.error },
    input: {
        borderColor: Colours.status.error,
        color: Colours.status.error,
        '--input-placeholder-color': Colours.status.error,
        '--select-placeholder-color': Colours.status.error,
        '&:focus': { borderColor: Colours.status.error }
    }
};

const gradientProps = { from: '#FF6B9D', to: '#D7467B', deg: 45 };

const NUTRITION_FIELDS = [
    { name: 'kcal', label: 'KCAL', allowDecimal: false },
    { name: 'fat', label: 'Fat (g)', allowDecimal: true },
    { name: 'saturates', label: 'Saturated Fat (g)', allowDecimal: true },
    { name: 'carbs', label: 'Carbs (g)', allowDecimal: true },
    { name: 'sugars', label: 'Sugars (g)', allowDecimal: true },
    { name: 'fibre', label: 'Fibre (g)', allowDecimal: true },
    { name: 'protein', label: 'Protein (g)', allowDecimal: true },
    { name: 'salt', label: 'Salt (g)', allowDecimal: true }
];

export default function RecipeAdd () {
    const [ step, setStep ] = useState(0);
    const [ submitting, setSubmitting ] = useState(false);

    const form = useForm({
        initialValues: {
            recipeName: '', rating: 3, recipeType: '', source: '', serves: 4, prepTime: 0, cookTime: 0,
            kcal: 0, fat: 0, saturates: 0, carbs: 0, sugars: 0, fibre: 0, protein: 0, salt: 0,
            ingredients: '', method: '', imageFilename: 'Disabled - talk to Admin', notes: ''
        },
        validate: values => {
            if (step === 0) {
                return {
                    recipeName: !values.recipeName.trim() ? true : null,
                    recipeType: !values.recipeType ? true : null
                };
            }
            if (step === 1) {
                const errors = {};
                const keys = [ 'kcal', 'fat', 'saturates', 'carbs', 'sugars', 'fibre', 'protein', 'salt' ];
                keys.forEach(key => {
                    if (typeof values[key] !== 'number') {
                        errors[key] = true;
                    }
                });
                return errors;
            }
            if (step === 2) {
                return {
                    ingredients: !values.ingredients.trim() ? true : null
                };
            }
            if (step === 3) {
                return { method: !values.method.trim() ? true : null };
            }
            if (step === 5) {
                if (values.notes.trim() !== '') {
                    try {
                        JSON.parse(values.notes);
                    } catch {
                        return { notes: true };
                    }
                }
            }
            return {};
        }
    });

    const nextStep = () => {
        if (!form.validate().hasErrors) {
            setStep(current => Math.min(current + 1, 5));
        }
    };

    const prevStep = () => setStep(current => Math.max(current - 1, 0));

    const handleSubmit = async values => {
        setSubmitting(true);
        try {
            const mappedData = {
                recipe_name: values.recipeName,
                recipe_type: values.recipeType,
                source: values.source,
                serves: values.serves,
                prep_time: values.prepTime,
                cook_time: values.cookTime,
                kcal: values.kcal,
                fat: values.fat,
                saturates: values.saturates,
                carbs: values.carbs,
                sugars: values.sugars,
                fibre: values.fibre,
                protein: values.protein,
                salt: values.salt,
                rating: values.rating,
                image_filename: values.imageFilename
            };

            [ 'ingredients', 'method', 'notes' ].forEach(key => {
                if (values[key] && values[key].trim() !== '') {
                    mappedData[key] = JSON.parse(values[key]);
                } else {
                    mappedData[key] = [];
                }
            });

            const payload = {
                table: 'recipes',
                data: mappedData
            };

            const res = await fetch('/aether/inscribe.php?table=recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error(`Status: ${ res.status }`);
            }

            const result = await res.json();

            if (result.error) {
                throw new Error(result.error);
            }

            notify.success('Recipe added successfully!');
            form.reset();
            setStep(0);
        } catch (err) {
            notify.error('Failed to add recipe.', err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const progressValues = useMemo(() => [ 0, 1, 2, 3, 4, 5 ].map(index => {
        if (step > index) {
            return 100;
        }
        if (step < index) {
            return 0;
        }
        return form.isValid() ? 100 : 50;
    }), [ step, form ]);

    return (
        <Stack style={ {
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 600
        } }>
            <ScrollArea>
                <Box style={ { flex: 1 } }>
                    <form onSubmit={ form.onSubmit(handleSubmit) }>
                        { step === 0 && (
                            <Fieldset legend="Basic Information" disabled={ submitting }>
                                <Stack gap="xs">
                                    <TextInput
                                        label="Recipe Name"
                                        { ...form.getInputProps('recipeName') }
                                        styles={ form.errors.recipeName ? errorInputStyles : {} }
                                    />
                                    <Group grow align="flex-start">
                                        <Input.Wrapper label="Rating">
                                            <Rating
                                                size="lg"
                                                color={ Colours.accent.primary }
                                                { ...form.getInputProps('rating') }
                                            />
                                        </Input.Wrapper>
                                        <Select
                                            label="Meal Type"
                                            placeholder="Pick one"
                                            data={ [
                                                { value: 'breakfast', label: 'Breakfast' },
                                                { value: 'lunch', label: 'Lunch' },
                                                { value: 'dinner', label: 'Dinner' },
                                                { value: 'other', label: 'Other' }
                                            ] }
                                            { ...form.getInputProps('recipeType') }
                                            styles={ form.errors.recipeType ? errorInputStyles : { input: { textTransform: 'capitalize' } } }
                                            withAlignedLabels
                                            classNames={ { section: MSclasses.section, option: MSclasses.option } }
                                            rightSectionPointerEvents="none"
                                            rightSection={ <Icon icon="IconSelector" size={ 14 } /> }
                                        />
                                    </Group>
                                    <TextInput
                                        label="Source (Optional)"
                                        { ...form.getInputProps('source') }
                                    />
                                    <Input.Wrapper label="Serves" pb={ 16 }>
                                        <Slider
                                            min={ 1 }
                                            max={ 12 }
                                            step={ 1 }
                                            color={ Colours.accent.primary }
                                            mt="xs"
                                            mb="xs"
                                            thumbSize={ 32 }
                                            marks={ [ { value: 4, label: '4' }, { value: 8, label: '8' } ] }
                                            styles={ { markLabel: { marginTop: 8 } } }
                                            { ...form.getInputProps('serves') }
                                        />
                                    </Input.Wrapper>
                                    <Group grow align="flex-start">
                                        <NumberInput
                                            label="Preparation Time (mins)"
                                            min={ 0 }
                                            max={ 600 }
                                            allowDecimal={ false }
                                            classNames={ { control: NIclasses.control } }
                                            { ...form.getInputProps('prepTime') }
                                        />
                                        <NumberInput
                                            label="Cooking Time (mins)"
                                            min={ 0 }
                                            max={ 600 }
                                            allowDecimal={ false }
                                            classNames={ { control: NIclasses.control } }
                                            { ...form.getInputProps('cookTime') }
                                        />
                                    </Group>
                                    <Button variant="gradient" gradient={ gradientProps } onClick={ nextStep }>
                                        Next Section
                                    </Button>
                                </Stack>
                            </Fieldset>
                        ) }

                        { step === 1 && (
                            <Fieldset legend="Nutritional Information" disabled={ submitting }>
                                <Group style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' } }>
                                    { NUTRITION_FIELDS.map(field => (
                                        <NumberInput
                                            key={ field.name }
                                            label={ field.label }
                                            min={ 0 }
                                            max={ 9999 }
                                            allowDecimal={ field.allowDecimal }
                                            decimalScale={ field.allowDecimal ? 2 : 0 }
                                            classNames={ { control: NIclasses.control } }
                                            { ...form.getInputProps(field.name) }
                                            styles={ form.errors[field.name] ? errorInputStyles : {} }
                                        />
                                    )) }
                                </Group>
                                <Group grow mt="md">
                                    <Button variant="outline" color={ Colours.accent.primary } onClick={ prevStep }>Back</Button>
                                    <Button variant="gradient" gradient={ gradientProps } onClick={ nextStep }>Next</Button>
                                </Group>
                            </Fieldset>
                        ) }

                        { step === 2 && (
                            <Fieldset legend="Ingredients" disabled={ submitting }>
                                <Stack gap="xs">
                                    <JsonInput
                                        label="Ingredients"
                                        validationError="Invalid JSON"
                                        formatOnBlur
                                        autosize
                                        minRows={ 4 }
                                        maxRows={ 20 }
                                        { ...form.getInputProps('ingredients') }
                                        styles={ form.errors.ingredients ? errorInputStyles : {} }
                                        placeholder={ `[\n  {\n    "amount": 1,\n    "unit": "pcs",\n    "item": "Onion",\n    "prep": "thinly sliced"\n  }\n]` }
                                    />
                                    <Group grow mt="md">
                                        <Button variant="outline" color={ Colours.accent.primary } onClick={ prevStep }>Back</Button>
                                        <Button variant="gradient" gradient={ gradientProps } onClick={ nextStep }>Next</Button>
                                    </Group>
                                </Stack>
                            </Fieldset>
                        ) }

                        { step === 3 && (
                            <Fieldset legend="Method" disabled={ submitting }>
                                <Stack gap="xs">
                                    <JsonInput
                                        label="Method"
                                        validationError="Invalid JSON"
                                        formatOnBlur
                                        autosize
                                        minRows={ 4 }
                                        maxRows={ 20 }
                                        { ...form.getInputProps('method') }
                                        styles={ form.errors.method ? errorInputStyles : {} }
                                        placeholder={ `[\n  "Whisk all the ingredients together in a large bowl.",\n  "Transfer to a small pot and simmer for 10 minutes."\n]` }
                                    />
                                    <Group grow mt="md">
                                        <Button variant="outline" color={ Colours.accent.primary } onClick={ prevStep }>Back</Button>
                                        <Button variant="gradient" gradient={ gradientProps } onClick={ nextStep }>Next</Button>
                                    </Group>
                                </Stack>
                            </Fieldset>
                        ) }

                        { step === 4 && (
                            <Fieldset legend="Image" disabled={ submitting }>
                                <Stack gap="xs">
                                    <TextInput
                                        label="Image File"
                                        disabled
                                        { ...form.getInputProps('imageFilename') }
                                    />
                                    <Group grow mt="md">
                                        <Button variant="outline" color={ Colours.accent.primary } onClick={ prevStep }>Back</Button>
                                        <Button variant="gradient" gradient={ gradientProps } onClick={ nextStep }>Next</Button>
                                    </Group>
                                </Stack>
                            </Fieldset>
                        ) }

                        { step === 5 && (
                            <Fieldset legend="Additional Notes" disabled={ submitting }>
                                <Stack gap="xs">
                                    <JsonInput
                                        label="Notes (Optional)"
                                        validationError="Invalid JSON"
                                        formatOnBlur
                                        autosize
                                        minRows={ 4 }
                                        maxRows={ 20 }
                                        { ...form.getInputProps('notes') }
                                        styles={ form.errors.notes ? errorInputStyles : {} }
                                        placeholder={ `[\n  "Best served with crusty bread."\n]` }
                                    />
                                    <Group grow mt="md">
                                        <Button variant="outline" color={ Colours.accent.primary } onClick={ prevStep }>Back</Button>
                                        <Button
                                            type="submit"
                                            variant="gradient"
                                            gradient={ gradientProps }
                                            loading={ submitting }
                                            rightSection={ <Icon icon="IconCloudUpload" stroke={ 2.5 } /> }
                                        >
                                            Submit
                                        </Button>
                                    </Group>
                                </Stack>
                            </Fieldset>
                        ) }
                    </form>
                </Box>
            </ScrollArea>
            <Group gap={ 5 } mt="xs" justify="center" style={ { marginTop: 'auto', width: '100%' } }>
                { progressValues.map((progress, index) => (
                    <Progress
                        key={ index }
                        size="md"
                        color={ progress === 100 ? Colours.status.success : progress < 50 ? Colours.status.error : Colours.status.warning }
                        value={ progress }
                        transitionDuration={ 200 }
                        style={ { flex: 1 } }
                        striped
                        animated
                    />
                )) }
            </Group>
        </Stack>
    );
}
