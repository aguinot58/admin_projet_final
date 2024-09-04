import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const app = createApp(App)

app.component('app-header', Header)
app.component('app-footer', Footer)
app.use(router)
app.mount('#app')
