<script setup>
import { storeToRefs } from 'pinia';

import { useProvidersStore } from '@/stores/providers';

const
  storeProviders = useProvidersStore(),

  {
    isFilterOn,
    filterMachine,
    filterAdm1,
    filterAdm2,
    filterAdm3,
    itemsAdm1,
    itemsAdm2,
    itemsAdm3
  } = storeToRefs(storeProviders),

  machines = ref(['Drum Seeder', 'Lonheng Seeder', 'Eli Seeder', 'Thai Kit']),

  onExit = () => { isFilterOn.value = false; };
</script>

<template>
  <div class="d-flex flex-row justify-space-between align-center pa-4">
    <div class="h-300-heavy text-primary-neutral-900">Filter</div>

    <v-sheet class="cursor-pointer" :height="24" :width="24" @click="onExit">
      <v-img src="/img/remove.png" :height="24" :width="24" />
    </v-sheet>
  </div>

  <v-divider />

  <v-expansion-panels id="provider-filter-panels" variant="accordion" multiple>
    <!-- <v-expansion-panel>
      <v-expansion-panel-title>
        <div class="p-100-light">Distance</div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-radio-group v-model="filterDistance" density="comfortable" color="primary-700">
          <v-radio class="p-100-light" label="All" value=""></v-radio>
          <v-radio class="p-100-light" label="< 5 km" value="5km"></v-radio>
          <v-radio class="p-100-light" label="< 10 km" value="10km"></v-radio>
          <v-radio class="p-100-light" label="< 15 km" value="15km"></v-radio>
        </v-radio-group>
      </v-expansion-panel-text>
    </v-expansion-panel> -->
    <v-expansion-panel>
      <v-expansion-panel-title>
        <div class="p-100-light">Area</div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-select v-model="filterAdm1" color="primary-700" label="Province" density="comfortable" clearable
          variant="outlined" :items="itemsAdm1" @update:model-value="() => { filterAdm2 = null; filterAdm3 = null; }" />
        <v-select v-model="filterAdm2" color="primary-700" label="District" density="comfortable" clearable
          variant="outlined" :items="itemsAdm2" @update:model-value="() => { filterAdm3 = null; }" />
        <v-select v-model="filterAdm3" color="primary-700" label="Commune / Township" density="comfortable" clearable
          variant="outlined" :items="itemsAdm3" />
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <div class="p-100-light">Machine</div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-checkbox v-for="machine in machines" :key="machine" color="primary-700" density="compact"
          v-model="filterMachine" :label="machine" :value="machine" />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style>
#provider-filter-panels {
  .v-expansion-panel>.v-expansion-panel__shadow {
    box-shadow: none;
  }
}
</style>
