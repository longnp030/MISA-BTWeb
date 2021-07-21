$(document).ready(function() {
    fillDepartmentDropdownData();
    fillPositionDropdownData();
});

class PositionDropdown extends DropdownBase {
    constructor() {
        super();
    }

    setDataUrl() {
        this.dataUrl = "http://cukcuk.manhnv.net/v1/Positions";
    }

    setDropdownType() {
        this.dropdownType = "position";
    }
}

class DepartmentDropdown extends DropdownBase {
    constructor() {
        super();
    }

    setDataUrl() {
        this.dataUrl = "http://cukcuk.manhnv.net/api/Department";
    }

    setDropdownType() {
        this.dropdownType = "department";
    }
}

/**
 * Ham lay du lieu cho vao dropdown cua "Phong ban"
 * Author: NPLONG (19/07/2021)
 */
function fillDepartmentDropdownData() {
    $.ajax({
        url: "http://cukcuk.manhnv.net/api/Department",
        method: "GET"
    }).done(function(res){
        let departments = res
        // console.log(departments);
        departments.forEach(department => {
            let departmentName = department.DepartmentName;
            let departmentId = department.DepartmentId;

            let dropdownItem = `<div class="dropdown-item" uuid="${departmentId}">
                                    <div class="dropdown-item-icon"></div>
                                    <div class="dropdown-item-text">${departmentName}</div>
                                </div>`;
            $('.place-dropdown .dropdown-data').append(dropdownItem);
        });
    }).fail(function(){
        alert("Failed to get departments");
    })
}

/**
 * Ham lay du lieu cho vao dropdown cua "Vi tri"
 * Author: NPLONG (19/07/2021)
 */
function fillPositionDropdownData() {
    $.ajax({
        url: "http://cukcuk.manhnv.net/v1/Positions",
        method: "GET"
    }).done(function(res){
        let positions = res
        // console.log(positions);
        positions.forEach(position => {
            let positionName = position.PositionName;
            let positionId = position.PositionId;

            let dropdownItem = `<div class="dropdown-item" uuid="${positionId}">
                                    <div class="dropdown-item-icon"></div>
                                    <div class="dropdown-item-text">${positionName}</div>
                                </div>`;
            $('.position-dropdown .dropdown-data').append(dropdownItem);
        });
    }).fail(function(){
        alert("Failed to get positions");
    })
}

/**
 * Ham dung de select option cua custom dropdown
 * @param {div} dropdown a dropdown
 * Author: NPLONG (20/07/2021)
 */
function applySelect(dropdown) {
    // Default text
    defaultText = $(dropdown).find(".hint").text();
    // console.log(defaultText);

    dropdownId = $(dropdown).attr("id");
    // console.log(dropdownId);
    items = $(dropdown).find('.dropdown-item');
    // console.log(dropdown);
    // console.log(items);

    $(items).on('click', function(e, manuel) {
        if (typeof manuel === 'undefined' || manuel === false) {
            // first manuel is always undefined so we trigger "click" 
            // function recursively to track the other options first
            // and the one which we clicked is triggered last
            $(dropdown).find('.dropdown-item').not(this).trigger('click', true);

            // this is the one we click and is triggered last, we will css this
            $(this).css({
                'background-color': "#019160",
                'color': "#ffffff",
            });
            // return the other options to default status
            $(dropdown).find('.dropdown-item').not(this).css({
                'background-color': "#ffffff",
                'color': "#000000",
            });

            // assign option to input field (if exist)
            inputField = $(dropdown).parents().find(`input[name='${dropdownId}']`);
            // console.log(inputField);
            if (inputField.length > 0) {
                // If the div has uuid then we must assign this uuid to input, not text
                if (typeof $(this).attr("uuid") !== "undefined") {
                    inputField.val($(this).attr("uuid"));
                } else{
                    inputField.val(this.textContent.trim());
                }
            }

            // display the clear option button
            $($(dropdown).find('.btn-clear')[0]).css({
                'display': "block",
            })

            // display checkmark beside the selected item
            $($(this).find('.dropdown-item-icon')[0]).css({
                'display': 'block',
                'background-color': "#ffffff",
            });
            // hide checkmark when not selected
            $(dropdown).find('.dropdown-item').not(this).find('.dropdown-item-icon').css({
                'display': 'none',
            });
        
            // when displaying checkmark, push all options to right
                // dont push the one we click
            $($(this).find('.dropdown-item-text')[0]).css({
                'margin-left': '0',
            });
                // push all other ones
            $(dropdown).find('.dropdown-item').not(this).find('.dropdown-item-text').css({
                'margin-left': '26px',
            });

            // Apply the text of the selected option to the outermost div
            $($(dropdown).find('.hint')[0]).css("display", "none")
            $($(dropdown).find('.text-over')[0]).text(this.textContent.trim());
        } else {
            // console.log(this.textContent);
        }
    });
}


/**
 * Ham xoa lua chon o custom dropdown
 * @param {button} button button clear trong dropdown
 * Author: NPLONG (20/07/2021)
 */
function clearSelect(button) {
    dropdown = $(button).parents('.dropdown')[0];

    // Change back text of outermost div to default
    $($(dropdown).find('.text-over')[0]).text("");
    $($(dropdown).find('.hint')[0]).css("display", "block");

    // If there is an input before, clear input value
    inputOfDropdown = $($(button).parents().parents()[0]).children("input");
    if (inputOfDropdown && inputOfDropdown.length > 0) {
        $(inputOfDropdown[0]).val("");
    }

    // Style all options to default
    $(dropdown).find('.dropdown-item').css({
        'background-color': "#ffffff",
        'color': '#000000',
    })
    // Hide checkmark
    $(dropdown).find('.dropdown-item-icon').css({
        'display': "none",
    })
    // Push text back to left with margin left = 0
    $(dropdown).find('.dropdown-item-text').css({
        'margin-left': "0",
    })
    // Hide the clear button
    $(button).css({
        'display': "none",
    })
}
