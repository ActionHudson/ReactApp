import { Container } from '@mantine/core';
import { useLocation } from 'react-router-dom';

import { NavConfig } from '../../ArcaneThreads/NavConfig';
import { MainLayout } from '../../Grimoires/MainLayout/Mainlayout';

export default function Contact () {
    const location = useLocation();

    const navlinksWithActive = NavConfig.map(link => ({
        ...link,
        active: location.pathname === link.path
    }));

    return (
        <MainLayout navlinks={ navlinksWithActive }>
            <Container size="md" py="xl">
                About Page
            </Container>
        </MainLayout>
    );
}
