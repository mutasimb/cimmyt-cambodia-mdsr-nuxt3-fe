<script setup>
import { storeToRefs } from 'pinia';

import { useFormProfileStore } from '@/stores/form-profile';
// import { useGeoStore } from '@/stores/geolocation';

const
  // storeGeo = useGeoStore(),
  storeFormProfile = useFormProfileStore(),
  { uType } = storeToRefs(storeFormProfile),

  tab = ref('basic');

storeFormProfile.getBasic();
storeFormProfile.getField();
storeFormProfile.getMachine();

// storeGeo.getGeo();
// onBeforeUnmount(() => {
//   storeGeo.stopGeo();
// });
</script>

<template>
  <v-container class="justify-start" fluid>
    <v-row>
      <v-col>
        <div class="h-200-heavy text-primary-black">{{ $t('Basic information') }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-tabs v-model="tab" color="primary-700">
          <v-tab value="basic">{{ $t('Basic information') }}</v-tab>
          <v-tab v-if="uType === 'Farmer'" value="field">{{ $t('Fields') }}</v-tab>
          <v-tab v-else-if="uType === 'Provider'" value="machine">{{ $t('Machines') }}</v-tab>
        </v-tabs>
        <v-card class="e-100 pa-6 mt-6">
          <v-window v-model="tab">
            <ProfileTabBasic value="basic" />
            <ProfileTabField v-if="uType === 'Farmer'" value="field" />
            <ProfileTabMachine v-else-if="uType === 'Provider'" value="machine" />
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
