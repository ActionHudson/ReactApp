import { Container } from '@mantine/core';

import { MainLayout } from '../../Grimoires/MainLayout/Mainlayout';
import Text from '../../Runes/Text/Text';

export default function Test () {
    return (
        <MainLayout>
            <Container size="md" py="xl">
                <Text>
                    Test
                </Text>
            </Container>
        </MainLayout>
    );
}
