var addEmployeeBtn = document.getElementById("add-employee-btn");
var employeeForm = document.getElementById("employee-form");

addEmployeeBtn.onclick = function () {
    employeeForm.style.display = "block";
}

var employeeFormClose = document.getElementById("close-modal");
employeeFormClose.onclick = function () {
    employeeForm.style.display = "none";
}
var cancelModal = document.getElementById("cancel-modal");
cancelModal.onclick = function () {
    employeeForm.style.display = "none";
}


var place = document.getElementById("place");
var caretPlace = document.getElementById("caret-place");
var dataPlace = document.getElementById("data-place");
caretPlace.onclick = function() {
    if (dataPlace.style.display === "none") {
        dataPlace.style.display = "block";
        place.classList.add("active");
    } else {
        dataPlace.style.display = "none";
        place.classList.remove("active");
    }
}

var caretPosition = document.getElementById("caret-position");
var dataPosition = document.getElementById("data-position");
caretPosition.onclick = function() {
    if (dataPosition.style.display === "none") {
        dataPosition.style.display = "block";
    } else {
        dataPosition.style.display = "none";
    }
}

var caretGender = document.getElementById("caret-gender");
var dataGender = document.getElementById("data-gender");
caretGender.onclick = function() {
    if (dataGender.style.display === "none") {
        dataGender.style.display = "block";
    } else {
        dataGender.style.display = "none";
    }
}

