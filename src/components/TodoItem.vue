<script setup>
import { ref } from "vue";

import { useTodosStore } from "@/store";
import { todoContentIsValid } from "@/utils";

const todosStore = useTodosStore();

const props = defineProps({
  todo: Object,
});

const textAreaValue = ref(props.todo.content);
const isEdit = ref(false);

const handleSaveTodo = () => {
  if (!todoContentIsValid(textAreaValue.value)) return;

  isEdit.value = false;
  todosStore.patch(props.todo.id, { content: textAreaValue.value });
};

const handleEditTodo = () => {
  isEdit.value = true;
};
</script>

<template>
  <div class="card bg-light">
    <button @click="todosStore.remove(props.todo.id)">
      Завершено
    </button>
    <button
      v-on="!isEdit ? { click: handleEditTodo } : { click: handleSaveTodo }"
    >
      {{ !isEdit ? "Изменить" : "Готово" }}
    </button>
    <textarea v-if="isEdit" v-model="textAreaValue" />
    <pre v-else class="contentPre">{{ props.todo.content }}</pre>
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
.contentPre {
  word-wrap: break-word;
  margin: 0;
  padding: 0.5rem;
  font: unset;
  white-space: pre-wrap;
}
textarea {
  border: 1px solid var(--focus);
}
</style>
