<template>
  <MainSection title="Search" :loading="loading">
    <Head>
      <Title> Search / Twitter </Title>
    </Head>

    <TweetListFeed :tweets="searchTweets" />
  </MainSection>
</template>

<script setup>
import { useRoute } from 'vue-router';

const { getTweets } = useTweets();

const loading = ref(false);

const searchTweets = ref([]);
//let searchQuery = useRoute().query.q;
const route = useRoute();
let searchQuery =  route.query.q;

async function updateFeed() {
loading.value = true;
searchQuery = route.query.q;

  try {
    const { tweets } = await getTweets({
      query : searchQuery
    });

    searchTweets.value = tweets;

  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }

}
//watch(() => useRoute().fullPath  , () => updateFeed())


watchEffect(() => {
  updateFeed()
});

onBeforeMount(async () => {
  console.log(useRoute().fullPath)
  updateFeed() 
  console.log(searchQuery);
}); 
</script>
