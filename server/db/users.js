import { prisma } from ".";

import bcrypt from "bcrypt";

//Creation of a user
export const createUser = (userData) => {
    const finalUserData = {
        ...userData,
        password: bcrypt.hashSync(userData.password, 10),
    };

    return prisma.user.create({
            data: finalUserData,
            select: {
                id: true,
                email: true,
                name: true,
                username: true,
                password: false,
                profileImage: true,
                createdAt: false,
                updatedAt: false,
            },
        })
        .then((user) => {
            // Omitting the password field from the returned user object
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
};


// Search a user by its username
export const getUserByUsername = (username) => {
    return prisma.user.findUnique({
        where: {
            username: username
        }

    })
}


export const getUserById = (userId) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}