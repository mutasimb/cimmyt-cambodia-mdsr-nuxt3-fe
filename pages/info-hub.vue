<script setup>
import { storeToRefs } from 'pinia';

import { useKnowledgeStore } from '@/stores/knowledge-hub';

const
  storeKnowledge = useKnowledgeStore(),
  { dataDisplay } = storeToRefs(storeKnowledge);
</script>

<template>
  <v-container class="justify-start" fluid>
    <v-row>
      <v-col>
        <div class="h-300-heavy text-primary-neutral-900">Knowledge Hub</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <InfoTags />
      </v-col>
    </v-row>
    <v-row id="info-hub-cards-row">
      <v-col v-for="item in dataDisplay" :key="item.title" cols="12" md="6" lg="4">
        <v-card class="info-item" variant="flat" :href="item.url" download target="_blank">
          <v-avatar color="grey" rounded="0" class="w-100" style="height: 240px;">
            <v-img cover :src="item.thumb" />
          </v-avatar>

          <v-divider />

          <v-card-item>
            <v-card-title class="d-flex align-center h-300-heavy">{{ $t(item.title) }}</v-card-title>
            <v-card-subtitle class="d-flex align-center h-300-heavy">by {{ item.by }}</v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
#info-hub-cards-row {
  .info-item {
    border: 2px solid #E1E6EF;
  }
}
</style>
