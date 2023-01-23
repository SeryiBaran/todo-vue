export type Todo = {
  id: string;
  content: string;
  completed: boolean;
};

export type TodosList = Todo[];

export type TodosStore = { todos: TodosList };

export type TodoPatch = Partial<Omit<Todo, 'id'>>;
