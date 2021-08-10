<template>
    <div class="modal-wrapper" id="employee-form-modal"
		:class="{'hidden': isHidden}">
		<div class="modal">
			<div class="head">
				<div class="title">THÔNG TIN NHÂN VIÊN</div>
				<div class="close" id="close-modal" @click="btnCancelOnClick"></div>
			</div>
	
			<div class="body">
				<div class="left">
					<div class="avatar"></div>
					<div class="avt-rules">(Vui lòng chọn ảnh có định dạng .jpg, .jpeg, .png, .gif.)</div>
				</div>
				<div class="right"><form id="employee-form" method="POST">
					<div class="form-a">
						<div class="form-a-title">A. THÔNG TIN CHUNG</div><hr>
						<div class="form-a-fields">
							<div>
								<label for="employee-code">Mã nhân viên<span class="required"> (<span class="asterisk"></span>)</span></label><br>
								<input ref="employeeId" v-if="newEmployeeId" :value="newEmployeeId" tabindex="1" type="text">
								<input ref="employeeId" v-else v-model="employee.EmployeeCode" tabindex="1" type="text">
							</div>

							<div class="form-group" :class="{ 'form-group--error': nameError }">
								<label class="form__label">Họ và tên<span class="required"> (<span class="asterisk"></span>)</span></label>
								<input class="form__input" :value="employee.FullName" @input="nameOnInput($event)" tabindex="2" type="text"/>
							</div>

							<div class="form-group" :class="{ 'form-group--error': dobError }">
								<label class="form__label">Ngày sinh</label>
								<datepicker v-model="employee.DateOfBirth" :format="'DD/MM/YYYY'" :value-type="'YYYY-MM-DD'" tabindex="3" placeholder="DD/MM/YYYY"></datepicker>
							</div>
	
							<div>
								<label for="employee-gender">Giới tính</label><br>
								<BaseDropdown
									dropdownId="gender"
									dropdownHint="Giới tính"
									:employee="employee"
									:dropdownInputVal="employee.Gender"/>
							</div>
							
							<div class="form-group" :class="{ 'form-group--error': ccidError }">
								<label class="form__label">Số CMTND/Căn cước<span class="required"> (<span class="asterisk"></span>)</span></label>
								<input class="form__input" v-model="employee.IdentityNumber" tabindex="5"/>
							</div>
	
							<div class="form-group" :class="{ 'form-group--error': ccidDateError }">
								<label class="form__label">Ngày cấp</label><br>
								<datepicker v-model="employee.IdentityDate" :format="'DD/MM/YYYY'" :value-type="'YYYY-MM-DD'" tabindex="6" placeholder="DD/MM/YYYY"></datepicker>
							</div>
	
							<div>
								<label>Nơi cấp</label><br>
								<input v-model="employee.IdentityPlace" tabindex="7" type="text">
							</div>
							
							<div></div>
								
							<div class="form-group" :class="{ 'form-group--error': emailError }">
								<label class="form__label">Email<span class="required"> (<span class="asterisk"></span>)</span></label>
								<input class="form__input" :value="employee.Email" @input="emailOnInput($event)" tabindex="8" type="email"/>
							</div>
	
							<div class="form-group" :class="{ 'form-group--error': phoneError }">
								<label class="form__label">Số điện thoại<span class="required"> (<span class="asterisk"></span>)</span></label>
								<input class="form__input" :value="employee.PhoneNumber" @input="phoneOnInput($event)" tabindex="9"/>
							</div>
						</div>
					</div>
					
					<div class="form-b">
						<div class="form-b-title">B. THÔNG TIN CÔNG VIỆC</div><hr>
						<div class="form-b-fields">
							<div>
								<label for="employee-position">Vị trí</label><br>
								<BaseDropdown
									dropdownId="position"
									dropdownHint="Vị trí"
									:dropdownInputVal="employee.PositionId"/>
							</div>
	
							<div>
								<label for="employee-department">Phòng ban</label><br>
								<BaseDropdown
									dropdownId="department"
									dropdownHint="Phòng ban"
									:dropdownInputVal="employee.DepartmentId"/>
							</div>
						
							<div class="form-group" :class="{ 'form-group--error': taxError }">
								<label class="form__label">Mã số thuế cá nhân</label>
								<input class="form__input" v-model="employee.PersonalTaxCode" tabindex="12"/>
							</div>								

							<div class="salary-input form-group" :class="{ 'form-group--error': salaryError }">
								<label class="form__label">Mức lương cơ bản</label>
								<input class="form__input" :value="employee.Salary | money" @input="salaryOnInput($event)" tabindex="13"/>
								<div class="currency">(VNĐ)</div>
							</div>
						
							<div>
								<label for="employee-joindate">Ngày gia nhập công ty</label><br>
								<datepicker v-model="employee.JoinDate" :format="'DD/MM/YYYY'" :value-type="'YYYY-MM-DD'" tabindex="14" placeholder="DD/MM/YYYY"></datepicker>
							</div>
							
							<div>
								<label for="employee-status">Tình trạng công việc</label><br>
								<BaseDropdown
									dropdownId="workstatus"
									dropdownHint="Tình trạng công việc"
									:dropdownInputVal="employee.WorkStatus"/>
							</div>
						</div>
					</div>
				</form></div>
			</div>
	
			<div class="foot">
				<BaseButton
					buttonClass="btn"
					buttonId="btn-submit" 
					iconClass="save"
					buttonText="Lưu"
					v-on:btnOnClick="btnSaveOnClick"/>
				<BaseButton
					buttonClass="btn-2"
					buttonId="cancel-modal"
					iconClass="save"
					buttonText="Hủy"
					:hideIcon="true"
					v-on:btnOnClick="btnCancelOnClick"/>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
// import bus from '../js/eventBus';

import BaseButton from '../base/BaseButton.vue';
import BaseDropdown from '../base/BaseDropdown.vue';

export default {
	components: {
		BaseButton,
		BaseDropdown,
	},
	props: {
		isHidden: {
			type: Boolean,
			required: true,
			default: true,
		},
		employeeId: {
			type: String,
		},
		formMode: {
			type: Number,
			required: true,
			default: 0, // 0->Them moi, 1->Sua
		},
		newEmployeeId: {
			type: String,
			default: null,
		}
	},
	data() {
		return {
			employee: {},
			nameError: false,
			dobError: false,
			ccidError: false,
			ccidDateError: false,
			emailError: false,
			phoneError: false,
			taxError: false,
			salaryError: false,
		}
	},
	methods: {
		/**
		 * Thuc hien dong form nhan vien khi an nut Huy
		 * @param button, bool, bool = button, hidden form?, get new empl?
		 * Author: NPLONG (30/07/2021)
		 */
		btnCancelOnClick() {
			console.log("cancel on click.");
			this.$emit('btnAddOnClick', true, false);
		},

		/**
		 * Thuc hien Them moi/ Chinh sua form thong tin nhan vien khi an nut Luu
		 * Author: NPLONG (30/07/2021)
		 */
		btnSaveOnClick() {
			var self = this;
			if (this.formMode == 0) {
				Object.keys(this.employee).forEach(key => {
					console.log("key: ", key, " val: ", this.employee[key]);
				});
				axios.post(`https://localhost:5001/api/Employees/`, 
							this.employee)
					.then((res) => {
						self.$toast.success("Thêm thành công");
						console.log(res);
					})
					.catch((res) => {
						self.$toast.error("Thêm thất bại");
						console.log(res.message);
					});
				this.$emit("btnAddOnClick", true, false);
				this.$emit("reload");
			} else {
				Object.keys(this.employee).forEach(key => {
					console.log("key: ", key, " val: ", this.employee[key]);
				});
				axios.put(`https://localhost:5001/api/Employees/${this.employeeId}/`, this.employee)
					.then((res) => {
						self.$toast.success("Sửa thành công");
						console.log(res);
					})
					.catch((res) => {
						self.$toast.error("Sửa thất bại");
						console.log(res);
					});
				this.$emit("btnAddOnClick", true, false);
				this.$emit("reload");
			}
		},

		/**
		 * Ham xu ly input salary
		 * Author: NPLONG (07/08/2021)
		 */
		salaryOnInput(event) {
			event.target.value = event.target.value.replaceAll('.', '');

			// Check neu tien ma chua ki tu khong phai chu so thi bao error
			if (!/^\d*$/.test(event.target.value)) {
				this.salaryError = true;
			} else {
				this.salaryError = false;
				this.employee.Salary = event.target.value;
			}

			// Hien thi tien da duoc them dau cham len form
			event.target.value = event.target.value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
		},

		/**
		 * Validate nhap ho va ten
		 * Author: NPLONG (07/08/2021)
		 */
		nameOnInput(event) {
			// Check neu ten ma khong phai dinh dang o duoi thi bao error
			if (!/^([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+\s{1})+[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+$/.test(event.target.value)) {
				this.nameError = true;
			} else {
				this.nameError = false;
				this.employee.FullName = event.target.value;
			}
		},

		/**
		 * Validate email
		 * Author: NPLONG (07/08/2021)
		 */
		emailOnInput(event) {
			// Check neu ten ma khong phai dinh dang o duoi thi bao error
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value)) {
				this.emailError = true;
			} else {
				this.emailError = false;
				this.employee.Email = event.target.value;
			}
		},

		/**
		 * Validate so dien thoai
		 * Author: NPLONG (07/08/2021)
		 */
		phoneOnInput(event) {
			// Check neu so dien thoai ma chua ki tu khong phai chu so thi bao error
			if (!/^0\d{9,10}$/.test(event.target.value)) {
				this.phoneError = true;
			} else {
				this.phoneError = false;
				this.employee.PhoneNumber = event.target.value;
			}
		},
	},
	watch: {
		/**
		 * Moi khi empl ID thay doi, gan employee moi cho form
		 * Author: NPLONG (30/07/2021)
		 */
		employeeId: function() {
			console.log("emplForm watch emplId: ran into!, emplId: ", this.employeeId);
			var self = this;
			this.employeeId = this.employeeId.replace('!', '');
			if (this.formMode == 0) {
				this.employee = {}
			} else {
				axios.get(`https://localhost:5001/api/Employees/${this.employeeId}`)
					.then((res) => {
						self.employee = res.data;
					})
					.catch((res) => {
						console.log(res);
					});
			}
			
			this.$nextTick(() => {
				this.$refs.employeeId.focus();
			})
			console.log("emplForm line 303: ", this);
		},

		/**
		 * Khi click button khac nhau thi thay doi form mode, khi form mode = 0 thi khoi tao empl rong, ~ them moi
		 * Author: NPLONG (30/07/2021)
		 */
		formMode: function() {
			console.log("emplForm, line 314, formMode watch: ran into!. formMode: ", this.formMode);
			if (this.formMode == 0) {
				this.employee = {};
				this.employee.Gender = null;
				this.employee.PositionId = null;
				this.employee.DepartmentId = null;
				this.employee.WorkStatus = null;
			}
			console.log("emplForm line 322, empl after formMode change: ", this.employee);
		},

		/**
		 * Lay id cua nhan vien moi 
		 * Author: NPLONG (30/07/2021)
		 */
		newEmployeeId: function() {
			console.log("line 330 emplform, prop: newEmplId: ", this.newEmployeeId);
			console.log("line 331 emplform, data: empl: ", this.employee);
			if (this.newEmployeeId) {
				this.employee.EmployeeCode = this.newEmployeeId;
			} else {
				this.employee.EmployeeId = this.employeeCode;
			}
			
			console.log(this.employee);
			this.$refs.employeeId.focus();
		},

		
	},
	filters: {
		money: function(money) {
			if (money) {
				return !money ? '' : money.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			}
		},
	},
}
</script>