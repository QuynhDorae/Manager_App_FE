import { createApp } from 'vue'
import router from './router'
import '@unocss/reset/tailwind.css'
import '@material-tailwind/html/styles/material-tailwind.css'
import '@material-tailwind/html/scripts/ripple.js'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
