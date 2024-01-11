import type { Icon } from '#build/components';
<template>
  <div @click.stop.prevent="emits('onClick')" class="flex items-center text-gray-400 cursor-pointer group">
    <div
      :class="` ${defaultTransition} p-2 group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400 rounded-full dark:group-hover:bg-opacity-20`"
    >
      <!-- <Icon name="mdi:chat-processing" class="w-5 h-5"></Icon> -->

      <slot name="icon" :classes="`w-${props.size} h-${props.size}`" />
    </div>

      <span :class="`ml-1 text-sm group-hover:text-${props.color}-400`">
        <slot name="default" classes="w-5 h-5" />
      </span>
  </div>
</template>

<script setup>
const { defaultTransition } = useTailwindConfig();
const emits = defineEmits(['onClick'])
const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  size : {
    type : Number,
    default: 5,
  }
});
</script>
