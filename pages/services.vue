<script setup>
import { useServicesStore } from '@/stores/services';

const
  storeServices = useServicesStore();

await storeServices.getServices();
</script>

<template>
  <v-container class="fill-height flex-column align-stretch pa-0 bg-neutral-100" fluid>
    <v-row>
      <v-col cols="3" class="py-6 pl-7 pr-4 bg-white" style="border-right: 1px solid #E1E6EF;">
        <div class="h-300-heavy text-primary-neutral-900">{{ $t('p2_services_title') }}</div>

        <ServicesItems />
      </v-col>

      <v-col cols="9" class="pt-9 px-6">
        <ServicesServiceDetails />
      </v-col>
    </v-row>
  </v-container>
</template>
