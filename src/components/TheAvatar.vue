<template>
  <img class="avatar" :src="props.src" />
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  src: {
    default: '',
    required: true,
    type: String,
  },
})
</script>