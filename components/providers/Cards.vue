<script setup>
import { storeToRefs } from 'pinia';

import { useProvidersStore } from '@/stores/providers';

const
  storeProviders = useProvidersStore(),
  { selected, providersListFiltered } = storeToRefs(storeProviders),

  itemsMapped = computed(() => providersListFiltered.value.map(provider => ({
    ...provider,
    machineImage: provider.machines[0].name === 'Drum Seeder' ? '/img/seeder-drum.jpg'
      : provider.machines[0].name === 'Lonheng Seeder' ? '/img/seeder-lunheng.jpg'
        : provider.machines[0].name === 'Eli Seeder' ? '/img/seeder-eli.jpg'
          : provider.machines[0].name === 'Thai Kit' ? '/img/seeder-thai-kid.jpg'
            : null
  }))),

  onSelect = id => {
    selected.value = id;
  };
</script>

<template>
  <div class="d-flex flex-wrap flex-grow-1 justify-space-between">
    <ProvidersCard v-for="item in itemsMapped" :key="item._id" :id="item._id" :name="item.name"
      :image-machine="item.machineImage"
      :image-profile="`https://ui-avatars.com/api/?size=80&background=F1F3F9&color=28303F&name=${item.name.split(' ').join('+')}`"
      :phone="item.phone" :active="item._id === selected" @select="() => { onSelect(item._id) }" />
  </div>
</template>
