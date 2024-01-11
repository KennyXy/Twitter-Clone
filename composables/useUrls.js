// useUrls.js
import { ref } from 'vue';

export default () => {
    const tweetIdUrl = useState('tweetIdUrl', () => ref(''));
    const currentTweet = useState('currentTweet');

    const setCurrentTweet = (tweet) => {
        currentTweet.value = tweet
    }

    const setTweetIdUrl = (url) => {
        tweetIdUrl.value = url;
    };

    return { tweetIdUrl, setTweetIdUrl, currentTweet, setCurrentTweet };
};