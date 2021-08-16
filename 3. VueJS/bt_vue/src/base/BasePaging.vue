<template>
    <div class="paging">
        <div class="left">Hiển thị <b>-/{{ allEmplCount }}</b> nhân viên</div>
        <div class="center">
            <BaseButton
                buttonClass="first-page btn-2"
                :hideIcon="hideIcon"/>
            <BaseButton
                buttonClass="prev-page btn-2"
                :hideIcon="hideIcon"/>

            <BaseButton
                buttonClass="i-page btn-2 active"
                buttonText="1"
                :hideIcon="hideIcon"/>
            <BaseButton
                buttonClass="i-page btn-2"
                buttonText="2"
                :hideIcon="hideIcon"/>
            <BaseButton
                buttonClass="i-page btn-2"
                buttonText="3"
                :hideIcon="hideIcon"/>
            
            <BaseButton
                buttonClass="next-page btn-2"
                :hideIcon="hideIcon"/>
            <BaseButton
                buttonClass="last-page btn-2"
                :hideIcon="hideIcon"/>
        </div>
        <div class="right"><b>{{ allEmplCount }}</b> nhân viên/trang</div>
    </div>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
export default {
    components: {
        BaseButton,
    },
    props: {
        allEmplCount: {
            type: Number
        },
    },
    data() {
        return {
            hideIcon: true,
        }
    }
}
</script>

<style scoped>
@import '../css/component/paging.css'
</style>