<script setup lang="ts">
import { TodoItem } from '@/components';

import type { TodosArray } from '@/store/types';

const props = defineProps<{
  todos: TodosArray;
}>();
</script>

<template>
  <div class="list">
    <TransitionGroup name="list">
      <TodoItem
        class="list-item"
        v-for="todo in props.todos.slice().reverse()"
        :todo="todo"
        :key="todo.id"
      />
      <p
        class="no-todos-text"
        v-if="!(props.todos.length > 0)"
        key="no-todos-text"
      >
        No Todo's!
      </p>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
  position: relative;
  box-sizing: border-box;
}

.list-item,
.no-todos-text {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
