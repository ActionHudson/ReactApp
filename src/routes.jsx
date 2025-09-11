import { createBrowserRouter } from 'react-router-dom';

import LandingPage from './Codex/Invocations/LandingPage/LandingPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    }
]);
