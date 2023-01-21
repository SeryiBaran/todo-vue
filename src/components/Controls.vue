<script setup>
import { ref } from "vue";

import { useTodosStore } from "@/store";

const inputValue = ref("");

const todosStore = useTodosStore();

const handleSubmit = (evt) => {
	evt.preventDefault();

	todosStore.create({ content: inputValue.value });
	inputValue.value = "";
};
</script>

<template>
	<form v-on:submit="handleSubmit">
		<input v-model="inputValue" type="text" />
		<button type="submit">Добавить</button>
	</form>
</template>

<style>
form {
	display: flex;
}
input {
	display: block;
	width: 100%;
}
</style>
