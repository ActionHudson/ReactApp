import {
    Stack, Text, ThemeIcon, Timeline
} from '@mantine/core';

import { Colours } from '../../ArcaneThreads/Colours';
import Icon from '../../Runes/Icon/Icon';

export default function ToDo () {

    return (
        <Stack style={ {
            backgroundColor: Colours.secondary,
            padding: '1rem',
            borderRadius: '0.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        } }>
            <Timeline active={ 2 } bulletSize={ 24 } lineWidth={ 2 } color={ Colours.status.success }>
                <Timeline.Item
                    bullet={
                        <ThemeIcon color={ Colours.status.success } size="lg" radius="xl">
                            <Icon icon="IconCheck" size="md" stroke={ 2.5 } color="white" />
                        </ThemeIcon>
                    }
                    title="Settings Page"
                >
                    <Text size="sm">Make settings page to do list.</Text>
                </Timeline.Item>

                <Timeline.Item
                    bullet={
                        <ThemeIcon color={ Colours.status.success } size="lg" radius="xl">
                            <Icon icon="IconCheck" size="md" stroke={ 2.5 } color="white" />
                        </ThemeIcon>
                    }
                    title="Database Management"
                >
                    <Text size="sm">Clear indexedDB data. (Recipe Favorites)</Text>
                </Timeline.Item>

                <Timeline.Item
                    bullet={
                        <ThemeIcon color={ Colours.status.success } size="lg" radius="xl">
                            <Icon icon="IconCheck" size="md" stroke={ 2.5 } color="white" />
                        </ThemeIcon>
                    }
                    title="User Confirmation"
                >
                    <Text size="sm">Add modal confirmation before clearing data.</Text>
                </Timeline.Item>

                <Timeline.Item
                    title="Recipe Infrastructure"
                    bullet={
                        <ThemeIcon color={ Colours.status.warning } size="lg" radius="xl">
                            <Icon icon="IconX" size="xs" stroke={ 2.5 } color="white" />
                        </ThemeIcon>
                    }
                >
                    <Stack gap={ 0 }>
                        <Text size="sm">Finish recipe details page</Text>
                        <Text size="sm">Finish update recipes page</Text>
                        <Text size="sm">Finish add new recipe page</Text>
                    </Stack>
                </Timeline.Item>

                <Timeline.Item
                    title="Data Expansion"
                    bullet={
                        <ThemeIcon color={ Colours.status.warning } size="lg" radius="xl">
                            <Icon icon="IconX" size="xs" stroke={ 2.5 } color="white" />
                        </ThemeIcon>
                    }
                >
                    <Stack gap={ 0 }>
                        <Text size="sm">Add/Update reference data.</Text>
                        <Text size="sm">Add/Update planting data.</Text>
                    </Stack>
                </Timeline.Item>

                <Timeline.Item
                    title="Advanced Features"
                    bullet={
                        <ThemeIcon color={ Colours.status.warning } size="lg" radius="xl">
                            <Icon icon="IconX" size="xs" stroke={ 2.5 } color="white" />
                        </ThemeIcon>
                    }
                >
                    <Stack gap={ 0 }>
                        <Text size="sm">Logged in/Hidden area?</Text>
                        <Text size="sm">Timeline of life events (moving, jobs, etc)</Text>
                        <Text size="sm">Figure out what else I can add.</Text>
                    </Stack>
                </Timeline.Item>
            </Timeline>
        </Stack>
    );
}
