import { addListPersonToTable, getListPerson } from "./DashBoard.js";
// let identification = localStorage.getItem('identification');
// if (!identification) {
//     // Nếu không có identification, tạo mới và lưu vào localStorage
//     identification = "Dashboard_FE";
//     localStorage.setItem('identification', identification);
// }

const identification = "Dashboard_FE";
const Socket_link = `ws://localhost:8080?identification=${identification}`

const socket_Client = new WebSocket(Socket_link);

socket_Client.addEventListener('message', async (e) => {
    if (e.data === 'Pong') {
        setTimeout(() => {
            socket_Client.send(JSON.stringify('Ping'));
        }, 5000); // Gửi 'Ping' sau mỗi 5 giây
    } else {
        try {
            const data = JSON.parse(e.data);
            console.log(data);
            if (data instanceof Object) {
                console.log("Tin nhắn là một đối tượng:", data);
                //window.location.reload();
                // Thêm mã xử lý cho đối tượng tại đây
            } else {
                console.log("Tin nhắn không phải là một đối tượng.");
            }
            //window.location.reload();
            // window.location.href = window.location.href;
            // history.go(0);
            // await addPersonToTable(data, "data");

            //  await addListPersonToTable(data, "data");
        } catch (error) {
            console.log(e.data);
        }
    }

})
socket_Client.addEventListener('open', function (event) {
    socket_Client.send(JSON.stringify('Ping'));
});
// export const addPersonToTable = async (data, tableId) => {
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
//             if (td.textContent === 'NULL') {
//                 td.style.color = 'Red';
//                 td.style.textDecoration = 'underline'
//                 td.style.cursor = 'pointer';
//                 td.onclick = () => {
//                     // Handle NULL values as per your requirements
//                 }
//             }
//             tr.appendChild(td);
//         }
//     });

//     const edit = document.createElement("td");
//     edit.style.textDecoration = "underline";
//     edit.style.color = "Blue"
//     edit.textContent = "Edit";
//     tr.appendChild(edit);

//     const remove = document.createElement("button");
//     remove.textContent = "Remove";
//     remove.style.paddingTop = "5px"
//     tr.appendChild(remove);

//     tbody.appendChild(tr);
// }

// Lắng nghe tin nhắn đến từ server
// socket.addEventListener('message', function (event) {
//     console.log('Message from server: ', event.data);

//     // Nếu tin nhắn từ server là 'Pong', gửi lại 'Ping'

// });

// // const addListPersonToTable = async (list, tableId) => {
//     const tbody = document.getElementById(tableId);
//     tbody.innerHTML = "";
//     try {
//         list.forEach(element => {
//             const { _id, ...data } = element
//             const tr = document.createElement("tr");
//             Object.values(data).forEach((value) => {
//                 const td = document.createElement("td");
//                 td.textContent = value !== null ? value : 'NULL';
//                 tr.appendChild(td);
//             });
//             tbody.appendChild(tr);
//         });

//     } catch (error) {
//         // fs.writeFileSync(logFilePath, error)
//     }
// }



// import { addListPersonToTable, getListPerson } from "./DashBoard.js";
// import io from '../../SIP_CS/node_modules/socket.io-client';
// const identification = "Dashboard_FE";
// const Socket_link = `http://localhost:8080?identification=${identification}`;

// const socket = io(Socket_link);

// socket.on('connect', () => {
//     console.log('Connected to the server');
// });

// socket.on('message', async (e) => {
//     try {
//         const data = JSON.parse(e.data);
//         console.log(data);

//         // window.location.reload();
//         // window.location.href = window.location.href;
//         // history.go(0);
//         await addListPersonToTable(getListPerson, "data");

//         //  await addListPersonToTable(data, "data");
//     } catch (error) {
//         console.log(e.data);
//     }
// });

// socket.on('disconnect', () => {
//     console.log('Disconnected from the server');
// });

