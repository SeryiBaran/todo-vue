import { ref } from 'vue';

import { defineStore } from 'pinia';
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2';

import { generateId, patchObjectInArray } from '@/utils';
import { storage } from './idbStorage';
import type { Todo, TodosArray, TodoPatch } from './types';

export const persist = createPersistedStatePlugin({ storage });

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<TodosArray>([]);

  function create(data: Omit<Todo, 'id' | 'completed'>) {
    todos.value.push({
      id: generateId(),
      completed: false,
      ...data,
    });
  }

  function remove(id: Todo['id']) {
    todos.value = todos.value.filter((todo: Todo) => todo.id !== id);
  }

  function patch(id: Todo['id'], patcher: (todo: Todo) => TodoPatch) {
    todos.value = patchObjectInArray(
      todos.value,
      (todo: Todo) => todo.id === id,
      patcher,
    );
  }

  function setContent(id: Todo['id'], newContent: Todo['content']) {
    patch(id, () => ({ content: newContent }));
  }

  function toggleCompleted(id: Todo['id']) {
    patch(id, todo => ({
      completed: !todo.completed,
    }));
  }

  return {
    todos,
    create,
    remove,
    setContent,
    toggleCompleted,
  };
});
