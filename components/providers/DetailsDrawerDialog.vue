<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores/auth';
import { useServicesStore } from '@/stores/services';
import { useProvidersStore } from '@/stores/providers';

const
  storeAuth = useAuthStore(),
  storeServices = useServicesStore(),
  storeProviders = useProvidersStore(),

  { user } = storeToRefs(storeAuth),
  { loading: loadingServices } = storeToRefs(storeServices),
  { dialogServiceRequest, selectedProvider } = storeToRefs(storeProviders),

  serviceType = ref(null),
  dialogDate = ref(null),
  dialogMonth = ref(null),
  dialogYear = ref(null),
  dateStart = computed(
    () => dialogDate.value && dialogMonth.value && dialogYear.value
      ? +`${dialogYear.value}${dialogMonth.value}${dialogDate.value}`
      : null
  ),

  onConfirm = async () => {
    try {
      await storeServices.create({
        provider: selectedProvider.value._id,
        field: user.value.fields[0]._id,
        machine: selectedProvider.value.machines[0]._id,
        service: serviceType.value,
        dateStart: dateStart.value
      });

      router.push({ path: "/services" });
    } catch (error) {
      errorMessage.value = 'response' in error
        ? error.response.data?.message
        : error.message;
      console.log(error);
    }
  },
  onCancel = () => { dialogServiceRequest.value = false; };
</script>

<template>
  <v-dialog v-model="dialogServiceRequest" width="auto" v-if="selectedProvider"><!-- Confirm dialog -->
    <v-card v-if="user.uType !== 'Farmer'">
      <v-card-text>
        <div class="h-300-heavy text-primary-neutral-900">{{ $t('p1_txt_err1') }}</div>

        <div class="l-100 primary-neutral-900 mt-4">{{ $t('p1_txt_err2') }}</div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn class="flex-grow-1 ml-1" height="40" variant="outlined" color="primary-black" @click="onCancel">{{
          $t('i0_dismiss') }}</v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-else-if="!user.fields.length">
      <v-card-text>
        <div class="h-300-heavy text-primary-neutral-900">{{ $t('p1_txt_err1') }}</div>

        <div class="l-100 primary-neutral-900 mt-4">{{ $t('p1_txt_err3') }}</div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn class="flex-grow-1 ml-1" height="40" variant="outlined" color="primary-black" @click="onCancel">{{
          $t('i0_dismiss') }}</v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-else class="pa-4">
      <v-card-text>
        <div class="h-300-heavy text-primary-neutral-900">{{ $t('p1_req_header') }}</div>

        <div class="d-flex flex-row justify-start align-center my-4">
          <v-avatar size="80" class="mr-2">
            <v-img
              :src="`https://ui-avatars.com/api/?size=80&background=F1F3F9&color=28303F&name=${selectedProvider.name.split(' ').join('+')}`" />
          </v-avatar>

          <div>
            <div class="h-300-heavy text-primary-black">{{ selectedProvider.name }}</div>

            <div class="mt-2">
              <img class="mr-2" src="/img/providers/icon-address.png" alt="Address icon"
                style="vertical-align: middle;" />
              <p class="d-inline p-200-light text-primary-black">{{ selectedProvider.address }}, {{ selectedProvider.adm3
              }}, {{ selectedProvider.adm2 }}, {{ selectedProvider.adm1 }}</p>
            </div>

            <div class="mt-2" v-if="selectedProvider">
              <img class="mr-2" src="/img/providers/icon-phone.png" alt="Phone icon" style="vertical-align: middle;" />
              <p class="d-inline p-200-light text-primary-black">{{ selectedProvider.phone }}</p>
            </div>
          </div>
        </div>

        <div class="l-100 primary-neutral-900 mt-4">{{ $t('p1_req_label_service') }}</div>
        <v-select v-model="serviceType" class="mt-2" :items="[
          $t('Land Preparation'),
          $t('Seeding'),
          $t('Land Preparation + Seeding'),
        ]" density="compact" variant="outlined" />

        <div class="l-100 primary-neutral-900 mt-4">{{ $t('p1_req_label_date') }}</div>
        <v-row>
          <v-col>
            <div class="l-100 primary-neutral-900 mt-2">{{ $t('i0_D') }}</div>
            <v-select v-model="dialogDate" class="mt-2" density="compact" variant="outlined" :items="[
              '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
              '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
              '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
            ]" />
          </v-col>
          <v-col>
            <div class="l-100 primary-neutral-900 mt-2">{{ $t('i0_M') }}</div>
            <v-select v-model="dialogMonth" class="mt-2" density="compact" variant="outlined" :items="[
              { title: $t('January'), value: '01' },
              { title: $t('February'), value: '02' },
              { title: $t('March'), value: '03' },
              { title: $t('April'), value: '04' },
              { title: $t('May'), value: '05' },
              { title: $t('June'), value: '06' },
              { title: $t('July'), value: '07' },
              { title: $t('August'), value: '08' },
              { title: $t('September'), value: '09' },
              { title: $t('October'), value: '10' },
              { title: $t('November'), value: '11' },
              { title: $t('December'), value: '12' },
            ]" />
          </v-col>
          <v-col>
            <div class="l-100 primary-neutral-900 mt-2">{{ $t('i0_Y') }}</div>
            <v-select v-model="dialogYear" class="mt-2" density="compact" variant="outlined" :items="[
              { title: '2023', value: '23' },
              { title: '2024', value: '24' }
            ]" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="!serviceType || !dateStart" class="flex-grow-1 mr-1" height="40" variant="flat"
          color="primary-700" @click="onConfirm">
          <v-progress-circular v-if="loadingServices" :size="32" color="white" indeterminate />
          <span v-else>{{ $t('p1_spdetail_btn_req') }}</span>
        </v-btn>
        <v-btn class="flex-grow-1 ml-1" height="40" variant="outlined" color="primary-black" @click="onCancel">{{
          $t('i0_cancel') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
