//Login Endpoint , takes in the username and the password

import { getUserByUsername } from "../../db/users.js"
import bcrypt from "bcrypt"
import { generateTokens, sendRefreshToken } from "../../utils/jwt.js"
import { createRefreshToken } from "../../db/refreshTokens.js"
import { sendError } from "h3"

export default defineEventHandler(async(event) => {

    const body = await readBody(event)

    const { username, password } = body

    if (!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid input'
        }))
    }

    //is the user registered ?

    const user = await getUserByUsername(username)
    if (!user) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }


    //compare passwords?

    const doesThePasswordMatch = await bcrypt.compare(password, user.password)

    if (!doesThePasswordMatch) {

        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Passwords doesnt match'
        }))

    }
    //generate tokens

    //access token
    //refresh token

    const { accessToken, refreshToken } = generateTokens(user)

    // Create a modified user object without including the sensitive information
    const userWithoutPassword = {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        profileImage: user.profileImage,
        // Add other fields you want to include
    };

    //Save Refresh Token in the db 

    await createRefreshToken({
        token: refreshToken,
        userId: user.id

    })




    //Add Refresh Token as http Cookie only 
    sendRefreshToken(event, refreshToken)



    return {
        access_Token: accessToken,
        user: userWithoutPassword


    }
})