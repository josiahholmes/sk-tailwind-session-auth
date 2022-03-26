<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';

    export const load: Load = async ({ session }) => {
        if (!session?.user) {
            return {
                status: 302,
                redirect: '/login'
            }
        }
        return {
            props: {
                user: session.user
            }
        }
    }
</script>


<script>
    export let user;
    let title = 'Protected Page';

    const logout = async () => {
		const res = await fetch('/auth/logout', { method: 'GET' });
		if (res.ok) location.reload();
	};
</script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Hello There!</h1>
        <p class="py-6">Hello {user.name}! This is a sample protected page. 
            You should only be seeing this page if you are logged in.</p>
        <button class="btn btn-primary" on:click={logout}>Logout</button>
      </div>
    </div>
  </div>