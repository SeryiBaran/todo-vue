<script setup lang="ts">
import { useTodosStore } from '@/store';
import { TheControls, TheTodoList } from '@/components';

const todosStore = useTodosStore();
</script>

<template>
  <div class="wrapper">
    <h1>Vue.js TODO</h1>
    <TheControls />
    <TheTodoList :todos="todosStore.todos" />
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 35rem;
  margin: 0 auto;
  padding: 1rem;
  gap: 3rem;
  text-align: center;
}
</style>
