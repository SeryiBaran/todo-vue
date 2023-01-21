<script setup>
import { ref } from "vue";

import { useTodosStore } from "@/store";
import { todoContentIsValid } from "@/utils";

const todosStore = useTodosStore();

const { todo } = defineProps({
  todo: Object,
});

const editInputValue = ref(todo.content);
const isEdit = ref(false);

const handleSaveTodo = () => {
  isEdit.value = false;
  todosStore.setContent(todo.id, editInputValue.value);
};

const handleEditTodo = () => {
  isEdit.value = true;
};

const toggleCompleted = () => {
  todosStore.toggleCompleted(todo.id);
};
</script>

<template>
  <div class="card" :class="{ completed: todo.completed }">
    <div class="controls">
      <label>
        <input
          class="checkbox"
          @click="toggleCompleted"
          type="checkbox"
          :checked="todo.completed"
        />Completed</label
      >
      <div class="buttons">
        <button
          v-on="!isEdit ? { click: handleEditTodo } : { click: handleSaveTodo }"
          :disabled="!todoContentIsValid(editInputValue)"
        >
          {{ !isEdit ? "Edit" : "Done" }}
        </button>
        <button @click="todosStore.remove(todo.id)">Remove</button>
      </div>
    </div>
    <input class="editInput" v-if="isEdit" v-model="editInputValue" />
    <pre v-else class="contentPre">{{ todo.content }}</pre>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: var(--background);
  padding: 6px;
  border-radius: 6px;
}

.card.completed {
  opacity: 0.7;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.buttons button {
  flex-grow: 1;
}

.editInput {
  border: 1px solid var(--focus);
  flex-grow: 1;
}

.contentPre {
  word-wrap: break-word;
  margin: 0;
  padding: 0.5rem;
  font: unset;
  white-space: pre-wrap;
}

.card.completed .contentPre {
  text-decoration: line-through;
}

@media (max-width: 450px) {
  .controls {
    flex-direction: column;
  }
}
</style>
