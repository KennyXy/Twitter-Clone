import { sendError } from "h3"
import { getRefreshTokenByToken } from "../../db/refreshTokens.js"
import { decodeRefreshToken, generateTokens } from "~/server/utils/jwt.js"
import { getUserById } from "../../db/users.js"

export default defineEventHandler(async(event) => {
    //get refresh token from the cookies 
    const cookies = parseCookies(event)

    const refreshToken = cookies.refresh_token

    //see if refresh token actuall has value in it
    if (!refreshToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'No Refresh Token Available'
        }))
    }

    //verrify if refresh token is present in the database
    const rToken = await getRefreshTokenByToken(refreshToken)


    //see if rtoken actuall has value in it
    if (!rToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'No Refresh Token Available'
        }))
    }


    const token = decodeRefreshToken(refreshToken)

    try {
        const user = await getUserById(token.userId)
        const { accessToken } = generateTokens(user)
        return { access_token: accessToken }

    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        }))



    }


    return {
        hello: token
    }
})