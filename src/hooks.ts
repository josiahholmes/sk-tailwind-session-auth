import * as cookie from 'cookie';
import { getSession as getSessionFromApi, getUserByEmail } from './routes/auth/_api';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	if (cookies.session_id) {
		const session = await getSessionFromApi(cookies.session_id);
		if (session) {
			event.locals.user = {
				email: session.email,
				name: (await getUserByEmail(session.email)).name
			};
		}
		return resolve(event);
	}
	event.locals.user = null;
	return resolve(event);
};

export const getSession = (event) => {
	return event?.locals?.user
		? {
				user: {
					email: event.locals.user.email,
					name: event.locals.user.name
				}
		  }
		: {};
};