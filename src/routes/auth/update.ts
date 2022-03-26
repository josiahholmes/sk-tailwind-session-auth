import { getUserByEmail, updateUser } from "./_api";
import sha1 from 'sha1';

export const patch = async (event) => {
    let errors = [];
    const { name, newName, email, newEmail, newPassword, password, confirmPassword } = await event.request.json();
    const user = await getUserByEmail(email);
    if (user.password !== sha1(password)) errors.push('Password incorrect.')
    if (password !== confirmPassword) errors.push('Password fields must match.');
    if (!newName && !newEmail && !newPassword) errors.push('Update cannot be completed without a new name, email, or password.');
    if (errors.length) {
        return {
            status: 400,
            body: {
                errors
            }
        }
    }
    await updateUser({ name, newName, email, newEmail, newPassword });
    return {
        status: 200,
        body: { message: 'Successfully updated profile!' }
    }
}