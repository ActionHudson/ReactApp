import {
    Box, Button, Fieldset, Group, Input, JsonInput, NumberInput,
    Progress, Rating, Select, Slider, Stack, TextInput, Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useMemo, useState } from 'react';

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

export default function DevPage () {
    const [ step, setStep ] = useState(0);
    const [ id, setId ] = useState(1);
    const [ loading, setLoading ] = useState(false);
    const [ saving, setSaving ] = useState(false);

    const form = useForm({
        initialValues: {
            recipeName: '', rating: 3, recipeType: '', source: '', serves: 4, prepTime: 0, cookTime: 0,
            kcal: 0, fat: 0, saturates: 0, carbs: 0, sugars: 0, fibre: 0, protein: 0, salt: 0,
            ingredients: '', method: '', imageFilename: 'Disabled - talk to Admin', notes: ''
        },
        validate: values => {
            if (step === 0) {
                return {
                    recipeName: !values.recipeName?.trim() ? true : null,
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
                return { ingredients: !values.ingredients?.trim() ? true : null };
            }
            if (step === 3) {
                return { method: !values.method?.trim() ? true : null };
            }
            if (step === 5) {
                if (values.notes?.trim() !== '') {
                    try {
                        JSON.parse(values.notes);
                    } catch (e) {
                        return { notes: true };
                    }
                }
            }
            return {};
        }
    });

    useEffect(() => {
        if (id === null || id === undefined || id === '') { return; }
        setLoading(true);

        fetch(`/aether/scry.php?table=recipes&id=${ id }`)
            .then(res => {
                if (!res.ok) { throw new Error('Network response was not ok'); }
                return res.json();
            })
            .then(data => {
                if (data && !data.error) {
                    const parsedData = { ...data };

                    [ 'ingredients', 'method', 'notes' ].forEach(key => {
                        if (parsedData[key]) {
                            try {
                                const obj = typeof parsedData[key] === 'string'
                                    ? JSON.parse(parsedData[key])
                                    : parsedData[key];
                                parsedData[key] = JSON.stringify(obj, null, 2);
                            } catch (e) {
                                parsedData[key] = String(parsedData[key]);
                            }
                        } else {
                            parsedData[key] = '';
                        }
                    });

                    form.setValues({
                        recipeName: parsedData.recipe_name ?? '',
                        rating: Number(parsedData.rating ?? 3),
                        recipeType: parsedData.recipe_type ?? '',
                        source: parsedData.source ?? '',
                        serves: Number(parsedData.serves ?? 4),
                        prepTime: Number(parsedData.prep_time ?? 0),
                        cookTime: Number(parsedData.cook_time ?? 0),
                        kcal: Number(parsedData.kcal ?? 0),
                        fat: Number(parsedData.fat ?? 0),
                        saturates: Number(parsedData.saturates ?? 0),
                        carbs: Number(parsedData.carbs ?? 0),
                        sugars: Number(parsedData.sugars ?? 0),
                        fibre: Number(parsedData.fibre ?? 0),
                        protein: Number(parsedData.protein ?? 0),
                        salt: Number(parsedData.salt ?? 0),
                        ingredients: parsedData.ingredients,
                        method: parsedData.method,
                        imageFilename: parsedData.image_filename ?? 'Disabled - talk to Admin',
                        notes: parsedData.notes
                    });
                }
            })
            .catch(err => {
                console.error("Fetch error:", err);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const nextStep = () => {
        if (!form.validate().hasErrors) {
            setStep(current => Math.min(current + 1, 5));
        }
    };

    const prevStep = () => setStep(current => Math.max(current - 1, 0));

    const handleSubmit = async values => {
        setSaving(true);
        try {
            const mappedPayload = {
                recipe_name: values.recipeName,
                rating: values.rating,
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
                ingredients: values.ingredients,
                method: values.method,
                notes: values.notes
            };

            [ 'ingredients', 'method', 'notes' ].forEach(key => {
                if (mappedPayload[key] && String(mappedPayload[key]).trim() !== '') {
                    mappedPayload[key] = JSON.parse(mappedPayload[key]);
                } else {
                    mappedPayload[key] = [];
                }
            });

            const payload = {
                table: 'recipes',
                id: id,
                ...mappedPayload
            };

            const res = await fetch(`/aether/update.php?table=recipes&id=${ id }`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) { throw new Error(`Status: ${ res.status }`); }
            notify.success('Recipe updated successfully!');

        } catch (err) {
            notify.error('Failed to update recipe.', err.message);
        } finally {
            setSaving(false);
        }
    };

    const progressValues = useMemo(() => [ 0, 1, 2, 3, 4, 5 ].map(index => {
        if (step > index) { return 100; }
        if (step < index) { return 0; }
        return form.isValid() ? 100 : 50;
    }), [ step, form ]);

    return (
        <Stack style={ {
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        } }>
            <Group position="apart" align="flex-end">
                <Title order={ 3 }>Edit Existing Recipe</Title>
                <NumberInput
                    label="Load Recipe ID"
                    value={ id }
                    onChange={ val => setId(val === '' ? 0 : Number(val)) }
                    min={ 0 }
                    style={ { width: 150 } }
                    disabled={ loading || saving }
                />
            </Group>

            <ScrollArea style={ { flex: 1 } }>
                <Box>
                    <form onSubmit={ form.onSubmit(handleSubmit) }>
                        { step === 0 && (
                            <Fieldset legend="Basic Information" disabled={ loading }>
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
                                    <Button
                                        mt="md"
                                        variant="gradient"
                                        gradient={ gradientProps }
                                        onClick={ nextStep }
                                    >
                                        Next Section
                                    </Button>
                                </Stack>
                            </Fieldset>
                        ) }

                        { step === 1 && (
                            <Fieldset legend="Nutritional Information" disabled={ loading }>
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
                            <Fieldset legend="Ingredients" disabled={ loading }>
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
                                    />
                                    <Group grow mt="md">
                                        <Button variant="outline" color={ Colours.accent.primary } onClick={ prevStep }>Back</Button>
                                        <Button variant="gradient" gradient={ gradientProps } onClick={ nextStep }>Next</Button>
                                    </Group>
                                </Stack>
                            </Fieldset>
                        ) }

                        { step === 3 && (
                            <Fieldset legend="Method" disabled={ loading }>
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
                                    />
                                    <Group grow mt="md">
                                        <Button variant="outline" color={ Colours.accent.primary } onClick={ prevStep }>Back</Button>
                                        <Button variant="gradient" gradient={ gradientProps } onClick={ nextStep }>Next</Button>
                                    </Group>
                                </Stack>
                            </Fieldset>
                        ) }

                        { step === 4 && (
                            <Fieldset legend="Image" disabled={ loading }>
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
                            <Fieldset legend="Additional Notes" disabled={ loading }>
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
                                            loading={ saving }
                                            rightSection={ <Icon icon="IconCloudUpload" stroke={ 3 } /> }
                                        >
                                            Save All Changes
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
