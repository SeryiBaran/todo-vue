<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';

import { useTodosStore } from '@/store';
import { todoContentIsValid } from '@/utils';

import { IconButton } from '@/components';

import type { Todo } from '@/store/types';

const todosStore = useTodosStore();

const { todo } = defineProps<{
  todo: Todo;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const inputValue = ref(todo.content);
const isValid = computed(() => todoContentIsValid(inputValue.value));
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
    <div class="card shadow" :class="{ completed: todo.completed }">
      <div class="controls">
        <div
          class="isCompletedCheckbox custom-checkbox custom-checkbox-success"
        >
          <input
            @click="toggleCompleted"
            type="checkbox"
            :checked="todo.completed"
            class="checkbox checkbox-primary checkbox-lg"
            :id="'checkbox' + todo.id"
          />
          <label :for="'checkbox' + todo.id">
            <span class="label-text">Completed</span>
          </label>
        </div>
        <IconButton
          v-on="!isEdit ? { click: handleEditTodo } : { click: handleSaveTodo }"
          :disabled="!isValid"
          :icon="!isEdit ? 'mdi:pencil-circle' : 'mdi:check-circle'"
          :class="isEdit ? 'btn-success' : ''"
        />
        <IconButton
          class="btn-danger"
          @click="todosStore.remove(todo.id)"
          icon="mdi:delete-circle"
        />
      </div>
      <input
        ref="inputRef"
        class="editInput form-control"
        v-if="isEdit"
        v-model="inputValue"
      />
      <p v-else class="contentPre">
        {{ todo.content }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin: 0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contentPre {
  margin: 0;
  word-break: break-all;
}

.isCompletedCheckbox {
  margin-right: auto;
}

.card.completed .contentPre {
  text-decoration: line-through;
}

@media (max-width: 420px) {
  .controls {
    flex-direction: column;
  }
  .controls > * {
    width: 100%;
  }
}
</style>
