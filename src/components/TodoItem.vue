<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import { useTodosStore } from '@/store';
import { todoContentIsValid } from '@/utils';

import IconButton from '@/components/IconButton.vue';

import type { Todo } from '@/store/types';

const todosStore = useTodosStore();

const { todo } = defineProps<{
  todo: Todo;
}>();

const inputRef = ref(null);
const inputValue = ref(todo.content);
const isEdit = ref(false);

const handleSaveTodo = () => {
  isEdit.value = false;
  todosStore.setContent(todo.id, inputValue.value);
};

const handleEditTodo = () => {
  isEdit.value = true;
};

const toggleCompleted = () => {
  todosStore.toggleCompleted(todo.id);
};

watchEffect(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
});
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
            :disabled="!todoContentIsValid(inputValue)"
            :icon="!isEdit ? 'mdi:pencil-circle' : 'mdi:check-circle'"
          />
          <IconButton
            @click="todosStore.remove(todo.id)"
            icon="mdi:delete-circle"
          />
        </div>
      </div>
      <input
        ref="inputRef"
        class="editInput"
        v-if="isEdit"
        v-model="inputValue"
      />
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
  .controls,
  .buttons {
    flex-direction: column;
  }
  .buttons {
    width: 100%;
  }
}
</style>
