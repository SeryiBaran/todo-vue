import { ref } from 'vue'
import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import type { Todo } from './types'
import { findTodoById } from '@/utils'

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([])

  function create(data: Omit<Todo, 'id' | 'completed'>) {
    todos.value.push({
      id: nanoid(),
      completed: false,
      ...data,
    })
  }

  function remove(id: Todo['id']) {
    todos.value = todos.value.filter((todo: Todo) => todo.id !== id)
  }

  function setContent(id: Todo['id'], newContent: Todo['content']) {
    const findedTodo = findTodoById(todos.value, id)

    if (findedTodo) findedTodo.content = newContent
  }

  function setIsCompleted(id: Todo['id'], newIsCompleted: boolean) {
    const findedTodo = findTodoById(todos.value, id)

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
