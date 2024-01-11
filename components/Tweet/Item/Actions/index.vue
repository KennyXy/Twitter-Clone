<template>
  <div class="flex items-center justify-around w-full">


    <TweetItemActionsIcon  @on-click="emits('onCommentClick') "  color="blue"  :size="size">
      <template v-slot:icon="{ classes }">
        <Icon name="mdi:chat-processing-outline" :class="classes"></Icon>
      </template>

      <template v-slot :default v-if="showStats">
        {{props.tweet.repliesCount}}
      </template>
    </TweetItemActionsIcon>


    <TweetItemActionsIcon color="red"  :size="size">
        <template v-slot:icon="{ classes }">
          <Icon name="mdi:cards-heart-outline" :class="classes"></Icon>
        </template>
  
        <template v-slot :default v-if="showStats">
            {{generateRandomeNumber()}}
        </template>
      </TweetItemActionsIcon>

      

      <TweetItemActionsIcon color="green"  :size="size">
        <template v-slot:icon="{ classes }">
          <Icon name="ic:twotone-sync" :class="classes"></Icon>
        </template>
  
        <template v-slot :default v-if="showStats" >
         
            {{generateRandomeNumber()}}
        </template>
      </TweetItemActionsIcon>

      
      <TweetItemActionsIcon color="blue"  :size="size">
        <template v-slot:icon="{ classes }">
          <Icon name="ph:upload-simple" :class="classes"></Icon>
        </template>
  
        <template v-slot :default v-if="showStats">
          <span>
            {{generateRandomeNumber()}}
          </span>
        </template>
      </TweetItemActionsIcon>
  

  </div>
</template>

<script setup>


const props = defineProps({
    tweet : {
        type : Object,
        required : true
    },
    compact : {
      type : Boolean,
      default : false
    },
})

const emits = defineEmits(['onCommentClick'])

function generateRandomeNumber() {
    return Math.floor(Math.random() * 100)
}

const size = computed(() => props.compact ? 5 : 8)

const showStats = computed(() => props.compact)
</script>

<style lang="scss" scoped></style>
