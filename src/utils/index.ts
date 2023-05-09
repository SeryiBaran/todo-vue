import type { Todo } from '@/store/types'

// Проверка валидности содержимого для контента в todo
export function todoContentIsValid(content: string) {
  return !!content.trim()
}

export function findTodoById(todos: Todo[], id: Todo['id']) {
  return todos.find((todo) => todo.id === id)
}
