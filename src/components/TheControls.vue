<script setup lang="ts">
import { computed, ref } from 'vue'
import CirclePlus from '~icons/tabler/CirclePlus'
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
  <form data-testId="controlsForm" @submit.prevent="handleSubmit">
    <div class="p-inputgroup">
      <div class="form-control">
        <div class="input-group">
          <input
            v-model="inputValue"
            type="text"
            :placeholder="$t('controlsInputPlaceholder')"
            class="input input-bordered grow"
            data-testId="controlsContentInput"
          />
          <button
            class="btn btn-primary rounded-full"
            type="submit"
            :disabled="!isValid"
          >
            <CirclePlus class="buttonIcon" />
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
