<script setup>
import { ref } from "vue";

import { useTodosStore } from "@/store";
import { todoContentIsValid } from "@/utils";

const todosStore = useTodosStore();

const { todo } = defineProps({
  todo: Object,
});

const textAreaValue = ref(todo.content);
const isEdit = ref(false);

const handleSaveTodo = () => {
  if (!todoContentIsValid(textAreaValue.value)) return;

  isEdit.value = false;
  todosStore.setContent(todo.id, textAreaValue.value);
};

const handleEditTodo = () => {
  isEdit.value = true;
};

const toggleCompleted = () => {
  todosStore.toggleCompleted(todo.id);
};
</script>

<template>
  <div class="card bg-light">
    <div class="controls">
      <label>
        <input
          class="checkbox"
          @click="toggleCompleted"
          type="checkbox"
          :checked="todo.completed"
        />Completed</label
      >
      <div>
        <button
          v-on="!isEdit ? { click: handleEditTodo } : { click: handleSaveTodo }"
        >
          {{ !isEdit ? "Edit" : "Done" }}
        </button>
        <button @click="todosStore.remove(todo.id)">Remove</button>
      </div>
    </div>
    <textarea v-if="isEdit" v-model="textAreaValue" />
    <pre v-else class="contentPre">{{ todo.content }}</pre>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--background);
  padding: 6px;
  border-radius: 6px;
}
.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.contentPre {
  word-wrap: break-word;
  margin: 0;
  padding: 0.5rem;
  font: unset;
  white-space: pre-wrap;
}

@media (max-width: 450px) {
  .controls {
    flex-direction: column;
  }
}
</style>
