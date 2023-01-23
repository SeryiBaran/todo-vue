import { defineStore } from 'pinia';
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2';

import { generateId, patchObjectInArray } from '@/utils';

import { storage } from './idbStorage';

import type { Todo, TodosList, TodosStore, TodoPatch } from './types';

export const persist = createPersistedStatePlugin({ storage });

export const useTodosStore = defineStore('todos', {
  state: (): TodosStore => ({ todos: [] }),

  actions: {
    create(data: Omit<Todo, 'id' | 'completed'>) {
      this.todos.push({
        id: generateId(),
        completed: false,
        ...data,
      });
    },

    remove(id: Todo['id']) {
      this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
    },

    patch(id: Todo['id'], patcher: (todo: Todo) => TodoPatch) {
      this.todos = patchObjectInArray(
        this.todos,
        (todo: Todo) => todo.id === id,
        patcher,
      );
    },

    setContent(id: Todo['id'], newContent: Todo['content']) {
      this.patch(id, () => ({ content: newContent }));
    },

    toggleCompleted(id: Todo['id']) {
      this.patch(id, todo => ({
        completed: !todo.completed,
      }));
    },
  },
});
