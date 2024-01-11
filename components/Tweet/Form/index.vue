<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center p-6">
      <UISpinner/>
    </div>

    <div v-else>
      <TweetItem   :tweet="props.replyTo"  v-if="props.replyTo && props.showReply" hideActions/>
      <TweetFormInput :placeholder="props.placeholder" :user="props.user" @onSubmit="handleFormSubmit" />

    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['onSuccess'])
const loading = ref(false)
const { postTweet } = useTweets();

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  placeholder: {
    type : String , 
    default: 'What\'s happening?'
  },
  replyTo: {
    type : Object,
    default : null

  },
  showReply : {
    type : Boolean ,
    default : false
  }
});

async function handleFormSubmit(data) {
  console.log(data)
  loading.value=true
  try {
    const response = await postTweet({
      text : data .text,
      mediaFiles : data.mediaFiles,
      replyTo : props.replyTo?.id
    });
    console.log(response)
    console.log(response.tweetData.id)

    emits('onSuccess' , response.tweetData)
   //alert("jghirdtjhoprthj^port");
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false;
  }
}
</script>
