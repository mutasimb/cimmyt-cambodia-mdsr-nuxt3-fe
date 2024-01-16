<script setup>
import { storeToRefs } from 'pinia'

import { useServicesStore } from '@/stores/services';
import { useAuthStore } from '@/stores/auth';

const
  storeServices = useServicesStore(),
  storeAuth = useAuthStore(),

  { selected, servicesList } = storeToRefs(storeServices),
  { user } = storeToRefs(storeAuth),
  
  onSelect = id => { selected.value = id; };
</script>

<template>
  <v-list>
    <ServicesItem v-for="(item, i) in servicesList"
      :key="item._id"
      :name="item[user.uType === 'Farmer' ? 'provider' : 'client'].name"
      :service="item.service"
      :active="item._id === selected"
      @select="() => onSelect(item._id)"
    />
  </v-list>
</template>