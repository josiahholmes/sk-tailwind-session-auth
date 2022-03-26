import { removeSession } from "./_api";
import * as cookie from 'cookie';

export const get = async (event) => {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    if (cookies.session_id) {
        await removeSession(cookies.session_id);
        return {
            status: 200,
            headers: {
                'Set-Cookie': cookie.serialize('session_id', '', {
                    path: '/',
                    expires: new Date(0),
                })
            }
        }
    }
}