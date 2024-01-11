<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <div v-if="isAuthLoading">
        <LoadingPage />
      </div>

      <!--   App   -->
      <div v-else-if="user" class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto md:px-6 lg:max-w-7xl lg:px-8 md:gap-3 lg:gap-5"
        >
          <!--  Left Sidebar  -->

          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft :user="user" @on-tweet="handleOpenTweetModal" 
              @on-logout="handleLogout"/>
            </div>
          </div>

          <!--  Main Content  -->

          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view />
          </main>

          <!--  Right Sidebar  -->

          <div class="hidden col-span-12 md:block md:col-span-3 xl:col-span-4">
            <SidebarRight></SidebarRight>
          </div>
        </div>
      </div>

      <AuthPage v-else />
      <UIModal :isOpen="postTweetModal" @on-close="handleModalClose">
      
        <TweetForm :replyTo="replyTweet" showReply :user="user" v-on:on-success="handleFormSuccess"  />
      </UIModal>
    </div>
  </div>
</template>

<script setup>

const darkMode = ref(false);

const { useAuthUser, initAuth, useAuthLoading , logout } = useAuth();
const {closePostTweetModal ,usePostTweetModal , openPostTweetModal ,useReplyTweet } = useTweets()
const isAuthLoading = useAuthLoading();

const user = useAuthUser();
const postTweetModal = usePostTweetModal()

const emitter = useEmitter()
const eventBus = useEmitter();
const replyTweet = useReplyTweet()

emitter.$on('replyTweet' , (tweet) =>{
  openPostTweetModal(tweet)
})

emitter.$on('toggleDarkMode' , ()=>{
  darkMode.value = !darkMode.value
})
onBeforeMount(() => {
  initAuth();
});

function handleFormSuccess(tweet) {
  closePostTweetModal()
  eventBus.$emit('refTweet' ,tweet)
}

function handleModalClose(){
  closePostTweetModal()

}
function handleOpenTweetModal(){
  openPostTweetModal(null)

}

function handleLogout() {
  logout()
  }
</script>
