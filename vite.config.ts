import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    optimizeDeps: {
        exclude: ["cubing"],
    },
    worker: {
        format: "es",
    },
    build: {
        target: "esnext",
        modulePreload: false,
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/tests/setup.ts",
        coverage: {
            include: ["src/**"],
            exclude: [
                "src/components/ui/**",
                "src/tests/**",
                "src/types/**",
                "src/main.tsx",
                "src/App.tsx",
                "src/vite-env.d.ts",
                "src/assets/**",
                "src/constants/**",
            ],
        },
    },
});
