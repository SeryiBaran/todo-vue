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
  <form @submit.prevent="handleSubmit" class="flex gap-2 max-sm:flex-col">
    <div
      class="flex w-full"
      :class="{ tooltip: !isValid}"
      data-tip="Input is empty/contains only spaces!"
    >
      <input
        class="grow input input-bordered"
        v-model="inputValue"
        type="text"
      />
    </div>
    <IconButton
      class="grow"
      icon="mdi:plus-circle"
      type="submit"
      :disabled="!isValid"
    />
  </form>
</template>
