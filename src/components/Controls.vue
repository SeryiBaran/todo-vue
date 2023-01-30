<script setup lang="ts">
import { ref, computed } from 'vue';

import { useTodosStore } from '@/store';
import { todoContentIsValid } from '@/utils';

import { IconButton } from '@/components';

const inputValue = ref('');
const isValid = computed(() => todoContentIsValid(inputValue.value));

const todosStore = useTodosStore();

const handleSubmit = () => {
  todosStore.create({ content: inputValue.value });
  inputValue.value = '';
};
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="input-group max-sm:input-group-vertical"
  >
    <input class="grow input input-bordered" v-model="inputValue" type="text" />
    <IconButton icon="mdi:plus-circle" type="submit" :disabled="!isValid" />
  </form>
</template>
