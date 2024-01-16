import { defineStore } from 'pinia';

import files from './knowledge-hub-items.json';

export const useKnowledgeStore = defineStore('knowledge-hub', () => {
  const
    data = ref(files),

    filter = ref(''),
    dataDisplay = computed(() => data.value.filter(item => filter.value === '' || item.tag.indexOf(filter.value) > -1));

  return { filter, dataDisplay }
})
