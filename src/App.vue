<script setup lang="ts">
import { useTodosStore } from '@/store';
import { Controls, TodoList } from '@/components';

const todosStore = useTodosStore();
</script>

<template>
  <div class="wrapper mt-1">
    <h1 class="text-4xl">Vue.js TODO</h1>
    <Controls />
    <TodoList :todos="todosStore.todos" />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  max-width: 35rem;
  margin: 0 auto;
  padding: 1rem;
  gap: 3rem;
  text-align: center;
}
</style>
