<script setup lang="ts">
import { ref } from 'vue';

import { useTodosStore } from '@/store';
import { todoContentIsValid } from '@/utils';

import { IconButton } from '@/components';

const inputValue = ref('');

const todosStore = useTodosStore();

const handleSubmit = () => {
  todosStore.create({ content: inputValue.value });
  inputValue.value = '';
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex gap-2">
    <input class="input input-bordered" v-model="inputValue" type="text" />
    <IconButton
      icon="mdi:plus-circle"
      type="submit"
      :disabled="!todoContentIsValid(inputValue)"
    />
  </form>
</template>

<style>
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
