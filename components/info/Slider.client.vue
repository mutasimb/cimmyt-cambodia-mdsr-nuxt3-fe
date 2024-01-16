<script setup>
import { Carousel, Slide } from "vue3-carousel";

const
  props = defineProps({
    title: { type: String },
    files: { type: Array }
  }),
  breakpoints = {
    1700: { itemsToShow: 5 },
    1360: { itemsToShow: 4 },
    996: { itemsToShow: 3 },
    640: { itemsToShow: 2 }
  },

  carouselTag = ref(null),
  onNext = () => { carouselTag.value.next(); },
  onPrev = () => { carouselTag.value.prev(); };
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <div class="h-200-heavy text-black my-4">{{ props.title }}</div>
    <div>
      <v-btn variant="flat" icon="mdi-chevron-left" @click="onPrev" />
      <v-btn variant="flat" icon="mdi-chevron-right" @click="onNext" />
    </div>
  </div>
  <Carousel ref="carouselTag" :items-to-show="1" v-bind="{ snapAlign: 'start' }" :breakpoints="breakpoints">
    <Slide v-for="file in props.files" :key="file.url">
      <v-card class="rounded-lg" width="100%" height="256" :href="file.url" download target="_blank" flat
        style="border: 1px solid #e1e6ef;">
        <v-img :height="184" :src="file.ext === 'pdf' ? `/img/info-hub/pdf.png`
          : file.url" contain class="bg-neutral-200 pa-8" />
        <div class="text-left p-100-heavy mt-3 px-4 text-truncate">{{ file.title }}</div>
        <div class="text-left p-200-light px-4">By: {{ file.by }}</div>
      </v-card>
    </Slide>
  </Carousel>
</template>

<style lang="scss">
.carousel__slide {
  padding: 0 12px;
}
</style>
