<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import TheControls from '@/components/TheControls.vue'
import TheTodoList from '@/components/TheTodoList.vue'
import { useTodosStore } from '@/store'

const i18n = useI18n()

const localeStore = useLocalStorage('locale', i18n.locale)

const todosStore = useTodosStore()
</script>

<template>
  <div class="wrapper max-w-md">
    <div>
      <select
        v-model="localeStore"
        class="select select-bordered w-30 mx-auto"
        data-testId="localeSelect"
      >
        <option
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
        >
          {{ locale }}
        </option>
      </select>
    </div>
    <h1 class="mt-20 text-4xl">Vue.js TODO</h1>
    <p data-testId="aboutParagraph">{{ $t('about') }}</p>
    <TheControls />
    <TheTodoList :todos="todosStore.todos" />
  </div>
</template>

<style scoped>
.wrapper {
  @apply min-h-screen flex flex-col mx-auto p-4 gap-12 text-center;
}
</style>
