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
            placeholder="12.34567, 12.34567">
          </ion-input>
        </ion-item>
          <div class="item">
            <p>Ab wann kann hier gerettet werden?</p>
            <ion-button 
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
import { 
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
  IonModal } from '@ionic/vue';

export default defineComponent({
  name: 'Tab3Page',
  components: { 
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
    IonModal },
  data: () => ({
    name: '',
    koordinaten: '',
    beschreibung: '',
    datetime: '22:00',
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
            time: this.datetime},
        ])
      console.log(error)
      this.name = ''
      this.beschreibung = ''
      this.koordinaten = ''
      this.datetime = '22:00'
    },
    console_log() {
      console.log(this.datetime)
    }
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

ion-modal {
  --width: 290px;
  --height: 190px;
  --border-radius: 8px;
}
</style>
