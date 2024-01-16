<script setup>
import { storeToRefs } from 'pinia';

import { useKnowledgeStore } from '@/stores/knowledge-hub';

const
  storeKnowledge = useKnowledgeStore(),
  { filter } = storeToRefs(storeKnowledge),

  btns = [
    { label: "All contents", value: "" },
    { label: "Wet season", value: "Wet" },
    { label: "Dry season", value: "Dry" }
  ];
</script>

<template>
  <v-btn-toggle class="text-primary-black" v-model="filter" color="primary-700" mandatory density="compact"
    variant="flat">
    <v-btn v-for="btn in btns" :key="btn.value" class="text-primary-black b-200" selected-class="text-white"
      :value="btn.value" height="32" border :ripple="false">{{ $t(btn.label) }}</v-btn>
  </v-btn-toggle>
</template>
