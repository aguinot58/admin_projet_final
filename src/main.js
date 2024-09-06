import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import 'bootstrap-icons/font/bootstrap-icons.css';

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App)

app.component('app-header', Header)
app.component('app-footer', Footer)
app.use(router)
app.use(ToastPlugin);
app.mount('#app')
