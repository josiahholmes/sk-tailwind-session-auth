<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		return session?.user
			? {
					status: 302,
					redirect: '/'
			  }
			: {};
	};
</script>

<script>
	let title = 'SK Tailwind Session Auth';

	let error = '';
	let name;
	let email;
	let password;
	let confirmPassword;

	const handleSubmit = async (e) => {
		name = name.split(' ').map(n => n.charAt(0).toUpperCase() + n.substring(1).toLowerCase()).join(' ');
		const res = await fetch('/auth/register', {
			method: 'POST',
			body: JSON.stringify({ name, email, password, confirmPassword })
		});

		if (!res.ok) {
			const { message } = await res.json();
			error = message;
			document.getElementById('registerForm').reset();
		}
		else {
			location.reload();
		}
	};
</script>

<div class="content">
	<h1 class="text-center font-semibold text-4xl">{title}</h1>
	{#if error}
		<div class="mt-2 text-center text-red-600 font-semibold">{error}</div>
	{/if}
	<div
		class="container bg-gray-100 mt-5 flex flex-row justify-center mx-auto max-w-sm py-6 rounded-lg shadow-xl"
	>
		<form id="registerForm" on:submit|preventDefault={handleSubmit} class="grid grid-cols-1 gap-3">
			<label for="name" class="block">
				<span class="text-gray-700 text-lg">Name</span>
				<input
					type="name"
					name="name"
					class="input-lg mt-1 block w-full rounded-md border-gray-300 shaodw-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
					placeholder="Enter your name"
					bind:value={name}
					required
				/>
			</label>
			<label for="email" class="block">
				<span class="text-gray-700 text-lg">Email</span>
				<input
					type="email"
					name="email"
					class="input-lg mt-1 block w-full rounded-md border-gray-300 shaodw-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
					placeholder="Enter email address"
					bind:value={email}
					required
				/>
			</label>
			<label for="password" class="block">
				<span class="text-gray-700 text-lg">Password</span>
				<input
					type="password"
					name="password"
					class="input-lg mt-1 block w-full rounded-md border-gray-300 shaodw-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
					placeholder="Enter password"
					bind:value={password}
					minlength="8"
					required
				/>
			</label>
			<label for="passwordMatch" class="block">
				<span class="text-gray-700 text-lg">Confirm Password</span>
				<input
					type="password"
					name="passwordMatch"
					class="input-lg mt-1 block w-full rounded-md border-gray-300 shaodw-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
					placeholder="Re-enter password"
					bind:value={confirmPassword}
					required
				/>
			</label>
			<div class="mt-3 flex flex-row justify-center max-w-md">
				<button type="submit" class="btn btn-md mr-2 w-full">Sign Up</button>
			</div>
			<div class="mt-3 ml-0">
				<small>Already signed up? <a href="/login" class="link">Login here</a></small>
			</div>
		</form>
	</div>
</div>

<style>
	.content {
		margin-top: 120px;
	}
</style>