import '@/assets/scss/custom-theme/main.scss'
import '@/assets/scss/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-ui/lib/theme-chalk/index.css'
// import 'element-plus/lib/theme-chalk/message-box.css';
// import 'element-plus/lib/theme-chalk/message.css';


import {createPinia} from "pinia";

const app = createApp(App);
app.use(router)
app.use(ElementPlus);
app.use(createPinia())

app.mount('#app');
