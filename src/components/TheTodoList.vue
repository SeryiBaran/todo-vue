<script setup lang="ts">
import { computed } from 'vue'
import TodoListItem from '@/components/TodoListItem.vue'

import type { TodosArray } from '@/store/types'

const props = defineProps<{
  todos: TodosArray
}>()

const reversedTodos = computed(() => props.todos.slice().reverse())
</script>

<template>
  <div class="list">
    <TransitionGroup name="list">
      <TodoListItem
        v-for="todo in reversedTodos"
        :key="todo.id"
        class="item"
        :todo="todo"
      />
      <p
        v-if="!(props.todos.length > 0)"
        key="no-todos-text"
        class="no-todos-text"
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
  align-items: center;
  position: relative;
  gap: 1rem;
}

.item,
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
}
</style>
