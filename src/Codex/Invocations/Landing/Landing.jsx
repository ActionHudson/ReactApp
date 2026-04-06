import { Badge, Stack, Text } from '@mantine/core';

import { useAuth } from '../../../Auth/useAuth';

export default function Landing () {
    const { isLoggedIn, role } = useAuth();

    return (
        <Stack
            align="flex-start"
            style={ {
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            } }
        >
            { isLoggedIn ? (
                <Stack gap="xs">
                    <Text fw={ 500 } c="green">
                        Status: Authenticated
                    </Text>
                    <Badge color="blue" size="lg" variant="light">
                        Role:
                        { ' ' }
                        { role }
                    </Badge>
                </Stack>
            ) : (
                <Text fw={ 500 } c="red">
                    Status: Guest (Not Logged In)
                </Text>
            ) }
        </Stack>
    );
}
