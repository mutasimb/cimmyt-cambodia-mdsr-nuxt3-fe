<script setup>
import { storeToRefs } from 'pinia';

import { useFormProfileStore } from '@/stores/form-profile';
import { useGeoStore } from '@/stores/geolocation';
import { useErrorStore } from '@/stores/error';

const
  storeFormProfile = useFormProfileStore(),
  storeGeo = useGeoStore(),
  storeError = useErrorStore(),

  {
    loading,
    edit,

    phone,
    uType,
    name,
    adm1,
    adm2,
    adm3,
    address,
    details,
    lon,
    lat,

    adm
  } = storeToRefs(storeFormProfile),
  { geolocationLon, geolocationLat } = storeToRefs(storeGeo),

  { message: errorMessage } = storeToRefs(storeError),

  onGetGeo = () => {
    lon.value = toRaw(geolocationLon.value);
    lat.value = toRaw(geolocationLat.value);
  },

  onCommuneSelection = val => {
    if (val) storeGeo.getCommuneCentroid({
      adm1: adm1.value,
      adm2: adm2.value,
      adm3: val
    });
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
    <v-row><!-- User Identity -->
      <v-col cols="12">
        <div class="p-100-heavy primary-neutral-900">{{ $t('User Identity') }}</div>
      </v-col>
    </v-row>
    <v-row><!-- Phone, User Type -->
      <v-col lg="3" md="4" sm="6" cols="12" class="py-0">
        <div class="l-100 primary-neutral-900">{{ $t('Phone') }}</div>
        <v-text-field disabled class="mt-2" v-model="phone" density="compact" variant="outlined" />
      </v-col>
      <v-col lg="3" md="4" sm="6" cols="12" class="py-0">
        <div class="l-100 primary-neutral-900">{{ $t('User Type') }}</div>
        <v-select :disabled="!edit" class="mt-2" v-model="uType" :items="[
          { val: 'Farmer', name: $t('Farmer') },
          { val: 'Provider', name: $t('Provider') },
          { val: 'Other', name: $t('Other') },
        ]" density="compact" variant="outlined" item-value="val" item-title="name" />
      </v-col>
    </v-row>
    <v-row><!-- User Details -->
      <v-col cols="12">
        <div class="p-100-heavy primary-neutral-900">{{ $t('User Details') }}</div>
      </v-col>
    </v-row>
    <!-- <v-row>Picture -->
    <!-- <ProfileBasicPicture /> -->
    <!-- </v-row> -->
    <v-row><!-- Name -->
      <v-col lg="6" md="8" cols="12" class="py-0">
        <div class="l-100 primary-neutral-900">{{ $t('Name') }}</div>
        <v-text-field :disabled="!edit" class="mt-2" v-model="name" density="compact" variant="outlined" />
      </v-col>
    </v-row>
    <v-row><!-- Province, District, Commune -->
      <v-col md="4" cols="12" class="py-0">
        <div class="l-100 primary-neutral-900">{{ $t('Province') }}</div>
        <v-select :disabled="!edit" class="mt-2" v-model="adm1" :items="adm.itemsAdm1" clearable density="compact"
          variant="outlined" @update:model-value="() => {
          adm2 = null
          adm3 = null
        }" />
      </v-col>
      <v-col md="4" cols="12" class="py-0">
        <div class="l-100 primary-neutral-900">{{ $t('District') }}</div>
        <v-select :disabled="!edit" class="mt-2" v-model="adm2" :items="adm.itemsAdm2" clearable density="compact"
          variant="outlined" @update:model-value="() => {
          adm3 = null
        }" />
      </v-col>
      <v-col md="4" cols="12" class="py-0">
        <div class="l-100 primary-neutral-900">{{ $t('Commune') }}</div>
        <v-select :disabled="!edit" class="mt-2" v-model="adm3" :items="adm.itemsAdm3" clearable density="compact"
          variant="outlined" @update:model-value="val => { onCommuneSelection(val); }" />
      </v-col>
    </v-row>
    <v-row><!-- Address -->
      <v-col class="py-0">
        <div class="l-100 primary-neutral-900">{{ $t('Address') }}</div>
        <v-text-field :disabled="!edit" class="mt-2" v-model="address" density="compact" variant="outlined" />
      </v-col>
    </v-row>
    <v-row v-if="uType === 'Provider'"><!-- Details -->
      <v-col class="py-0">
        <div class="l-100 primary-neutral-900">{{ $t('Provider Details') }}</div>
        <v-text-field :disabled="!edit" class="mt-2" v-model="details" density="compact" variant="outlined" />
      </v-col>
    </v-row>
    <v-row><!-- Geolocation -->
      <v-col cols="12">
        <div class="p-100-heavy primary-neutral-900">
          {{ $t('Geolocation') }}
          <v-btn v-if="geolocationLon && geolocationLat" :disabled="!edit" icon="mdi-crosshairs-gps" size="x-small"
            class="ml-2" color="primary-700" @click="onGetGeo" />
        </div>
      </v-col>
    </v-row>
    <v-row><!-- Longitude, Latitude -->
      <v-col lg="3" md="4" order-md="1" order="2" cols="12" class="py-0">
        <div class="l-100 primary-neutral-900">{{ $t('Longitude') }}</div>
        <v-text-field disabled class="mt-2" v-model="lon" density="compact" variant="outlined" />
        <div class="l-100 primary-neutral-900">{{ $t('Latitude') }}</div>
        <v-text-field disabled class="mt-2" v-model="lat" density="compact" variant="outlined" />
      </v-col>
      <v-col lg="9" md="8" order-md="2" order="1" cols="12" class="py-0 mb-4">
        <ProfileMap />
      </v-col>
    </v-row>
  </v-window-item>
</template>
