<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.RichTextSlice>());
</script>

<template>
  <section>
    <PrismicRichText :field="slice.primary.content" />
  </section>
</template>

<style scoped>
section {
  max-width: 600px;
  margin: 6em auto;
}

section:deep(.codespan) {
  font-family: monospace;
}
</style>
