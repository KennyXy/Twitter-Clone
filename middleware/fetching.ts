// middleware/fetchData.js

// middleware/fetchTweet.js
export default defineNuxtRouteMiddleware(async (to, from ) => {
    const { getTweetById } = useTweets();
    const {setCurrentTweet , currentTweet}=useUrls()

    const tweetId = to.params.id;
    const tweet = await getTweetById(tweetId);
    setCurrentTweet(tweet)
    //console.log("The tweet inside fetching.ts === "+ currentTweet.value.tweet.id)
   // nuxt.context.tweet = tweet;
  });
  