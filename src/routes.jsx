import { createBrowserRouter } from 'react-router-dom';

import About from './Codex/Invocations/About/About';
import LandingPage from './Codex/Invocations/LandingPage/LandingPage';
import Profile from './Codex/Invocations/Profile/Profile';
import Recipes from './Codex/Invocations/Recipes/Recipes';
import Settings from './Codex/Invocations/Settings/Settings';

const basename = import.meta.env.MODE === "production" ? "/ReactApp" : "/";

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <LandingPage />
        },
        {
            path: '/profile',
            element: <Profile />
        },
        {
            path: '/settings',
            element: <Settings />
        },
        {
            path: '/about',
            element: <About />
        },
        {
            path: '/recipes',
            element: <Recipes />
        }
    ],
    { basename }
);
