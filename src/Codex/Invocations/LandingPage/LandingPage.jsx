import { Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { NavConfig } from '../../ArcaneThreads/NavConfig';
import { MainLayout } from '../../Grimoires/MainLayout/Mainlayout';

export default function LandingPage () {
    const location = useLocation();

    // State for API data
    const [ allData, setAllData ] = useState([]);
    const [ singleRecord, setSingleRecord ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const navlinksWithActive = NavConfig.map(link => ({
        ...link,
        active: location.pathname === link.path
    }));

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch all records
                const allResponse = await fetch('/ReactApp/api/recipes/get-all.php');
                const allResult = await allResponse.json();

                if (allResult.success) {
                    setAllData(allResult.data);
                }

                // Fetch single record by ID (example: ID = 1)
                const singleResponse = await fetch(
                    '/ReactApp/api/recipes/get-by-id.php?id=1'
                );
                const singleResult = await singleResponse.json();

                if (singleResult.success) {
                    setSingleRecord(singleResult.data);
                }

            } catch (err) {
                setError(err.message);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    console.log('All Data:', allData);
    console.log('Single Record:', singleRecord);
    console.log('Loading:', loading);
    console.log('Error:', error);

    return (
        <MainLayout navlinks={ navlinksWithActive }>
            <Container size="md" py="xl">
            </Container>
        </MainLayout>
    );
}
