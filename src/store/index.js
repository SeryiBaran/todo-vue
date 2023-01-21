import { defineStore } from "pinia";

import { generateId } from "@/utils";

export const useTodosStore = defineStore("todos", {
	state: () => ({ todos: [] }),

	actions: {
		create(data) {
			this.todos.push({
				id: generateId(),
				...data,
			});
		},
		remove(id) {
			this.todos = this.todos.filter((todo) => todo.id !== id);
		},
		patch(id, data) {
			console.log(id, data)
			this.todos = this.todos.map((todo) =>
				todo.id === id ? { ...todo, ...data } : todo
			);
		},
	},
});
