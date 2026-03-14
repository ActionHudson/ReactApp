import {
    List, Stack, ThemeIcon
} from '@mantine/core';

import { Colours } from '../../ArcaneThreads/Colours';
import Icon from '../../Runes/Icon/Icon';

export default function ToDo () {

    return (
        <Stack style={ {
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        } }>
            <List
                spacing="xs"
                size="sm"
                center
                icon={
                    <ThemeIcon color={ Colours.status.warning } size="lg" radius="xl">
                        <Icon icon="IconX" size="md" stroke={ 2.5 } color="white" />
                    </ThemeIcon>
                }
            >
                <List.Item
                    icon={
                        <ThemeIcon color={ Colours.status.success } size="lg" radius="xl">
                            <Icon icon="IconCheck" size="xl" stroke={ 2.5 } color="white" />
                        </ThemeIcon>
                    }
                >
                    Make settings page to do list.
                </List.Item>
                <List.Item>Clear indexedDB data. (Recipe Favorites)</List.Item>
                <List.Item>Add modal confirmation before clearing data.</List.Item>
                <List.Item>Add reference data.(Finish(Already Started))</List.Item>
                <List.Item>Add planting data.(Finish(Already Started))</List.Item>
                <List.Item>Update reference data.(Finish(Already Started))</List.Item>
                <List.Item>Update planting data.(Finish(Already Started))</List.Item>
                <List.Item>Logged in/Hidden area?</List.Item>
                <List.Item>Using logged in/hidden area to show a timeline of lifes events.(moving houses, job changes, etc)</List.Item>
                <List.Item>Figure out what else I can add.</List.Item>
            </List>

        </Stack>
    );
}
