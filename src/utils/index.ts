import type { Todo } from '@/store/types'

// Проверка валидности содержимого для контента в todo
export const todoContentIsValid = (content: string) => !!content.trim()

export function findTodoById(todos: Todo[], id: Todo['id']) {
  return todos.find((todo) => todo.id === id)
}
