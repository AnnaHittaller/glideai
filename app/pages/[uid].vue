<script setup lang="ts">
import { components } from "~/slices";

const { client } = usePrismic();
const route = useRoute();
const { data: page } = await useAsyncData(route.params.uid as string, () =>
  client.getByUID("page", route.params.uid as string),
);

useSeoMeta({
  title: page.value?.data.meta_title,
  ogTitle: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  ogDescription: page.value?.data.meta_description,
  ogImage: computed(() => asImageSrc(page.value?.data.meta_image)),
});
</script>

<template>
  <main>
    <SliceZone :slices="page?.data.slices ?? []" :components="components" />
  </main>
</template>
