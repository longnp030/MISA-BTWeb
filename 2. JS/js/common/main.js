$(function () {
    $("#content").load("employee.html");
});

class PageBase {
    constructor() {
        this.dataUrl = "http://cukcuk.manhnv.net/v1/Employees";
        this.loadData();
        this.initEvents();
    }

    getDataUrl() {
        return this.dataUrl;
    }

    loadData() {
        // Lay thong tin du lieu se map voi cac cot
        $.ajax({
            url: this.getDataUrl(), // Dia chi API
            method: "GET", // Phuong thuc GET-lay du lieu, PUT-sua, POST-them moi, DELETE-xoa
            // data: '', // Tham so truyen len API qua body request. Neu khong co thi khong can khai bao
            // dataType: 'json',
            // contentType: 'json', // Kieu du lieu lay ve
            // async: True, // Dong bo/ Bat dong bo
        }).done(function (res) {
            $(".employee-count").text(res.length); // Dien du lieu so nhan vien vao paging
            $.each(res, function (index, employee) {
                let ths = $('table thead th');
                let tr = $(`<tr id="${employee.EmployeeId}"></tr>`);
                // Lay thong tin cac cot du lieu
                $.each(ths, function (index, th) {
                    // Lay ten cua column
                    let field = $(th).attr('field');

                    // Neu la o checkmark thi append rieng
                    if (field === "CheckMark") {
                        $(tr).append('<td><label class="checkbox"><input type="checkbox"><span class="checkmark"></span></label></td>')
                    } else {
                        // Lay ra du lieu tuong ung ten column
                        let value = employee[field];

                        // Check xem co phai ngay thang hay tien luong khong de con format du lieu cho dung
                        if (field === "DateOfBirth") {
                            value = formatDate(value, "ddmmyyyy");
                        } else if (field === "Salary") {
                            value = formatMoney(value);
                        } else if (!value) {
                            value = "";
                        }

                        let td = `<td>${value}</td>`
                        $(tr).append(td);
                    }
                });

                $('table tbody').append(tr);
            });

            // Paging table
            $(".table table").fancyTable({
                pagination: true,
                perPage: 9,
                pagClosest: 2,
                globalSearch: false,
                searchable: false,
                paginationClass: 'btn-2 i-page',
                paginationClassActive: 'active',
                paginationElement: '.paging .center',
            })
        }).fail(function (res) {
            // Dua ra thong bao loi cu the tuy theo http code: 400 404 405 500
            // Thong thuong thi:
            // 400: BadRequest: Loi du lieu dau vao tu client
            // 404: Dia chi url khong hop le
            // 500: InternalError: Loi tu phia backend-server
        });
    }

    initEvents() {}
}

class DropdownBase {
    constructor() {
        this.dataUrl = null;
        this.dropdownType = null;
        this.setDataUrl();
        this.setDropdownType();
        this.loadData();
    }

    setDataUrl() {}
    setDropdownType() {}

    /**
     * Ham lay du lieu cho vao dropdown
     * Author: NPLONG (19/07/2021)
     */
    loadData() {
        $.ajax({
            url: this.dataUrl,
            method: "GET",
            async: false,
        }).done(function (res) {
            let items = res
            console.log(items);

            console.log(this.dropdownType);

            items.forEach(item => {
                if (this.dropdownType === "department") {
                    let uuid = item.DepartmentId;
                    let text = item.DepartmentName;
                    let dropdownItem = `<div class="dropdown-item">
                                            <div class="dropdown-item-icon"></div>
                                            <div class="dropdown-item-text" uuid="${uuid}">${text}</div>
                                        </div>`;
                    $('.place-dropdown .dropdown-data').append(dropdownItem);
                } else if (this.dropdownType === "position") {
                    let uuid = item.PositionId;
                    let text = item.PositionName;
                    let dropdownItem = `<div class="dropdown-item">
                                            <div class="dropdown-item-icon"></div>
                                            <div class="dropdown-item-text" uuid="${uuid}">${text}</div>
                                        </div>`;
                    $('.position-dropdown .dropdown-data').append(dropdownItem);
                }
            });
        }).fail(function () {
            alert("Failed to get items");
        })
    }
}