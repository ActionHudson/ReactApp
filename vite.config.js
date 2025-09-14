import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    base: "/ReactApp/",
    server: {
        port: 3000
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./setupTests.js",
        transformMode: {
            web: [/.[jt]sx?/]
        },
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
