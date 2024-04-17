import { getListPerson, addListPersonToTable } from "./getList_Person.js";
const source = new EventSource('https://localhost:4000/api/employeeUpdates');

export const SQLserverData = async () => {
    source.onmessage = function (event) {
        const change = JSON.parse(event.data);
        addListPersonToTable(change, 'table')
    };
}

SQLserverData();