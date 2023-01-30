<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  icon: string;
}>();
</script>

<template>
  <button class="btn btn-primary">
    <Icon :icon="icon" height="2em" width="2em" />
  </button>
</template>
