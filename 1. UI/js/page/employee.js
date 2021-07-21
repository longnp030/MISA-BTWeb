$(document).ready(function () {
    // Thuc hien load du lieu
    console.log("Start loading data...")
    employee = new Employee()
    console.log("Done loading!")
});

/**
 * Dinh dang lai ngay thang nam
 * @param {any} date 
 * @returns String dd/mm/yyyy
 * Author: NPLONG (19/07/2021)
 */
function formatDate(date, format) {
    if (!date) {
        return "";
    } else {
        let newDate = new Date(date);

        let day = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
        let month = newDate.getMonth() + 1 < 10 ? "0" + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        if (format === "ddmmyyyy") {
            return `${day}/${month}/${year}`;
        } else {
            return `${year}-${month}-${day}`;
        }

    }
}

/**
 * Ham chuyen dinh dang so thanh dang tien te
 * @param {any} money 
 * @returns dinh dang hien thi tien te
 * Author: NPLONG (19/07/2021)
 */
function formatMoney(money) {
    if (!money) {
        return "";
    } else {
        return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
}

/**
 * Ham open popup (o day la form nhan vien)
 * @param {*} node button de mo modal, co the la div, button, span ... (clickable)
 * Author: NPLONG (19/07/2021)
 */
function openModal(node, modalId) {
    $($(node).parents("#content").children("#" + modalId)[0]).css("display", "block");
}

/**
 * Ham de dong modal
 * @param {*} node button de dong modal (clickable)
 * Author: NPLONG (19/07/2021)
 */
function closeModal(node, parentModalId, relModalId) {
    if (relModalId) {
        $(node).parents('#content').children("#" + relModalId).css("display", "none");
        $(node).parents("#" + parentModalId).css("display", "none");
    } else {
        $(node).parents("#" + parentModalId).css("display", "none");
    }
}


/**
 * Ham dao nguoc so 1234 -> 4321
 * Dao nguoc de dung regex tach 3 chu so 1, vi du 12345 -> 123 45; 1234 -> 123 4
 * Tien thi danh dau cham moi 3 chu so tu cuoi len -> dao nguoc
 * @param {number} input 
 * @returns so dao nguoc
 * REF: http://plnkr.co/edit/rsTCO8hmZUSEtrvpuWE6?p=preview&preview
 */
function reverseNumber(input) {
    return [].map.call(input, function (x) {
        return x;
    }).reverse().join('');
}
/**
 * Ham binh thuong hoa so, vi du 12.34 -> 1234
 * @param {number} input 
 * @returns so khong chua dau cham
 * REF: http://plnkr.co/edit/rsTCO8hmZUSEtrvpuWE6?p=preview&preview
 */
function plainNumber(number) {
    return number.split('.').join('');
}
/**
 * Ham tu dong them dau cham moi 3 chu so khi nhap tien
 * @param {input} input input field
 * REF: http://plnkr.co/edit/rsTCO8hmZUSEtrvpuWE6?p=preview&preview
 * REF: https://stackoverflow.com/questions/32759353/how-to-get-automatic-dots-in-number-input
 */
function splitDot(input) {
    var value = input.value, // lay chu so trong input ra
        plain = plainNumber(value), // loai bo dau cham trong so
        reversed = reverseNumber(plain), // dao nguoc so
        reversedWithDots = reversed.match(/.{1,3}/g).join('.'), // them dau cham moi 3 chu so
        normal = reverseNumber(reversedWithDots); // dao nguoc de tro lai so ban dau

    console.log(plain, reversed, reversedWithDots, normal);
    input.value = normal;
}


/**
 * Ham kiem tra da nhap dung dinh dang input hay chua
 * @param {input} input 
 * Author: NPLONG (20/07/2021)
 */
function validate(input) {
    isNaN(input.value.split('.').join('')) ? $(input).addClass("invalid") : $(input).removeClass("invalid");
}


/**
 * Ham xu ly event khi bam dropdown hoac combobox
 * @param {button} button the caret on dropdown and combobox to trigger the open of items
 * Author: NPLONG (19/07/2021)
 * REF: https://stackoverflow.com/questions/42333757/multiple-dropdown-menus-using-same-js-code
 */
function openSelect(button) {
    var selects = $($(button).parents().children(".dropdown-data"));
    if (selects.length != 0) {
        select = $(selects[0]);
    } else {
        select = $($(button).parents().children(".combobox-data")[0]);
    }

    if (select.css("display") === "none") {
        select.css("display", "block");
    } else {
        select.css("display", "none");
    }
}


$("#btn-save").click(function () {
    // thu thap du lieu
    let emp = {};

    emp.fullName = $('fullname').val()
    emp.empCode = $('code').val()
    // ... cac thong tin khac

    // Goi API luu du lieu:
    $.ajax({
        url: "",
        method: "POST",
        data: JSON.stringify(emp),
        contentType: "application/json",

    }).done(function (res) { alert("THEM MOI OK"); }).fail(function () { });
})

class Employee extends HumanBase {
    constructor() {
        super();
        this.apiUrl = "http://cukcuk.manhnv.net/v1/Employees";
    }

    initEvents() {
        // Tao 1 const var de gan instance class nay vao de dung cac ham con ben trong
        const thisClass = this;

        // Click button hien thi form thong tin chi tiet
        $("#add-employee-btn").click(function () {
            $($(this).parents("#content").children("#employee-form-modal")[0]).css("display", "block");
            $('input').val(null);
            // Bam vao nut them thi la ADD
            thisClass.formMode = "ADD";
        });

        // Reload
        $("#reload").click(function () {
            // Xoa du lieu cu trong bang truoc
            $(".table table tbody").html("");
            employee.loadData();
        });

        /* press ESC to close modal */
        $(document).keyup(function (e) {
            if (e.keyCode == 27) {
                $("#employee-form-modal").css("display", "none");
            }
        })

        /* click X or outside to close */
        var employeeForm = document.getElementById("employee-form-modal")
        employeeForm.addEventListener("click", function (event) {
            if (event.target.matches("#close-modal") || !event.target.closest(".modal")) {
                employeeForm.style.display = "none";
            }
        }, false); // click here is "employee-form-modal" click and not involve with document

        // Thuc hien luu/post du lieu khi nhan nut Save
        $("#btn-submit").click(function () {
            // Validate du lieu
            let inputToValidates = $('input[required], input[type="email"]');
            $.each(inputToValidates, function (index, input) {
                $(input).trigger('blur');
            })

            let inputNotValids = $('input[valid="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert("Vui long kiem tra lai form");
                inputNotValids[0].focus();
                return;
            }

            // Thu thap thong tin du lieu
            let empl = {}; // Khoi tao 1 obj rong de luu
            let fieldInputs = $("input[field]");
            // console.log(fieldInputs);
            $.each(fieldInputs, function (index, fieldInput) {
                let fieldName = $(this).attr("field");
                let fieldValue = $(this).val();

                if (fieldName === "gender" || fieldName === 'workStatus') {
                    fieldValue = parseInt(fieldValue);
                } else if (fieldName === "salary") {
                    fieldValue = parseInt(fieldValue.split('.').join(''));
                }
                // Build thanh object
                empl[fieldName] = fieldValue;
            });
            console.log(empl);

            let method = "ADD";
            let url = this.apiUrl;
            if (thisClass.formMode == "EDIT") {
                method = "PUT";
                empl.employeeId = thisClass.employeeId;
                url = this.apiUrl + "/" + empl.employeeId;
            }

            // Goi service tuong ung thuc hien post du lieu
            $.ajax({
                url: url,
                method: method,
                data: JSON.stringify(empl),
                contentType: "application/json"
            }).done(function (res) {
                // Dua ra thong bao (thanh cong/ that bai)
                alert("Them mới thành công");
                // Hide form
                $("#employee-form-modal").css("display", "none");
                // Reload du lieu
                thisClass.loadData();
                console.log("reloaded")
            }).fail(function () {
                alert("Them mới thất bại");
            });

        }.bind(this)); // Bind thằng this này chính là obj Employee vào bên trong thằng button đang click


        /**
         * Hien thi thong tin chi tiet moi nhan vien khi click dup vao 1 dong trong table
         * Author: NPLONG (21/07/2021)
         */
        $(".table table tbody").on("dblclick", 'tr', function () {
            // Click vao table thi chi la EDIT
            thisClass.formMode = "EDIT";

            // Lay primary key cua ban ghi
            let employeeId = $(this).attr('id');
            thisClass.employeeId = employeeId; // Luu lai de "EDIT", moi lan click tr la 1 Id khac

            // Goi api lay thong tin chi tiet qua key
            $.ajax({
                url: "http://cukcuk.manhnv.net/v1/Employees/" + employeeId,
                method: "GET",
            }).done(function (res) {
                // console.log(res);
                // Bind du lieu len form

                // lay thong tin du lieu
                let fieldInputs = $("input[field]");
                $.each(fieldInputs, function (index, fieldInput) {

                    // fieldName la tu html cua minh, phai doi chu cai dau thanh viet hoa 
                    // vi cai "res" minh lay ve co thuoc tinh la chu dau viet hoa, con html cua  minh thi chu dau viet thuong
                    let fieldName = $(this).attr("field").charAt(0).toUpperCase() + $(this).attr("field").slice(1);
                    let fieldValue = res[fieldName]; // fieldValue la tu api tra ve
                    console.log(fieldName);

                    // Map input voi nhung truong dac biet can xu ly
                    if (fieldName === "DateOfBirth") {
                        fieldValue = formatDate(fieldValue, "");
                    } else if (fieldName === "Salary") {
                        fieldValue = formatMoney(fieldValue);
                    } else if (fieldName === "Gender" || fieldName === "PositionId" || fieldName === "DepartmentId" || fieldName === "WorkStatus") {
                        // console.log(this);
                        let idOfField = null
                        if (fieldName === "Gender") {
                            idOfField = "#employee-gender";
                        } else if (fieldName === "PositionId") {
                            idOfField = "#employee-position";
                        } else if (fieldName === "DepartmentId") {
                            idOfField = "#employee-department";
                        } else if (fieldName === "WorkStatus") {
                            idOfField = "#employee-status";
                        }
                        let thisDropdown = $(this).parents().find(idOfField);
                        // console.log(thisDropdown);

                        // Tim ra item (row) co id giong input value
                        let thisDropdownItem = null;
                        $.each(thisDropdown.find('.dropdown-item'), function (index, item) {
                            if ($(item).attr("uuid") == fieldValue) {
                                thisDropdownItem = item;
                            }
                        })
                        console.log(thisDropdownItem);


                        // css item trong dropdown :OK
                            // this is the one we click and is triggered last, we will css this
                        $(thisDropdownItem).css({
                            'background-color': "#019160",
                            'color': "#ffffff",
                        });
                            // return the other options to default status
                        $(thisDropdown).find('.dropdown-item').not(thisDropdownItem).css({
                            'background-color': "#ffffff",
                            'color': "#000000",
                        });
                            // display checkmark beside the selected item :OK
                        $($(thisDropdownItem).find('.dropdown-item-icon')[0]).css({
                            'display': 'block',
                            'background-color': "#ffffff",
                        });
                        // when displaying checkmark, push all options to right
                            // dont push the one we click
                        $($(thisDropdownItem).find('.dropdown-item-text')[0]).css({
                            'margin-left': '0',
                        });
                            // push all other ones
                        $(thisDropdown).find('.dropdown-item').not(thisDropdownItem).find('.dropdown-item-text').css({
                            'margin-left': '26px',
                        });


                        // hien thi text len div :OK
                        $($(thisDropdown).find('.hint')[0]).css("display", "none")
                        $($(thisDropdown).find('.text-over')[0]).text($(thisDropdownItem).find('.dropdown-item-text')[0].textContent.trim());


                        // them clear button :OK
                        $($(thisDropdown).find('.btn-clear')[0]).css({
                            'display': "block",
                        })
                    }

                    $(this).val(fieldValue);
                });
            }).fail(function () { });

            // Build len form
            $("#employee-form-modal").css("display", "block");
        })


        /**
         * Validate input khong duoc de trong voi cac o required
         */
        $('input[required]').blur(function () {
            if (!$(this).val()) {
                $(this).addClass("invalid");
                $(this).attr('title', "Trường này bắt buộc nhập");
                $(this).attr('valid', false);
            } else {
                $(this).removeClass("invalid");
                $(this).removeAttr('title');
                $(this).attr('valid', true);
            }
        })

        /**
         * Validate email dung dinh dang
         */
        $("input[type='email']").blur(function () {
            let emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!emailRegex.test($(this).val())) {
                $(this).addClass("invalid");
                $(this).attr('title', "Vui long nhap dung email");
                $(this).attr('valid', false);
            } else {
                $(this).removeClass("invalid");
                $(this).removeAttr('title');
                $(this).attr('valid', true);
            }
        });
    }
}
