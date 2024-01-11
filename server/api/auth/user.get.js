export default defineEventHandler(async(event) => {


    const response = event.context.auth
    if (response.user) {
        const userWithoutPassword = {
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
            name: response.user.name,
            profileImage: response.user.profileImage,
        };
        return {
            user: userWithoutPassword
        }

    }

    return {
        user: null
    }



})