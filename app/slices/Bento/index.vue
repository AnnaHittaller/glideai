<script setup lang="ts">
import type { Content } from "@prismicio/client";
import RichTextGlideText from "~/components/RichText/GlideText.vue";
import RichTextHeading2 from "~/components/RichText/Heading2.vue";

defineProps(getSliceComponentProps<Content.BentoSlice>());
</script>

<template>
  <BoundedContainer
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <PrismicRichText
      :components="{
        em: RichTextGlideText,
        heading2: RichTextHeading2,
      }"
      :field="slice.primary.heading"
    />
    <PrismicRichText
      :field="slice.primary.body"
      :components="{
        paragraph: {
          as: 'p',
          class: 'mx-auto mt-6 max-w-md text-balance text-center text-gray-300',
        },
      }"
    />
    <div
      class="mt-16 grid max-w-4xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10"
    >
      <article
        v-for="(item, index) in slice.primary.bento"
        :key="index"
        class="glassContainer grid grid-rows-subgrid gap-4 rounded-lg bg-gray-950/60 p-4 bg:bg-gray-100/10 row-span-3"
        :class="item.is_wide ? 'md:col-span-2' : ''"
      >
        <PrismicRichText
          :field="item.title"
          :components="{
            heading3: { as: 'h3', class: 'text-2xl font-medium' },
          }"
        />
        <PrismicRichText
          :field="item.body"
          :components="{
            paragraph: {
              as: 'p',
              class: 'max-w-md text-balance text-gray-300',
            },
          }"
        />
        <PrismicImage
          :field="item.image"
          class="max-h-36 w-full object-cover"
        />
      </article>
    </div>
    <!--
	💡 Use the Prismic MCP server with your code editor
	📚 Docs: https://prismic.io/docs/ai#code-with-prismics-mcp-server
-->
  </BoundedContainer>
</template>
