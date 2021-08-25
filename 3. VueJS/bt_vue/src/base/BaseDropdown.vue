<template>
    <div class="dropdown" :id="dropdownId" >
        <div class="hint" :class="{'hint-hide': hintHide}">{{ dropdownHint }}</div>
        <div class="label" :class="{'label-show': labelShow}">{{ dropdownLabel }}</div>
        <input :value="dropdownInputVal" v-on:input="$emit('input', $event.target.value)" hidden>
        <button type="button" class="btn-2 btn-clear" :class="{'btn-clear-show': btnClearShow}" @click="clear($event)"><font-awesome-icon icon="times-circle"/></button>
        <div class="caret"><font-awesome-icon icon="angle-down"/></div>
        <div class="dropdown-data" v-if="opened">
            <div class="dropdown-item" 
                v-for="item in items" 
                :key="item.DepartmentId ? item.DepartmentId : item.PositionId ? item.PositionId : item.Gender ? item.Gender.toString() : item.WorkStatus ? item.WorkStatus.toString() : null"
                :data-id="item.DepartmentId ? item.DepartmentId : item.PositionId ? item.PositionId : item.Gender ? item.Gender.toString() : item.WorkStatus ? item.WorkStatus.toString() : null"
                @click="change($event, item)">
                <div class="dropdown-item-icon"><font-awesome-icon icon="check"/></div>
                <div class="dropdown-item-text">{{ item.DepartmentName ? item.DepartmentName : item.PositionName ? item.PositionName : item.GenderName ? item.GenderName : item.WorkStatusName ? item.WorkStatusName : null }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "BaseDropdown",
    data() {
        return {
            items: [],
            opened: false,
            dropdownLabel: '',
            inputVal: '',
            hintHide: false,
            labelShow: false,
            btnClearShow: false,
            posApi: "https://localhost:5001/api/v1/Positions/",
            depApi: "https://localhost:5001/api/v1/Departments/",
            genApi: "https://localhost:5001/api/v1/Genders/",
            workApi: "https://localhost:5001/api/v1/WorkStatus/",
        }
    },
    props: {
        dropdownHint: {
            type: String,
        },
        dropdownId: {
            type: String,
        },
        dropdownInputVal: {
            type: [String, Number],
        },
        apiUrl: {
            type: String,
        }
    },
    created() {
        /**
         * Thuc hien lay du lieu va show dropdown
         * Author: NPLONG (31/07/2021)
         */
        var self = this;
            if (self.opened == true) {
                self.opened = false;
            } else {
                axios.get(this.apiUrl).then((res) => { self.items = res.data; }).catch(() => {});
                self.opened = !self.opened;
            }
    },
    methods: {
        /**
         * Show item text len outermost dropdown khi click vao 1 item
         * Author: NPLONG (31/07/2021)
         */
        change: function(event, item) {
            this.dropdownLabel = item.DepartmentName ? item.DepartmentName : item.PositionName ? item.PositionName : item.GenderName ? item.GenderName : item.WorkStatusName ? item.WorkStatusName : null;
            this.inputVal = item.DepartmentId ? item.DepartmentId : item.PositionId ? item.PositionId : item.Gender ? item.Gender : item.WorkStatus ? item.WorkStatus : null;
            this.dropdownOver(true);

            // Items change
            let active = event.currentTarget.parentNode.querySelector(".active");
            console.log(active);
            if (active !== null) {
                active.classList.remove("active");
            }
            let thisItem = event.currentTarget;
            thisItem.classList.add("active");
        },

        /**
         * Hide item text treb outermost dropdown khi click vao clear button
         * Author: NPLONG (31/07/2021)
         */
        clear: function(event) {
            this.dropdownLabel = '';
            this.inputVal = '';
            this.dropdownOver(false);

            let thisItem = event.currentTarget.parentNode.querySelector('.active');
            thisItem.classList.remove("active");
        },

        dropdownOver: function(trueFalse) {
            this.hintHide = trueFalse;
            this.labelShow = trueFalse;
            this.btnClearShow = trueFalse;
        }
    },
    watch: {
        dropdownInputVal: function() {
            this.inputVal = this.dropdownInputVal;
        },
        inputVal: function() {
            let items = this.$el.querySelectorAll('.dropdown-item');
            items.forEach(item => {
                item.classList.remove("active");
                this.dropdownLabel = '';
                this.dropdownOver(false);
            });

            if (this.inputVal) {
                items.forEach(item => {
                    if (item.dataset.id === this.inputVal.toString()) {
                        item.classList.add("active");
                        this.dropdownLabel = item.querySelector('.dropdown-item-text').textContent;
                        this.dropdownOver(true);
                    } else {
                        item.classList.remove("active");
                    }
                });
            }
            this.$emit("assign", this.dropdownId, this.inputVal);
        },
    }
}
</script>

<style scoped>
    @import '../css/component/dropdown.css';
</style>