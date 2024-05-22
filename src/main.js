import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { get } from '@/services/commonAPI';

get('/init');

createApp(App).mount('#app')