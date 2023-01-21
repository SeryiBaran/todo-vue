import { defineStore } from "pinia";

import { generateId } from "@/utils";

export const useTodosStore = defineStore("todos", {
	state: () => ({ todos: [] }),

	actions: {
		create(data) {
			this.todos.push({
				id: generateId(),
				completed: false,
				...data,
			});
		},
		remove(id) {
			this.todos = this.todos.filter((todo) => todo.id !== id);
		},
		patch(id, callback) {
			const index = this.todos.findIndex((todo) => todo.id === id);
			const todo = this.todos[index];
			const patch = callback(todo);
			this.todos[index] = { ...todo, ...patch };
		},
		setContent(id, newContent) {
			this.patch(id, () => ({ content: newContent }));
		},
		toggleCompleted(id) {
			this.patch(id, (todo) => ({ completed: !todo.completed }));
		},
	},
});
