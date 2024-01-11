<template>
    <div>

        <div v-if="isEmptyArray" class="p-4">
            <p class="text-center text-gray-500"> 
                No tweets :c
            </p>

        </div>

        <div v-else v-for="tweet in props.tweets" :key="tweet.id" @click.native="redirect(tweet)"
        class="pb-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300
        " :class="[twitterBorderColor , defaultTransition]">
            <TweetItem  :tweet="tweet" :compact="true" />
              
        </div>

    </div>
</template>

<script setup>

const props = defineProps({
    tweets : {
        type: Array,
        required: true
    }
})

const {twitterBorderColor , defaultTransition} = useTailwindConfig()

const isEmptyArray = computed(() => props.tweets.length === 0 )

const {setTweetIdUrl , tweetIdUrl} = useUrls()

function redirect (tweet){
    tweetIdUrl.value = `/status/${tweet.id}`
    setTweetIdUrl(`/status/${tweet.id}`)
    navigateTo({
        path : `/status/${tweet.id}`
    })
}
</script>

