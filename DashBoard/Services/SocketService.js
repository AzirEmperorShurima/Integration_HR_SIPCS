//import { addPersonToTable } from "./DashBoardSocket.js";
let identification = localStorage.getItem('identification');
if (!identification) {
    // Nếu không có identification, tạo mới và lưu vào localStorage
    identification = "FE_SIP";
    localStorage.setItem('identification', identification);
}
const Socket_link = `ws://localhost:8080?identification=${identification}`

const socket_Client = new WebSocket(Socket_link);

socket_Client.addEventListener('message', async (e) => {
    try {
        const data = JSON.parse(e.data);
        console.log(data);
        await addListPersonToTable(data, "data");
    } catch (error) {
        console.log(e.data);
    }
})
// const addPersonToTable = async (data, tableId) => {
//     const tbody = document.getElementById(tableId);
//     const tr = document.createElement("tr");

//     Object.entries(data).forEach(([key, value]) => {
//         if (key !== '_id') {
//             const td = document.createElement("td");
//             if (key === 'Gender') {
//                 td.textContent = value ? 'Nam' : 'Nữ';
//             } else {
//                 td.textContent = value ? value : 'NULL';
//             }
//             tr.appendChild(td);
//         }
//     });

//     tbody.appendChild(tr);
// }
const addListPersonToTable = async (list, tableId) => {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = "";
    try {
        list.forEach(element => {
            const { _id, ...data } = element
            const tr = document.createElement("tr");
            Object.values(data).forEach((value) => {
                const td = document.createElement("td");
                td.textContent = value !== null ? value : 'NULL';
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

    } catch (error) {
        // fs.writeFileSync(logFilePath, error)
    }
}