import { Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

import { clearAllFavorites } from '../../../Helpers/IndexedDB';
import { Colours } from '../../ArcaneThreads/Colours';
import { notify } from '../../ArcaneThreads/Notify';
import Button from '../../Runes/Button/Button';

export default function Settings () {

    const handleDeleteAll = async () => {
        try {
            await clearAllFavorites();
            notify.success('Favorites Cleared', 'All saved recipes have been removed successfully.');
        } catch (err) {
            notify.error('Action Failed', 'There was an error clearing the database.');
        }
    };

    const confirmClearFavorites = () => modals.openConfirmModal({
        title: 'Clear all favorites',
        children: (
            <Text size="sm" style={ { color: Colours.primary } }>
                Are you sure you want to delete all saved favorites? This action cannot be undone.
            </Text>
        ),
        confirmProps: {
            component: ({ onClick }) => (
                <Button
                    onClick={ onClick }
                    label="Delete all"
                    variant="filled"
                    color={ Colours.status.error }
                />
            )
        },
        cancelProps: {
            component: ({ onClick }) => (
                <Button
                    onClick={ onClick }
                    label="Cancel"
                    variant="outline"
                    color={ Colours.muted }
                />
            )
        },
        onConfirm: handleDeleteAll
    });

    return (
        <Stack p="md">
            <Button
                variant='filled'
                label="Clear All Favorites"
                onClick={ confirmClearFavorites }
            />
        </Stack>
    );
}
