import { createApp } from 'vue'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import router from './router'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'

const app = createApp(App)
app.use(router)
app.use(PrimeVue);
app.mount('#app')
