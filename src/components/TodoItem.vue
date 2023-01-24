<script setup lang="ts">
import { ref } from 'vue';

import { useTodosStore } from '@/store';
import { todoContentIsValid } from '@/utils';

import IconButton from '@/components/IconButton.vue';

import type { Todo } from '@/store/types';

const todosStore = useTodosStore();

const { todo } = defineProps<{
  todo: Todo;
}>();

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
  <div>
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
          <IconButton
            v-on="
              !isEdit ? { click: handleEditTodo } : { click: handleSaveTodo }
            "
            :disabled="!todoContentIsValid(editInputValue)"
            :icon="!isEdit ? 'mdi:pencil-circle' : 'mdi:check-circle'"
          />
          <IconButton
            @click="todosStore.remove(todo.id)"
            icon="mdi:delete-circle"
          />
        </div>
      </div>
      <input class="editInput" v-if="isEdit" v-model="editInputValue" />
      <pre v-else class="contentPre">{{ todo.content }}</pre>
    </div>
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

.card.completed .contentPre {
  text-decoration: line-through;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
