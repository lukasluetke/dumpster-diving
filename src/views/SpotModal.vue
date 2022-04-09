<template>
    <!-- Sheet Modal -->
        <ion-content>
            <ion-card 
                class="card" 
                v-for="item in spot" 
                :key="item.name">
                <ion-card-header>
                    <ion-grid>
                        <ion-row>
                        <ion-col>
                            <ion-card-title class="title">
                            {{ item.name }}
                            </ion-card-title>
                        </ion-col>
                        <ion-col class="time_chip">
                            <ion-chip>
                                <ion-icon 
                                    :icon="time" 
                                    color="dark">
                                </ion-icon>
                                <ion-label>
                                    Ab {{ item.time }} Uhr
                                </ion-label>
                            </ion-chip>
                        </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-card-header>
                <ion-card-content>
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <p>
                                    {{ item.description }}
                                </p>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <div
                                    v-if="item.status == '1'">
                                    <ion-button 
                                        class="button"
                                        expand="block" 
                                        color="danger"
                                        @click="presentActionSheet">
                                        Heute noch nicht besucht
                                    </ion-button>
                                </div>
                                <div
                                    v-if="item.status == '2'">
                                  <ion-button 
                                      class="button"
                                      expand="block" 
                                      color="success"
                                      @click="presentActionSheet"
                                      >
                                      Für heute schon alles gerettet
                                  </ion-button>
                                    <div>
                                    </div>
                                </div>
                                <div
                                    v-if="item.status == '3'">
                                  <ion-button 
                                      class="button"
                                      expand="block" 
                                      color="warning"
                                      @click="presentActionSheet"
                                      >
                                      Hier gibts noch was
                                  </ion-button>
                                    
                                </div>
                                <!-- //// -->
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-card-content>
            </ion-card>
        </ion-content>
</template>

<script>
import { defineComponent } from 'vue';
import { useCounterStore } from '@/stores/counter'
import { supabase } from "@/supabase"
import { time } from 'ionicons/icons';
import { IonContent, 
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardTitle, 
    IonButton, 
    actionSheetController,
    IonIcon,
    IonLabel,
    IonChip,
    IonCol, 
    IonGrid, 
    IonRow } from '@ionic/vue';

export default defineComponent({
  name: 'Tab2Page',
  components: {
    IonContent,
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardTitle,
    IonButton,
    IonIcon,
    IonLabel,
    IonChip,
    IonCol, 
    IonGrid, 
    IonRow
    },
  data: () => ({
    spot: [],
    time_since_close_value: '',
    time_since_change_value_millisec: '',
    time_since_change_value_minutes: '',
    jetzt_total_minutes: '',
    last_status_change: '',
    heute: '',
    last_status_change_month: '',
  }),
  setup() {
    return { time }
  },
  async created() {
    const counter = useCounterStore()
    console.log(counter.count)
    const {data: events} = await supabase
      .from('events')
      .select('description,name,status,time,last_status_change')
      .eq('id', counter.count)
    console.log(events)
    this.spot = events
    this.pre_reset()
  },
  methods: {
    async presentActionSheet() {
      const actionSheet = await actionSheetController
        .create({
          header: 'Status',
          cssClass: 'my-custom-class',
          buttons: [
            {
              text: 'Heute noch nicht besucht',
              data: 10,  
              handler: () => {
                console.log('Share clicked')
                this.changeStatus(1)
              },
            },
            {
              text: 'Für heute schon alles gerettet',
              data: 'Data value',
              handler: () => {
                console.log('Play clicked')
                this.changeStatus(2)
              },
            },
            {
              text: 'Hier gibts noch was',
              handler: () => {
                console.log('Favorite clicked')
                this.changeStatus(3)
              },
            },
            {
              text: 'Abbrechen',
              role: 'cancel',
              handler: () => {
                console.log('Abbrechen clicked')
              },
            },
          ],
        });
      await actionSheet.present();

      const { role, data } = await actionSheet.onDidDismiss();
      console.log('onDidDismiss resolved with role and data', role, data);
    },
    async changeStatus(future_status) {
        console.log(future_status)
        const counter = useCounterStore()
        const { data: error } = await supabase
            .from('events')
            .update({ status: future_status, last_status_change: new Date() })
            .eq('id', counter.count )
        console.log(error)
        const {data: events} = await supabase
            .from('events')
            .select('description,name,status,last_status_change')
            .eq('id', counter.count)
        console.log(events)
        this.spot = events
    },
    pre_reset() {
      this.spot.forEach(element => {
        this.reset(element.status, element.last_status_change, element.time)
      });
    },
    reset(old_status, last_status_change, time) {
        this.last_status_change = last_status_change
        // const change_required = 0
        if (old_status == 1) {
          console.log('heute noch nicht besucht');
        } else if (old_status == 2) {
            this.time_since_close(time)
        } else if (old_status == 3) {
            this.time_since_close(time)
        } else {
            console.log('fehler. Der Wert ist nicht 1,2 oder 3');
        }
    },
    time_since_close(time) {
      console.log('time since close:')
      // aktuelle Zeit:
      this.heute = new Date();
      const jetzt_hours = this.heute.getHours();
      const jetzt_minutes = this.heute.getMinutes();
      // Ladenschluss Zeit aufsplitten:
      const time_split = time.split(':');
      const time_hours = parseInt(time_split[0]);
      const time_minutes = parseInt(time_split[1]);
      // zeit in minuten
      const time_total_minutes = (time_hours * 60) + time_minutes;
      this.jetzt_total_minutes =(jetzt_hours * 60) + jetzt_minutes;
      if (time_total_minutes > this.jetzt_total_minutes) {
        this.time_since_close_value = 1440 - (time_total_minutes - this.jetzt_total_minutes)
        console.log(this.time_since_close_value)
        this.time_since_change()
      }
      else if (this.jetzt_total_minutes > time_total_minutes) {
        this.time_since_close_value = this.jetzt_total_minutes - time_total_minutes
        console.log(this.time_since_close_value)
        this.time_since_change()
      }
      else if (time_total_minutes == this.jetzt_total_minutes) {
        this.time_since_close_value = 0
        console.log(this.time_since_close_value)
        this.time_since_change()
      }
      else {
        console.log('fehler')
      }
    },
    time_since_change() {
      console.log('time since change:')
      const last_status_change_local = new Date(Date.parse(this.last_status_change) + (120 * 60000))
      this.time_since_change_value_millisec = Date.parse(this.heute) - Date.parse(last_status_change_local)
      this.time_since_change_value_minutes = this.time_since_change_value_millisec / 60000
      console.log(this.time_since_change_value_minutes)
      this.time_since_change_vs_time_since_close()
    },
    time_since_change_vs_time_since_close() {
      if (this.time_since_change_value_minutes < this.time_since_close_value) {
        console.log('Letzte Statusänderung war nach dem letzten Ladenschluss. Wird ausgegeben wie in db')
      } else if (this.time_since_close_value < this.time_since_change_value_minutes) {
        console.log('Letzter Ladenschluss war nach der letzten Statusänderung Status wird geändert')
        // ToDo
        this.changeStatus(1)
        console.log('Status wurde geändert')

      } else {
        console.log('Fehler')
      }
    },
  }
})
</script>

<style scoped>
.card {
    margin-top: 15px;
}
.time_chip {
    /* position: relative; */
    text-align: right;
}
.title {
    margin-top: 10px;
}
.button {
    margin-top: 20px;
}
</style>
