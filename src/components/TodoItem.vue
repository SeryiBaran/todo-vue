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
    <div
      class="card gap-2 bg-body-secondary flex flex-col shadow-xl p-2 rounded-md"
      :class="{ completed: todo.completed }"
    >
      <textarea
        ref="inputRef"
        class="editArea form-control"
        v-if="isEdit"
        v-model="inputValue"
      />
      <p
        v-else
        class="contentPre break-words p-2 font-sans whitespace-pre-wrap"
      >
        {{ todo.content }}
      </p>
      <div class="d-flex flex-col flex-sm-row justify-content-end gap-2">
        <input
          @click="toggleCompleted"
          type="checkbox"
          :checked="todo.completed"
          class="btn-check"
          id="isCompletedCheck"
        />
        <label for="isCompletedCheck" class="btn btn-sm btn-outline-success">
          Is completed
        </label>
        <IconButton
          class="btn-sm"
          v-on="!isEdit ? { click: handleEditTodo } : { click: handleSaveTodo }"
          :disabled="!isValid"
          :icon="!isEdit ? 'mdi:pencil-circle' : 'mdi:check-circle'"
        />
        <IconButton
          class="btn-sm"
          @click="todosStore.remove(todo.id)"
          icon="mdi:delete-circle"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo {
}

.editArea {
  min-height: 8rem;
  resize: none;
}

.card.completed .contentPre {
  text-decoration: line-through;
}
</style>
