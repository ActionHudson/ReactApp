import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    publicDir: 'public',
    base: "/",
    server: {
        host: true,
        port: 3000,
        proxy: {
            '/aether/login.php': {
                target: 'http://localhost:5000',
                changeOrigin: true
            },
            '/aether/check_auth.php': {
                target: 'http://localhost:5000',
                changeOrigin: true
            },
            '/aether/logout.php': {
                target: 'http://localhost:5000',
                changeOrigin: true
            },
            '/aether/aether.php': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                rewrite: path => {
                    const url = new URL(path, 'http://localhost');
                    const table = url.searchParams.get('table');
                    const id = url.searchParams.get('id');

                    if (table && id) {
                        return `/${ table }/${ id }`;
                    } else if (table) {
                        return `/${ table }`;
                    }

                    return path;
                }
            },
            '/aether/manifest.php': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                rewrite: path => {
                    const url = new URL(path, 'http://localhost:5000');
                    const table = url.searchParams.get('table');
                    return `/${ table }`;
                }
            },
            '/aether/scry.php': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                rewrite: path => {
                    const url = new URL(path, 'http://localhost:5000');
                    const table = url.searchParams.get('table');
                    const id = url.searchParams.get('id');
                    return id ? `/${ table }/${ id }` : `/${ table }`;
                }
            },
            '/aether/update.php': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                configure: proxy => {
                    proxy.on('proxyReq', proxyReq => {
                        proxyReq.method = 'PATCH';
                    });
                },
                rewrite: path => {
                    const url = new URL(path, 'http://localhost:5000');
                    const table = url.searchParams.get('table');
                    const id = url.searchParams.get('id');
                    if (table && id !== null) {
                        return `/${ table }/${ id }`;
                    }

                    return path;
                }
            },
            '/aether/inscribe.php': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                rewrite: path => {
                    const url = new URL(path, 'http://localhost:5000');
                    const table = url.searchParams.get('table');
                    if (table) {
                        return `/${ table }`;
                    }
                    return path;
                }
            }
        }
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./setupTests.js",
        transformMode: { web: [/.[jt]sx?/] },
        include: ["src/**/*.{test.js,test.jsx,test.ts,test.tsx}"],
        coverage: {
            provider: "v8",
            reporter: [ "text", "json", "html", "lcov" ],
            reportsDirectory: "./coverage",
            include: ["src/**/*.{js,jsx,ts,tsx}"],
            exclude: [ "src/**/*.test.{js,jsx,ts,tsx}", "**/*.stories.*", "**/setupTests.{js,ts}" ]
        }
    }
});
