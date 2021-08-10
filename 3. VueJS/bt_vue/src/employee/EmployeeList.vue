<template>
<div>
    <div class="page-header">
        <div class="title">Danh sách nhân viên</div>

        <!--TODO: Tai sao @click trong custom component khong hoat dong?
            ANS: Dung custom event, khai bao 1 event trong base comp, emit len v-on:event-->
        <BaseButton
            buttonDivClass="add-employee" 
            buttonClass="btn"
            buttonId="add-employee-btn" 
            iconClass="user-plus"
            buttonText="Thêm nhân viên"
            v-on:btnOnClick="btnAddOnClick(false, true)"/>

        <BaseButton
            buttonDivClass="del-employee" 
            buttonClass="btn btn-danger"
            buttonId="del-employee-btn" 
            iconClass="user-times"
            buttonText="Xóa nhân viên"
            v-on:btnOnClick="btnDelOnClick"/>

        <BaseModal 
            title="Xóa bản ghi"
            textContent="Bạn có chắc muốn xóa các nhân viên sau không?"
            :isHidden="isHidden"
            :mini="true"
            :danger="true"
            :objs="selectedEmpls"
            @btnYesOnClick="btnYesOnClick"/>
    </div>

    <div class="filter">
        <div class="left">
            <input type="text" id="search" class="search icon-input" placeholder="Tìm kiếm theo Mã, Tên hoặc Số điện thoại">

            <!--TODO: Lam the nao de call API 1 lan ma lay dc data cho tat ca dropdown
                ANS: No way!! Call API to fetch dropdown data each time dropdown is clicked
                UPDATE 09/08/2021: TERNARY OPERATOR while fetch api data!!! fetch right when created-->

            <BaseDropdown
                dropdownId="departmentFilter"
                dropdownHint="Tất cả phòng ban"/>

            <BaseDropdown
                dropdownId="positionFilter"
                dropdownHint="Tất cả vị trí"/>
        </div>
        
        <div class="right">
            <BaseButton
                buttonClass="btn-2 reload"
                :hideIcon="true"
                v-on:btnOnClick="btnReloadOnClick"/>
        </div>
    </div>

    <div class="table">
        <table cellspacing="0">
            <thead>
                <tr>
                    <th field="CheckMark"><label class="checkbox"><input type="checkbox" @click="checkAllOnClick($event)"><span class="checkmark"><font-awesome-icon class="visible-icon hidden" icon="check"/></span></label></th>
                    <th field="EmployeeCode"   title="Mã nhân viên">Mã nhân viên</th>
                    <th field="FullName"       title="Họ và tên">Họ và tên</th>
                    <th field="GenderName"     title="Giới tính">Giới tính</th>
                    <th field="DateOfBirth"    title="Ngày sinh">Ngày sinh</th>
                    <th field="PhoneNumber"    title="Điện thoại">Điện thoại</th>
                    <th field="Email"          title="Email">Email</th>
                    <th field="PositionName"   title="Chức vụ">Chức vụ</th>
                    <th field="DepartmentName" title="Phòng ban">Phòng ban</th>
                    <th field="Salary"         title="Mức lương cơ bản">Mức lương cơ bản</th>
                    <th field="WorkStatus"     title="Tình trạng công việc">Tình trạng công việc</th>
                </tr>
            </thead>
        
            <tbody> 
                <!-- <tr><td><label class="checkbox"><input type="checkbox" @click="checkRowOnClick($event, employee)"><span class="checkmark"></span></label></td><td>x</td><td>x</td><td>x</td><td>x</td><td>x</td><td>x</td><td>x</td><td>x</td><td>x</td><td>x</td></tr> -->
            <tr v-for="employee in employees" 
                :key="employee.EmployeeId" 
                :data-id="employee.EmployeeId"
                @dblclick="rowOnDblClick(employee.EmployeeId)">
                <!--TODO: Tai sao function trong methods lai run 2 lan?
                    ANS: Do khai bao @click o parent, khi click se an 2 event-->
                <!--TODO: Tai sao neu de prevent thi khi click khong nhan css?
                    ANS: Như câu hỏi bên trên, đặt ở thằng cha mà prevent thì 
                        chỉ nhận cha -->
            <td><label class="checkbox"><input type="checkbox" @click="checkRowOnClick($event, employee)"><span class="checkmark"><font-awesome-icon class="visible-icon hidden" icon="check"/></span></label></td>
            <td :title="employee.EmployeeCode ">{{ employee.EmployeeCode   }}</td>
            <td :title="employee.FullName     ">{{ employee.FullName       }}</td>
            <td :title="employee.GenderName    ">{{ employee.GenderName     }}</td>
            <td :title="employee.DateOfBirth   ">{{ employee.DateOfBirth? moment(employee.DateOfBirth).format('DD/MM/YYYY') : ''}}</td>
            <td :title="employee.PhoneNumber   ">{{ employee.PhoneNumber    }}</td>
            <td :title="employee.Email         ">{{ employee.Email          }}</td>
            <td :title="employee.PositionName  ">{{ employee.PositionName   }}</td>
            <td :title="employee.DepartmentName">{{ employee.DepartmentName }}</td>
            <td :title="employee.Salary        ">{{ employee.Salary | money         }}</td>
            <td :title="employee.WorkStatus    ">{{ employee.WorkStatus     }}</td>
            </tr>
            </tbody>
        </table>
    </div>

    <!-- <div class="paging">
        <span class="left">Paging {{ today }}</span>
        <input class="center" v-model="salary" @keyup="handleMoneyInputChange">
        <input class="center" v-model="today" type="date">
        <span class="right"> Money {{ salary }}</span>
    </div> -->
    <EmployeeForm :formMode="formMode" :newEmployeeId="newEmployeeId" :employeeId="employeeId" :isHidden="isHide" @btnAddOnClick="btnAddOnClick" @reload="btnReloadOnClick"/>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import Vue from 'vue'
import AxiosPlugin from 'vue-axios-cors';
Vue.use(AxiosPlugin)

import EmployeeForm from '../employee/EmployeeForm.vue'
import BaseButton from '../base/BaseButton.vue'
import BaseDropdown from '../base/BaseDropdown.vue'
import BaseModal from '../base/BaseModal.vue'

export default {
    name: "EmployeeList",
    components: {
        EmployeeForm,
        BaseButton,
        BaseDropdown,
        BaseModal,
    },
    mounted() {
        var self = this;
        axios.get("https://localhost:5001/api/Employees/")
            .then((res) => {
                self.employees = res.data.slice(1, 20);
            })
            .catch((res) => {
                console.log(res);
            });
    },
    data() {
        return {
            employees: [],
            isHidden: true, // alert modal
            isHide: true, // form modal
            employeeId: '',
            newEmployeeId: '',
            formMode: 0,
            departments: [],
            positions: [],
            selectedEmpls: [],
            today: moment('2017-02-01T00:00:00.000Z').format("YYYY-MM-DD"),//.diff(moment('Aug 04 2021')) < 0,
            salary: 412312,
        }
    },
    props: {
    },
    methods: {
        /**
         * Thuc hien show form nhan vien khi nhan nut Them nhan vien
         * Author: NPLONG (30/07/2021)
         */
        btnAddOnClick(isHide, getNewEmplCode) {
            this.isHide = isHide;
            this.formMode = 0;

            if (getNewEmplCode) {
                axios.get("https://localhost:5001/api/Employees/NewEmployeeCode/")
                    .then((res) => {
                        this.newEmployeeId = res.data;
                    })
                    .catch(() => {});
            } else {
                this.newEmployeeId = null;
                console.log("emplList line 178, data: emplCode: ", this.employeeCode);
            }
        },

        btnReloadOnClick() {
            console.log("Reloading..");
            var self = this;
            axios.get("https://localhost:5001/api/Employees/")
                .then((res) => {
                    self.employees = res.data;
                })
                .catch((res) => {
                    console.log(res);
                });
            console.log("Reloaded!");
        },
        
        /**
         * Thuc hien show form sua nhan vien khi kich dup chuot vao 1 dong trong bang
         * Author: NPLONG (30/07/2021)
         */
        rowOnDblClick(emplId) {
            console.log("line 200 emplList: this.employeeId: ", this.employeeId, "this.newemployeeId:", this.newEmployeeId);
            this.employeeId = emplId + "!";
            this.isHide = false;
            this.formMode = 1;
        },

        /**
         * Thuc hien add class 'checked' vao checkbox tren moi dong neu click vao
         * Author: NPLONG (30/07/2021)
         */
        checkRowOnClick(event, emp) {
            // debugger; // eslint-disable-line no-debugger
            // TODO: Cach them bot class cho parent va child chuan VueJS
            // (e.target.parentNode.parentNode.parentNode).className += "checked";

            // debugger; // eslint-disable-line no-debugger
            console.log(event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('thead .visible-icon'))
            let thisTr = event.currentTarget.parentNode.parentNode.parentNode;

            let checked = false;
            if (thisTr.getAttribute("data-checked") === null) {
                checked = true;
            } else if (thisTr.getAttribute("data-checked") === 'false') { 
                checked = true;
            } else if (thisTr.getAttribute("data-checked") === 'true') {
                checked = false;
            }
            thisTr.setAttribute("data-checked", checked);
            
            this.selectedEmpls = [...this.selectedEmpls];
            if (checked) {
                this.selectedEmpls.push(emp);
                thisTr.classList.add("checked");

                event.currentTarget.parentNode.querySelector(".visible-icon").classList.remove("hidden");
                
                console.log(this.selectedEmpls);
            } else {
                let idx = this.selectedEmpls.findIndex(empl => empl.EmployeeCode === emp.EmployeeCode);
                this.selectedEmpls.splice(idx, 1);
                thisTr.classList.remove("checked");

                event.currentTarget.parentNode.querySelector(".visible-icon").classList.add("hidden");
                event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('thead .visible-icon').classList.add("hidden");
                
                console.log(this.selectedEmpls);
            }
        },

        /**
         * Ham xu ly chon/ bo chon tat ca cac nhan vien
         * Author: NPLONG (02/08/2021)
         */
        checkAllOnClick(event) {
            let thisTh = event.currentTarget.parentNode.parentNode.parentNode;

            let checked = false;
            if (thisTh.getAttribute("data-checked") === null) {
                checked = true;
            } else if (thisTh.getAttribute("data-checked") === 'false') { 
                checked = true;
            } else if (thisTh.getAttribute("data-checked") === 'true') {
                checked = false;
            }
            thisTh.setAttribute("data-checked", checked);

            if (checked) {
                event.currentTarget.parentNode.querySelector(".visible-icon").classList.remove("hidden");

                this.selectedEmpls = new Set(this.selectedEmpls);
                this.employees.forEach(employee => {
                    this.selectedEmpls.add(employee);
                });
                console.log(this.selectedEmpls);

                let allTrs = document.querySelectorAll('tbody tr');
                allTrs.forEach(tr => {
                    tr.classList.add("checked");
                    tr.setAttribute("data-checked", checked);
                    tr.querySelector('.visible-icon').classList.remove('hidden');
                });
            } else {
                event.currentTarget.parentNode.querySelector(".visible-icon").classList.add("hidden");

                this.selectedEmpls = [];
                console.log(this.selectedEmpls);

                let allTrs = document.querySelectorAll('tbody tr');
                allTrs.forEach(tr => {
                    tr.classList.remove("checked");
                    tr.setAttribute("data-checked", checked);
                    tr.querySelector('.visible-icon').classList.add('hidden');
                });
            }
        },

        /**
         * Thuc hien xoa cac nhan vien duoc chon
         * Author: NPLONG (30/07/2021)
         */
        btnDelOnClick() {
            // let toDelEmpls = document.getElementsByClassName('checked');
            if (this.selectedEmpls.length === 0) {
                this.$toast.warning("Bạn chưa chọn nhân viên nào")
            } else {
                this.isHidden = false;
            }
        },

        btnYesOnClick: function(isHidden) {
            this.isHidden = isHidden;
            this.selectedEmpls = [...this.selectedEmpls];
            console.log(this.selectedEmpls);
            for (let i = 0; i < this.selectedEmpls.length; i++) {
                console.log(this.selectedEmpls[i].EmployeeId);
            }
        },

        handleMoneyInputChange: function() {
            this.salary = this.salary.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    },
    filters: {
        money: function(money) {
            return !money ? '' : money.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    }
}
</script>