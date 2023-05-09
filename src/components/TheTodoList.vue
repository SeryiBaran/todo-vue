<script setup lang="ts">
import { computed } from 'vue'
import TodoListItem from '@/components/TodoListItem.vue'
import type { Todo } from '@/store/types'

const props = defineProps<{
  todos: Todo[]
}>()

const reversedTodos = computed(() => props.todos.slice().reverse())
</script>

<template>
  <div class="list">
    <p
      v-if="!(props.todos.length > 0)"
      key="no-todos-text"
      class="no-todos-text"
    >
      {{ $t('noTodos') }}
    </p>
    <TodoListItem
      v-for="todo in reversedTodos"
      :key="todo.id"
      class="item"
      :todo="todo"
      data-testId="todoListItem"
    />
  </div>
</template>

<style scoped>
.list {
  @apply flex flex-col items-center gap-4;
}
</style>
