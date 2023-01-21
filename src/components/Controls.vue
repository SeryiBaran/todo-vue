<script setup>
import { ref } from "vue";

import { useTodosStore } from "@/store";
import { todoContentIsValid } from "@/utils";

const inputValue = ref("");

const todosStore = useTodosStore();

const handleSubmit = (evt) => {
	evt.preventDefault();

	todosStore.create({ content: inputValue.value });
	inputValue.value = "";
};
</script>

<template>
	<form v-on:submit="handleSubmit" class="form">
		<input class="input" v-model="inputValue" type="text" />
		<button type="submit" :disabled="!todoContentIsValid(inputValue)">Create</button>
	</form>
</template>

<style>
.form {
	display: flex;
}
.input {
	display: block;
	flex-grow: 1;
}

@media (max-width: 450px) {
	.form {
		flex-direction: column;
	}
}
</style>
