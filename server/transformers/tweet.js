import { mediFileTransformer } from "./mediaFiles.js"
import { authorTransformer } from "./author.js"
import human from "human-time"
export const tweetTransformer = (tweet) => {

    return {
        id: tweet.id,
        text: tweet.text,
        mediaFiles: !!tweet.mediaFiles ? tweet.mediaFiles.map(mediFileTransformer) : [],
        author: !!tweet.author ? authorTransformer(tweet.author) : null,
        replies: !!tweet.replies ? tweet.replies.map(tweetTransformer) : [],
        replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
        repliesCount: !!tweet.replies ? tweet.replies.length : 0,
        postedAtHuman: human(tweet.createdAt)

    }

}