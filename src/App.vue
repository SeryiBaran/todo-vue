<script setup lang="ts">
import TheControls from '@/components/TheControls.vue'
import TheTodoList from '@/components/TheTodoList.vue'
import { useTodosStore } from '@/store'

const todosStore = useTodosStore()
</script>

<template>
  <div class="wrapper max-w-md">
    <h1 class="text-4xl mt-20">Vue.js TODO</h1>
    <TheControls />
    <TheTodoList :todos="todosStore.todos" />
  </div>
</template>

<style scoped>
.wrapper {
  @apply min-h-screen flex flex-col mx-auto p-4 gap-12 text-center;
}
</style>
