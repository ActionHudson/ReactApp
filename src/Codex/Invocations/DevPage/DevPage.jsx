import {
    Box, Button, Fieldset, Group, Input,
    NumberInput, Progress, Rating, Select, Slider,
    Stack, TextInput, Title
} from '@mantine/core';
import { useCallback, useMemo, useState } from 'react';

import { Colours } from '../../ArcaneThreads/Colours';
import Icon from '../../Runes/Icon/Icon';
import ScrollArea from '../../Runes/ScrollArea/ScrollArea';

export default function DevPage () {
    const [ step, setStep ] = useState(0);
    const [ errors, setErrors ] = useState({});
    const [ formData, setFormData ] = useState({
        recipeName: '', rating: '3', recipeType: '', source: '', serves: '4', prepTime: '10', cookTime: '30',
        kcal: '', fat: '', saturates: '', carbs: '', sugars: '', fibre: '', protein: '', salt: '',
        ingredients: '',
        method: '',
        imageFilename: '',
        notes: ''
    });

    const stepFields = useMemo(() => [
        [ 'recipeName', 'rating', 'recipeType', 'source', 'serves', 'prepTime', 'cookTime' ],
        [ 'kcal', 'fat', 'saturates', 'carbs', 'sugars', 'fibre', 'protein', 'salt' ],
        ['ingredients'],
        ['method'],
        ['imageFilename'],
        ['notes']
    ], []);

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => {
            if (prev[field]) {
                return { ...prev, [field]: null };
            }
            return prev;
        });
    }, []);

    const validateStep = useCallback(() => {
        const currentFields = stepFields[step];
        const newErrors = {};

        currentFields.forEach(field => {
            const val = formData[field];
            const isInvalid = field === 'rating'
                ? val === 0
                : !val || String(val).trim() === '';

            if (isInvalid) {
                newErrors[field] = 'Required';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [ formData, step, stepFields ]);

    const handleNext = useCallback(() => {
        if (validateStep()) {
            setStep(s => Math.min(s + 1, 5));
        }
    }, [validateStep]);

    const handleComplete = useCallback(() => {
        if (validateStep()) {
            alert(JSON.stringify(formData, null, 2));
        }
    }, [ formData, validateStep ]);

    const getFieldStyle = useCallback((hasError, theme) => ({
        error: {
            color: hasError ? Colours.status.error : theme.colors.red[6]
        },
        input: {
            borderColor: hasError ? Colours.status.error : undefined,
            '--input-placeholder-color': hasError ? Colours.status.error : undefined,
            '--select-placeholder-color': hasError ? Colours.status.error : undefined,
            '&:focus': {
                borderColor: hasError ? Colours.status.error : undefined
            }
        }
    }), []);

    const progressValues = useMemo(() => [ 0, 1, 2, 3, 4, 5 ].map(index => {
        if (step > index) { return 100; }
        if (step < index) { return 0; }

        const currentFields = stepFields[index];
        const completedFields = currentFields.filter(field => {
            const val = formData[field];
            if (field === 'rating') { return val > 0; }
            return val !== undefined && val !== null && String(val).trim() !== '';
        }).length;

        return completedFields / currentFields.length * 100;
    }), [ step, formData, stepFields ]);

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
                <Box style={ { flex: 1 } }>
                    { step === 0 && (
                        <Fieldset legend="Basic Information">
                            <Stack>
                                <TextInput
                                    label="Recipe Name"
                                    error={ !!errors.recipeName }
                                    value={ formData.recipeName }
                                    onChange={ e => handleInputChange('recipeName', e.currentTarget.value) }
                                    styles={ theme => getFieldStyle(errors.recipeName, theme) }
                                />
                                <Input.Wrapper label="Rating">
                                    <Rating
                                        value={ formData.rating }
                                        onChange={ val => handleInputChange('rating', Math.max(1, Number(val))) }
                                        size="lg"
                                        color={ Colours.accent.primary }
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
                                    error={ !!errors.recipeType }
                                    value={ formData.recipeType }
                                    onChange={ val => handleInputChange('recipeType', val) }
                                    styles={ theme => ({
                                        ...getFieldStyle(errors.recipeType, theme),
                                        input: {
                                            ...getFieldStyle(errors.recipeType, theme).input,
                                            textTransform: 'capitalize'
                                        }
                                    }) }
                                />
                                <TextInput
                                    label="Source"
                                    error={ !!errors.source }
                                    value={ formData.source }
                                    onChange={ e => handleInputChange('source', e.currentTarget.value) }
                                    styles={ theme => getFieldStyle(errors.source, theme) }
                                />
                                <Input.Wrapper label="Serves" pb={ 16 }>
                                    <Slider
                                        defaultValue={ formData.serves }
                                        marks={ [
                                            { value: 4, label: '4' },
                                            { value: 8, label: '8' }
                                        ] }
                                        onChangeEnd={ val => handleInputChange('serves', val) }
                                        min={ 1 }
                                        max={ 12 }
                                        step={ 1 }
                                        color={ Colours.accent.primary }
                                        mt="xs"
                                        mb="xs"
                                        thumbSize={ 32 }
                                        styles={ {
                                            markLabel: { marginTop: 8 }
                                        } }
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="Preperation Time" pb={ 16 }>
                                    <Slider
                                        thumbChildren={ <Icon icon="IconSlice" stroke={ 2 } /> }
                                        defaultValue={ formData.prepTime }
                                        marks={ [
                                            { value: 30, label: '30' },
                                            { value: 60, label: '60' },
                                            { value: 120, label: '120' },
                                            { value: 240, label: '240' },
                                            { value: 480, label: '480' },
                                            { value: 600, label: '600' }
                                        ] }
                                        onChangeEnd={ val => handleInputChange('prepTime', val) }
                                        min={ 2 }
                                        max={ 600 }
                                        step={ 2 }
                                        color={ Colours.accent.primary }
                                        mt="xs"
                                        mb="xs"
                                        thumbSize={ 32 }
                                        styles={ {
                                            markLabel: { marginTop: 8 }
                                        } }
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="Cook Time" pb={ 16 }>
                                    <Slider
                                        thumbChildren={ <Icon icon="IconCooker" stroke={ 2 } /> }
                                        defaultValue={ formData.cookTime }
                                        marks={ [
                                            { value: 30, label: '30' },
                                            { value: 60, label: '60' },
                                            { value: 120, label: '120' },
                                            { value: 240, label: '240' },
                                            { value: 480, label: '480' },
                                            { value: 600, label: '600' }
                                        ] }
                                        onChangeEnd={ val => handleInputChange('cookTime', val) }
                                        min={ 2 }
                                        max={ 600 }
                                        step={ 2 }
                                        color={ Colours.accent.primary }
                                        mt="xs"
                                        mb="xs"
                                        thumbSize={ 32 }
                                        styles={ {
                                            markLabel: { marginTop: 8 }
                                        } }
                                    />
                                </Input.Wrapper>
                                <Button
                                    variant="gradient"
                                    gradient={ { from: '#FF6B9D', to: '#D7467B', deg: 45 } }
                                    onClick={ handleNext }
                                    mt="md">
                                    Next Section
                                </Button>
                            </Stack>
                        </Fieldset>
                    ) }

                    { step === 1 && (
                        <Stack>
                            <Title order={ 4 }>Section 2: Contact</Title>
                            <TextInput
                                label="kcal"
                                error={ !!errors.kcal }
                                value={ formData.kcal }
                                onChange={ e => handleInputChange('kcal', e.currentTarget.value) }
                                styles={ theme => getFieldStyle(errors.kcal, theme) }
                            />
                            <TextInput
                                label="fat"
                                error={ !!errors.fat }
                                value={ formData.fat }
                                onChange={ e => handleInputChange('fat', e.currentTarget.value) }
                                styles={ theme => getFieldStyle(errors.fat, theme) }
                            />
                            <TextInput
                                label="saturates"
                                error={ !!errors.saturates }
                                value={ formData.saturates }
                                onChange={ e => handleInputChange('saturates', e.currentTarget.value) }
                                styles={ theme => getFieldStyle(errors.saturates, theme) }
                            />
                            <TextInput
                                label="carbs"
                                error={ !!errors.carbs }
                                value={ formData.carbs }
                                onChange={ e => handleInputChange('carbs', e.currentTarget.value) }
                                styles={ theme => getFieldStyle(errors.carbs, theme) }
                            />
                            <TextInput
                                label="sugars"
                                error={ !!errors.sugars }
                                value={ formData.sugars }
                                onChange={ e => handleInputChange('sugars', e.currentTarget.value) }
                                styles={ theme => getFieldStyle(errors.sugars, theme) }
                            />
                            <TextInput
                                label="fibre"
                                error={ !!errors.fibre }
                                value={ formData.fibre }
                                onChange={ e => handleInputChange('fibre', e.currentTarget.value) }
                                styles={ theme => getFieldStyle(errors.fibre, theme) }
                            />
                            <TextInput
                                label="protein"
                                error={ !!errors.protein }
                                value={ formData.protein }
                                onChange={ e => handleInputChange('protein', e.currentTarget.value) }
                                styles={ theme => getFieldStyle(errors.protein, theme) }
                            />
                            <TextInput
                                label="salt"
                                error={ !!errors.salt }
                                value={ formData.salt }
                                onChange={ e => handleInputChange('salt', e.currentTarget.value) }
                                styles={ theme => getFieldStyle(errors.salt, theme) }
                            />
                            <Group grow mt="md">
                                <Button variant="outline" color={ Colours.accent.primary } onClick={ () => setStep(0) }>Back</Button>
                                <Button
                                    variant="gradient"
                                    gradient={ { from: '#FF6B9D', to: '#D7467B', deg: 45 } }
                                    onClick={ handleNext }>
                                    Next
                                </Button>
                            </Group>
                        </Stack>
                    ) }

                    { step === 2 && (
                        <Stack>
                            <Title order={ 4 }>Section 3: Address</Title>
                            <TextInput
                                label="ingredients"
                                error={ !!errors.ingredients }
                                value={ formData.ingredients }
                                onChange={ e => handleInputChange('ingredients', e.currentTarget.value) }
                                styles={ theme => getFieldStyle(errors.ingredients, theme) }
                            />
                            <Group grow mt="md">
                                <Button variant="outline" color={ Colours.accent.primary } onClick={ () => setStep(1) }>Back</Button>
                                <Button
                                    variant="gradient"
                                    gradient={ { from: '#FF6B9D', to: '#D7467B', deg: 45 } }
                                    onClick={ handleNext }>
                                    Next
                                </Button>
                            </Group>
                        </Stack>
                    ) }

                    { step === 3 && (
                        <Stack>
                            <Title order={ 4 }>Section 4: Professional</Title>
                            <TextInput
                                label="method"
                                error={ !!errors.method }
                                value={ formData.method }
                                onChange={ e => handleInputChange('method', e.currentTarget.value) }
                                styles={ theme => getFieldStyle(errors.method, theme) }
                            />
                            <Group grow mt="md">
                                <Button variant="outline" color={ Colours.accent.primary } onClick={ () => setStep(2) }>Back</Button>
                                <Button
                                    variant="gradient"
                                    gradient={ { from: '#FF6B9D', to: '#D7467B', deg: 45 } }
                                    onClick={ handleNext }>
                                    Next
                                </Button>
                            </Group>
                        </Stack>
                    ) }

                    { step === 4 && (
                        <Stack>
                            <Title order={ 4 }>Section 5: Finalize</Title>
                            <TextInput
                                label="imageFilename"
                                error={ !!errors.imageFilename }
                                value={ formData.imageFilename }
                                onChange={ e => handleInputChange('imageFilename', e.currentTarget.value) }
                                styles={ theme => getFieldStyle(errors.imageFilename, theme) }
                            />
                            <Group grow mt="md">
                                <Button variant="outline" color={ Colours.accent.primary } onClick={ () => setStep(3) }>Back</Button>
                                <Button
                                    variant="gradient"
                                    gradient={ { from: '#FF6B9D', to: '#D7467B', deg: 45 } }
                                    onClick={ handleNext }>
                                    Next
                                </Button>
                            </Group>
                        </Stack>
                    ) }

                    { step === 5 && (
                        <Stack>
                            <Title order={ 4 }>Section 6: Finalize</Title>
                            <TextInput
                                label="notes"
                                error={ !!errors.notes }
                                value={ formData.notes }
                                onChange={ e => handleInputChange('notes', e.currentTarget.value) }
                                styles={ theme => getFieldStyle(errors.notes, theme) }
                            />
                            <Group grow mt="md">
                                <Button variant="outline" color={ Colours.accent.primary } onClick={ () => setStep(4) }>Back</Button>
                                <Button
                                    variant="gradient"
                                    gradient={ { from: '#FF6B9D', to: '#D7467B', deg: 45 } }
                                    onClick={ handleComplete }
                                    rightSection={ <Icon icon="IconCloudUpload" stroke={ 3 } /> }
                                >
                                    Submit
                                </Button>
                            </Group>
                        </Stack>
                    ) }
                </Box>
            </ScrollArea>
            <Group
                gap={ 5 }
                mt="xs"
                justify="center"
                style={ { marginTop: 'auto', width: '100%' } }
            >
                { progressValues.map((progress, index) => (
                    <Progress
                        key={ index }
                        size="md"
                        color={ progress === 100
                            ? Colours.status.success :
                            progress < 50 ? Colours.status.error : Colours.status.warning }
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
