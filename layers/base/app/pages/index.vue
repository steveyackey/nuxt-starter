<script setup lang="ts">
import { useAuthStore } from "~~/layers/auth/app/stores/auth"

const authStore = useAuthStore()
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold">
      Home
    </h1>
    <p>{{ authStore.user }}</p>
    <div v-if="authStore.loading">
      Loading...
    </div>
    <div v-else-if="authStore.signedIn">
      <UButton @click="authStore.signOut">
        Sign out
      </UButton>
    </div>
    <div v-else>
      <UButton @click="authStore.signIn">
        Sign in
      </UButton>
    </div>
  </div>
</template>
