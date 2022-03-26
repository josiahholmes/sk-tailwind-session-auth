/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

// Declare modules for session authentication
declare module 'uuid';
declare module 'cookie';
declare module 'sha1';
declare module 'daisyui';
declare module '@tailwindcss/forms';