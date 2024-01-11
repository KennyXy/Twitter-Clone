<template>
        <MainSection title="Home" :loading=loading>

          <Head>
            <Title> Home / Twitter </Title>
          </Head>

          <div class="border-b" :class="twitterBorderColor">
            <TweetForm :user="user" v-on:on-success="handleFormSuccess"/>

          </div>

          <TweetListFeed :tweets="homeTweets"/>




         
        </MainSection>
</template>

<script setup>

const {twitterBorderColor} = useTailwindConfig()
const {getTweets} = useTweets()

const loading = ref(false)

const {useAuthUser} = useAuth()
const user = useAuthUser()

const homeTweets = ref([])
const {tweetIdUrl , setTweetIdUrl} = useUrls()
const eventBus = useEmitter();

eventBus.$on('refTweet' , (tweet) =>{
  updateFeed ()
  console.log("i am here ")
})

// ... other methods
async function updateFeed (){
    //After Tweeting 
    loading.value = true
  try {
    const {tweets} = await getTweets()

    homeTweets.value = tweets
    
  } catch (error) {
    console.log(error)
    
  }finally{
    loading.value = false
  }

}

//eventBus.$on('tweetPosted',console.log("ifseghjer^p"));


function   handleFormSuccess(tweet){
  console.log(tweetIdUrl.value)
    tweetIdUrl.value =`/status/${tweet.id}`
    console.log(tweetIdUrl.value)
    setTweetIdUrl(`/status/${tweet.id}`)
    console.log(tweetIdUrl.value)
 /*  navigateTo({
    path: `/status/${tweet.id}`
  })    */
  updateFeed()
}

 onBeforeMount(async () => {
  loading.value = true
  try {
    const {tweets} = await getTweets()

    homeTweets.value = tweets
    
  } catch (error) {
    console.log(error)
    
  }finally{
    loading.value = false
  }

})


</script>

