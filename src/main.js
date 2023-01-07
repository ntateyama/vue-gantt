import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import { loadFonts } from './plugins/webfontloader';

loadFonts();

createApp(App).use(store).mount('#app');
