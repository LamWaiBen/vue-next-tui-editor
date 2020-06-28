import { createApp } from 'vue';
import App from './App.vue'

import { Editor } from "../src/index";

const app = createApp(App);
app.component('tui-editor', Editor);
app.mount('#app')
