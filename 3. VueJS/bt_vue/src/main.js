import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;
// Vue.config.silent = true;

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
    transition: "Vue-Toastification__bounce",
    maxToasts: 10,
    timeout: 5000,
};
Vue.use(Toast, options);

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/vi.json';
Object.keys(rules).forEach(rule => {
    extend(rule, {
        ...rules[rule],
        message: messages[rule],
    });
});
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend('dob', {
    getMessage: field => field + "không thể vượt quá ngày hôm nay",
    validate: value => (value > new Date()),
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
