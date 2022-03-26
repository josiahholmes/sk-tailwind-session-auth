import { createSession, getUserByEmail } from "./_api";
import sha1 from 'sha1';
import * as cookie from 'cookie';


export const post = async (event) => {
    const { email, password } = await event.request.json();
    const user = await getUserByEmail(email);
    if (!user || user.password !== sha1(password)) {
        return {
            status: 401,
            body: { message: 'Incorrect user or password' }
        }
    };

    const { id } = await createSession(email);
    return {
        status: 200,
        headers: {
            'Set-Cookie': cookie.serialize('session_id', id, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7
            })
        },
        body: { message: 'Successfully signed in!' }
    }
}