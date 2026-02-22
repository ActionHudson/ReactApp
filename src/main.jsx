import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { Theme } from './Codex/ArcaneThreads/Theme';
import Notifications from './Codex/Runes/Notification/Notification';
import { router } from './routes';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MantineProvider theme={ Theme } withGlobalStyles withNormalizeCSS>
            <Notifications />
            <RouterProvider router={ router } />
        </MantineProvider>
    </React.StrictMode>
);
