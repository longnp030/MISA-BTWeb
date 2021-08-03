$(document).ready(function () {
    setTimeout(() => {
        // Thuc hien load du lieu
        console.log("Start loading data...")
        employee = new EmployeePage()
        console.log("Done loading!")
    }, 1000);
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

class EmployeePage extends PageBase {
    constructor() {
        super();
        this.apiUrl = "http://cukcuk.manhnv.net/v1/Employees";
        this.formMode = null;
    }

    initEvents() {
        // Tao 1 const var de gan instance class nay vao de dung cac ham con ben trong
        const self = this;

        /**
         * Nhan nut "Them nhan vien" de mo form them nhan vien
         * Author: NPLONG (20/07/2021)
         */
        $("#add-employee-btn").click(function () {
            $($(this).parents("#content").children("#employee-form-modal")[0]).css("display", "block");

            // Reset form
            $('input').val(null);

            // Tu dong gen ma nhan vien moi va auto focus
            $.ajax({
                url: "http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode",
                method: "GET",
            }).done(function (res) {
                $("#employee-code").val(res);
                $("#employee-code").focus();
            }).fail(function () {
                alert("Lay ma nhan vien moi khong thanh cong")
            })

            // Bam vao nut them thi la ADD
            self.formMode = "ADD";
        });

        /**
         * Nhan nut refresh de tai lai bang danh sach
         * Author: NPLONG (20/07/2021)
         */
        $("#reload").click(function () {
            // Xoa du lieu cu trong bang truoc
            $(".table table tbody").html("");
            employee.loadData();
        });

        /**
         * Nhan ESC tren ban phim de dong form
         * Author: NPLONG (20/07/2021)
         */
        $(document).keyup(function (e) {
            if (e.keyCode == 27) {
                $("#employee-form-modal").css("display", "none");
                $('input').val(null);
            }
        })

        /**
         * Nhan nut "X" o goc form de dong hoac an ra ngoai modal
         * Author: NPLONG (20/07/2021)
         */
        var employeeForm = document.getElementById("employee-form-modal");
        employeeForm.addEventListener("click", function (event) {
            if (event.target.matches(".close") || !event.target.closest(".modal")) {
                employeeForm.style.display = "none";
                $('input').val(null);
            }
        }, false); // click here is "employee-form-modal" click and not involve with document

        /**
         * Thuc hien submit form khi nhan nut "LUU" trong form
         * Author: NPLONG (23/07/2021)
         */
        $("#btn-submit").click(this.btnSubmitOnClick.bind(this)); // Bind thằng this này chính là obj Employee vào bên trong thằng button đang click


        /**
         * Hien thi thong tin chi tiet moi nhan vien khi click dup vao 1 dong trong table
         * Author: NPLONG (21/07/2021)
         */
        $(".table table tbody").on("dblclick", 'tr', function () {
            try {
                // Click vao table EDIT
                self.formMode = "EDIT";


                // Lay primary key cua ban ghi
                let employeeId = $(this).attr('id');
                self.employeeId = employeeId; // Luu lai de "EDIT", moi lan click tr la 1 Id khac

                console.log(self);

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
                        console.log(fieldName, fieldValue);

                        // Map input voi nhung truong dac biet can xu ly
                        switch (fieldName) {
                            case "DateOfBirth":
                                fieldValue = formatDate(fieldValue, "");
                                break;
                            case "Salary":
                                fieldValue = formatMoney(fieldValue);
                                break;
                            case "Gender":
                            case "PositionId":
                            case "DepartmentId":
                            case "WorkStatus":
                                let idOfField = null;
                                switch (fieldName) {
                                    case "Gender":
                                        idOfField = "#employee-gender";
                                        break;
                                    case "PositionId":
                                        idOfField = "#employee-position";
                                        break;
                                    case "DepartmentId":
                                        idOfField = "#employee-department";
                                        break;
                                    case "WorkStatus":
                                        idOfField = "#employee-status";
                                        break;
                                    default:
                                        break;
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
                                // console.log(thisDropdownItem);

                                if (fieldValue) {
                                    console.log("fieldvalue:", fieldValue)
                                    // console.log(this);

                                    // css item trong dropdown :OK
                                    // this is the one we click and is triggered last, we will css this
                                    $(thisDropdownItem).addClass('active');
                                    // return the other options to default status
                                    $(thisDropdown).find('.dropdown-item').not(thisDropdownItem).removeClass('active');
                                    // display checkmark beside the selected item :OK
                                    $($(thisDropdownItem).find('.dropdown-item-icon')).css({
                                        'display': 'block',
                                    });
                                    // when displaying checkmark, push all options to right
                                    // dont push the one we click
                                    $($(thisDropdownItem).find('.dropdown-item-text')).css({
                                        'margin-left': '0',
                                    });
                                    // push all other ones
                                    $(thisDropdown).find('.dropdown-item').not(thisDropdownItem).find('.dropdown-item-text').css({
                                        'margin-left': '26px',
                                    });


                                    // hien thi text len div :OK
                                    console.log($(thisDropdownItem).find('.dropdown-item-text')[0]);
                                    $($(thisDropdown).find('.hint')[0]).css("display", "none");
                                    try {
                                        $($(thisDropdown).find('.text-over')[0]).text($(thisDropdownItem).find('.dropdown-item-text')[0].textContent.trim());
                                    } catch (error) {
                                        console.log(error);
                                    }

                                    // them clear button :OK
                                    $($(thisDropdown).find('.btn-clear')[0]).css({
                                        'display': "block",
                                    });
                                } else {
                                    console.log("fieldvalue:", fieldValue)
                                    fieldValue = "";

                                    // return the options to default status
                                    $(thisDropdown).find('.dropdown-item').removeClass('active');

                                    // hide checkmark beside the selected item :OK
                                    $(thisDropdownItem).find('.dropdown-item-icon').css({
                                        'display': 'none',
                                    });

                                    // push all options to left
                                    $(thisDropdownItem).find('.dropdown-item-text').css({
                                        'margin-left': '0',
                                    });

                                    // loai bo text o outermost div :OK
                                    $($(thisDropdown).find('.hint')[0]).css("display", "block")
                                    $($(thisDropdown).find('.text-over')[0]).text("");

                                    // hide clear button :OK
                                    $($(thisDropdown).find('.btn-clear')[0]).css({
                                        'display': "none",
                                    });
                                }
                                break;
                            default:
                                break;
                        }

                        $(this).val(fieldValue);
                        $("#employee-code").focus();
                    });
                }).fail(function (res) {
                    console.log(res);
                });

                // Build len form
                $("#employee-form-modal").css("display", "block");
            } catch (error) {
                console.log(error);
            }
        });


        /**
         * Ham xu ly click vao checkbox moi tr, doi mau tr neu checked
         * Author: NPLONG (21/07/2021)
         * REF: https://stackoverflow.com/questions/34556768/how-to-remove-style-on-second-click
         */
        $(".table table tbody").on("mouseup", ".checkbox", function () {
            console.log(this);

            let checked = !$(this).data("checked");
            $(this).data("checked", checked);

            if (checked) {
                $(this).parents('tr').addClass("checked");
                $(this).parents('tr').css("background-color", "#ebf9f4");
            } else {
                $(this).parents('tr').removeClass("checked");
                $(this).parents('tr').css("background-color", "");
            }
        })

        /**
         * Chuc nang xoa (1 hoac nhieu) nhan vien sau khi chon checkbox o dau moi dong
         * Author: NPLONG (23/07/2021)
         */
        $("#del-employee-btn").click(function () {
            try {
                var checked_trs = $(".table table tbody tr.checked");
                console.log(checked_trs);

                if (checked_trs.length > 0) {
                    $("#del-employee-alert").css("display", "block");

                    let delEmployeeAlert = document.getElementById("del-employee-alert");
                    delEmployeeAlert.addEventListener("click", function (event) {
                        if (event.target.matches(".close") || !event.target.closest(".modal") || event.target.matches("#del-employee-no")) {
                            delEmployeeAlert.style.display = "none";
                        } else if (event.target.matches("#del-employee-yes")) {
                            $.each(checked_trs, function (index, checked_tr) {
                                console.log($(checked_tr).attr("id"));

                                $.ajax({
                                    url: "http://cukcuk.manhnv.net/v1/Employees/" + $(checked_tr).attr("id"),
                                    method: "DELETE",
                                    async: true,
                                }).done(function (res) {
                                    self.loadData();
                                }).fail(function (res) {
                                    console.log(res);
                                });
                            });

                            // Xoa xong thi dong alert
                            alert("Xoa thanh cong");
                            delEmployeeAlert.style.display = "none";
                        }
                    }, false);
                } else {
                    alert("Ban chua chon nhan vien nao.");
                }
            } catch (error) {
                console.log(error);
            }
        });


        /**
         * Ham auto filter khi nguoi dung nhap vao o tim kiem
         * Author: NPLONG (21/07/2021)
         */
        $(".filter input").keyup(function () {
            let query = $.trim($(this).val()).replace(/\s+/g, ' ').toLowerCase();

            $('.table table tbody').find("tr").show().filter(function () {
                var text = $(this).find('td').text().replace(/\s+/g, ' ').toLowerCase();
                return !~text.indexOf(query);
            }).hide();
        });


        //#region filter using ajax
        /**
         * Ham filter employee theo Phong ban/ Vi tri
         * Author: NPLONG (24/07/2021)
         * ** DANG BI LOI SERVER: 500
         */
        /*$(".filter .dropdown-item").on('click', function (e, manuel) {
            if (typeof manuel === 'undefined' || manuel === false) {
                // first manuel is always undefined so we trigger "click" 
                // function recursively to track the other options first
                // and the one which we clicked is triggered last
                $(".filter .dropdown-item").not(this).trigger('click', true);

                // Filter table theo id
                // Get ID
                let filterId = $(this).attr("uuid");
                console.log(filterId);

                // Send request to filter data
                let filteredData = null; // Tao 1 bien de luu res tra ve
                $.ajax({
                    url: "http://cukcuk.manhnv.net/v1/Employees/Filter?departmentId=" + filterId,
                    method: "GET"
                }).done(function (res) {
                    console.log("Lay filter phong ban OK");

                    //  Assign res -> filteredData
                    filteredData = res;
                    console.log(res);
                }).fail(function () {
                    console.log("Lay filter phong ban FAIL, tiep tuc lay vi tri...");
                    $.ajax({
                        url: "http://cukcuk.manhnv.net/v1/Employees/Filter?positionId=" + filterId,
                        method: "GET",
                    }).done(function (res) {
                        console.log("Lay filter vi tri OK");

                        //  Assign res -> filteredData
                        filteredData = res;
                        console.log(res);
                    }).fail(function () {
                        console.log("Lay filter vi tri FAIL");
                    });
                });

                // Bind du lieu filtered len table

            }
        });*/
        //#endregion


        $('.paging .center').on("DOMSubtreeModified", function () {
            let whichChanged = $(this).find('.active').length ? $($(this).find('.active')[0]) : null;
            // console.log(whichChanged);

            let activePage = whichChanged ? parseInt(whichChanged.data('n')) : null;
            console.log(activePage);

            let maxRow = $('.table table tbody').find('tr').length;
            let maxPage = $($('.paging .center').find('.i-page')[$('.paging .center').find('.i-page').length]).data('n');
            console.log(maxPage)

            if (activePage) {
                $('.this-page-start-count').text((activePage - 1) * 9 + 1);
                $('.this-page-count').text(9);
                $('.this-page-end-count').text((activePage - 1) * 9 + 9);
                if (activePage === maxPage) {
                    $('.this-page-end-count').text(maxRow);
                    $('.this-page-count').text(maxRow - (activePage - 1) * 9);
                }
                
            }
        });


        /**
         * Validate input khong duoc de trong voi cac o required
         * Author: NPLONG (21/07/2021)
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
         * Author: NPLONG (21/07/2021)
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

    btnSubmitOnClick() {
        try {
            let self = this;
            console.log(self)

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

            let method = "POST";
            let url = self.apiUrl;
            if (self.formMode == "EDIT") {
                method = "PUT";
                empl.employeeId = self.employeeId;
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
                self.loadData();
                console.log("reloaded")
            }).fail(function () {
                alert("Them mới thất bại");
            });
        } catch (error) {
            console.log(error);
        }
    }
}
