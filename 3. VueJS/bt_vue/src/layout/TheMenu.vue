<template>
    <div class="menu">
        <div class="menu-item">
            <div class="menu-icon menu-icon-dashboard"></div>
            <div class="menu-item-text">Tổng quan</div>
        </div>

        <div class="menu-item">
            <div class="menu-icon menu-icon-report"></div>
            <div class="menu-item-text">Báo cáo</div>
        </div>

        <div class="menu-item">
            <div class="menu-icon menu-icon-dashboard"></div>
            <div class="menu-item-text">Mua hàng</div>
        </div>

        <div class="menu-item" @click="active">
            <div class="menu-icon menu-icon-employee"></div>
            <div class="menu-item-text"><router-link to="/employee" >Danh mục nhân viên</router-link></div>
        </div>

        <div class="menu-item">
            <div class="menu-icon menu-icon-setting"></div>
            <div class="menu-item-text">Thiết lập hệ thống</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Menu",
    methods: {
        active() {
            event.currentTarget.classList.add("active");
        }
    },
}
</script>

<style scoped>
    @import '../css/layout/menu.css'
</style>