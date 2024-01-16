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

    machine
  } = storeToRefs(storeFormProfile),

  { message: errorMessage } = storeToRefs(storeError),

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
    <v-row><!-- Machine Details -->
      <v-col cols="12">
        <div class="p-100-heavy primary-neutral-900">{{ $t('Machine Details') }}</div>
      </v-col>
    </v-row>
    <v-row><!-- Machine Type, Manufacturer -->
      <v-col md="6" cols="12" class="py-0">
        <div class="l-100 primary-neutral-900">{{ $t('Machine Type') }}</div>
        <v-select :disabled="!edit" class="mt-2" v-model="machine.name"
          :items="['Drum Seeder', 'Lonheng Seeder', 'Eli Seeder', 'Thai Kit']" density="compact" variant="outlined" />
      </v-col>
      <v-col md="6" cols="12" class="py-0">
        <div class="l-100 primary-neutral-900">{{ $t('Manufacturer') }}</div>
        <v-text-field :disabled="!edit" class="mt-2" v-model="machine.manufacturer" density="compact"
          variant="outlined" />
      </v-col>
    </v-row>
    <v-row><!-- Machine Type, Manufacturer -->
      <v-col cols="12" class="py-0">
        <div class="l-100 primary-neutral-900">{{ $t('Description') }}</div>
        <v-textarea :disabled="!edit" class="mt-2" v-model="machine.description" density="compact" variant="outlined" />
      </v-col>
    </v-row>
  </v-window-item>
</template>
