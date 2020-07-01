import { createApp } from 'vue';
import App from './App.vue'

import { Editor } from "../src/index";

const app = createApp(App);
app.config.isCustomElement = tag => {
    if(/^tui-/.test(tag)) return true
    return false
} 
app.component('tui-editor', Editor);
app.mount('#app')
