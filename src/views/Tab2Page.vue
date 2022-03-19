<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Map</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>
      <l-map 
        z-index=0
        :zoom="13" 
        :center="[50.9223,11.5723]" 
        :options="{zoomControl: false}">
        <l-tile-layer style="z-index: 100" url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"></l-tile-layer>
          <l-marker 
            @click="openModal(latLng)"
            v-for="(marker, index) in markers"
            :key="index"
            ref="markersRef"
            :lat-lng="marker"
            >
            <l-popup :content="marker.toString()"></l-popup>
          </l-marker>
      </l-map>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { supabase } from "../supabase"
import { modalController } from '@ionic/vue';
import Modal from './SpotModal.vue'


export default defineComponent({
  name: 'Tab2Page',
  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonPage, 
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    },
  setup () {
  },
  async created() {
    const {data: events} = await supabase
      .from('events')
      .select('coordinates,name')
    this.populate_markers_array(events)
    this.loaded = true
  },
  data: () => ({
    spot: false,
    zoomControl: false,
    loaded: true,
    markers: [],
  }),
  methods: {
    populate_markers_array: function (marker_objects) {
      let markersArr = []
      marker_objects.forEach(element => {
        console.log(element.name)
        let coordsArr = element.coordinates.split(',')
        markersArr.push([parseFloat(coordsArr[0]), parseFloat(coordsArr[1])])
      });
      this.markers = markersArr
    },
    async openModal() {
      const modal = await modalController
        .create({
          component: Modal,
          initialBreakpoint: 0.5,
          breakpoints: [0, 0.5, 1]
        })
      return modal.present();
    },

  }
});
</script>

<style>
</style>
