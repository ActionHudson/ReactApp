import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from './Codex/Grimoires/MainLayout/Mainlayout';
import ColourLab from './Codex/Invocations/ColourLab/ColourLab';
import Dev from './Codex/Invocations/Dev/Dev';
import Landing from './Codex/Invocations/Landing/Landing';
import PlantingChart from './Codex/Invocations/PlantingChart/PlantingChart';
import RecipeAdd from './Codex/Invocations/RecipeAdd/RecipeAdd';
import RecipeDetail from './Codex/Invocations/RecipeDetail/RecipeDetail';
import Recipes from './Codex/Invocations/Recipes/Recipes';
import RecipeUpdate from './Codex/Invocations/RecipeUpdate/RecipeUpdate';
import Reference from './Codex/Invocations/Reference/Reference';
import Settings from './Codex/Invocations/Settings/Settings';
import ToDo from './Codex/Invocations/ToDo/ToDo';

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
                        { path: 'Add', element: <RecipeAdd /> },
                        { path: ':id', element: <RecipeDetail /> },
                        { path: 'Update', element: <RecipeUpdate /> }

                        // { path: ':id/edit', element: <RecipeEdit /> }

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
                },
                {
                    path: '/ToDo',
                    element: <ToDo />
                },
                {
                    path: '/Colours',
                    element: <ColourLab />
                },
                {
                    path: '/Settings',
                    element: <Settings />
                }
            ]
        }
    ],
    { basename }
);
