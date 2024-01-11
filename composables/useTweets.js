export default () => {
    const usePostTweetModal = () => useState('post_tweet_modal', () => false)

    const closePostTweetModal = () => {
        const postTweetModal = usePostTweetModal()
        postTweetModal.value = false

    }

    const useReplyTweet = () => useState('reply_tweet', () => null)


    const setReplyTo = (tweet) => {
        const replyTweet = useReplyTweet()
        replyTweet.value = tweet
    }


    const openPostTweetModal = (tweet = null) => {
        const postTweetModal = usePostTweetModal()
        postTweetModal.value = true
        setReplyTo(tweet)

    }



    const postTweet = (formData) => {
        const form = new FormData();

        form.append("text", formData.text);
        if (formData.replyTo) {
            form.append("replyTo", formData.replyTo)
        }

        formData.mediaFiles.forEach((mediaFile, index) => {
            form.append("media_file_" + index, mediaFile);
        });

        return useFetchApi("/api/user/tweets", {
            method: "POST",
            body: form,
        });
    };

    const getTweets = (params = {}) => {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await useFetchApi("api/", {
                    method: "GET",
                    params
                });

                //  console.log(response);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    const getTweetById = (tweetId) => {
        console.log(tweetId)
            // if (tweetId === "") {
        console.log("inside if")
            //  console.log(useRoute().fullPath);
            //   const newTweetId = useRoute().fullPath.split("/").pop(); // Split by '/' and get the last part
            // console.log("tweetId = " + newTweetId);
        return new Promise(async(resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/${tweetId}`);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
        // console.log("tweetId " + tweetId)
        /* } else {
            console.log("else")
            return new Promise(async(resolve, reject) => {
                try {
                    const response = await useFetchApi(`/api/${tweetId}`);
                    resolve(response);
                } catch (error) {
                    console.log(error)
                    reject(error);
                }
            });
        } */

        // console.log(tweetId)

    };

    return {
        postTweet,
        getTweets,
        getTweetById,
        closePostTweetModal,
        usePostTweetModal,
        openPostTweetModal,
        useReplyTweet
    };
};