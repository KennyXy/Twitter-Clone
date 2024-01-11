<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title> </Title>
      </Head>
      <TweetDetails :user="user" :tweet="tweet"/>
    </MainSection>
  </div>
</template>


<script setup>
import { useRoute } from 'vue-router';

const loading = ref(false);
const { getTweetById } = useTweets();
const tweet = ref(null);
const { useAuthUser } = useAuth();
const user = useAuthUser();

const route = useRoute();
const tweetId = computed(() => route.params.id);

watchEffect(() => {
  getTweet(tweetId.value);
});

async function getTweet(id) {
  console.log("Inside getTweet()");
  loading.value = true;
  try {
    const response = await getTweetById(id);
    tweet.value = response.tweet;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

