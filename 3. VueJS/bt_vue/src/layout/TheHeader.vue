<template>
    <div class="header">
        <div class="left">
            <div class="toggle"></div>
            <div class="logo"></div>
        </div>
        <div class="right">
            <div class="company-select">
                <div class="logo"></div>
                <div class="dropdown">
                    <div class="hint">Công ty MISA</div>
                    <div class="text-over"></div>
                    <button type="button" class="btn-2 btn-clear"><i class="fas fa-times-circle"></i></button>
                    <div class="caret" id="dropdown-caret"><i class="fas fa-angle-down"></i></div>
                    <div class="dropdown-data">
                        <!-- <div class="dropdown-item">
                            <div class="dropdown-item-icon"><i class="fas fa-check"></i></div>
                            <div class="dropdown-item-text">Chi nhánh 1</div>
                        </div>
                        <div class="dropdown-item">
                            <div class="dropdown-item-icon"><i class="fas fa-check"></i></div>
                            <div class="dropdown-item-text">Chi nhánh 2</div>
                        </div>
                        <div class="dropdown-item">
                            <div class="dropdown-item-icon"><i class="fas fa-check"></i></div>
                            <div class="dropdown-item-text">Chi nhánh 3</div>
                        </div>
                        <div class="dropdown-item">
                            <div class="dropdown-item-icon"><i class="fas fa-check"></i></div>
                            <div class="dropdown-item-text">Chi nhánh 4</div>
                        </div> -->
                    </div>
                </div>
            </div>

            <div class="user">
                <div class="noti"><i class="far fa-bell"></i></div>
                <div class="avatar"></div>
                <div class="name">Tran Van A</div>
                <div class="option"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
    @import '../css/layout/header.css';
</style>