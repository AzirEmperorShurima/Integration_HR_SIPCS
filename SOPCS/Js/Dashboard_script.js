import { addListPersonToTable, getListPerson } from "../Services/DashBoard.js";
var inputFields = [
    { id: "Employee_ID", mongoProp: "employeeId", sqlProp: "Employee_ID" },
    { id: "First_Name", mongoProp: "firstName", sqlProp: "First_Name" },
    { id: "Last_Name", mongoProp: "lastName", sqlProp: "Last_Name" },
    { id: "Middle_Initial", mongoProp: null, sqlProp: "Middle_Initial" },
    { id: "Address1", mongoProp: null, sqlProp: "Address1" },
    { id: "Address2", mongoProp: null, sqlProp: "Address2" },
    { id: "City", mongoProp: null, sqlProp: "City" },
    { id: "State", mongoProp: null, sqlProp: "State" },
    { id: "Zip", mongoProp: null, sqlProp: "Zip" },
    { id: "Email", mongoProp: null, sqlProp: "Email" },
    { id: "Phone_Number", mongoProp: null, sqlProp: "Phone_Number" },
    { id: "Social_Security_Number", mongoProp: null, sqlProp: "Social_Security_Number" },
    { id: "Drivers_License", mongoProp: null, sqlProp: "Drivers_License" },
    { id: "Marital_Status", mongoProp: null, sqlProp: "Marital_Status" },
    { id: "Gender", mongoProp: null, sqlProp: "Gender" },
    { id: "Shareholder_Status", mongoProp: null, sqlProp: "Shareholder_Status" },
    { id: "Benefit_Plans", mongoProp: null, sqlProp: "Benefit_Plans" },
    { id: "Ethnicity", mongoProp: null, sqlProp: "Ethnicity" },
    { id: "vacationDays", mongoProp: "vacationDays", sqlProp: null },
    { id: "paidToDate", mongoProp: "paidToDate", sqlProp: null },
    { id: "paidLastYear", mongoProp: "paidLastYear", sqlProp: null },
    { id: "payRate", mongoProp: "payRate", sqlProp: null },
    { id: "payRateId", mongoProp: "payRateId", sqlProp: null }
];
var mongoData = {};
var sqlData = {};


const cr = document.getElementById("a-createnew")
const clearFRM = document.getElementById("clearFRM")
const change = document.getElementById('change')
const CRYEES = document.getElementById('CRYEES')
const tlName = document.getElementById('titleName')
const btn_CR = document.getElementById('CRYEES')
cr.onclick = () => {
    clear()
    change.style.display = "none"
    CRYEES.style.display = 'inline-block'
    tlName.textContent = 'Create A New Employee'
    btn_CR.textContent = 'Create New EMP'
    clearFRM.disabled = false
    $('#inputform').modal('show');
    console.log("Modal opened");
}
clearFRM.onclick = () => { clear() }
const clear = () => {
    for (var i = 0; i < inputFields.length; i++) {
        var inputElement = document.getElementById(inputFields[i].id);
        if (inputElement) {
            inputElement.value = '';
            inputElement.checked = false
        }
    }
}
const sub = document.getElementById('CRYEES')
sub.onclick = async () => {

    for (var i = 0; i < inputFields.length; i++) {
        var inputElement = document.getElementById(inputFields[i].id);
        if (inputElement) {
            mongoData[inputFields[i].mongoProp] = inputElement.value;
            sqlData[inputFields[i].sqlProp] = inputElement.value;
        }
    }
    console.log("Mongo data:", mongoData);
    console.log("SQL data:", sqlData);
    const res = await axios.post('http://localhost:10000/create', { mongoData, sqlData })
        .then(response => {
            console.log(response);
            if (response.status == 200 || response.data.success) {
                confirm('Success')
                // $('#inputform').modal('hide');
                //location.reload();
            }
            else {
                confirm('!Success')
            }
        })
        .catch(error => {
            console.error(error);
            confirm('!Successfully created')
        });

}

const dis = document.getElementById("CRNOON")
dis.onclick = () => {
    $('#inputform').modal('hide');
}


const Change = document.getElementById('change')
Change.onclick = async () => {
    for (var i = 0; i < inputFields.length; i++) {
        var inputElement = document.getElementById(inputFields[i].id);
        if (inputElement) {
            mongoData[inputFields[i].mongoProp] = inputElement.value;
            sqlData[inputFields[i].sqlProp] = inputElement.value;
        }
    }
    console.log("Mongo data:", mongoData);
    console.log("SQL data:", sqlData);
    const response = await axios.post('http://localhost:10000/change', { mongoData, sqlData })
        .then(response => {
            console.log(response);
            if (response.status == 200 || response.data.success === true) {
                console.log(response.data.message)
                addListPersonToTable(getListPerson, 'data')
            }
            else {
                confirm('!Success')
            }
        })
        .catch(error => {
            console.error(error);
            confirm('!Successfully created')
        });
}

