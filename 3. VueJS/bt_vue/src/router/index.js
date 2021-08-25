import Vue from 'vue'
import VueRouter from 'vue-router';
import EmployeeList from '../employee/EmployeeList.vue'
Vue.use(VueRouter);
const routers = [
    {
        path: '/employee',
        name: "EmployeeList",
        component: EmployeeList,
    },
]
const router = new VueRouter({
    mode: 'history',
    routes: routers,
})
export default router