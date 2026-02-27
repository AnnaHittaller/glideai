<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.RichTextSlice>());
</script>

<template>
  <BoundedContainer>
    <div class="prose prose-invert prose-slate w-full">
      <PrismicRichText :field="slice.primary.content" />
    </div>
  </BoundedContainer>
</template>
