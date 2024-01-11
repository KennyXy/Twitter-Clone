<template>
    <div>

        
        <TweetItem :tweet="props.tweet"/>

        <TweetForm placeholder = "Tweet your reply" :user="props.user"  :reply-to="props.tweet" @on-success="handleFormSuccess"/>
      
        
        <TweetListFeed :tweets="replies" />
    </div>
</template>

<script setup>


const props = defineProps({
    tweet : {
        type : Object,
        required : true
    },
    user : {
        type : Object,
        required : true
    }
})


const replies = computed(() => props.tweet?.replies || [])
onBeforeMount(() => {
    console.log(props.tweet?.replies)
})
const {tweetIdUrl , setTweetIdUrl} = useUrls()



function handleFormSuccess(tweet){
    console.log(tweetIdUrl.value)
    tweetIdUrl.value =`/status/${tweet.id}`
    console.log(tweetIdUrl.value)
    setTweetIdUrl(`/status/${tweet.id}`)
    console.log(tweetIdUrl.value)




    navigateTo({
        path: `/status/${tweet.id}`
    })
}
</script>

