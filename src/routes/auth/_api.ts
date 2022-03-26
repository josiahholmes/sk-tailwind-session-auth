import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const getUserByEmail = async (email) =>
	await prisma.user.findUnique({
		where: { email }
	});

export const registerUser = async (creds) => {
	const existingUser = await prisma.user.findFirst({
		where: { email: creds.email }
	});
	if (existingUser) {
		return {
			status: 409,
			body: { message: 'User already exists' }
		};
	}
	await prisma.user.create({
		data: {
			name: creds.name,
			email: creds.email,
			password: sha1(creds.password)
		}
	});
};

export const updateUser = async (creds) => {
	const { name, newName, email, newEmail, newPassword } = creds;
	if (newPassword) {
		await prisma.user.update({
			where: { email },
			data: {
				name: newName ? newName : name,
				email: newEmail ? newEmail : email,
				password: sha1(newPassword)
			}
		});
	} else {
		await prisma.user.update({
			where: { email },
			data: {
				name: newName ? newName : name,
				email: newEmail ? newEmail : email
			}
		});
	}
	
	// Update transfer jobs with new name -- if applicable
	if (newName) {
		await prisma.transfer.updateMany({
			where: { user: name },
			data: {
				user: newName
			}
		});
	}

	// Update session information with new email
	if (newEmail) {
		await prisma.session.updateMany({
			where: { email },
			data: {
				email: newEmail
			}
		});
	}
};

export const createSession = async (email) =>
	await prisma.session.create({
		data: { id: uuidv4(), email }
	});

export const getSession = async (id) => await prisma.session.findFirst({ where: { id }});

export const removeSession = async (id) => {
    const session = await prisma.session.findFirst({ where: { id }});
    if (!session) {
        return {
            status: 404,
            body: { message: 'Session not found' }
        }
    }
    await prisma.session.delete({ where: { id }});
};