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
    <div class="card-body d-grid gap-2">
      <div class="d-grid gap-2">
        <button
          @click="todosStore.remove(props.todo.id)"
          class="btn btn-danger"
        >
          Завершено
        </button>
        <button
          v-on="!isEdit ? { click: handleEditTodo } : { click: handleSaveTodo }"
          class="btn btn-primary"
          :class="{ 'btn-success': isEdit }"
        >
          {{ !isEdit ? "Изменить" : "Готово" }}
        </button>
        <textarea v-if="isEdit" v-model="textAreaValue" class="form-control" />
        <pre v-else class="contentPre">{{ props.todo.content }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contentPre {
  word-wrap: break-word;
  margin: 0;
  padding: 0.5rem;
  font: unset;
  white-space: pre-wrap;
}
</style>
