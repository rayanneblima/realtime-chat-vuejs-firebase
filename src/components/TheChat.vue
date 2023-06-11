<template>
  <div class="container-sm mt-20">
    <div class="mx-5">
      <TheMessage
        v-for="({ id, text, userPhotoURL, userName, userId }) in messages"
        :key="id"
        :is-sender="userId === user?.uid"
        :name="userName"
        :photo-url="userPhotoURL"
      >
        {{ text }}
      </TheMessage>
    </div>
  </div>

  <div ref="bottom" class="mt-20" />

  <div class="bottom">
    <div class="container-sm">
      <form v-if="isLoggedIn" @submit.prevent="send">
        <input v-model="message" placeholder="Message" required />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { watch, nextTick, ref } from 'vue'
import { useAuth, useChat } from '../../firebase'
import TheMessage from '@/components/TheMessage.vue'
import SendIcon from '@/components/SendIcon.vue'

const { user, isLoggedIn } = useAuth()
const { messages, sendMessage } = useChat()

const bottom = ref(null)
const message = ref('')

const send = () => {
  sendMessage(message.value)
  message.value = ''
}

watch(messages, () => {
  nextTick(() => {
    bottom.value?.scrollIntoView({ behavior: 'smooth' })
  })
}, { deep: true })
</script>