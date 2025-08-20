<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
router.push('/Login')
</script>

<template>
  <RouterView />
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
  display: flex;
  height: 100vh;
}
</style>
