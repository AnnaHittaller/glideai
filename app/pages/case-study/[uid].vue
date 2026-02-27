<script setup lang="ts">
import { asImageSrc } from "@prismicio/client";
import { components } from "~/slices";
import gsap from "gsap";

const route = useRoute();
const { client } = usePrismic();
const { data: page } = await useAsyncData(
  `[case_study-uid-${route.params.uid}]`,
  () => client.getByUID("case_study", route.params.uid as string),
);

useSeoMeta({
  title: page.value?.data.meta_title ?? undefined,
  ogTitle: page.value?.data.meta_title ?? undefined,
  description: page.value?.data.meta_description ?? undefined,
  ogDescription: page.value?.data.meta_description ?? undefined,
  ogImage: computed(() => asImageSrc(page.value?.data.meta_image ?? undefined)),
});

onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) return;

  gsap.fromTo(
    ".caseStudyImage",
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.inOut",
    },
  );
});
</script>

<template>
  <main>
    <BoundedContainer>
      <header class="relative text-center place-items-center">
        <h1 class="text-5xl font-medium text-balance md:text-7xl">
          <PrismicText :field="page?.data.company" />
          <RichTextGlideText class="block text-lg"
            >Case Study</RichTextGlideText
          >
        </h1>

        <PrismicRichText
          :field="page?.data.description"
          :components="{
            paragraph: {
              as: 'p',
              class: 'mb-4 mt-8 max-w-xl text-lg text-center text-gray-300',
            },
          }"
        />
        <PrismicImage
          v-if="$prismic.isFilled.image(page?.data.cover)"
          :field="page?.data.cover"
          class="caseStudyImage rounded-lg max-w-4xl w-full"
        />
        <GlideGrid />
      </header>
    </BoundedContainer>
    <SliceZone
      :slices="page?.data.slices ?? []"
      :components="components"
      class="mx-auto mt-12 md:mt-16"
    />
  </main>
</template>
