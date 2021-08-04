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
								<input v-if="newEmployeeId" :value="newEmployeeId" tabindex="1" type="text" field="EmployeeCode" class="employee-code" id="employee-code" name="employeeCode" required>
								<input v-else v-model="employee.EmployeeCode" tabindex="1" type="text" field="EmployeeCode" class="employee-code" id="employee-code" name="employeeCode" required>
							</div>

							<div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
								<label class="form__label">Họ và tên<span class="required"> (<span class="asterisk"></span>)</span></label>
								<input class="form__input" v-model.trim="$v.name.$model" v-model="employee.FullName" tabindex="2" type="text"/>
							</div>

							<div class="form-group" :class="{ 'form-group--error': $v.dob.$error }">
								<label class="form__label">Ngày sinh</label>
								<input class="form__input" :value="employee.DateOfBirth | moment" tabindex="3" type="date"/>
							</div>
	
							<div>
								<label for="employee-gender">Giới tính</label><br>
								<input v-model="employee.Gender" class="employee-gender" field="gender" name="employee-gender" hiddenn>
								<div tabindex="4" class="dropdown" id="employee-gender">
									<div class="hint">Giới tính</div>
									<div class="text-over"></div>
									<button type="button" class="btn-2 btn-clear"><font-awesome-icon icon="times-circle"/></button>                                        
									<div class="caret" id="caret-gender"><font-awesome-icon icon="angle-down"/></div>
									<div class="dropdown-data" id="data-gender">
										<div class="dropdown-item" uuid="1">
											<div class="dropdown-item-icon"><font-awesome-icon icon="check"/></div>
											<div class="dropdown-item-text">Nam</div>
										</div>
										<div class="dropdown-item" uuid="0">
											<div class="dropdown-item-icon"><font-awesome-icon icon="check"/></div>
											<div class="dropdown-item-text">Nữ</div>
										</div>
										<div class="dropdown-item" uuid="2">
											<div class="dropdown-item-icon"><font-awesome-icon icon="check"/></div>
											<div class="dropdown-item-text">Không xác định</div>
										</div>
										<div class="dropdown-item" uuid="3">
											<div class="dropdown-item-icon"><font-awesome-icon icon="check"/></div>
											<div class="dropdown-item-text">Không xác định</div>
										</div>
										<div class="dropdown-item" uuid="4">
											<div class="dropdown-item-icon"><font-awesome-icon icon="check"/></div>
											<div class="dropdown-item-text">Không xác định</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="form-group" :class="{ 'form-group--error': $v.ccid.$error }">
								<label class="form__label">Số CMTND/Căn cước<span class="required"> (<span class="asterisk"></span>)</span></label>
								<input class="form__input" v-model.trim="$v.ccid.$model" v-model="employee.IdentityNumber" tabindex="5" type="number"/>
							</div>
	
							<div>
								<label for="ccid-date">Ngày cấp</label><br>
								<input v-model="employee.IdentityDate" tabindex="6" type="date" class="ccid-date" id="ccid-date" name="identityDate">
							</div>
	
							<div>
								<label for="ccid-issue-place">Nơi cấp</label><br>
								<input v-model="employee.IdentityPlace" tabindex="7" type="text" class="ccid-issue-place" id="ccid-issue-place" name="identityPlace">
							</div>
							
							<div></div>
								
							<div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
								<label class="form__label">Email<span class="required"> (<span class="asterisk"></span>)</span></label>
								<input class="form__input" v-model.trim="$v.email.$model" v-model="employee.Email" tabindex="8" type="email"/>
							</div>
	
							<div class="form-group" :class="{ 'form-group--error': $v.phoneNum.$error }">
								<label class="form__label">Số điện thoại<span class="required"> (<span class="asterisk"></span>)</span></label>
								<input class="form__input" v-model.trim="$v.phoneNum.$model" v-model="employee.PhoneNumber" tabindex="9"/>
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
						
							<div class="form-group" :class="{ 'form-group--error': $v.taxNum.$error }">
								<label class="form__label">Mã số thuế cá nhân</label>
								<input class="form__input" v-model.trim="$v.taxNum.$model" v-model="employee.PersonalTaxCode" tabindex="12"/>
							</div>								

							<div class="salary-input form-group" :class="{ 'form-group--error': $v.salary.$error }">
								<label class="form__label">Mức lương cơ bản</label>
								<input class="form__input" :value="employee.Salary | money" @input="handleMoneyInputChange" tabindex="13"/>
								<div class="currency">(VNĐ)</div>
							</div>
						
							<div>
								<label for="employee-joindate">Ngày gia nhập công ty</label><br>
								<input v-model="employee.JoinDate" tabindex="14" type="date" class="employee-joindate" id="employee-joindate" name="joinDate">
							</div>
							
							<div>
								<label for="employee-status">Tình trạng công việc</label><br>
								<input v-model="employee.WorkStatus" field="workStatus" class="employee-status" name="employee-status" hiddenn>
								<div tabindex="15" class="dropdown" id="employee-status">
									<div class="hint">Tình trạng công việc</div>
									<div class="text-over"></div>
									<button type="button" class="btn-2 btn-clear"><font-awesome-icon icon="times-circle"/></button>
									<div class="caret" id="caret-work-status"><font-awesome-icon icon="angle-down"/></div>
									<div class="dropdown-data" id="data-work-status">
										<div class="dropdown-item" uuid="0">
											<div class="dropdown-item-icon"><font-awesome-icon icon="check"/></div>
											<div class="dropdown-item-text">0</div>
										</div>
										<div class="dropdown-item" uuid="1">
											<div class="dropdown-item-icon"><font-awesome-icon icon="check"/></div>
											<div class="dropdown-item-text">1</div>
										</div>
										<div class="dropdown-item" uuid="2">
											<div class="dropdown-item-icon"><font-awesome-icon icon="check"/></div>
											<div class="dropdown-item-text">2</div>
										</div>
										<div class="dropdown-item" uuid="3">
											<div class="dropdown-item-icon"><font-awesome-icon icon="check"/></div>
											<div class="dropdown-item-text">3</div>
										</div>
										<div class="dropdown-item" uuid="4">
											<div class="dropdown-item-icon"><font-awesome-icon icon="check"/></div>
											<div class="dropdown-item-text">4</div>
										</div>
									</div>
								</div>
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
import moment from 'moment';

import BaseButton from '../base/BaseButton.vue';
import BaseDropdown from '../base/BaseDropdown.vue';

import {
	required, numeric, email
} from 'vuelidate/lib/validators';

const nameMustBe = (value) => /^([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+\s{1})+[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+$/.test(value);

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
			name: '',
			dob: '',
			ccid: '',
			email: '',
			phoneNum: '',
			taxNum: '',
			salary: '',
		}
	},
	methods: {
		/**
		 * Thuc hien dong form nhan vien khi an nut Huy
		 * @param button, bool, bool = button, hidden form?, get new empl?
		 * Author: NPLONG (30/07/2021)
		 */
		btnCancelOnClick() {
			this.$emit('btnAddOnClick', true, false);
		},

		/**
		 * Thuc hien Them moi/ Chinh sua form thong tin nhan vien khi an nut Luu
		 * Author: NPLONG (30/07/2021)
		 */
		btnSaveOnClick() {
			if (this.formMode == 0) {
				axios.post(`http://cukcuk.manhnv.net/v1/Employees`, this.employee)
					.then((res) => {
						alert("Them thanh cong");
						console.log(res);
					})
					.catch((res) => {
						alert("Them that bai")
						console.log(res)
					});
			} else {
				axios.put(`http://cukcuk.manhnv.net/v1/Employees/${this.employeeId}`, this.employee)
					.then((res) => {
						alert("Sua thanh cong");
						console.log(res);
					})
					.catch((res) => {
						alert("Sua that bai");
						console.log(res)
					});
			}
		},

        handleMoneyInputChange: function() {
            this.employee.Salary = this.employee.Salary.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
	},
	watch: {
		/**
		 * Moi khi empl ID thay doi, gan employee moi cho form
		 * Author: NPLONG (30/07/2021)
		 */
		employeeId: function() {
			var self = this;
			axios.get(`http://cukcuk.manhnv.net/v1/Employees/${this.employeeId}`)
				.then((res) => {
					self.employee = res.data;
				})
				.catch((res) => {
					console.log(res);
				});
		},

		/**
		 * Khi click button khac nhau thi thay doi form mode, khi form mode = 0 thi khoi tao empl rong, ~ them moi
		 * Author: NPLONG (30/07/2021)
		 */
		formMode: function() {
			if (this.formMode == 0) {
				this.employee = {};
			}
		},

		/**
		 * Lay id cua nhan vien moi 
		 * Author: NPLONG (30/07/2021)
		 */
		newEmployeeId: function() {
			this.employee.EmployeeId = this.newEmployeeId;
			console.log(this.employee);
		},
	},
	validations: {
		name: {
			required,
			nameMustBe,
		},
		dob: {

		},
		ccid: {
			required,
			numeric,
		},
		email :{
			required, 
			email,
		},
		phoneNum: {
			required,
			numeric,
		},
		taxNum: {
			numeric,
		},
		salary: {
			numeric,
		}
	},
	filters: {
		moment: function(date) {
			console.log(moment(date));
            return moment(date).format("YYYY-MM-DD");
        },
		money: function(money) {
            return !money ? '' : money.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
	}
}
</script>