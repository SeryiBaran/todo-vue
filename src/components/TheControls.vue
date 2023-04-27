<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { useTodosStore } from '@/store'
import { todoContentIsValid } from '@/utils'

const inputValue = ref('')
const isValid = computed(() => todoContentIsValid(inputValue.value))

const todosStore = useTodosStore()

function handleSubmit() {
  todosStore.create({ content: inputValue.value })
  inputValue.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="p-inputgroup">
      <InputText v-model="inputValue" />
      <Button icon="pi pi-check-circle" type="submit" :disabled="!isValid" />
    </div>
  </form>
</template>
