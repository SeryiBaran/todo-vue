export type Todo = {
  id: string;
  content: string;
  completed: boolean;
};

export type TodosArray = Todo[];

export type TodoPatch = Partial<Omit<Todo, 'id'>>;
