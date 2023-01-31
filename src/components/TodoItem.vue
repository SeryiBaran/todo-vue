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
      class="card gap-2 bg-base-300 flex flex-col shadow-xl p-2 rounded-md"
      :class="{ completed: todo.completed }"
    >
      <input
        ref="inputRef"
        class="editInput input"
        v-if="isEdit"
        v-model="inputValue"
      />
      <pre
        v-else
        class="contentPre break-words p-2 font-sans whitespace-pre-wrap"
        >{{ todo.content }}</pre
      >
      <div class="flex items-center justify-between max-sm:flex-col">
        <label class="label cursor-pointer gap-1">
          <input
            @click="toggleCompleted"
            type="checkbox"
            :checked="todo.completed"
            class="checkbox checkbox-primary checkbox-lg"
          />
          <span class="label-text">Completed</span>
        </label>
        <div
          class="gap-2 flex flex-wrap justify-center max-sm:flex-col max-sm:w-full"
        >
          <IconButton
            class="grow"
            v-on="
              !isEdit ? { click: handleEditTodo } : { click: handleSaveTodo }
            "
            :disabled="!isValid"
            :icon="!isEdit ? 'mdi:pencil-circle' : 'mdi:check-circle'"
          />
          <IconButton
            @click="todosStore.remove(todo.id)"
            icon="mdi:delete-circle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card.completed .contentPre {
  text-decoration: line-through;
}
</style>
