<script setup>
import { ref } from "vue";

import { useTodosStore } from "@/store";

const inputValue = ref("");

const todosStore = useTodosStore()

const handleSubmit = (evt) => {
	evt.preventDefault();

	todosStore.create({ content: inputValue.value });
	inputValue.value = "";
};
</script>

<template>
	<form
		v-on:submit="handleSubmit"
		class="d-flex gap-2 flex-column flex-sm-row"
	>
		<input v-model="inputValue" class="form-control" type="text" />
		<button class="btn btn-primary" type="submit">Добавить</button>
	</form>
</template>
