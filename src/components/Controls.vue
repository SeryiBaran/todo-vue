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
    class="input-group sm:input-group-vertical"
  >
    <input class="grow form-control" v-model="inputValue" type="text" />
    <div class="input-group-append">
      <IconButton icon="mdi:plus-circle" type="submit" :disabled="!isValid" />
    </div>
  </form>
</template>
