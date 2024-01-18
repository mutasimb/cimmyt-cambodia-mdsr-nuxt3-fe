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

  machines = ref([
    { value: "Lonheng Seeder", label: "Lunheng Seeder" },
    { value: "Thai Kit", label: "Thai Kid Seeder" },
    { value: "Drum Seeder", label: "Drum Seeder" },
    { value: "Eli Seeder", label: "Eli seeder" }
  ]),

  onExit = () => { isFilterOn.value = false; };
</script>

<template>
  <div class="d-flex flex-row justify-space-between align-center pa-4">
    <div class="h-300-heavy text-primary-neutral-900">{{ $t('Filter') }}</div>

    <v-sheet class="cursor-pointer" :height="24" :width="24" @click="onExit">
      <v-img src="/img/remove.png" :height="24" :width="24" />
    </v-sheet>
  </div>

  <v-divider />

  <v-expansion-panels id="provider-filter-panels" variant="accordion" multiple>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <div class="p-100-light">{{ $t('Area') }}</div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-select v-model="filterAdm1" color="primary-700" :label="$t('Province')" density="comfortable" clearable
          variant="outlined" :items="itemsAdm1" @update:model-value="() => { filterAdm2 = null; filterAdm3 = null; }" />
        <v-select v-model="filterAdm2" color="primary-700" :label="$t('District')" density="comfortable" clearable
          variant="outlined" :items="itemsAdm2" @update:model-value="() => { filterAdm3 = null; }" />
        <v-select v-model="filterAdm3" color="primary-700" :label="$t('Commune')" density="comfortable" clearable
          variant="outlined" :items="itemsAdm3" />
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <div class="p-100-light">{{ $t('Machines') }}</div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-checkbox v-for="machine in machines" :key="machine" color="primary-700" density="compact"
          v-model="filterMachine" :label="$t(machine.label)" :value="machine.value" />
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
