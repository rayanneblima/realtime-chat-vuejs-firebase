<template>
  <div class="message">
    <span v-if="!props.isSender">{{ props.name }}</span>

    <div class="flex" :class="{ 'flex-row-reverse': props.isSender }">
      <TheAvatar class="mt-1" :src="props.photoUrl" />

      <div class="text w-3/4" :class="props.isSender ? 'bg-green-800' : 'bg-gray-700'">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import TheAvatar from '@/components/TheAvatar.vue';

const props = defineProps({
  isSender: {
    default: false,
    required: true,
    type: Boolean,
  },
  name: {
    default: '',
    required: true,
    type: String,
  },
  photoUrl: {
    default: '',
    required: true,
    type: String,
  },
})
</script>