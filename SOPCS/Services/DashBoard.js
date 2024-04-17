const link = "http://localhost:10000/codelord/"
export const getListPerson = async () => {
    try {
        const res = await axios.get(link);
        return res.data;
    } catch (error) {
        console.log(error);
        //  fs.writeFileSync(logFilePath, error)
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
export const addListPersonToTable = async (list, tableId) => {
    list = await getListPerson();
    const tbody = document.getElementById(tableId);
    const flo = document.createElement('div');
    flo.id = 'cocainit';
    flo.style.overflowX = 'auto';
    tbody.appendChild(flo);
    try {
        list.data.forEach(element => {
            const { _id, ...data } = element
            const tr = document.createElement("tr");
            Object.values(data).forEach((value) => {
                const td = document.createElement("td");
                td.textContent = value;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

    } catch (error) {
        // fs.writeFileSync(logFilePath, error)
    }
}
addListPersonToTable(getListPerson, "data");
// export const addListPersonToTable = async (list, tableId) => {
//     list = await getListPerson();
//     const tbody = document.getElementById(tableId);
//     try {
//         list.data.forEach(element => {
//             const tr = document.createElement("tr");
//             const fieldsToShow = ["Employee_ID", "First_Name", "Last_Name", "Email"];
//             fieldsToShow.forEach((field) => {
//                 const td = document.createElement("td");
//                 td.textContent = element[field];
//                 tr.appendChild(td);
//             });
//             tbody.appendChild(tr);
//         });

//     } catch (error) {
//         // fs.writeFileSync(logFilePath, error)
//     }
// }
