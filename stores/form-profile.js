import { defineStore, storeToRefs } from 'pinia';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import * as d3 from "d3-time-format";

import { useAuthStore } from './auth';

import adm from './adm.json';

export const useFormProfileStore = defineStore('form-profile', {
  state: () => ({
    _id: null,
    phone: '',
    uType: null,
    name: '',
    picture: null,
    adm1: null,
    adm2: null,
    adm3: null,
    address: '',
    lon: null,
    lat: null,

    field: {
      _id: null,
      address: null,
      area: null,
      lon: null,
      lat: null
    },

    machine: {
      _id: null,
      name: null,
      description: '',
      manufacturer: ''
    },

    geolocationStatus: '',
    watchPositionID: null,
    geolocationLon: null,
    geolocationLat: null,

    pictureChanged: false,
    pictureFiles: null,
    pictureData: null,

    edit: false,
    loading: false
  }),
  getters: {
    adm: state => ({
      itemsAdm1: adm
        .map(el => el.NAME_1)
        .filter((el, i, arr) => arr.indexOf(el) === i),
      itemsAdm2: !state.adm1 ? [] : adm
        .filter(el => el.NAME_1 === state.adm1)
        .map(el => el.NAME_2)
        .filter((el, i, arr) => arr.indexOf(el) === i),
      itemsAdm3: !state.adm1 || !state.adm2 ? [] : adm
        .filter(el => el.NAME_1 === state.adm1 && el.NAME_2 === state.adm2)
        .map(el => el.NAME_3)
        .filter((el, i, arr) => arr.indexOf(el) === i)
    }),
    form: state => ({
      _id: state._id,
      name: state.name,
      uType: state.uType,
      adm1: state.adm1,
      adm2: state.adm2,
      adm3: state.adm3,
      address: state.address,
      lon: state.lon,
      lat: state.lat,
      fields: [state.field],
      machines: [state.machine]
    })
  },
  actions: {
    watchGeo () {
      if (!navigator.geolocation) {
        this.geolocationStatus = 'Geolocation service not available'
      } else if(!this.watchPositionID) {
        this.geolocationStatus = 'Detecting geolocation ...'
        this.watchPositionID = navigator.geolocation.watchPosition(
          position => {
            this.geolocationStatus = ''
            this.geolocationLon = position.coords.longitude
            this.geolocationLat = position.coords.latitude
          },
          () => { this.geolocationStatus = 'Geolocation error' },
          { enableHighAccuracy: true, maximumAge: 0 }
        )
      }
    },
    watchGeoStop () {
      if(this.watchPositionID) {
        navigator.geolocation.clearWatch(this.watchPositionID);
      }
    },
    getBasic () {
      const storeAuth = useAuthStore();
      const { user } = storeToRefs(storeAuth);

      const userData = {...toRaw(user.value)};

      this._id = userData._id;
      this.phone = userData.phone;
      this.uType = userData.uType;
      
      this.name = userData.name;
      this.picture = userData.picture;
      this.adm1 = userData.adm1;
      this.adm2 = userData.adm2;
      this.adm3 = userData.adm3;
      this.address = userData.address;

      this.lon = userData.lon;
      this.lat = userData.lat;
    },
    getField () {
      const
        storeAuth = useAuthStore(),
        { user } = storeToRefs(storeAuth),

        userData = {...toRaw(user.value)};

      if('fields' in userData && userData.fields.length) {
        this.field._id = userData.fields[0]._id
        this.field.address = userData.fields[0].address
        this.field.area = userData.fields[0].area
        this.field.lon = userData.fields[0].lon
        this.field.lat = userData.fields[0].lat
      }
    },
    getMachine () {
      const
        storeAuth = useAuthStore(),
        { user } = storeToRefs(storeAuth),

        userData = {...toRaw(user.value)};

      if('machines' in userData && userData.machines.length) {
        this.machine._id = userData.machines[0]._id;
        this.machine.name = userData.machines[0].name;
        this.machine.description = userData.machines[0].description;
        this.machine.manufacturer = userData.machines[0].manufacturer;
      }
    },
    save () {
      const
        { $storage } = useNuxtApp(),
        api = useAPI(),
        storeAuth = useAuthStore(),
        { user: authUser } = storeToRefs(storeAuth),
        ymd = d3.timeFormat("%y%m%d")(new Date());

      this.loading = true;

      return new Promise((resolve, reject) => {
        api.post('/users/save', { ...this.form })
          .then(({ data }) => {
            const { user } = data;
            this.user = user;
            authUser.value = user;

            this.loading = false;
            resolve(user);
          })
          .catch(err => {
            this.loading = false;
            reject(err);
          });
      });

      // return new Promise((resolve, reject) => {
      //   const storageRef = ref($storage, `users/${ ymd }_${ this._id }.jpg`);
      //   const uploadTask = uploadBytesResumable(storageRef, this.pictureFiles[0]);

      //   uploadTask.on(
      //     'state_changed',
      //     snapshot => {
      //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //       console.log('Upload is ' + progress + '% done');
      //     },
      //     err => {
      //       this.loading = false;
      //       reject(err);
      //     },
      //     () => {
      //       getDownloadURL(uploadTask.snapshot.ref)
      //         .then(url => api.post('/users/save', { ...this.form, picture: url }))
      //         .then(({ data }) => {
      //           const { user } = data;
      //           this.user = user;
      //           authUser.value = user;

      //           this.loading = false;
      //           resolve(user);
      //         })
      //         .catch(err => {
      //           this.loading = false;
      //           reject(err);
      //         });
      //     }
      //   );
      // });

    }
  }
})
