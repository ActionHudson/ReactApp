import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './Auth/AuthProvider';
import ModalsProvider from './Codex/Runes/ModalsProvider/ModalsProvider';
import Notifications from './Codex/Runes/Notification/Notification';
import { router } from './routes';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MantineProvider>
            <AuthProvider>
                <ModalsProvider>
                    <Notifications />
                    <RouterProvider router={ router } />
                </ModalsProvider>
            </AuthProvider>
        </MantineProvider>
    </React.StrictMode>
);
