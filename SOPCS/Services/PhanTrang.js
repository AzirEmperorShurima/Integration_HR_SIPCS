// import { getList_Person } from './getList_Person.js'
const endPointLink = "http://localhost:4000/api/employee";

const getListPerson1 = async () => {
    try {
        const res = await axios.get(endPointLink);
        return res.data.data;
    } catch (error) {
        console.log(error);

    }
}

const listP = document.getElementById('Wua_Ta_Pu_Yang')

listP.addEventListener('change', async (e) => {
    const soluongnguoitrongbangnguoidungmonhienthi = e.target.value
    const data = await getListPerson1()
    const dataArray = Object.values(data);
    const selectedData = dataArray.slice(0, soluongnguoitrongbangnguoidungmonhienthi);
    console.log(selectedData)
    const tbody = document.getElementById('data');
    tbody.innerHTML = "";

    selectedData.forEach((element) => {
        const tr = document.createElement("tr");

        // for (let key in element) {
        //     if (element.hasOwnProperty(key) && key !== '_id') {
        //         const td = document.createElement("td");
        //         td.textContent = element[key] !== null ? element[key] : 'NULL';
        //         tr.appendChild(td);
        //     }
        // }
        Object.entries(element).forEach(([key, value]) => {
            if (key !== '_id') {
                const td = document.createElement("td");
                td.textContent = value !== null ? value : 'NULL';
                tr.appendChild(td);
            }
        });


        tbody.appendChild(tr);
    });

});

