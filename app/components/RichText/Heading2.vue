<template>
  <h2
    :class="[
      'max-w-3xl',
      'mx-auto',
      'text-balance',
      'text-center',
      'text-5xl',
      'md:text-7xl',
      'font-medium',
      className,
    ]"
  >
    <slot />
  </h2>
</template>

<script setup lang="ts">
defineProps<{ className?: string }>();
</script>
