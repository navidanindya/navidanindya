import Vue from 'vue'
import WebFont from 'webfontloader'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

WebFont.load({
  google: {
    families: ["Montserrat:400,900,900i", "Space Mono"],
  },
});

import "./assets/index.css";
import "./assets/socials.css";

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
