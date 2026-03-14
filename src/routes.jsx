import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from './Codex/Grimoires/MainLayout/Mainlayout';
import Dev from './Codex/Invocations/Dev/Dev';
import Landing from './Codex/Invocations/Landing/Landing';
import PlantingChart from './Codex/Invocations/PlantingChart/PlantingChart';
import RecipeAdd from './Codex/Invocations/RecipeAdd/RecipeAdd';
import RecipeDetail from './Codex/Invocations/RecipeDetail/RecipeDetail';
import Recipes from './Codex/Invocations/Recipes/Recipes';
import Reference from './Codex/Invocations/Reference/Reference';

const basename = "/";

export const router = createBrowserRouter(
    [
        {
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: <Landing />
                },
                {
                    path: '/Recipes',
                    children: [
                        { index: true, element: <Recipes /> },
                        { path: 'add', element: <RecipeAdd /> },
                        { path: ':id', element: <RecipeDetail /> }
                    ]
                },
                {
                    path: '/Reference',
                    element: <Reference />
                },
                {
                    path: '/PlantingChart',
                    element: <PlantingChart />
                },
                {
                    path: '/Dev',
                    element: <Dev />
                }
            ]
        }
    ],
    { basename }
);
