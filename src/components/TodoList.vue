<script setup>
import TodoItem from "@/components/TodoItem.vue";

const props = defineProps({
  todos: Array,
});
</script>

<template>
  <div class="list">
    <TodoItem
      v-for="todo in props.todos.slice().reverse()"
      :todo="todo"
      :key="todo.id"
    />
    <p v-if="!props.todos.length > 0">No Todo's!</p>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}
</style>
