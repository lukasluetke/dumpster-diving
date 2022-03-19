<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ExploreContainer name="Tab 1 page" />
      <!-- Default -->
      <!-- <ion-modal :is-open="true">
        <ion-content>Modal Content</ion-content>
      </ion-modal> -->

      <!-- Use a trigger -->
      <ion-button id="trigger-button">Click to open modal</ion-button>

      <!-- Sheet Modal -->
      <ion-modal 
        trigger="trigger-button"
        :is-open="false"
        :breakpoints="[0.1, 0.5, 1]"
        :initialBreakpoint="0.5"
      >
        <ion-content>Modal Content</ion-content>
      </ion-modal>

      <!-- Card Modal -->
      <!-- <ion-modal
        :is-open="true"
        :swipe-to-close="true"
        :presenting-element="$parent.$refs.ionRouterOutlet"
      >
        <ion-content>Modal Content</ion-content>
      </ion-modal> -->

      <!-- Passing Props -->
      <!-- <ion-modal :is-open="true">
        <app-vue-component title="Ionic"></app-vue-component>
      </ion-modal> -->
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { IonModal, IonButton } from '@ionic/vue';
// import AppVueComponent from './AppVueComponent.vue'
export default defineComponent({
  name: 'Tab1Page',
  components: { 
    ExploreContainer, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonPage,
    IonModal, 
    IonButton, 
    // AppVueComponent 
    }
});
</script>
