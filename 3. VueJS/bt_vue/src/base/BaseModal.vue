<template>
    <div class="modal-wrapper" :class="{'hidden': isHidden}">
        <div class="modal">
            <div class="head">
                <div class="title">{{ title }}</div>
                <div class="close"></div>
            </div>
            <div class="body">
                <div class="icon"></div>
                <div class="text">{{ textContent }}</div>
            </div>
            <div class="foot">
                <BaseButton
                    buttonClass="btn btn-danger"
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
        }
    },
    methods: {
        btnYesOnClick: function() {
            this.$emit('btnYesOnClick');
        },
        btnNoOnClick: function() {
            this.$emit('btnNoOnClick');
        }
    },
}
</script>

<style scoped>
@import '../css/component/modal.css'
</style>