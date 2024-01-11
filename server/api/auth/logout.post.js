import { removeRefreshToken } from "../../db/refreshTokens"
import { sendRefreshToken } from "../../utils/jwt"
export default defineEventHandler(async(event) => {
    try {
        const cookies = parseCookies(event)
        const refreshToken = cookies.refresh_token

        //remove refresh tOKEN /
        await removeRefreshToken(refreshToken)
    } catch (error) {

    }

    sendRefreshToken(event, null)

    return { message: 'Done' }
})