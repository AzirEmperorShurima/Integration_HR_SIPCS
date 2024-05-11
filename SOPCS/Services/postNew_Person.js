
const axios = require('axios');

// Hàm này sẽ được gọi khi người dùng nhấp vào nút
function postEmployeeData() {
    // Lấy giá trị từ các ô input
    const Employee_ID = document.getElementById('Employee_ID').value;
    const First_Name = document.getElementById('First_Name').value;
    const Last_Name = document.getElementById('Last_Name').value;
    const Middle_Initial = document.getElementById('Middle_Initial').value;
    const Address1 = document.getElementById('Address1').value;
    const Address2 = document.getElementById('Address2').value;
    const City = document.getElementById('City').value;
    const State = document.getElementById('State').value;
    const Zip = document.getElementById('Zip').value;
    const Email = document.getElementById('Email').value;
    const Phone_Number = document.getElementById('Phone_Number').value;
    const Social_Security_Number = document.getElementById('Social_Security_Number').value;
    const Drivers_License = document.getElementById('Drivers_License').value;
    const Marital_Status = document.getElementById('Marital_Status').value;
    const Gender = document.getElementById('Gender').value;
    const Shareholder_Status = document.getElementById('Shareholder_Status').checked;
    const Benefit_Plans = document.getElementById('Benefit_Plans').value;
    const Ethnicity = document.getElementById('Ethnicity').value;

    // Tạo một đối tượng để chứa dữ liệu
    const data = {
        Employee_ID,
        First_Name,
        Last_Name,
        Middle_Initial,
        Address1,
        Address2,
        City,
        State,
        Zip,
        Email,
        Phone_Number,
        Social_Security_Number,
        Drivers_License,
        Marital_Status,
        Gender,
        Shareholder_Status,
        Benefit_Plans,
        Ethnicity
    };
    const user = {


        Employee_ID,
        First_Name,
        Last_Name,
        vacationDays,
        paidToDate,
        paidLastYear,
        payRate,
        payRateId

    }


}

// Sử dụng axios để gửi POST request
axios.post('http://localhost:4000/api/employee', user)
    .then(response => {
        console.log(response.user);
    })
    .catch(error => {
        console.error(error);
    });


// Thêm sự kiện onclick vào nút submit
// document.getElementById('submit').addEventListener('click', postEmployeeData);
document.querySelector('input[type="submit"]').addEventListener('click', postEmployeeData);

