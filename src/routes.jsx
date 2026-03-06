import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from './Codex/Grimoires/MainLayout/Mainlayout';
import LandingPage from './Codex/Invocations/LandingPage/LandingPage';
import PlantChart from './Codex/Invocations/PlantChart/PlantChart';
import RecipeDetail from './Codex/Invocations/RecipeDetail/RecipeDetail';
import Recipes from './Codex/Invocations/Recipes/Recipes';
import ReferencePage from './Codex/Invocations/ReferencePage/ReferencePage';

const basename = "/";

export const router = createBrowserRouter(
    [
        {
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: <LandingPage />
                },
                {
                    path: '/recipes',
                    children: [
                        { index: true, element: <Recipes /> },
                        { path: ':id', element: <RecipeDetail /> }
                    ]
                },
                {
                    path: '/reference',
                    element: <ReferencePage />
                },
                {
                    path: '/plantChart',
                    element: <PlantChart />
                }
            ]
        }
    ],
    { basename }
);
