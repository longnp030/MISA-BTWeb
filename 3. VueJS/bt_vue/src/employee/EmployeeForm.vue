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
				<div class="right"><ValidationObserver ref="employeeForm"><form id="employee-form" method="POST">
					<div class="form-a">
						<div class="form-a-title">A. THÔNG TIN CHUNG</div><hr>
						<div class="form-a-fields">
							<div>
								<label for="employee-code">Mã nhân viên<span class="required"> (<span class="asterisk"></span>)</span></label><br>
								<input ref="employeeId" v-if="newEmployeeId" :value="newEmployeeId" tabindex="1" type="text">
								<input ref="employeeId" v-else v-model="employee.EmployeeCode" tabindex="1" type="text">
							</div>

							<div class="form-group">
								<label>Họ và tên<span class="required"> (<span class="asterisk"></span>)</span></label>
								<ValidationProvider rules="required" name="Họ và tên" v-slot="{ errors }">
									<input :class="{'error': errors.length > 0 ? true : false}" v-model="employee.FullName" tabindex="2" type="text"/>
									<span class="error-msg">{{ errors[0] }}</span>
								</ValidationProvider>
							</div>

							<div class="form-group">
								<label class="form__label">Ngày sinh</label>
								<ValidationProvider rules="" name="Ngày sinh" v-slot="{ errors }">
									<datepicker :class="{'error': errors.length > 0 ? true : false}" v-model="employee.DateOfBirth" :format="'DD/MM/YYYY'" :value-type="'YYYY-MM-DD'" :disabled-date="(date) => date >= new Date()" tabindex="3" placeholder="DD/MM/YYYY"></datepicker>
									<span class="error-msg">{{ errors[0] }}</span>
								</ValidationProvider>
							</div>
	
							<div>
								<label for="employee-gender">Giới tính</label><br>
								<BaseDropdown
									dropdownId="gender"
									dropdownHint="Giới tính"
									:apiUrl="genApi"
									:dropdownInputVal="employee.Gender"
									@assign="assignPropIdToEmpl"/>
							</div>
							
							<div class="form-group">
								<label>Số CMTND/Căn cước<span class="required"> (<span class="asterisk"></span>)</span></label>
								<ValidationProvider rules="required|numeric" name="Số CMTND/Căn cước" v-slot="{ errors }">
									<input :class="{'error': errors.length > 0 ? true : false}" v-model="employee.IdentityNumber" tabindex="5"/>
									<span class="error-msg">{{ errors[0] }}</span>
								</ValidationProvider>
							</div>
	
							<div class="form-group">
								<label class="form__label">Ngày cấp</label><br>
								<datepicker v-model="employee.IdentityDate" :format="'DD/MM/YYYY'" :value-type="'YYYY-MM-DD'" tabindex="6" placeholder="DD/MM/YYYY"></datepicker>
							</div>
	
							<div>
								<label>Nơi cấp</label><br>
								<input v-model="employee.IdentityPlace" tabindex="7" type="text">
							</div>
							
							<div></div>
								
							<div class="form-group">
								<label>Email<span class="required"> (<span class="asterisk"></span>)</span></label>
								<ValidationProvider rules="required|email" name="Email" v-slot="{ errors }">
									<input :class="{'error': errors.length > 0 ? true: false}" v-model="employee.Email" tabindex="8" type="email"/>
									<span class="error-msg">{{ errors[0] }}</span>
								</ValidationProvider>
							</div>
	
							<div class="form-group">
								<label>Số điện thoại<span class="required"> (<span class="asterisk"></span>)</span></label>
								<ValidationProvider rules="required|numeric" name="Số điện thoại" v-slot="{ errors }">
									<input :class="{'error': errors.length > 0 ? true: false }" v-model="employee.PhoneNumber" tabindex="9"/>
									<span class="error-msg">{{ errors[0] }}</span>
								</ValidationProvider>
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
									:apiUrl="posApi"
									:dropdownInputVal="employee.PositionId"
									@assign="assignPropIdToEmpl"/>
							</div>
	
							<div>
								<label for="employee-department">Phòng ban</label><br>
								<BaseDropdown
									dropdownId="department"
									dropdownHint="Phòng ban"
									:apiUrl="depApi"
									:dropdownInputVal="employee.DepartmentId"
									@assign="assignPropIdToEmpl"/>
							</div>
						
							<div class="form-group">
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
									:apiUrl="workApi"
									:dropdownInputVal="employee.WorkStatus"
									@assign="assignPropIdToEmpl"/>
							</div>
						</div>
					</div>
				</form></ValidationObserver></div>
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
			salaryError: false,
			initialEmployeeId: '',
			posApi: "https://localhost:5001/api/v1/Positions/",
            depApi: "https://localhost:5001/api/v1/Departments/",
            genApi: "https://localhost:5001/api/v1/Genders/",
            workApi: "https://localhost:5001/api/v1/WorkStatus/",
		}
	},
	methods: {
		/**
		 * Thuc hien dong form nhan vien khi an nut Huy
		 * @param button, bool, bool = button, hidden form?, get new empl?
		 * Author: NPLONG (30/07/2021)
		 */
		btnCancelOnClick() {
			this.employee = {};
			this.$refs.employeeForm.reset();
			this.$emit('btnAddOnClick', true, false);
		},

		/**
		 * Thuc hien Them moi/ Chinh sua form thong tin nhan vien khi an nut Luu
		 * Author: NPLONG (30/07/2021)
		 */
		btnSaveOnClick() {
			this.$refs.employeeForm.validate().then((success) => {
				if (!success) { return; }

				var self = this;
				if (this.formMode == 0) {
					this.employee.CreatedDate = new Date();
					// axios.post(`https://localhost:5001/api/v1/Employees/`, this.employee)
					// 	.then(() => { self.$toast.success("Thêm thành công"); this.$emit("reload", 1, '', '', ''); })
					// 	.catch((res) => { self.$toast.error("Thêm thất bại"); console.log(res.message); });
				} else {
					this.employee.ModifiedDate = new Date();
					axios.put(`https://localhost:5001/api/v1/Employees/${this.initialEmployeeId}/`, this.employee)
						.then(() => { self.$toast.success("Sửa thành công"); this.$emit("reload", 1, '', '', ''); })
						.catch((res) => { self.$toast.error("Sửa thất bại"); console.log(res); });
				}
				this.$emit("btnAddOnClick", true, false);
				
			});
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

		assignPropIdToEmpl(drdId, propId) {
			switch (drdId) {
				case "gender":
					axios.get(this.genApi).then((res) => {
						res.data.forEach(gen => {
							if (gen.Gender === parseInt(propId)) {
								this.employee.Gender = gen.Gender;
								this.employee.GenderName = gen.GenderName;
								return;
							}
						});}).catch(() => {});
					break;
				case "position":
					axios.get(this.posApi).then((res) => {
						res.data.forEach(pos => {
							if (pos.PositionId === propId) {
								this.employee.PositionId = pos.PositionId;
								this.employee.PositionCode = pos.PositionCode;
								this.employee.PositionName = pos.PositionName;
								return;
							}
						});}).catch(() => {});
					break;
				case "department":
					axios.get(this.depApi).then((res) => {
						res.data.forEach(dep => {
							if (dep.DepartmentId === propId) {
								this.employee.DepartmentId = dep.DepartmentId;
								this.employee.DepartmentCode = dep.DepartmentCode;
								this.employee.DepartmentName = dep.DepartmentName;
								return;
							}
						});}).catch(() => {});
					break;
				case "workstatus":
					axios.get(this.workApi).then((res) => {
						res.data.forEach(ws => {
							if (ws.WorkStatus === parseInt(propId)) {
								this.employee.WorkStatus = ws.WorkStatus;
								this.employee.WorkStatusName = ws.WorkStatusName;
								return;
							}
						});}).catch(() => {});
					break;
				default:
					break;
			}
		}
	},
	watch: {
		/**
		 * Khi click button khac nhau thi thay doi form mode, khi form mode = 0 thi khoi tao empl rong, ~ them moi
		 * Author: NPLONG (30/07/2021)
		 */
		formMode: function() {
			console.log("emplForm, line 304, formMode watch: ran into!. formMode: ", this.formMode);
			if (this.formMode == 0) {
				this.employee = {};
				this.employee.Gender = null;
				this.employee.PositionId = null;
				this.employee.DepartmentId = null;
				this.employee.WorkStatus = null;
			}
			console.log("emplForm line 312, empl after formMode change: ", this.employee);
		},

		/**
		 * Moi khi empl ID thay doi, gan employee moi cho form
		 * Author: NPLONG (30/07/2021)
		 */
		employeeId: function() {
			console.log("emplForm watch emplId: ran into!, emplId: ", this.employeeId);
			var self = this;
			this.initialEmployeeId = this.employeeId.replace('!', '');
			if (this.formMode == 0) {
				this.$nextTick(() => {
					this.employee = {};
				});
			} else {
				axios.get(`https://localhost:5001/api/v1/Employees/${this.initialEmployeeId}`)
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
			console.log("emplForm line 295: ", this);
		},

		/**
		 * Lay id cua nhan vien moi 
		 * Author: NPLONG (30/07/2021)
		 */
		newEmployeeId: function() {
			console.log("line 320 emplform, prop: newEmplId: ", this.newEmployeeId);
			console.log("line 321 emplform, data: empl: ", this.employee);
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