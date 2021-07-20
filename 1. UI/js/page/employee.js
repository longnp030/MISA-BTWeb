$(document).ready(function () {
    // Thuc hien load du lieu

    console.log("Start loading data...")
    employee = new Employee()
    console.log("Done loading!")

    /*** Xu ly button cho modal va dropdown ***/
    $("employee-form").submit(function (event) {
        event.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            url: "http://cukcuk.manhnv.net/v1/Employees",
            method: "POST",
            data: JSON.stringify(formData),
            contentType: 'application/json',
            cache: false,
            processData: false
        }).done(function () {
            alert("Submitted successfully!")
        }).fail(function () {
            alert("Submit failed!")
        });
    });

    $('input[required]').blur(function () {
        let value = $(this).val();
        if (value == "") {
            $(this).addClass("invalid");
            $(this).attr('title', "Ok");
        } else {
            $(this).removeClass("invalid");
        }
    })
});

/**
 * Dinh dang lai ngay thang nam
 * @param {any} date 
 * @returns String dd/mm/yyyy
 * Author: NPLONG (19/07/2021)
 */
function formatDate(date) {
    if (!date) {
        return "";
    } else {
        let newDate = new Date(date);

        let day = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
        let month = newDate.getMonth() + 1 < 10 ? "0" + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${day}/${month}/${year}`;
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
    var value = input.value;
    if (isNaN(value)) {
        $(input).addClass("invalid");
    } else {
        $(input).removeClass("invalid");
    }
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
    }

    initEvents() {
        // Click button hien thi form thong tin chi tiet
        $("#add-employee-btn").click(function() {
            $($(this).parents("#content").children("#employee-form-modal")[0]).css("display", "block");
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
    }
}
