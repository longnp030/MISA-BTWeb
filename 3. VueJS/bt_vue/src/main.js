import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;
// Vue.config.silent = true

import moment from 'moment';
Vue.prototype.moment = moment;

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
Vue.component('datepicker', DatePicker);

import AxiosPlugin from 'vue-axios-cors';
Vue.use(AxiosPlugin)

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
const options = {
    // You can set your default options here
    position: 'bottom-right',

};
Vue.use(Toast, options);

new Vue({
  render: h => h(App),
}).$mount('#app');
