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
                dropdownHint="Tất cả phòng ban"
                @pageChangeHandler="pageChangeHandler"/>

            <BaseDropdown
                dropdownId="positionFilter"
                dropdownHint="Tất cả vị trí"
                @pageChangeHandler="pageChangeHandler"/>
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
            <td :title="employee.EmployeeCode  ">{{ employee.EmployeeCode   }}</td>
            <td :title="employee.FullName      ">{{ employee.FullName       }}</td>
            <td :title="employee.GenderName    ">{{ employee.GenderName     }}</td>
            <td :title="employee.DateOfBirth   ">{{ employee.DateOfBirth? moment(employee.DateOfBirth).format('DD/MM/YYYY') : ''}}</td>
            <td :title="employee.PhoneNumber   ">{{ employee.PhoneNumber    }}</td>
            <td :title="employee.Email         ">{{ employee.Email          }}</td>
            <td :title="employee.PositionName  ">{{ employee.PositionName   }}</td>
            <td :title="employee.DepartmentName">{{ employee.DepartmentName }}</td>
            <td :title="employee.Salary        ">{{ employee.Salary | money }}</td>
            <td :title="employee.WorkStatus    ">{{ employee.WorkStatus     }}</td>
            </tr>
            </tbody>
        </table>
    </div>

    <SlidingPagination
        :current="currentPage"
        :total="totalPages"
        @page-change="pageChangeHandler"></SlidingPagination>

    <EmployeeForm :formMode="formMode" :newEmployeeId="newEmployeeId" :employeeId="employeeId" :isHidden="isHide" @btnAddOnClick="btnAddOnClick" @reload="btnReloadOnClick"/>
</div>
</template>

<script>
import axios from 'axios';

import EmployeeForm from '../employee/EmployeeForm.vue'
import BaseButton from '../base/BaseButton.vue'
import BaseDropdown from '../base/BaseDropdown.vue'
import BaseModal from '../base/BaseModal.vue'
// import BasePaging from '../base/BasePaging.vue'
import SlidingPagination from 'vue-sliding-pagination'

export default {
    name: "EmployeeList",
    components: {
        EmployeeForm,
        BaseButton,
        BaseDropdown,
        BaseModal,
        SlidingPagination
    },
    data() {
        return {
            employees: [],
            isHidden: true, // alert modal
            isHide: true, // form modal
            employeeId: '',
            newEmployeeId: '',
            allEmplCount: 0,
            currentPage: 1,
            totalPages: 10,
            formMode: 0,
            departments: [],
            positions: [],
            selectedEmpls: [],
        }
    },
    created() {
        var self = this;
        console.log(this.employees);
        axios.get("https://localhost:5001/api/v1/Employees/").then((res) => { self.allEmplCount = res.data.length; }).catch(() => {})
        axios.get("https://localhost:5001/api/v1/Employees/Filter/")
            .then((res) => {
                self.employees = res.data;//.slice(1, 20);
                this.$toast.success("Tải danh sách nhân viên thành công");
            })
            .catch((err) => {
                console.log(err);
                this.$toast.error("Lấy danh sách nhân viên thất bại");
            });
    },
    methods: {
        pageChangeHandler(selectedPage, positionId, departmentId) {
            this.currentPage = selectedPage;
            var existDepartmentId = document.querySelector('#departmentFilter input').value;
            var existPositionId = document.querySelector('#positionFilter input').value;
            var self = this;

            if (positionId&&!departmentId) {
                console.log(`https://localhost:5001/api/v1/Employees/Filter?pageAt=${selectedPage}&positionId=${positionId}&departmentId=${existDepartmentId}`)
                axios.get(`https://localhost:5001/api/v1/Employees/Filter?pageAt=${selectedPage}&positionId=${positionId}&departmentId=${existDepartmentId}`)
                    .then((res) => {
                        self.employees = res.data;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$toast.error("Lấy danh sách nhân viên thất bại");
                    });
            } else if (!positionId&&departmentId) {
                console.log(`https://localhost:5001/api/v1/Employees/Filter?pageAt=${selectedPage}&positionId=${existPositionId}&departmentId=${departmentId}`);
                axios.get(`https://localhost:5001/api/v1/Employees/Filter?pageAt=${selectedPage}&positionId=${existPositionId}&departmentId=${departmentId}`)
                    .then((res) => {
                        self.employees = res.data;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$toast.error("Lấy danh sách nhân viên thất bại");
                    });
            } else if (positionId&&departmentId){
                console.log(`https://localhost:5001/api/v1/Employees/Filter?pageAt=${selectedPage}&positionId=${positionId}&departmentId=${departmentId}`);
                axios.get(`https://localhost:5001/api/v1/Employees/Filter?pageAt=${selectedPage}&positionId=${positionId}&departmentId=${departmentId}`)
                    .then((res) => {
                        self.employees = res.data;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$toast.error("Lấy danh sách nhân viên thất bại");
                    });
            } else {
                if (existDepartmentId&&existPositionId) {
                    console.log(`https://localhost:5001/api/v1/Employees/Filter?pageAt=${selectedPage}&positionId=${existPositionId}&departmentId=${existDepartmentId}`);
                    axios.get(`https://localhost:5001/api/v1/Employees/Filter?pageAt=${selectedPage}&positionId=${existPositionId}&departmentId=${existDepartmentId}`)
                        .then((res) => {
                            self.employees = res.data;
                        })
                        .catch((err) => {
                            console.log(err);
                            this.$toast.error("Lấy danh sách nhân viên thất bại");
                        });
                } else if (!existDepartmentId&&existPositionId) {
                    console.log(`https://localhost:5001/api/v1/Employees/Filter?pageAt=${selectedPage}&positionId=${existPositionId}`);
                    axios.get(`https://localhost:5001/api/v1/Employees/Filter?pageAt=${selectedPage}&positionId=${existPositionId}`)
                        .then((res) => {
                            self.employees = res.data;
                        })
                        .catch((err) => {
                            console.log(err);
                            this.$toast.error("Lấy danh sách nhân viên thất bại");
                        });
                } else if (existDepartmentId&&!existPositionId) {
                    console.log(`https://localhost:5001/api/v1/Employees/Filter?pageAt=${selectedPage}&departmentId=${existDepartmentId}`);
                    axios.get(`https://localhost:5001/api/v1/Employees/Filter?pageAt=${selectedPage}&departmentId=${existDepartmentId}`)
                        .then((res) => {
                            self.employees = res.data;
                        })
                        .catch((err) => {
                            console.log(err);
                            this.$toast.error("Lấy danh sách nhân viên thất bại");
                        });
                } else {
                    console.log(`https://localhost:5001/api/v1/Employees/Filter?pageAt=${selectedPage}`);
                    axios.get(`https://localhost:5001/api/v1/Employees/Filter?pageAt=${selectedPage}`)
                    .then((res) => {
                        self.employees = res.data;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$toast.error("Lấy danh sách nhân viên thất bại");
                    });
                }
            }
            
        },

        /**
         * Thuc hien show form nhan vien khi nhan nut Them nhan vien
         * Author: NPLONG (30/07/2021)
         */
        btnAddOnClick(isHide, getNewEmplCode) {
            this.isHide = isHide;
            this.formMode = 0;

            if (getNewEmplCode) {
                axios.get("https://localhost:5001/api/v1/Employees/NewEmployeeCode/")
                    .then((res) => {
                        this.newEmployeeId = res.data;
                    })
                    .catch(() => {});
            } else {
                this.newEmployeeId = null;
                console.log("emplList line 178, data: emplCode: ", this.employeeCode);
            }
        },

        /**
         * Hàm reload ( gán lại dữ liệu danh sách nhân viên )
         * Nếu tham số bao gồm truy vấn thì lấy api filter
         * Author: NPLONG (06/08/2021)
         */
        btnReloadOnClick() {
            //debugger; // eslint-disable-line
            console.log("Reloading..");
            var self = this;
            axios.get("https://localhost:5001/api/v1/Employees/")
                .then((res) => {
                    self.employees = res.data;
                })
                .catch((error) => {
                    console.log(error);
                    this.$toast.success("Tải lại danh sách nhân viên thất bại");
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

        btnYesOnClick: function(isHidden, del) {
            console.log(isHidden, del);
            this.isHidden = isHidden;
            if (del) {
                this.selectedEmpls = [...this.selectedEmpls];
                console.log(this.selectedEmpls);
                for (let i = 0; i < this.selectedEmpls.length; i++) {
                    console.log(this.selectedEmpls[i].EmployeeId);
                    axios.delete(`https://localhost:5001/api/v1/Employees/${ this.selectedEmpls[i].EmployeeId }`)
                        .then(() => {
                            this.$toast.success(`Xóa nhân viên ${ this.selectedEmpls[i].EmployeeCode } thành công`);
                        })
                        .catch((err) => {
                            console.log(err);
                            this.$toast.error(`Xóa nhân viên ${ this.selectedEmpls[i].EmployeeCode } thất bại`)
                        });
                }
                
                this.btnReloadOnClick();
                // this.$nextTick(() => {
                //     this.btnReloadOnClick();
                // });
            }
        },

        
    },
    filters: {
        money: function(money) {
            return !money ? '' : money.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    }
}
</script>

<style scoped>
@import "~vue-sliding-pagination/dist/style/vue-sliding-pagination.css";
</style>