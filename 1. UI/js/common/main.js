$(function() {
    $("#content").load("employee.html"); 
});

var selectCompanyCaretHeader = document.getElementById("dropdown-caret");
var selectCompanyDataHeader = document.getElementById("dropdown-data");
selectCompanyCaretHeader.onclick = function() {
    if (selectCompanyDataHeader.style.display === "none") {
        selectCompanyDataHeader.style.display = "block";
    } else {
        selectCompanyDataHeader.style.display = "none";
    }
}
