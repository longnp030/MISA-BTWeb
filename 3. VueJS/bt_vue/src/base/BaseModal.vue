<template>
    <div class="modal-wrapper" :class="{'hidden': isHidden}">
        <div class="modal" :class="{'mini': mini, 'danger': danger, 'warn': warn}">
            <div class="head">
                <div class="title">{{ title }}</div>
                <div class="close" @click="btnNoOnClick"></div>
            </div>
            <div class="body">
                <div class="icon"><font-awesome-icon icon="exclamation-triangle"/></div>
                <div class="text">{{ textContent }}</div>
                <div></div>
                <div class="obj-list">
                    <div class="obj-container" v-for="obj in objs" :key="obj.EmployeeId">
                        <div>{{ obj.EmployeeCode }}</div>
                        <div>{{ obj.FullName }}</div>
                    </div>
                </div>
            </div>
            <div class="foot">
                <BaseButton
                    :buttonClass="{'btn': true, 'btn-danger': danger,}"
                    buttonText="Đồng ý"
                    :hideIcon="hideIcon"
                    v-on:btnOnClick="btnYesOnClick"/>
                <BaseButton
                    buttonClass="btn-2"
                    buttonText="Hủy"
                    :hideIcon="hideIcon"
                    v-on:btnOnClick="btnNoOnClick"/>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from './BaseButton.vue'
export default {
    components: {
        BaseButton,
    },
    data() {
        return {
            hideIcon: true,
        }
    },
    props: {
        title: {
            type: String
        },
        textContent: {
            type: String,
        },
        isHidden: {
            type: Boolean,
            default: true,
        },
        objs: {
            type: [Array, Set],
        },
        mini: {
            type: Boolean,
            default: true,
        },
        danger: {
            type: Boolean,
            default: false,
        },
        warn: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        btnYesOnClick: function() {
            this.$emit('btnYesOnClick', true, true);
        },
        btnNoOnClick: function() {
            console.log("no on click.");
            this.$emit('btnYesOnClick', true, false);
        }
    },
}
</script>

<style scoped>
@import '../css/component/modal.css'
</style>