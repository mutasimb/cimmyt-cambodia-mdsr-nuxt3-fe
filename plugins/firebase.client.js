import { initializeApp } from 'firebase/app'
import { getAuth, FacebookAuthProvider } from "firebase/auth"
import { getStorage } from "firebase/storage"

export default defineNuxtPlugin(nuxtApp => {
  const
    config = useRuntimeConfig(),
    {
      FIREBASE_APIKEY: apiKey,
      FIREBASE_AUTHDOMAIN: authDomain,
      FIREBASE_PROJECTID: projectId,
      FIREBASE_STORAGEBUCKET: storageBucket,
      FIREBASE_APPID: appId
    } = config.public,


    app = initializeApp({
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      appId
    }),

    auth = getAuth(app),
    provider = new FacebookAuthProvider(),
    storage = getStorage(app);

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);

  nuxtApp.vueApp.provide('providerFb', provider);
  nuxtApp.provide('providerFb', provider);

  nuxtApp.vueApp.provide('storage', storage);
  nuxtApp.provide('storage', storage);
});
