<script setup lang="ts">
import type { Content } from "@prismicio/client";
import RichTextHeading2 from "~/components/RichText/Heading2.vue";

const prismic = usePrismic();

const props = defineProps(
  getSliceComponentProps<Content.CaseStudiesSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const caseStudies = computed(() => {
  return props.slice.primary.case_studies
    .map((item) => item.link)
    .filter((link) =>
      prismic.isFilled.contentRelationship(link),
    ) as unknown as Content.CaseStudyDocument[]; // Has to be more specific, we ar enot fetching everything
});
</script>

<template>
  <BoundedContainer
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <PrismicRichText
      :field="slice.primary.heading"
      :components="{
        heading2: RichTextHeading2,
      }"
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
    <div class="mt-20 grid gap-16">
      <article
        v-for="(item, index) in caseStudies"
        :key="item.id"
        class="relative group grid gap-4 md:gap-8 opacity-85 transition-opacity will-change-auto duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 lg:grid-cols-3"
      >
        <div class="col-span-1 flex flex-col justify-center gap-4">
          <PrismicRichText
            :field="item.data.company"
            :components="{
              heading1: {
                as: 'h3',
                class: 'text-4xl',
              },
            }"
          />
          <PrismicRichText
            :field="item.data.description"
            :components="{
              paragraph: {
                as: 'p',
                class: ' max-w-md',
              },
            }"
          />
          <PrismicLink
            :document="item"
            class="z-10 after:absolute after:inset-0 hover:underline"
            >Read <PrismicText :field="item.data.company" /> case
            study</PrismicLink
          >
        </div>
        <div
          class="relative lg:col-span-2"
          :class="index % 2 === 0 && 'md:-order-1'"
        >
          <div class="case-study-glow -bottom-8 -left-4 bg-sky-500" />
          <div class="case-study-glow -top-8 -right-4 bg-teal-500" />
          <PrismicImage
            :field="item.data.cover"
            class="z-20 scale-[.98] rounded-xl transition-transform will-change-transform duration-300 group-hover:scale-100"
          />
        </div>
      </article>
    </div>

    <!--
	💡 Use the Prismic MCP server with your code editor
	📚 Docs: https://prismic.io/docs/ai#code-with-prismics-mcp-server
-->
  </BoundedContainer>
</template>

<style scoped>
.case-study-glow {
  @apply absolute h-1/2 w-1/2 rounded-full blur-3xl opacity-0 transition-opacity will-change-auto duration-500 group-hover:opacity-30 filter mix-blend-screen;
}
</style>
