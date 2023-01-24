<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  icon: string;
}>();
</script>

<template>
  <button class="icon-button">
    <Icon :icon="icon" height="30px" width="30px" />
  </button>
</template>

<style>
.icon-button {
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
