import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import prerender from '@prerenderer/rollup-plugin';
import puppeteerRenderer from '@prerenderer/renderer-puppeteer';

export default defineConfig({
    plugins: [
        react(),
        prerender({
            routes: ['/', '/protocol', '/terminal', '/ecosystem', '/whitepaper'],
            renderer: puppeteerRenderer,
            rendererOptions: {
                maxConcurrentRoutes: 1,
                renderAfterTime: 3000, // 等待 3 秒让页面完全渲染（包括加载动画）
            },
            postProcess(renderedRoute) {
                // 移除预渲染时的加载屏幕，让用户直接看到内容
                renderedRoute.html = renderedRoute.html
                    .replace(/<div class="loading-screen"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/gi, '')
                    .replace(/class="app noise-bg scanline-overlay"/g, 'class="app noise-bg scanline-overlay" data-prerendered="true"');
                return renderedRoute;
            },
        }),
    ],
    server: {
        port: 3001,
        host: '0.0.0.0',
        watch: {
            // 忽略一些不需要监视的文件，包括 tsconfig 文件以防止无限重启
            ignored: [
                '**/node_modules/**',
                '**/.git/**',
                '**/tsconfig.tsbuildinfo',
                '**/tsconfig.json',
                '**/tsconfig.node.json'
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        target: 'es2020',
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom'],
                    'vendor-animation': ['framer-motion'],
                },
            },
        },
    },
});
