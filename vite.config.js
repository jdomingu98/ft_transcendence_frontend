import { defineConfig } from 'vite';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig( () => {
    return {
        server: {
            proxy:{
                '/api': {
                    target: 'http://localhost:8000',
                    changeOrigin: true,
                },
            }
        },
        plugins: [
            sitemap({
                hostname: 'https://localhost:8443',
                routes: [
                    '/',
                    '/privacy-policy',
                    '/legal-notice',
                    '/terms-conditions',
                    '/new-game',
                    '/new-tournament',
                    '/app/rank',
                    '/app/new-game',
                    '/app/new-tournament',
                    '/app/privacy-policy',
                    '/app/legal-notice',
                    '/app/terms-conditions',
                ],
            }),
        ],
    };
});
