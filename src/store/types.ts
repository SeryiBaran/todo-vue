export interface Todo {
  id: string
  content: string
  completed: boolean
}

export type TodoPatch = Partial<Omit<Todo, 'id'>>
