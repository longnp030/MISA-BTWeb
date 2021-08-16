<template>
    <div class="dropdown" :id="dropdownId" >
        <div class="hint" :class="{'hint-hide': hintHide}">{{ dropdownHint }}</div>
        <div class="label" :class="{'label-show': labelShow}">{{ dropdownLabel }}</div>
        <input :value="dropdownInputVal" hiddenn>
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
        dropdownInputVal: {
            type: [String, Number],
        },
        employee: {
            type: Object
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
                // 1st: Call API lay items trong dropdown
                let apiUrl = '';
                switch (this.dropdownId) {
                    case "department":
                    case "departmentFilter":
                        apiUrl = "https://localhost:5001/api/v1/Departments/";
                        break;
                    case "position":
                    case "positionFilter":
                        apiUrl = "https://localhost:5001/api/v1/Positions/";
                        break;
                    case "gender":
                        apiUrl = "https://localhost:5001/api/v1/Genders/";
                        break;
                    case "workstatus":
                        apiUrl = "https://localhost:5001/api/v1/WorkStatus/";
                        break;
                    default:
                        break;
                }
                axios.get(apiUrl)
                    .then((res) => {
                        self.items = res.data;
                        // console.log(self.items);
                    })
                    .catch(() => {
                        switch (apiUrl) {
                            case "https://localhost:5001/api/v1/Departments/":
                                this.$toast.error("Tải danh sách phòng ban thất bại");
                                break;
                            case "https://localhost:5001/api/v1/Positions/":
                                this.$toast.error("Tải danh sách vị trí thất bại");
                                break;
                            default:
                                break;
                        }
                    });
                
                // 2nd: Show dropdown
                self.opened = !self.opened;
            }
    },
    methods: {
        /**
         * Show item text len outermost dropdown khi click vao 1 item
         * Author: NPLONG (31/07/2021)
         */
        change: function(event, item) {
            // debugger; // eslint-disable-line
            // Outer div change
            // this.$nextTick(() => {
            //     this.dropdownLabel = item.DepartmentName ? item.DepartmentName : item.PositionName ? item.PositionName : item.GenderName ? item.GenderName : item.WorkStatusName ? item.WorkStatusName : null;
            //     this.dropdownInputVal = item.DepartmentId ? item.DepartmentId : item.PositionId ? item.PositionId : item.Gender ? item.Gender : item.WorkStatus ? item.WorkStatus : null;
            //     this.hintHide = true;
            //     this.labelShow = true;
            //     this.btnClearShow = true;
            // })
            this.dropdownLabel = item.DepartmentName ? item.DepartmentName : item.PositionName ? item.PositionName : item.GenderName ? item.GenderName : item.WorkStatusName ? item.WorkStatusName : null;
            this.dropdownInputVal = item.DepartmentId ? item.DepartmentId : item.PositionId ? item.PositionId : item.Gender ? item.Gender : item.WorkStatus ? item.WorkStatus : null;
            this.hintHide = true;
            this.labelShow = true;
            this.btnClearShow = true;

            // Items change
            let actives = event.currentTarget.parentNode.querySelectorAll(".active");
            if (actives !== null) {
                // console.log(actives);
                actives.forEach(element => {
                    element.classList.remove("active");
                });
            }
            let thisItem = event.currentTarget;
            // console.log(thisItem);
            thisItem.classList.add("active");
        },

        /**
         * Hide item text treb outermost dropdown khi click vao clear button
         * Author: NPLONG (31/07/2021)
         */
        clear: function(event) {
            this.dropdownLabel = '';
            this.dropdownInputVal = '';
            this.labelShow = false;
            this.hintHide = false;
            this.btnClearShow = false;

            let thisItem = event.currentTarget.parentNode.querySelector('.active');
            console.log(thisItem);
            thisItem.classList.remove("active");
        }
    },
    watch: {
        dropdownInputVal: function() {
            // debugger; // eslint-disable-line
            console.log("basedrop line 135, input val changed: ", this.dropdownInputVal);

            let items = this.$el.querySelectorAll('.dropdown-item');
            // console.log("type of val: ", typeof this.dropdownInputVal);
            items.forEach(item => {
                // console.log(item.dataset.id);
                // console.log("starting clear dropdown...");
                item.classList.remove("active");
                this.dropdownLabel = '';
                this.labelShow = false;
                this.hintHide = false;
                this.btnClearShow = false;
                // console.log("done clear dropdown...");
            });

            if (this.dropdownInputVal) {
                console.log("Triggered if dropdownInputValue: ", this.dropdownInputVal);
                items.forEach(item => {
                    // console.log(item.dataset.id);
                    if (item.dataset.id === this.dropdownInputVal.toString()) {
                        item.classList.add("active");
                        this.hintHide = true;
                        this.labelShow = true;
                        this.btnClearShow = true;
                        this.dropdownLabel = item.querySelector('.dropdown-item-text').textContent;
                    } else {
                        item.classList.remove("active");
                    }
                });
                
                switch (this.dropdownId) {
                    case "gender":
                        axios.get("https://localhost:5001/api/v1/Genders/")
                            .then((res) => {
                                res.data.forEach(gen => {
                                    if (gen.Gender === parseInt(this.dropdownInputVal)) {
                                        this.employee.Gender = gen.Gender;
                                        this.employee.GenderName = gen.GenderName;
                                        return;
                                    }
                                });
                            })
                            .catch(() => {});
                        break;
                    case "position":
                        axios.get("https://localhost:5001/api/v1/Positions/")
                            .then((res) => {
                                res.data.forEach(pos => {
                                    if (pos.PositionId === this.dropdownInputVal) {
                                        this.employee.PositionId = pos.PositionId;
                                        this.employee.PositionCode = pos.PositionCode;
                                        this.employee.PositionName = pos.PositionName;
                                        return;
                                    }
                                });
                            })
                            .catch(() => {});
                        break;
                    case "department":
                        axios.get("https://localhost:5001/api/v1/Departments/")
                            .then((res) => {
                                res.data.forEach(dep => {
                                    if (dep.DepartmentId === this.dropdownInputVal) {
                                        this.employee.DepartmentId = dep.DepartmentId;
                                        this.employee.DepartmentCode = dep.DepartmentCode;
                                        this.employee.DepartmentName = dep.DepartmentName;
                                        return;
                                    }
                                });
                            })
                            .catch(() => {});
                        break;
                    case "workstatus":
                        axios.get("https://localhost:5001/api/v1/WorkStatus/")
                            .then((res) => {
                                res.data.forEach(ws => {
                                    if (ws.WorkStatus === parseInt(this.dropdownInputVal)) {
                                        this.employee.WorkStatus = ws.WorkStatus;
                                        this.employee.WorkStatusName = ws.WorkStatusName;
                                        return;
                                    }
                                });
                            })
                            .catch(() => {});
                        break;
                    case "positionFilter":
                        this.$emit("pageChangeHandler", 1, this.dropdownInputVal, null);
                        break;
                    case "departmentFilter":
                        this.$emit("pageChangeHandler", 1, null, this.dropdownInputVal);
                        break;
                    default:
                        break;
                }
            }
        }
    }
}
</script>

<style scoped>
    @import '../css/component/dropdown.css';
</style>