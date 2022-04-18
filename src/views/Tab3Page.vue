<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Spot hinzufügen</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="content">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="form">
        <ion-item class="item">
          <ion-label 
            position="floating">
            Name</ion-label>
          <ion-input
            v-model="name">
          </ion-input>
        </ion-item>
        <ion-item class="item">
          <ion-label 
            position="floating">
            Koordinaten
          </ion-label>
          <ion-input
            v-model="koordinaten"
            placeholder="12.34567, 12.34567"
            >
          </ion-input>
        </ion-item>
        <!-- <table>
          <tr 
            v-for="(item, index) in markers"
            :key="index">
            <td>
              <input
                v-model.number="item.position.lat"
                type="number"
              >
            </td>
          </tr>
        </table>
        <l-map
            :zoom="7" 
            :center="[51.365, 10.459]" 
            :options="{zoomControl: false}" 
            style="height:100vw">
          <l-geo-json :geojson="geojson" :options="geojsonOptions" />
          <l-tile-layer 
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png">
          </l-tile-layer>
          <l-marker
            v-for="marker in markers"
            :key="marker.id"
            :visible="marker.visible"
            :draggable="marker.draggable"
            :lat-lng.sync="marker.position"
            :icon="marker.icon"
            @click="alert(marker)"
          >
          </l-marker>
          
        </l-map> -->
        <!-- <div class="item">
          <p class="margin-left">
            An welchen Tagen kann hier gerettet werden?
          </p>
          <ion-grid class="margin-left">
            <ion-row>
              <ion-col 
                v-for="entry in days_of_week" 
                :key="entry.val">
              <ion-label>{{entry.val}}</ion-label>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col 
                v-for="entry in days_of_week" 
                :key="entry.val">
                <ion-checkbox
                  :key="entry.val"
                  @update:modelValue="entry.isChecked = $event"
                  :modelValue="entry.isChecked">
                </ion-checkbox>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div> -->

        <div class="item">
          <p class="margin-left">
            Ab wann kann hier gerettet werden?
          </p>
          <!-- <ion-segment 
            scrollable
            value="Mo"
            @ionChange="segmentChanged($event)">
            <ion-segment-button value="Mo">
              <ion-label>Mo</ion-label>
            </ion-segment-button>
            <ion-segment-button value="Di">
              <ion-label>Di</ion-label>
            </ion-segment-button>
            <ion-segment-button value="Mi">
              <ion-label>Mi</ion-label>
            </ion-segment-button>
            <ion-segment-button value="Do">
              <ion-label>Do</ion-label>
            </ion-segment-button>
            <ion-segment-button value="Fr">
              <ion-label>Fr</ion-label>
            </ion-segment-button>
            <ion-segment-button value="Sa">
              <ion-label>Sa</ion-label>
            </ion-segment-button>
            <ion-segment-button value="So">
              <ion-label>So</ion-label>
            </ion-segment-button>
          </ion-segment> -->
          <ion-button
            class="margin-left" 
            color="light"
            id="open-modal">
            {{ datetime }}
          </ion-button>
          <ion-modal trigger="open-modal">
            <ion-content force-overscroll="false">
              <ion-datetime 
                class="timepicker"
                presentation="time"
                v-model="datetime">
              </ion-datetime>
            </ion-content>
          </ion-modal>
        </div>
        <ion-item class="item">
          <ion-label 
            position="floating">
            Beschreibung
          </ion-label>
          <ion-textarea
            v-model="beschreibung">
          </ion-textarea>
        </ion-item>
        <ion-button 
          @click="insert()"
          expand="block" >
          Eintragen
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { supabase } from "@/supabase"
// import "leaflet/dist/leaflet.css"
// import { LMap, LTileLayer, LGeoJson, LMarker } from "@vue-leaflet/vue-leaflet";
import { 
  // IonSegment, 
  // IonSegmentButton,
  // IonCol, 
  // IonGrid, 
  // IonRow,
  // IonCheckbox,
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonInput,
  IonLabel,
  IonItem,
  IonTextarea,
  IonButton,
  IonDatetime,
  IonModal, } from '@ionic/vue';

export default defineComponent({
  name: 'Tab3Page',
  components: { 
    // IonSegment,
    // IonSegmentButton,
    // IonCol, 
    // IonGrid, 
    // IonRow,
    // IonCheckbox,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonPage,
    IonInput,
    IonLabel,
    IonItem,
    IonTextarea,
    IonButton,
    IonDatetime,
    IonModal,
    // LMap,
    // LTileLayer,
    // LGeoJson,
    // LMarker 
    },
  data: () => ({
    name: '',
    koordinaten: '',
    beschreibung: '',
    datetime: '22:00',
    days_of_week: [
      { val: 'Mo', isChecked: true },
      { val: 'Di', isChecked: true },
      { val: 'Mi', isChecked: true },
      { val: 'Do', isChecked: true },
      { val: 'Fr', isChecked: true },
      { val: 'Sa', isChecked: true },
      { val: 'So', isChecked: false },
    ],
    geojson: {
        type: "FeatureCollection",
        features: [
          // ...
        ],
    },
    marker_position: [51.365, 10.459],
    geojsonOptions: {
        // Options that don't rely on Leaflet methods.
      },
    markers: [
      {
        id: 'm1',
        position: { lat: 51.505, lng: -0.09 },
        tooltip: 'tooltip for marker1',
        draggable: true,
        visible: true,
      },]
  }),
  methods: {
    async insert() {
      const { data: error } = await supabase
        .from('events')
        .insert([
          { 
            name: this.name, 
            description: this.beschreibung, 
            coordinates: this.koordinaten, 
            time: this.datetime,
            days_of_week: this.days_of_week,
            status: '1',
            },
        ])
      console.log(error)
      this.name = ''
      this.beschreibung = ''
      this.koordinaten = ''
      this.datetime = '22:00'
    },
    console_log() {
      console.log(this.days_of_week)
    },
    segmentChanged(ev) {
      console.log('Segment changed', ev);
    },
  //   async beforeMount() {
  //   // HERE is where to load Leaflet components!
  //   const { circleMarker } = await import("leaflet/dist/leaflet-src.esm");

  //   // And now the Leaflet circleMarker function can be used by the options:
  //   this.geojsonOptions.pointToLayer = (feature, latLng) =>
  //     circleMarker(latLng, { radius: 8 });
  //   this.mapIsReady = true;
  // },
  log() {
    // console.log(e.target.getLatLng());
    console.log(this.marker_position)
  },
  }
});
</script>
<style scoped>
.item {
  margin-bottom: 20px;
}
.form {
  margin: 20px;
}
ion-datetime {
  height: 190px;
  width: auto;

  max-width: 350px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(288px, 1fr));
  grid-gap: 0 10px;
}
.margin-left {
  margin-left: 16px;
}

ion-modal {
  --width: 290px;
  --height: 190px;
  --border-radius: 8px;
}
.map {
  height: 30px;
}
</style>
