<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  icon: string;
}>();
</script>

<template>
  <button class="button btn btn-primary">
    <Icon :icon="icon" height="auto" width="auto" />
  </button>
</template>

<style scoped>
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
