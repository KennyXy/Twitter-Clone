<template>
  <div>
    <label
      for=""
      v-if="label"
      class="block pl-3 ml-px text-sm font-medium text-gray-700"
      >{{ label }}</label
    >
    <div class="mt-1 ">
      <input 
      @input="event => emits ('update:modelValue' , event.target.value)"
      :value="props.modelValue" 
    :placeholder ="props.placeholder"
    :type="props.type"

      class="block px-4 w-full border-gray-300 rounded-full 
      shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm "/>


    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: null,
  },
  type : {
    type: String,
    default: 'text',

  }
});

//triiger the parent componenet whenever it has changes
const emits = defineEmits(['update:modelValue'])

</script>

<style lang="scss" scoped></style>
