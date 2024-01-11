<template>
  <div class="h-screen flex flex-col">
    <div
      class="p-2 ml-2 sm:ml-0 my-2 w-min rounded-full hover:bg-blue-50 dark:hover:bg-white/20"
      :class="defaultTransition"
    >
      <NuxtLink to="/">
        <Icon
          name="entypo-social:twitter"
          size="40"
          class="text-blue-400 dark:text-white"
        ></Icon>
      </NuxtLink>
    </div>

    <div class="ml-2 sm:ml-0 space-y-3">
      <SidebarLeftTab active>
        <template v-slot:icon>
          <!--mdi:home-outline-->

          <Icon name="mdi:home" size="27" class="text-dark" />
        </template>

        <template v-slot:name> Home </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <!--streamline:sign-hashtag-solid-->
        <template v-slot:icon>
          <Icon
            name="material-symbols:rocket-launch-outline"
            size="27"
            class="text-dark"
          />
        </template>

        <template v-slot:name> Explore </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <Icon
            name="material-symbols:notifications-outline"
            size="27"
            class="text-dark"
          />
        </template>

        <template v-slot:name> Notifications </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <!--teenyicons:envelope-solid-->
          <Icon
            name="material-symbols:inbox-outline"
            size="27"
            class="text-dark"
          />
        </template>

        <template v-slot:name> Messages </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <!--mdi:bookmark-->
          <Icon name="mdi:bookmark-outline" size="27" class="text-dark" />
        </template>

        <template v-slot:name> Bookmarks </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <Icon
            name="material-symbols:docs-outline"
            size="25"
            class="text-dark"
          />
        </template>

        <template v-slot:name> Lists </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <Icon
            name="material-symbols:person-outline"
            size="25"
            class="text-dark"
          />
        </template>

        <template v-slot:name> Profile </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <Icon
            name="material-symbols:more-horiz"
            size="25"
            class="text-dark"
          />
        </template>

        <template v-slot:name> More </template>
      </SidebarLeftTab>

      <div class="hidden xl:block">
        <UIButton liquid size="lg" @on-click="emits('onTweet')">
          <span class="font-bold">Tweet</span>
        </UIButton>
      </div>

      <div class="block xl:hidden">
        <UIButton @on-click="emits('onTweet')">
          <div class="w-6 h-6 font-bold">
            <Icon
              name="material-symbols:edit-outline-rounded"
              size="25"
              class="text-dark"
            />
          </div>
        </UIButton>
      </div>
    </div>

    <div
      class="flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800"
      :class="defaultTransition"
      @click="emits('onLogout')"
    >
      <div class="flex flex-row">
        <img
          :src="props.user.profileImage"
          alt="222"
          class="w-10 h-10 rounded-full"
        />
        <div class="flex-col hidden ml-2 xl:block">
          <h1 class="text-sm font-bold text-gray-800 dark:text-white">
            {{ user.name }}
          </h1>

          <p class="text-sm text-gray-400">@{{ user.username }}</p>
        </div>
      </div>

      <div class="hidden ml-auto xl:block">
        <Icon name="ic:round-keyboard-arrow-down" size="32" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { defaultTransition } = useTailwindConfig();

const outlineProp = "-outline";

const emits = defineEmits(["onTweet" , "onLogout" ]);

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>
<style lang="scss" scoped></style>
