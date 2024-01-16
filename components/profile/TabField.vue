<script setup>
import { storeToRefs } from 'pinia';

import { useFormProfileStore } from '@/stores/form-profile';
import { useErrorStore } from '@/stores/error';

const
  storeFormProfile = useFormProfileStore(),
  storeError = useErrorStore(),

  {
    loading,
    edit,

    field,

    geolocationLon,
    geolocationLat
  } = storeToRefs(storeFormProfile),

  { message: errorMessage } = storeToRefs(storeError),

  onGetGeo = () => {
    field.value.lon = toRaw(geolocationLon.value);
    field.value.lat = toRaw(geolocationLat.value);
  },
  onEdit = () => { edit.value = true; },
  onCancel = () => {
    edit.value = false;
    storeFormProfile.getBasic();
    storeFormProfile.getField();
    storeFormProfile.getMachine();
  },
  onSave = async () => {
    try {
      await storeFormProfile.save();
      edit.value = false;
    } catch (error) {
      errorMessage.value = 'response' in error
        ? error.response.data?.message
        : error.message;
    }
  };
</script>

<template>
  <v-window-item>
    <v-row><!-- Buttons -->
      <v-col cols="12">
        <v-btn :disabled="!edit || loading" variant="flat" color="primary-700" @click="onSave">
          <v-progress-circular v-if="loading" :size="32" color="white" indeterminate />
          <span v-else>{{ $t('Save') }}</span>
        </v-btn>
        <v-btn v-if="!edit" :disabled="loading" class="ml-2" variant="flat" color="neutral-300" @click="onEdit">{{
          $t('Edit') }}</v-btn>
        <v-btn v-else :disabled="loading" class="ml-2" variant="flat" color="neutral-300" @click="onCancel">{{
          $t('i0_cancel') }}</v-btn>
      </v-col>
    </v-row>
    <v-row><!-- Field Details -->
      <v-col cols="12">
        <div class="p-100-heavy primary-neutral-900">{{ $t('Field Details') }}</div>
      </v-col>
    </v-row>
    <v-row><!-- Field Address, Area (hectare) -->
      <v-col lg="9" md="8" cols="12">
        <div class="l-100 primary-neutral-900">{{ $t('Field Address') }}</div>
        <v-text-field :disabled="!edit" class="mt-2" v-model="field.address" density="compact" variant="outlined" />
      </v-col>
      <v-col lg="3" md="4" cols="12">
        <div class="l-100 primary-neutral-900">{{ $t('Area') }} ({{ $t('hectare') }})</div>
        <v-text-field :disabled="!edit" class="mt-2" v-model="field.area" density="compact" variant="outlined" />
      </v-col>
    </v-row>
    <v-row><!-- Geolocation -->
      <v-col>
        <div class="p-100-heavy primary-neutral-900">
          {{ $t('Geolocation') }}
          <v-btn :disabled="!edit" icon="mdi-crosshairs-gps" size="x-small" class="ml-2" color="primary-700"
            @click="onGetGeo" />
        </div>
      </v-col>
    </v-row>
    <v-row><!-- Longitude, Latitude -->
      <v-col lg="3" md="4" sm="6" cols="12" class="py-0">
        <div class="l-100 primary-neutral-900">{{ $t('Longitude') }}</div>
        <v-text-field disabled class="mt-2" v-model="field.lon" density="compact" variant="outlined" />
      </v-col>
      <v-col lg="3" md="4" sm="6" cols="12" class="py-0">
        <div class="l-100 primary-neutral-900">{{ $t('Latitude') }}</div>
        <v-text-field disabled class="mt-2" v-model="field.lat" density="compact" variant="outlined" />
      </v-col>
    </v-row>
  </v-window-item>
</template>
