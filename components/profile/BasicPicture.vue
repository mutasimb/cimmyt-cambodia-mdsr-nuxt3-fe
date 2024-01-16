<script setup>
import { storeToRefs } from 'pinia';

import { useFormProfileStore } from '@/stores/form-profile';

const
  storeFormProfile = useFormProfileStore(),
  {
    name,
    picture,
    pictureChanged,
    pictureFiles,
    pictureData,
    edit
  } = storeToRefs(storeFormProfile),

  inputPicture = ref(null),
  displayPicture = computed(
    () => pictureData.value ? pictureData.value
      : picture.value ? picture.value
        : `https://ui-avatars.com/api/?size=100&background=F1F3F9&color=28303F&name=${name.value.split(' ').join('+')}`
  ),
  onClickSelectPicture = () => { if (edit.value) inputPicture.value.click(); },
  onSelectPicture = files => {
    pictureChanged.value = true;

    const reader = new FileReader();
    reader.onload = e => { pictureData.value = e.target.result; };
    reader.readAsDataURL(files[0]);
  };
</script>

<template>
  <v-col cols="12" class="py-0 mb-4">
    <div class="l-100 primary-neutral-900 mb-2">Picture</div>
    <v-avatar color="grey" size="100px" :style="{ cursor: edit ? 'pointer' : 'auto' }" @click="onClickSelectPicture">
      <v-img cover :src="displayPicture" />
    </v-avatar>
    <v-btn class="ml-4" height="40" variant="outlined" color="primary-black" :disabled="!edit"
      @click="onClickSelectPicture">Select Picture</v-btn>
    <v-file-input v-model="pictureFiles" class="d-none" ref="inputPicture" @update:model-value="onSelectPicture" />
  </v-col>
</template>
