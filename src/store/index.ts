import { ref } from 'vue'

import { defineStore } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

import type { Todo } from './types'
import { generateId } from '@/utils'

export const persist = createPersistedStatePlugin()

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([])

  function create(data: Omit<Todo, 'id' | 'completed'>) {
    todos.value.push({
      id: generateId(),
      completed: false,
      ...data,
    })
  }

  function remove(id: Todo['id']) {
    todos.value = todos.value.filter((todo: Todo) => todo.id !== id)
  }

  function setContent(id: Todo['id'], newContent: Todo['content']) {
    const findedTodo = todos.value.find((todo) => todo.id === id)

    if (findedTodo) findedTodo.content = newContent
  }

  function setIsCompleted(id: Todo['id'], newIsCompleted: boolean) {
    const findedTodo = todos.value.find((todo) => todo.id === id)

    if (findedTodo) findedTodo.completed = newIsCompleted
  }

  return {
    todos,
    create,
    remove,
    setContent,
    setIsCompleted,
  }
})
