import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';

//in main.js
import 'primevue/resources/themes/aura-light-green/theme.css'

const app = createApp(App);
app.use(PrimeVue);
app.mount('#app')
