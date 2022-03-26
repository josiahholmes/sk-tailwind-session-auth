import { createSession, getUserByEmail, registerUser } from "./_api";
import * as cookie from 'cookie';

export const post = async (event) => {
    const { name, email, password, confirmPassword } = await event.request.json();
    const user = await getUserByEmail(email);
    if (user) {
        return {
            status: 409,
            body: { message: 'User already exists' }
        }
    }
    if (password !== confirmPassword) {
        return {
            status: 400,
            body: { message: 'Password fields must match' }
        }
    }
    await registerUser({ name, email, password });
    const { id } = await createSession(email);
    return {
        status: 201,
        headers: {
            'Set-Cookie': cookie.serialize('session_id', id, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7
            })
        },
        body: { message: 'Successfully registered!' }
    }
}