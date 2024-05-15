

window.onload = function () {
    var inputFields = [
        { id: "Employee_ID", minLength: 3, maxLength: 20 },
        { id: "First_Name", minLength: 5, maxLength: 50 },
        { id: "Last_Name", minLength: 5, maxLength: 50 },
        { id: "Middle_Initial", minLength: 1, maxLength: 10 },
        { id: "Address1", minLength: 5, maxLength: 100 },
        { id: "Address2", minLength: 5, maxLength: 100 },
        { id: "City", minLength: 2, maxLength: 50 },
        { id: "State", minLength: 2, maxLength: 50 },
        { id: "Zip", minLength: 5, maxLength: 7 },
        { id: "Email", minLength: 5, maxLength: 100 },
        { id: "Phone_Number", minLength: 7, maxLength: 15 },
        { id: "Social_Security_Number", minLength: 1, maxLength: 10 },
        { id: "Drivers_License", minLength: 1, maxLength: 20 },
        { id: "Marital_Status", minLength: 1, maxLength: 50 },
        { id: "Ethnicity", minLength: 1, maxLength: 50 },
        { id: "vacationDays", minLength: 1, maxLength: 20 },
        { id: "paidToDate", minLength: 1, maxLength: 20 },
        { id: "paidLastYear", minLength: 1, maxLength: 20 },
        { id: "payRate", minLength: 1, maxLength: 20 },
        { id: "payRateId", minLength: 1, maxLength: 20 }
    ];

    var sub = document.getElementById('CRYEES');
    sub.disabled = true;

    function createChangeHandler(inputField) {
        return function () {
            var inputElement = document.getElementById(inputField.id);
            if (this.value.length < inputField.minLength || this.value.length > inputField.maxLength) {
                alert('Giá trị nhập vào cho trường ' + inputField.id + ' phải có ít nhất ' + inputField.minLength + ' ký tự và không được vượt quá ' + inputField.maxLength + ' ký tự.');
                inputElement.style.border = 'solid 1px red'
            } else {
                inputElement.style.border = 'solid 1px green'
            }

            checkAllFields();
        };
    }

    // function createFocusHandler(inputField) {
    //     return function () {
    //         var inputElement = document.getElementById(inputField.id);
    //         inputElement.style.border = 'solid 1px blue';
    //     };
    // }

    // function createBlurHandler(inputField) {
    //     return function () {
    //         var inputElement = document.getElementById(inputField.id);
    //         if (this.value.length === 0) {
    //             alert('Bạn phải nhập vào trường này.');
    //             inputElement.style.border = 'solid 1px red'
    //         }

    //         checkAllFields();
    //     };
    // }

    function checkAllFields() {
        for (var i = 0; i < inputFields.length; i++) {
            const inputElement = document.getElementById(inputFields[i].id);

            if (inputElement && (inputElement.value.length < inputFields[i].minLength || inputElement.value.length > inputFields[i].maxLength)) {
                sub.disabled = true;
                return false;
            }
        }

        // Nếu tất cả các trường đều hợp lệ, kích hoạt nút submit
        sub.disabled = false;
        return true;
    }

    for (var i = 0; i < inputFields.length; i++) {
        const inputElement = document.getElementById(inputFields[i].id);

        if (inputElement) {
            inputElement.required = true; // Thêm thuộc tính required
            inputElement.addEventListener('change', createChangeHandler(inputFields[i]));
            // inputElement.addEventListener('blur', createBlurHandler(inputFields[i]));
            // inputElement.addEventListener('focus', createFocusHandler(inputFields[i]));
        }
    }
}


const link = "http://localhost:10000/codelord/"
const linkDelete = "http://localhost:10000/codelord/"
export const postID_Remove = async (id) => {
    try {
        let data = JSON.stringify({
            employeeId: id
        });
        let data1 = JSON.stringify({
            "employeeId": `${id}`
        });
        console.log(`data` + data);
        console.log(data1);
        const response = await axios.post('http://localhost:10000/codelord', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status == 200 || response.data.success === true) {
            console.log(response)
            // window.location.reload();
            await addListPersonToTable(getListPerson, 'data')

        }
        else {
            alert('Operation failed');
        }
    } catch (error) {
        console.log(error);
        alert('Operation failed');
    }
}

export const getListPerson = async () => {
    try {
        const res = await axios.get(link);
        return res.data;
    } catch (error) {
        console.log(error);

    }
}
export const getListPerson_Fetch = async () => {
    try {
        const res = await fetch(link);
        const response_data = await res.json();
        console.log("Phản hồi từ máy chủ:", response_data);
    } catch (error) {
        console.log("Lỗi khi lấy dữ liệu:", error);

    }
};
var employeeID = document.getElementById("Employee_ID");
var firstName = document.getElementById("First_Name")
var lastName = document.getElementById("Last_Name")
var middleInitial = document.getElementById("Middle_Initial")
var address1 = document.getElementById("Address1")
var address2 = document.getElementById("Address2")
var city = document.getElementById("City")
var state = document.getElementById("State")
var zip = document.getElementById("Zip")
var email = document.getElementById("Email")
var phoneNumber = document.getElementById("Phone_Number")
var socialSecurityNumber = document.getElementById("Social_Security_Number")
var driversLicense = document.getElementById("Drivers_License")
var maritalStatus = document.getElementById("Marital_Status")
var gender = document.getElementById("Gender")
var shareholderStatus = document.getElementById("Shareholder_Status")
var benefitPlans = document.getElementById("Benefit_Plans")
var ethnicity = document.getElementById("Ethnicity")
var vacationDays = document.getElementById("vacationDays")
var paidToDate = document.getElementById("paidToDate")
var paidLastYear = document.getElementById("paidLastYear")
var payRate = document.getElementById("payRate")
var payRateId = document.getElementById("payRateId")

export const addListPersonToTable = async (list, tableId) => {
    list = await getListPerson();
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';
    const flo = document.createElement('div');
    flo.id = 'cocainit';
    flo.style.overflowX = 'auto';
    tbody.appendChild(flo);
    const header = document.createElement("tr");
    Object.keys(list.data[0]).forEach((key) => {
        if (key !== '_id') {
            const th = document.createElement("th");
            th.textContent = key;
            header.appendChild(th);
        }
    });
    const gg = document.createElement("th");
    gg.textContent = 'Edit'
    const gs = document.createElement("th");
    gs.textContent = 'Remove'
    header.appendChild(gg);
    header.appendChild(gs);
    tbody.appendChild(header);

    try {
        list.data.forEach(element => {
            const { _id, ...data } = element
            const tr = document.createElement("tr");

            Object.entries(data).forEach(([key, value]) => {
                const td = document.createElement("td");
                if (key === 'Gender') {
                    td.textContent = value ? 'Nam' : 'Nữ';
                } else {
                    td.textContent = value ? value : 'NULL';
                }
                if (td.textContent === 'NULL') {
                    td.style.color = 'Red';
                    td.style.textDecoration = 'underline'
                    td.style.cursor = 'pointer';
                    td.onclick = () => {
                        const modalTitle = document.querySelector('#acceptAction .modal-body');
                        const tlName1 = document.getElementById('tlName')
                        tlName1.textContent = "Reminder Notification"
                        modalTitle.textContent = "Do you Want Change Employee_ID : " + element.employeeId;
                        console.log("Remove clicked for Employee_ID: " + element.Employee_ID);
                        $('#acceptAction').modal('show');
                        const accept = document.querySelector('#acceptAction .btn-accept');
                        accept.onclick = () => {
                            $('#acceptAction').modal('hide');
                            edit.click();

                        }
                        const nonACCEPT = document.querySelector('#acceptAction .btn-non-accept')
                        nonACCEPT.onclick = () => {
                            $('#acceptAction').modal('hide');
                        }
                    }
                }
                tr.appendChild(td);
            });
            const edit = document.createElement("td");
            edit.style.textDecoration = "underline";
            edit.style.color = "Blue"

            edit.onclick = () => {
                console.log("Edit" + element.employeeId)
                $('#inputform').modal('show')
                const change = document.getElementById('change')
                const clearFRM = document.getElementById('clearFRM')
                clearFRM.disabled = true
                const CRYEES = document.getElementById('CRYEES')
                CRYEES.style.display = 'none'
                change.style.display = 'inline-block'
                // CRYEES.id = 'change'
                CRYEES.textContent = "Change EMP"
                const tlName = document.getElementById('titleName')
                //changeCL();
                tlName.textContent = `Edit EMP : ${element.firstName + ' ' + element.lastName}  :)) `
                employeeID.value = element.employeeId
                // employeeID.readonly = true;
                //element.employeeId
                // employeeID.style.cursor = 'wait'

                employeeID.readOnly = true;
                firstName.value = element.firstName
                lastName.value = element.lastName
                address2.value = element.Address2
                address1.value = element.Address1
                middleInitial.value = element.Middle_Initial
                city.value = element.City
                state.value = element.State
                zip.value = element.Zip
                email.value = element.Email
                phoneNumber.value = element.Phone_Number
                socialSecurityNumber.value = element.Social_Security_Number
                maritalStatus.value = element.Marital_Status
                gender.value = element.Gender ? "1" : "0";
                shareholderStatus.checked = element.Shareholder_Status
                benefitPlans.value = element.Benefit_Plans
                ethnicity.value = element.Ethnicity
                vacationDays.value = element.vacationDays
                paidToDate.value = element.paidToDate
                paidLastYear.value = element.paidLastYear
                payRate.value = element.payRate
                payRateId.value = element.payRateId
                driversLicense.value = element.Drivers_License

            }
            edit.textContent = "Edit";
            tr.appendChild(edit);
            const remove = document.createElement("button");
            remove.onclick = () => {
                const modalTitle = document.querySelector('#acceptAction .modal-body');
                modalTitle.textContent = "Do you Want Remove Employee_ID : " + element.employeeId;
                console.log("Remove clicked for Employee_ID: " + element.employeeId);
                $('#acceptAction').modal('show');
                const accept = document.querySelector('#acceptAction .btn-accept');
                let id = element.employeeId
                console.log('id' + id);
                accept.onclick = () => {
                    postID_Remove(element.employeeId)
                    //confirm(element.employeeId)
                    $('#acceptAction').modal('hide');

                }
                const nonACCEPT = document.querySelector('#acceptAction .btn-non-accept')
                nonACCEPT.onclick = () => {
                    $('#acceptAction').modal('hide');
                }
            }
            remove.textContent = "Remove";
            remove.style.paddingTop = "5px"
            tr.appendChild(remove);
            tbody.appendChild(tr);
        });

    } catch (error) {
        console.log(error);
    }
}

addListPersonToTable(getListPerson, "data");
