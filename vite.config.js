import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    publicDir: 'public',
    base: "/",
    server: {
        port: 3000,
        proxy: {
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
                rewrite: path => {
                    const url = new URL(path, 'http://localhost:5000');
                    const table = url.searchParams.get('table');
                    const id = url.searchParams.get('id');
                    return `/${ table }/${ id }`;
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
