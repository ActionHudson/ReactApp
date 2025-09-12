import { createBrowserRouter } from 'react-router-dom';

import About from './Codex/Invocations/About/About';
import Contact from './Codex/Invocations/Contact/Contact';
import LandingPage from './Codex/Invocations/LandingPage/LandingPage';
import Profile from './Codex/Invocations/Profile/Profile';
import Settings from './Codex/Invocations/Settings/Settings';

export const router = createBrowserRouter([
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
        path: '/Contact',
        element: <Contact />
    }
]);
