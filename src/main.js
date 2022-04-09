import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
// import { provide } from 'vue'
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Store Pinia */

import { createPinia } from 'pinia'


const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(createPinia())
  // provide('SUPABASE_KEY', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTQ1NzczMSwiZXhwIjoxOTU3MDMzNzMxfQ.gt2mp51qKMtSPdwjIEQGionSAPecpBcov2EyEiaa9EA")
  
router.isReady().then(() => {
  app.mount('#app');
});