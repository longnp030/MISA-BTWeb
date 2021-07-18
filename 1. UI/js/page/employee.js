/*** FORM ***/

/* open form btn */
var addEmployeeBtn = document.getElementById("add-employee-btn");
/* form */
var employeeForm = document.getElementById("employee-form");

/* function to display form */
addEmployeeBtn.onclick = function () {
    employeeForm.style.display = "block";
};

/* functions to close form */

/* click X or outside to close */
employeeForm.addEventListener("click", function(event) {
    if (event.target.matches("#close-modal") || !event.target.closest(".modal")) {
        employeeForm.style.display = "none";
    }
}, false); // click here is "employee-form" click and not involve with document

/* press ESC to close */
document.addEventListener("keyup", function(event) {
    if (event.key === "Escape") {
        employeeForm.style.display = "none";
    }
})

/* click Cancel to close */
var cancelModal = document.getElementById("cancel-modal");
cancelModal.onclick = function () {
    employeeForm.style.display = "none";
}


/*** DROPDOWNS ***/


/* get dropdown -> working place */

/* the dropdown itself */
var place = document.getElementById("place");
/* caret to show items */
var caretPlace = document.getElementById("caret-place");
/* items */
var dataPlace = document.getElementById("data-place");

/* functions to show/hide dropdown */
caretPlace.onclick = function() {
    if (dataPlace.style.display === "none") {
        dataPlace.style.display = "block";
        place.classList.add("active");
    } else {
        dataPlace.style.display = "none";
        place.classList.remove("active");
    }
}


/* get dropdown -> working position */

/* the caret to show items */
var caretPosition = document.getElementById("caret-position");
/* items */
var dataPosition = document.getElementById("data-position");

/* functions to show/hide dropdown */
caretPosition.onclick = function() {
    if (dataPosition.style.display === "none") {
        dataPosition.style.display = "block";
    } else {
        dataPosition.style.display = "none";
    }
}


/* get dropdown -> gender selection in employee form */

/* caret to show items */
var caretGender = document.getElementById("caret-gender");
/* items */
var dataGender = document.getElementById("data-gender");

/* functions to show/hide dropdown */
caretGender.onclick = function() {
    if (dataGender.style.display === "none") {
        dataGender.style.display = "block";
    } else {
        dataGender.style.display = "none";
    }
}


/* function to load data from API to table - employee list */
function loadEmployee(employee_list) {
    for (let i = 0; i < employee_list.length; i++) {
        tr = $("<tr/>");
        tr.append('<td><label class="checkbox"><input type="checkbox"><span class="checkmark"></span></label></td>');
        tr.append("<td>" + employee_list[i].EmployeeCode + "</td>");
        tr.append("<td>" + employee_list[i].FullName + "</td>");
        tr.append("<td>" + employee_list[i].Gender + "</td>")
        tr.append("<td>" + employee_list[i].DateOfBirth.substring(0, 10) + "</td>");
        tr.append("<td>" + employee_list[i].PhoneNumber + "</td>");
        tr.append("<td>" + employee_list[i].Email + "</td>");
        tr.append("<td>" + employee_list[i].PositionName + "</td>");
        tr.append("<td>" + employee_list[i].DepartmentName + "</td>");
        tr.append('<td style="text-align: right; padding-right: 20px;">' + employee_list[i].Salary.toString().split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('') + "</td>");
        tr.append("<td>" + employee_list[i].WorkStatus + "</td>");

        tbody = $(".table table tbody");
        tbody.append(tr);
    }
}
function loadAPI() {
    $.ajax({
        type: "GET",
        url: "http://cukcuk.manhnv.net/v1/Employees",
        success: function(result) {
            if (result != null) {
                employeeList = result;
                console.log(employeeList[0]);
                
                loadEmployee(employeeList);
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    });
}
loadAPI();


/* change table row color when checkbox being selected */
// window.getComputedStyle($(".checkmark")[0]).getPropertyValue('background-color')

var trs = $('.table tbody tr');
for (let i = 0; i < trs.length; i++ ) {
    if (window.getComputedStyle(trs[i].children[0].children[0].children[1]).getPropertyValue("background-color") === "rgb(1, 145, 96)") {
        trs[i].style.backgroundColor =" #ebf9f4";
    } else {
        trs[i].style.backgroundColor =" #ffffff";
    }
}