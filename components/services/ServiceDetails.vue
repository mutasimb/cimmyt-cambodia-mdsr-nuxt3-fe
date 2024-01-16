<script setup>
import { storeToRefs } from 'pinia';

import { useServicesStore } from '@/stores/services';
import { useAuthStore } from '@/stores/auth';

const
  storeServices = useServicesStore(),
  storeAuth = useAuthStore(),

  { selectedService } = storeToRefs(storeServices),
  { user } = storeToRefs(storeAuth),

  contact = computed(() => {
    return !selectedService.value || !user.value
      ? null
      : user.value.uType === 'Farmer'
        ? selectedService.value.provider
        : user.value.uType === 'Provider'
          ? selectedService.value.client
          : null
  }),
  imageMachine = computed(() => {
    const name = selectedService.value && selectedService.value.machine
      ? selectedService.value.machine.name
      : null;
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
  });
</script>

<template>
  <v-card class="pa-4">
    <template v-if="selectedService && contact">
      <div class="h-200-heavy text-primary-black mb-6">{{ $t(selectedService.service) }}</div>

      <div class="p-100-heavy text-primary-neutral-900 my-3">{{ $t(contact.uType) }}</div>

      <v-list-item class="px-0">
        <template #prepend>
          <v-avatar color="grey-lighten-1" size="80">
            <v-img
              :src="`https://ui-avatars.com/api/?size=80&background=F1F3F9&color=28303F&name=${contact.name.split(' ').join('+')}`" />
          </v-avatar>
        </template>

        <template #default>
          <div class="h-300-heavy text-primary-black">{{ contact.name }}</div>

          <div class="mt-2">
            <img class="mr-2" src="/img/providers/icon-address.png" alt="Address icon" style="vertical-align: middle;" />
            <p class="d-inline p-200-light text-primary-black">{{ contact.address }}, {{ contact.adm3 }}, {{ contact.adm2
            }}, {{ contact.adm1 }}</p>
          </div>
        </template>

        <template #append>
          <v-btn class="flex-grow-1 mr-1" height="40" variant="flat" color="primary-700" tag="a"
            :href="`tel:${contact.phone}`">{{ contact.uType === 'Provider' ? $t('p1_servicedetail_btn_callprovider') :
              $t('p1_servicedetail_btn_callfarmer') }}</v-btn>
        </template>
      </v-list-item>

      <ServicesMap :key="contact"
        :provider="user.uType === 'Provider' ? user : contact.uType === 'Provider' ? contact : null"
        :client="user.uType === 'Farmer' ? user : contact.uType === 'Farmer' ? contact : null" />

      <div class="p-100-heavy text-primary-neutral-900 mt-6 mb-2">{{ $t('p2_services_title') }}</div>

      <template v-if="selectedService.service === 'Land Preparation + Seeding'">
        <v-chip variant="flat" color="primary-700" text-color="white">{{ $t('Land Preparation') }}</v-chip>
        <v-chip class="ml-2" variant="flat" color="primary-700" text-color="white">{{ $t('Seeding') }}</v-chip>
      </template>
      <template v-else>
        <v-chip variant="flat" color="primary-700" text-color="white">{{ selectedService.service }}</v-chip>
      </template>

      <div class="p-100-heavy text-primary-neutral-900 my-3">{{ $t('p2_txt_machineused') }}: {{
        selectedService.machine.name }}</div>

      <v-img class="rounded-lg" :src="imageMachine" height="480" cover />
    </template>

    <template v-else>
      <div class="h-200-heavy mb-6">{{ $t('p2_txt_select') }}</div>
    </template>
  </v-card>
</template>
