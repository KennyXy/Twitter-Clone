import { prisma } from "."

/* export const createTweet = (tweetData) => {
    console.log("tweetData in createTweet endpoint  : \n" + JSON.stringify(tweetData))

    return prisma.tweet.create({
        data: tweetData
    })
} */
export const createTweet = (tweetData) => {
    console.log("tweetData in createTweet endpoint  : \n" + JSON.stringify(tweetData));

    // Ensure replyToId is a single value or null
    tweetData.replyToId = Array.isArray(tweetData.replyToId) ? tweetData.replyToId[0] : tweetData.replyToId;
    console.log(tweetData)
    return prisma.tweet.create({
        data: tweetData
    });
}

export const getTweets = (params = {}) => {

    console.log("get Tweets params are :  " + JSON.stringify(params))

    return prisma.tweet.findMany({
        ...params

    })
}

export const getTweetById = (tweetId, params = {}) => {
    return prisma.tweet.findUnique({
        ...params,
        where: {
            ...params.where,
            id: tweetId
        },


    })
}