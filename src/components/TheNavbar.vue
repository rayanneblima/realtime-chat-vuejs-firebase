<template>
  <nav>
    <div>
      <h1><strong>Vue</strong> Chat App</h1>

      <div v-if="isLoggedIn" class="login">
        <TheAvatar :src="user.photoURL" />

        <button class="text-gray-400 hover:text-white" @click="signOut">
          Sign Out
        </button>
      </div>

      <button v-else class="bg-green-500 hover:bg-green-600" @click="signIn">
        Sign In
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useAuth } from '../../firebase'
import TheAvatar from '@/components/TheAvatar.vue'

const { user, isLoggedIn, signIn, signOut } = useAuth()
</script>

<style scoped>
</style>