<script setup lang="ts">
const app = useAppConfig()
</script>

<template>
  <div>
    <UHeader :title="app.title" />
    <UMain>
      <UContainer class="mt-6">
        <slot />
      </UContainer>
    </UMain>
    <UFooter />
  </div>
</template>
