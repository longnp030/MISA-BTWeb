<template>
    <div id="content">
        <EmployeeList/>
    </div>
</template>

<script>
import EmployeeList from '../employee/EmployeeList.vue'

export default {
    name: "BaseContent",
    data() {
        return {
            visible: false,
        }
    },
    components: {
        EmployeeList,
    },
    methods: {
        btnCancelOnClick() {
            this.$emit('btnAddOnCLick', true);
        }
    },
}
</script>

<style scoped>
    @import '../css/page/employee.css';
</style>