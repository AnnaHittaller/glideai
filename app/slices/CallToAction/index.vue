<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.CallToActionSlice>());
</script>

<template>
  <BoundedContainer
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="py-32 md:py-40"
  >
    <div
      class="absolute -z-10 aspect-square w-full max-w-sm rounded-full bg-sky-500/50 blur-[160px] filter mix-blend-screen"
    />
    <div
      class="glassContainer rounded-lg bg-gradient-to-b from-gray-800 to-gray-900 p-4 md:rounded-xl"
    >
      <GlideIcon class="size-24" />
    </div>

    <PrismicRichText
      :field="slice.primary.heading"
      :components="{
        heading2: {
          as: 'h2',
          class:
            'text-center text-5xl text-balance mt-6 font-medium  max-w-xl mx-auto',
        },
      }"
    />
    <di class="flex flex-wrap gap-8 mt-8">
      <PrismicLink
        v-for="link in slice.primary.ctas"
        :key="link.key"
        :field="link"
        class="buttonLink"
      />
    </di>
    <!--
	💡 Use the Prismic MCP server with your code editor
	📚 Docs: https://prismic.io/docs/ai#code-with-prismics-mcp-server
-->
  </BoundedContainer>
</template>
