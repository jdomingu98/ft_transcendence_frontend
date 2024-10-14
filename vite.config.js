import { defineConfig } from 'vite';


export default defineConfig( () => {
    return {
        server: {
            proxy:{
                '/api': {
                    target: 'http://localhost:8000',
                    changeOrigin: true,
                },
            }
        }
    };
});
