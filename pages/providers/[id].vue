<script setup>
import { storeToRefs } from 'pinia';

import { useProvidersStore } from '@/stores/providers';

definePageMeta({
  key: route => route.params.id
});

const
  storeProviders = useProvidersStore(),
  { selected, selectedProvider, dialogServiceRequest } = storeToRefs(storeProviders),

  selectedMachine = computed(
    () => selectedProvider.value && selectedProvider.value.machines.length
      ? selectedProvider.value.machines[0]
      : null
  ),
  imageSelectedMachine = computed(() => {
    const name = selectedMachine.value ? selectedMachine.value.name : null;
    switch (name) {
      case 'Drum Seeder':
        return '/img/seeder-drum.jpg';
      case 'Lonheng Seeder':
        return '/img/seeder-lunheng.jpg';
      case 'Eli Seeder':
        return '/img/seeder-eli.jpg';
      case 'Thai Kit':
        return '/img/seeder-thai-kid.jpg';
      default:
        return '';
    }
  }),

  onExit = () => {
    selected.value = null;
  },
  onRequest = () => {
    dialogServiceRequest.value = true;
  };
</script> 

<template>
  <div class="d-flex flex-row justify-space-between pa-4"><!-- Provider -->
    <div class="h-300-heavy text-primary-neutral-900">{{ $t('p1_spdetail_title') }}</div>

    <v-sheet class="cursor-pointer" :height="24" :width="24" @click="onExit">
      <v-img src="/img/remove.png" :height="24" :width="24" />
    </v-sheet>
  </div>

  <v-divider /><!-- divider -->

  <template v-if="selectedProvider">
    <div class="d-flex flex-row justify-start align-center px-4 my-4"><!-- avatar, name, address -->
      <v-avatar size="80" class="mr-2">
        <v-img
          :src="`https://ui-avatars.com/api/?size=80&background=F1F3F9&color=28303F&name=${selectedProvider.name.split(' ').join('+')}`" />
      </v-avatar>

      <div>
        <div class="h-300-heavy text-primary-black">{{ selectedProvider.name }}</div>

        <div class="mt-2">
          <img class="mr-2" src="/img/providers/icon-address.png" alt="Address icon" style="vertical-align: middle;" />
          <p class="d-inline p-200-light text-primary-black">
            {{ selectedProvider.address }}, {{ selectedProvider.adm3 }}, {{ selectedProvider.adm2 }}, {{
              selectedProvider.adm1 }}
          </p>
        </div>
      </div>
    </div>

    <div class="px-4 my-4"><!-- Available machine -->
      <div class="p-100-heavy text-primary-neutral-900 mb-4">{{ $t('p1_spdetail_machine') }}</div>

      <!-- <v-select
          v-model="machineSelected"
          hide-details
          single-line
          variant="outlined"
          density="compact"
          placeholder="Select machine"
          :items="['Eli seeder']"
        /> -->
      <v-text-field v-model="selectedMachine.name" readonly hide-details single-line variant="outlined"
        density="compact" />

      <v-img :src="imageSelectedMachine" width="100%" height="244" cover class="mt-4" />
    </div>

    <div class="px-4 my-4"><!-- Machine description -->
      <div class="p-100-heavy text-primary-neutral-900">{{ $t('p1_spdetail_desc') }}</div>
      <div class="p-200-light text-secondary-black">{{ selectedMachine.description || $t('p1_spdetail_nodesc') }}
      </div>
    </div>

    <div class="px-4 my-2"><!-- Provider phone -->
      <div class="text-primary-black p-200-heavy">
        <img class="mr-2" src="/img/providers/icon-phone.png" alt="Phone icon" style="vertical-align: middle;" />
        <p class="d-inline p-200-light text-primary-black">{{ selectedProvider.phone }}</p>
      </div>
    </div>

    <ProvidersDetailsDrawerDialog />
  </template>

  <div v-if="selectedProvider" id="provider-detail-drawer-buttons" class="pa-4 bg-white e-misc-1 d-flex">
    <v-btn class="flex-grow-1 mr-1" height="40" variant="flat" color="primary-700" @click="onRequest">{{
      $t('p1_spdetail_btn_req') }}</v-btn>
    <v-btn class="flex-grow-1 ml-1" height="40" variant="outlined" color="primary-black" tag="a"
      :href="`tel:${selectedProvider.phone}`">{{ $t('p1_spdetail_btn_call') }}</v-btn>
  </div>
</template>

<style lang="scss">
#provider-detail-drawer {
  z-index: 3000 !important;

  &>.v-navigation-drawer__content {
    position: relative;
    padding-bottom: 72px;
  }
}

#provider-detail-drawer-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 72px;
}
</style>
