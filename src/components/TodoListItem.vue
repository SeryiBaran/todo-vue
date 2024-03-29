<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

import PencilIcon from '~icons/tabler/Pencil'
import TrashIcon from '~icons/tabler/Trash'
import SquareRoundedCheckIcon from '~icons/tabler/SquareRoundedCheck'

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
const isCompletedCheckbox = ref()

function handleSaveTodo() {
  isEdit.value = false
  todosStore.setContent(todo.id, textareaValue.value)
}

async function handleEditTodo() {
  isEdit.value = true

  await nextTick()

  // Обновление значения textarea, на случай если оно было изменено в store
  textareaValue.value = todo.content
}

function handleEditButtonClick() {
  if (isEdit.value) handleSaveTodo()
  else handleEditTodo()
}

function handleToggleCompleted() {
  const checkbox = isCompletedCheckbox
  todosStore.setIsCompleted(todo.id, checkbox.value.checked)
}
</script>

<template>
  <div class="card w-full bg-base-200 text-start shadow-md">
    <div class="card-body gap-4">
      <textarea
        v-if="isEdit"
        v-model="textareaValue"
        class="textarea-bordered textarea"
        :auto-resize="true"
      />
      <p
        v-else
        class="content"
        :class="{ completed: todo.completed }"
        data-testId="todoListItemContentParagraph"
      >
        {{ todo.content }}
      </p>
      <div class="controls flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <input
            ref="isCompletedCheckbox"
            :checked="todo.completed"
            type="checkbox"
            class="checkbox-primary checkbox h-12 w-12"
            @change="handleToggleCompleted()"
          />
          <button
            class="btn-primary btn grow"
            :class="{ 'btn-success': isEdit }"
            :disabled="!isValid"
            @click="handleEditButtonClick"
          >
            <PencilIcon v-if="!isEdit" class="buttonIcon" />
            <SquareRoundedCheckIcon v-else class="buttonIcon" />
          </button>
          <button
            class="btn-error btn grow"
            @click="todosStore.remove(todo.id)"
          >
            <TrashIcon class="buttonIcon" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
