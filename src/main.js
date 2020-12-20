import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

createApp(App).use(router).mount('#app');
