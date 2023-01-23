import { defineStore } from 'pinia';
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2';

import { generateId } from '@/utils';

import { storage } from './idbStorage';

export type Todo = {
  id: string;
  content: string;
  completed: boolean;
};

export type TodosList = Todo[];

export type TodosStore = { todos: Todo[] };

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

    patch(id: Todo['id'], callback: (todo: Todo) => any) {
      const index = this.todos.findIndex((todo: Todo) => todo.id === id);
      const todo: Todo = this.todos[index];
      const patch = callback(todo);

      this.todos[index] = { ...todo, ...patch };
    },

    setContent(id: Todo['id'], newContent: Todo['content']) {
      this.patch(id, () => ({ content: newContent }));
    },

    toggleCompleted(id: Todo['id']) {
      this.patch(id, (todo: Todo) => ({ completed: !todo.completed }));
    },
  },
});
