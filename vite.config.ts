import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server:{
		proxy:{
			'/api':{
				target:"http://localhost:3000",
				changeOrigin: true,
				secure:false,
				rewrite: path=> path.replace(/^\/api/, '')
			}
		}
	}
});
