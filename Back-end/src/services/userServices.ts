import { notFoundError } from "../errors/notFound-error";
import { unauthorizedError } from "../errors/unauthorized-error";
import authRepositories from "../repositories/authRepository";
import userRepository, { UserDataBody } from "../repositories/userRepository";
import { Session, User } from "@prisma/client";

async function findUserData(userId: number): Promise<User> {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    const user = await userRepository.getUserById(userId);
    if (!user) throw notFoundError();

    return user
}

async function updateUserData(userId: number, userData: UserDataBody): Promise<User> {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    const user = await userRepository.getUserById(userId);
    if (!user) throw notFoundError();
    
    return await userRepository.putUserDataById(userId, userData);
}

async function deleteUserSession(userId: number): Promise<Session> {
    const session = await authRepositories.findSessionByUserId(userId);
    if (!session) throw unauthorizedError();

    const user = await userRepository.getUserById(userId);
    if (!user) throw notFoundError();

    return await userRepository.deleteSessionById(session.id);
}

const userServices = {
    findUserData,
    updateUserData,
    deleteUserSession
}

export default userServices;