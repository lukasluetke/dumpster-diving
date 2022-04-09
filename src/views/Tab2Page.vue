<template>
  <ion-page>
    <ion-header>
      <!-- <ion-toolbar>
        <ion-title>Map</ion-title>
      </ion-toolbar> -->
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
            @click="openModal(marker.id)"
            v-for="(marker, index) in markers"
            :key="index"
            ref="markersRef"
            :lat-lng="marker.coord"
            >
          </l-marker>
      </l-map>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { supabase } from "@/supabase"
import { modalController } from '@ionic/vue';
import Modal from './SpotModal.vue';
import { useCounterStore } from '@/stores/counter'

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
    },
  setup() {
  },
  async created() {
    const {data: events} = await supabase
      .from('events')
      .select('coordinates,id')
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
      this.markers = marker_objects.map(m => {
        return {
          name: m.name,
          id: m.id,
          coord: m.coordinates.split(', ').map(c => parseFloat(c))
        }
      })
      console.log(this.markers)
    },
    async openModal(id) {
      const counter = useCounterStore()
      counter.count = id
      // console.log(counter.count)

      const modal = await modalController
        .create({
          component: Modal,
          initialBreakpoint: 0.5,
          breakpoints: [0, 0.5, 1],
          username: "matt"
        })
      return modal.present();
    },  
  }
});
</script>

<style>
</style>
