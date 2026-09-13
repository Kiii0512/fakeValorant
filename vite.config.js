import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				home: resolve(projectRoot, 'index.html'),
				agents: resolve(projectRoot, 'agents.html'),
				arsenal: resolve(projectRoot, 'arsenal.html'),
				maps: resolve(projectRoot, 'maps.html'),
				news: resolve(projectRoot, 'news.html'),
				articleDetail: resolve(projectRoot, 'article-detail.html'),
				agentDetail: resolve(projectRoot, 'agent-detail.html'),
				admin: resolve(projectRoot, 'admin.html'),
				specs: resolve(projectRoot, 'specs.html'),
			},
		},
	},
});
