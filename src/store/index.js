import { defineStore } from "pinia";

import { generateId } from "@/utils";

const initialValue = [];

export const useTodosStore = defineStore("todos", {
	state: () => ({ todos: initialValue }),

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
