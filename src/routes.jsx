import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './Auth/ProtectedRoute';
import { MainLayout } from './Codex/Grimoires/MainLayout/Mainlayout';
import AetherEditor from './Codex/Invocations/AetherEditor/AetherEditor';
import Dev from './Codex/Invocations/Dev/Dev';
import Kanban from './Codex/Invocations/Kanban/Kanban';
import Landing from './Codex/Invocations/Landing/Landing';
import PlantingChart from './Codex/Invocations/PlantingChart/PlantingChart';
import RecipeAdd from './Codex/Invocations/RecipeAdd/RecipeAdd';
import RecipeDetail from './Codex/Invocations/RecipeDetail/RecipeDetail';
import Recipes from './Codex/Invocations/Recipes/Recipes';
import RecipeUpdate from './Codex/Invocations/RecipeUpdate/RecipeUpdate';
import Reference from './Codex/Invocations/Reference/Reference';
import Settings from './Codex/Invocations/Settings/Settings';
import ToDo from './Codex/Invocations/ToDo/ToDo';
import WoW from './Codex/Invocations/WoW/WoW';

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
                    path: '/recipes',
                    children: [
                        { index: true, element: <Recipes /> },
                        { path: ':id', element: <RecipeDetail /> },
                        {
                            path: 'add', element: (
                                <ProtectedRoute>
                                    <RecipeAdd />
                                </ProtectedRoute>
                            )
                        },
                        {
                            path: 'update', element: (
                                <ProtectedRoute>
                                    <RecipeUpdate />
                                </ProtectedRoute>
                            )
                        }

                        // { path: ':id/edit', element: <RecipeEdit /> }
                    ]
                },
                {
                    path: '/reference',
                    element: <Reference />
                },
                {
                    path: '/plantingchart',
                    element: <PlantingChart />
                },
                {
                    path: '/settings',
                    element: <Settings />
                },
                {
                    path: '/dev',
                    element: <Dev />
                },
                {
                    path: '/kanban',
                    element: <Kanban />
                },
                {
                    path: '/wow',
                    element: <WoW />
                },
                {
                    path: '/todo',
                    element: (
                        <ProtectedRoute requiredRole="admin">
                            <ToDo />
                        </ProtectedRoute>
                    )
                },
                {
                    path: '/aethereditor',
                    element: (
                        <ProtectedRoute requiredRole="admin">
                            <AetherEditor />
                        </ProtectedRoute>
                    )
                }
            ]
        }
    ],
    { basename }
);
