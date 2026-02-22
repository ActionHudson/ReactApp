import { MantineProvider } from '@mantine/core';
import { createElement } from 'react';
import '@mantine/core/styles.css';

export const decorators = [
    Story => createElement(MantineProvider, null, createElement(Story))
];

const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    }
};

export default preview;
