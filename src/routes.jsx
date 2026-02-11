import { createBrowserRouter } from 'react-router-dom';

import LandingPage from './Codex/Invocations/LandingPage/LandingPage';
import RecipeDetail from './Codex/Invocations/RecipeDetail/RecipeDetail';
import Recipes from './Codex/Invocations/Recipes/Recipes';
import ReferencePage from './Codex/Invocations/ReferencePage/ReferencePage';

const basename = import.meta.env.MODE === "production" ? "/ReactApp" : "/";

export const router = createBrowserRouter(
    [
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
        }
    ],
    { basename }
);
