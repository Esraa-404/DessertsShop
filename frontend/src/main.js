import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "@fortawesome/fontawesome-free/css/all.css";

// دول بتوع تنزيل البوتستراب

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'      // <--- مهم جدًا

const app = createApp(App)
app.use(router)                     // <--- مهم جدًا
app.mount('#app')




