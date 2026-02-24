<template>
  <footer>
    <nav
      aria-label="Footer"
      class="flex flex-col items-center justify-between gap-6 px-8 py-7 md:flex-row border-t border-gray-600"
    >
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="z-50">
          <GlideLogo />
          <span class="sr-only">{{ settings?.data.site_title }} home page</span>
        </NuxtLink>
      </div>

      <ul class="md:flex gap-6">
        <li v-for="link in settings?.data.navigation" :key="link.key">
          <PrismicLink
            :field="link"
            class="inline-flex min-h-11 items-center"
          />
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  settings?: Content.SettingsDocument;
}>();
</script>
