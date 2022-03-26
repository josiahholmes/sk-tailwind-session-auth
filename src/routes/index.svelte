<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch, session }) => {
		// Get session user information
		if (!session?.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}
		return {
            status: 302,
            redirect: '/protected'
        }
	};
</script>

<h1>SvelteKit Tailwind Session Auth Template</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
