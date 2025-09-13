<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
onMounted(() => {
  forrbidenContextMenu()
  router.push('/Home/HomePage')
})
// 禁用右键菜单
function forrbidenContextMenu() {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })
}
</script>

<template>
  <RouterView />
</template>

<style>

</style>
