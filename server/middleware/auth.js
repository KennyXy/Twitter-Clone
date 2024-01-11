import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../utils/jwt.js";
import { getUserById } from "../db/users";

export default defineEventHandler(async(event) => {
    //we can fill this by other endpoints that needs to run this code before getting to them
    const endpoints = ["/api/auth/user", "/api/user/tweets", "/api", "/api/:id"];

    const isHandledByThisMiddleware = endpoints.some((endpoint) => {

        const pattern = new UrlPattern(endpoint);
        return pattern.match(event.req.url);
    });

    if (!isHandledByThisMiddleware) {
        //    console.log("Not handled by middleware");
        return;
    }




    const token =
        // event.req.headers["authorization"] &&
        event.req.headers["authorization"].split(" ")[1];

    console.log("event ////////////////////////" + event.req.headers["authorization"])
        //console.log("token " + token)


    const decoded = decodeAccessToken(token);
    console.log("decoded " + decoded)

    if (!decoded) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: "Unauthorizedddd",
            })
        );
    }

    try {
        const userId = decoded.userId;
        const user = await getUserById(userId);

        event.context.auth = { user };

        //  console.log(event.req.url)



    } catch (error) {
        return;
    }
});