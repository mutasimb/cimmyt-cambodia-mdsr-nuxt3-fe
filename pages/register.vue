<script setup>
import { storeToRefs } from 'pinia';

import { useErrorStore } from '@/stores/error';

definePageMeta({
  layout: 'auth'
})

const
  { locale, setLocale } = useI18n(),
  router = useRouter(),
  api = useAPI(),
  storeError = useErrorStore(),

  btnLocale = computed({
    get: () => locale.value,
    set: val => setLocale(val)
  }),

  { message: errorMessage } = storeToRefs(storeError),

  name = ref(''),
  phone = ref(''),
  password = ref(''),
  loading = ref(false),

  delayAsync = delay => new Promise(resolve => setTimeout(resolve, delay)),
  onSubmit = async () => {
    loading.value = true;
    try {
      const { data } = await api.post('/users/register', {
        name: name.value,
        phone: phone.value,
        password: password.value
      });

      useSetStorage('token', data.token);

      await delayAsync(250);

      router.push({ path: "/providers" });
      loading.value = false;
    } catch (error) {
      errorMessage.value = 'response' in error
        ? error.response.data?.message
        : error.message;
      loading.value = false;
    }
  },
  onFacebook = () => { };
</script>

<template>
  <v-main style="min-height: 100vh;" id="page-register">
    <v-container fluid class="fill-height pa-0">
      <v-row class="fill-height">
        <v-col class="pa-0 d-none d-md-block" style="max-height: 100vh;">
          <v-img height="100%" src="/img/seeder-thai-kid.jpg" width="100%" cover />
        </v-col>
        <v-col class="d-flex flex-column justify-center align-center" style="width: 100%;">
          <v-btn-toggle v-model="btnLocale" class="mb-8" rounded="lg" color="primary-700" variant="outlined">
            <v-btn height="40" value="km-KH">{{ locale === 'km-KH' ? 'Khmer' : 'ខ្មែរ' }}</v-btn>
            <v-btn height="40" value="en-US">{{ locale === 'km-KH' ? 'English' : 'អង់គ្លេស' }}</v-btn>
          </v-btn-toggle>
          <v-form class="text-center" style="width: 360px; max-width: 100%;" @submit.prevent="onSubmit">
            <div class="h-200-heavy text-primary-black">{{ $t('i1_txt_create') }}</div>
            <div class="p-100-light text-disabled-black mt-4 mb-8">{{ $t('i1_txt_submit') }}</div>

            <div class="l-100 text-primary-black text-left">{{ $t('i1_label_name') }}</div>
            <v-text-field v-model="name" variant="outlined" color="neutral-300" density="compact" rounded="lg"
              :placeholder="$t('i1_placeholder_name')" />

            <div class="l-100 text-primary-black text-left">{{ $t('i1_label_phone') }}</div>
            <v-text-field v-model="phone" variant="outlined" color="neutral-300" density="compact" rounded="lg"
              :placeholder="$t('i1_placeholder_phone')" />

            <div class="l-100 text-primary-black text-left">{{ $t('i1_label_pass') }}</div>
            <v-text-field v-model="password" variant="outlined" color="neutral-300" density="compact" rounded="lg"
              :placeholder="$t('i1_placeholder_pass')" type="password" />

            <v-btn type="submit" height="40" rounded="lg" block class="mt-8 b-100 e-400" color="primary-700">
              <v-progress-circular v-if="loading" :size="32" color="white" indeterminate />
              <span v-else>{{ $t('i1_btn_signup') }}</span>
            </v-btn>

            <!-- <div class="d-flex align-center">
              <v-divider class="my-8 mr-2" color="primary-700" />
              <div class="text-subtitle-2">or</div>

              <v-divider class="my-8 ml-2" color="primary-700" />
            </div>

            <v-btn height="40" rounded="lg" block variant="outlined" class="b-100" color="primary-black"
              @click="onFacebook"><v-img class="mr-2" :height="20" src="/img/auth/logo-facebook.png" /> Connect with
              Facebook</v-btn> -->

            <div class="text-subtitle-2 mt-4">
              {{ $t('i1_txt_haveaccount') }} <NuxtLink to="/">{{ $t('i1_link_login') }}</NuxtLink>.
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
