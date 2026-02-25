<script setup lang="ts">
import type { Content } from "@prismicio/client";
import gsap from "gsap";

defineProps(
  getSliceComponentProps<Content.HeroSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) return;

  const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

  tl.fromTo(
    ".hero__heading",
    { scale: 0.5, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.4 },
  );
  tl.fromTo(
    ".hero__body",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2 },
    "-=0.6",
  );
  tl.fromTo(
    ".hero__cta",
    { scale: 1.5, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.3 },
    "-=0.8",
  );
  tl.fromTo(
    ".hero__image",
    { y: 1000, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.3 },
    "+=0.3",
  );
  tl.fromTo(
    ".hero__glow",
    { scale: 0.5, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.8 },
    "-=1",
  );

  gsap.to(".hero__glow-one", {
    ease: "power2.inOut",
    repeat: -1,
    repeatDelay: 0,
    keyframes: [
      { top: "0%", left: "33%", duration: 0 },
      { top: "33%", left: "33%", duration: 2 },
      { top: "33%", left: "0%", duration: 3 },
      { top: "0%", left: "0%", duration: 2 },
      { top: "0%", left: "33%", duration: 3 },
    ],
  });

  gsap.to(".hero__glow-two", {
    ease: "power2.inOut",
    repeat: -1,
    repeatDelay: 0,
    keyframes: [
      { top: "33%", left: "0%", duration: 0 },
      { top: "0%", left: "0%", duration: 2 },
      { top: "0%", left: "33%", duration: 3 },
      { top: "33%", left: "33%", duration: 2 },
      { top: "33%", left: "0%", duration: 3 },
    ],
  });
});
</script>

<template>
  <BoundedContainer
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div class="hero text-center relative">
      <GlideGrid />
      <h1
        class="hero__heading mx-auto max-w-3xl text-balance text-5xl font-medium md:text-7xl"
      >
        <PrismicText :field="slice.primary.heading" />
      </h1>
      <p class="hero__body mx-auto mt-6 max-w-md text-balance !text-gray-300">
        <PrismicText :field="slice.primary.body" />
      </p>
      <div class="flex flex-wrap gap-8 justify-center mt-8">
        <PrismicLink
          v-for="link in slice.primary.ctas"
          :key="link.key"
          class="hero__cta buttonLink"
          :field="link"
        />
      </div>
      <div class="hero__image glassContainer mt-16 w-fit">
        <div
          class="hero__glow hero__glow-one absolute left-1/3 top-0 -z-10 h-2/3 w-2/3 bg-sky-700/50 blur-3xl md:blur-[120px] filter mix-blend-screen"
        />
        <div
          class="hero__glow hero__glow-two absolute left- top-1/3 -z-10 h-2/3 w-2/3 bg-teal-600/50 blur-3xl md:blur-[120px] filter mix-blend-screen"
        />
        <PrismicImage :field="slice.primary.image" class="rounded-lg" />
      </div>
    </div>

    <!--
	💡 Use the Prismic MCP server with your code editor
	📚 Docs: https://prismic.io/docs/ai#code-with-prismics-mcp-server
-->
  </BoundedContainer>
</template>
