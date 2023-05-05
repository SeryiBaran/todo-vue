<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Textarea from 'primevue/textarea'
import Checkbox from 'primevue/checkbox'

import { useTodosStore } from '@/store'
import { todoContentIsValid } from '@/utils'
import type { Todo } from '@/store/types'

const { todo } = defineProps<{
  todo: Todo
}>()

const todosStore = useTodosStore()

const textareaValue = ref(todo.content)
const isValid = computed(() => todoContentIsValid(textareaValue.value))
const isEdit = ref(false)
const isCompleted = ref(todo.completed)

function handleSaveTodo() {
  isEdit.value = false
  todosStore.setContent(todo.id, textareaValue.value)
}

function handleEditTodo() {
  isEdit.value = true
}

function handleEditButtonClick() {
  if (isEdit.value) handleSaveTodo()
  else handleEditTodo()
}

function setIsCompleted(state: boolean) {
  todosStore.setIsCompleted(todo.id, state)
}

watch(isCompleted, () => {
  setIsCompleted(isCompleted.value)
})
</script>

<template>
  <Card class="card" :class="{ completed: todo.completed }">
    <template #content>
      <Textarea
        v-if="isEdit"
        v-model="textareaValue"
        class="textarea input"
        :auto-resize="true"
      />
      <p v-else class="content">
        {{ todo.content }}
      </p>
    </template>
    <template #footer>
      <div class="controls">
        <div class="field-checkbox">
          <Checkbox
            v-model="isCompleted"
            :input-id="`checkbox-${todo.id}`"
            :binary="true"
          />
          <label :for="`checkbox-${todo.id}`">Completed</label>
        </div>
        <div class="buttons">
          <Button
            class="grow"
            :class="{ 'p-button-success': isEdit }"
            :disabled="!isValid"
            :icon="`pi ${!isEdit ? 'pi-pencil' : 'pi-check-circle'}`"
            @click="handleEditButtonClick"
          />
          <Button
            class="p-button-danger"
            icon="pi pi-trash"
            @click="todosStore.remove(todo.id)"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.card {
  width: 100%;
  text-align: left;
}

.textarea {
  width: 100%;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

.content {
  word-break: break-all;
}

.card.completed .content {
  text-decoration: line-through;
}
</style>
