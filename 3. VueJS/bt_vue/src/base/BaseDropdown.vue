<template>
    <div class="dropdown" :id="dropdownId" @click="toggle">
        <div class="hint" :class="{'hint-hide': hintHide}">{{ dropdownHint }}</div>
        <div class="label" :class="{'label-show': labelShow}">{{ dropdownLabel }}</div>
        <input :value="dropdownInputVal" :name="dropdownId" hiddenn>
        <button type="button" class="btn-2 btn-clear" :class="{'btn-clear-show': btnClearShow}" @click="clear"><font-awesome-icon icon="times-circle"/></button>
        <div class="caret"><font-awesome-icon icon="angle-down"/></div>
        <div class="dropdown-data" v-if="opened">
            <div class="dropdown-item" 
                v-for="item in items" 
                :key="item.DepartmentId ? item.DepartmentId : item.PositionId" @click="change(item)">
                <div class="dropdown-item-icon"><font-awesome-icon icon="check"/></div>
                <div class="dropdown-item-text">{{ item.DepartmentName ? item.DepartmentName : item.PositionName }}</div>
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
            dropdownInputVal: '',
            hintHide: false,
            labelShow: false,
            btnClearShow: false,
        }
    },
    props: {
        dropdownHint: {
            type: String,
        },
        dropdownId: {
            type: String,
        },
    },
    methods: {
        /**
         * Thuc hien lay du lieu va show dropdown
         * Author: NPLONG (31/07/2021)
         */
        toggle: function() {
            var self = this;
            if (self.opened == true) {
                self.opened = false;
            } else {
                // 1st: Call API lay items trong dropdown
                let apiUrl = '';
                switch (this.dropdownId) {
                    case "department":
                        apiUrl = "http://cukcuk.manhnv.net/api/Department";
                        break;
                    case "position":
                        apiUrl = "http://cukcuk.manhnv.net/v1/Positions";
                        break;
                    default:
                        break;
                }
                axios.get(apiUrl)
                    .then((res) => {
                        self.items = res.data;
                        console.log(self.items);
                    })
                    .catch(() => {});
                
                // 2nd: Show dropdown
                self.opened = !self.opened;
            }
        },

        /**
         * Show item text len outermost dropdown khi click vao 1 item
         * Author: NPLONG (31/07/2021)
         */
        change: function(item) {
            // Outer div change
            this.dropdownLabel = item.DepartmentName ? item.DepartmentName : item.PositionName;
            this.dropdownInputVal = item.DepartmentId ? item.DepartmentId : item.PositionId;
            this.hintHide = true;
            this.labelShow = true;
            this.btnClearShow = true;

            // Items change
        },

        /**
         * Hide item text treb outermost dropdown khi click vao clear button
         * Author: NPLONG (31/07/2021)
         */
        clear: function() {
            this.dropdownLabel = '';
            this.dropdownInputVal = '';
            this.labelShow = false;
            this.hintHide = false;
            this.btnClearShow = false;
        }
    }, 
}
</script>

<style scoped>
    @import '../css/component/dropdown.css';
</style>