import { createBrowserRouter } from 'react-router-dom';

import LandingPage from './Codex/Invocations/LandingPage/LandingPage';
import Test from './Codex/Invocations/Test/Test';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/test',
        element: <Test />
    }
]);
