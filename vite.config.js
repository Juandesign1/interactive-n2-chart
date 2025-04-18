import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    base: '/interactive-n2-chart/', // This ensures all assets have the correct base path
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        emptyOutDir: true, // Clean the output directory before build
    },
})
