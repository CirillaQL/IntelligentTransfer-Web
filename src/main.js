import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {provinceAndCityData, CodeToText, TextToCode} from 'element-china-area-data';


const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(store).use(router).use(ElementPlus).use(VueAxios, axios).use(provinceAndCityData, CodeToText, TextToCode).mount('#app')
