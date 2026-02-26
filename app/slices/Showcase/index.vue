<script setup lang="ts">
import type { Content } from "@prismicio/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

defineProps(getSliceComponentProps<Content.ShowcaseSlice>());

onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".showcase-heading",
    {
      y: 100,
    },
    {
      y: 0,
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".showcase-heading",
        start: "top center",
        toggleActions: "play pause resume reverse",
      },
    },
  );

  gsap.fromTo(
    ".showcase-glow",
    { scale: 0.7, opacity: 0.1 },
    {
      scale: 1,
      opacity: 1,
      ease: "power2.inOut",
      duration: 1,
      scrollTrigger: {
        trigger: ".showcase-glow",
        start: "top center",
        toggleActions: "play pause resume reverse",
      },
    },
  );
});
</script>

<template>
  <BoundedContainer
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div
      class="showcase-glow absolute -z-10 aspect-video w-full max-w-2xl rounded-full bg-sky-700 blur-[120px] filter mix-blend-screen"
    />
    <PrismicRichText
      :field="slice.primary.heading"
      :components="{
        heading2: {
          as: 'h2',
          class:
            'showcase-heading max-w-3xl mx-auto text-balance text-center text-5xl font-medium md:text-7xl',
        },
      }"
    />
    <article
      class="relative mt-16 grid items-center gap-8 rounded-xl border border-sky-50/20 bg-gradient-to-b from-gray-50/15 to-gray-50/5 px-8 py-8 backdrop-blur-sm lg:grid-cols-3 lg:gap-0 lg:py-12"
    >
      <div class="gridBackground" />
      <div>
        <figure class="w-fit rounded-lg bg-sky-900 p-4 text-3xl">
          <Icon :name="slice.primary.icon" class="block" />
        </figure>
        <PrismicRichText
          :field="slice.primary.subheading"
          :components="{
            heading3: {
              as: 'h3',
              class: 'text-2xl font-normal mt-6',
            },
          }"
        />
        <PrismicRichText
          :field="slice.primary.body"
          :components="{
            paragraph: {
              as: 'p',
              class: 'prose prose-invert mt-4 max-w-xl',
            },
          }"
        />
        <PrismicLink :field="slice.primary.cta" class="buttonLink mt-6" />
      </div>
      <PrismicImage
        :field="slice.primary.image"
        class="opacity-90 shadow-2xl lg:col-span-2 lg:pt-8"
        :class="
          slice.variation === 'reversed'
            ? 'lg:order-1 lg:translate-x-[15%]'
            : 'lg:-order-1 lg:translate-x-[-15%]'
        "
      />
    </article>
    <!--
	💡 Use the Prismic MCP server with your code editor
	📚 Docs: https://prismic.io/docs/ai#code-with-prismics-mcp-server
-->
  </BoundedContainer>
</template>

<style scoped>
.gridBackground {
  background-image: url("/assets/grid-pattern.png");
  position: absolute;
  inset: 0;
  background-repeat: repeat;
  z-index: -1;
  background-position: center;
  opacity: 0.15;
  mask-image: radial-gradient(circle at 60% 50%, black 10%, transparent 40%);
}
</style>
