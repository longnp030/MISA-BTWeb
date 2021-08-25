<template>
    <div class="loading-wrapper" :class="{'hide': hide}">
        <div class="spinner"><font-awesome-icon icon="spinner"/></div>
    </div>
</template>

<script>
export default {
    props: {
        hide: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style scoped>
@import '../css/component/loading.css'
</style>