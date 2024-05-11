import { mongoDataSource } from './MongoData.js';
import { SQLserverData } from './DataSQL.js';
import { StatusCodes } from 'http-status-codes';
import { Timestamp } from 'mongodb';
export const newEMP = {
    employeeId: null,
    firstName: null,
    lastName: null,
    Middle_Initial: null,
    Address1: null,
    Address2: null,
    City: null,
    vacationDays: null,
    paidToDate: null,
    paidLastYear: null,
    payRate: null,
    State: null,
    Zip: null,
    Email: null,
    Phone_Number: null,
    Social_Security_Number: null,
    payRateId: null,
    Drivers_License: null,
    Marital_Status: null,
    Gender: null,
    Shareholder_Status: null,
    Benefit_Plans: null,
    Ethnicity: null,
    createdAt: null,
    updatedAt: null
}
export const emptySqlObject = () => {
    return {
        Employee_ID: null,
        First_Name: null,
        Last_Name: null,
        Middle_Initial: null,
        Address1: null,
        Address2: null,
        City: null,
        State: null,
        Zip: null,
        Email: null,
        Phone_Number: null,
        Social_Security_Number: null,
        Drivers_License: null,
        Marital_Status: null,
        Gender: null,
        Shareholder_Status: null,
        Benefit_Plans: null,
        Ethnicity: null
    };
}
export const emptyMongoObject = () => {
    return {
        _id: null,
        employeeId: null,
        firstName: null,
        lastName: null,
        vacationDays: null,
        paidToDate: null,
        paidLastYear: null,
        payRate: null,
        payRateId: null,
        createdAt: null,
        updatedAt: null
    };
}
const idExists = (id, sqlData, mongoData) => {
    return sqlData.some(obj => obj.Employee_ID === id) || mongoData.some(obj => obj.employeeId === id);
}

const generateNewId = async (sqlData, mongoData) => {
    let newId;
    do {
        newId = Math.random().toString(36).substr(2, 9);
    } while (idExists(newId, sqlData, mongoData));
    return newId;
}
export const mergeData = async () => {
    let sqlData, mongoData

    try {
        sqlData = await SQLserverData();
        mongoData = await mongoDataSource();
    } catch (error) {
        console.log('error');
        throw new Error(StatusCodes.INTERNAL_SERVER_ERROR)
    }


    let mergedData = [];
    let mongoMap = new Map();
    for (let mongoObject of mongoData) {
        mongoMap.set(mongoObject.employeeId, mongoObject);
    }
    for (let sqlObject of sqlData) {
        let match = mongoMap.get(String(sqlObject.Employee_ID));
        if (match) {
            let newEMP_Copy = { ...newEMP };
            let newMatch = { ...match };
            if (newMatch.firstName == sqlObject.First_Name && newMatch.lastName == sqlObject.Last_Name) {
                newEMP_Copy.employeeId = newMatch.employeeId;
                newEMP_Copy.firstName = newMatch.firstName;
                newEMP_Copy.lastName = newMatch.lastName;
                newEMP_Copy.Middle_Initial = sqlObject.Middle_Initial;
                newEMP_Copy.Address1 = sqlObject.Address1;
                newEMP_Copy.Address2 = sqlObject.Address2;
                newEMP_Copy.City = sqlObject.City;
                newEMP_Copy.vacationDays = newMatch.vacationDays;
                newEMP_Copy.paidToDate = newMatch.paidToDate;
                newEMP_Copy.paidLastYear = newMatch.paidLastYear;
                newEMP_Copy.payRate = newMatch.payRate;
                newEMP_Copy.State = sqlObject.State;
                newEMP_Copy.Zip = sqlObject.Zip;
                newEMP_Copy.Email = sqlObject.Email;
                newEMP_Copy.Phone_Number = sqlObject.Phone_Number;
                newEMP_Copy.Social_Security_Number = sqlObject.Social_Security_Number;
                newEMP_Copy.payRateId = newMatch.payRateId;
                newEMP_Copy.Drivers_License = sqlObject.Drivers_License;
                newEMP_Copy.Marital_Status = sqlObject.Marital_Status;
                newEMP_Copy.Gender = sqlObject.Gender;
                newEMP_Copy.Shareholder_Status = sqlObject.Shareholder_Status;
                newEMP_Copy.Benefit_Plans = sqlObject.Benefit_Plans;
                newEMP_Copy.Ethnicity = sqlObject.Ethnicity;
                // Tạo một đối tượng Date từ số mili giây
                const createdAtDate = new Date(Date.now());
                const updatedAtDate = new Date(Date.now());
                // Lấy các thành phần của thời gian
                // const createdAtFormatted = `${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()} ${createdAtDate.getHours()}:${createdAtDate.getMinutes()}:${createdAtDate.getSeconds()}`;
                // const updatedAtFormatted = `${updatedAtDate.getDate()}/${updatedAtDate.getMonth() + 1}/${updatedAtDate.getFullYear()} ${updatedAtDate.getHours()}:${updatedAtDate.getMinutes()}:${updatedAtDate.getSeconds()}`;
                const createdAtFormatted = `${createdAtDate.getUTCDate()}/${createdAtDate.getUTCMonth() + 1}/${createdAtDate.getUTCFullYear()} ${createdAtDate.getUTCHours()}:${createdAtDate.getUTCMinutes()}:${createdAtDate.getUTCSeconds()}`;
                const updatedAtFormatted = `${updatedAtDate.getUTCDate()}/${updatedAtDate.getUTCMonth() + 1}/${updatedAtDate.getUTCFullYear()} ${updatedAtDate.getUTCHours()}:${updatedAtDate.getUTCMinutes()}:${updatedAtDate.getUTCSeconds()}`;

                newEMP_Copy.createdAt = createdAtFormatted
                newEMP_Copy.updatedAt = updatedAtFormatted;
                mergedData.push(newEMP_Copy);
                mongoMap.delete(String(sqlObject.Employee_ID));
            } else {
                let newEMP_Copy1 = { ...newEMP };
                newEMP_Copy1.employeeId = await generateNewId(sqlData, mongoData);
                newEMP_Copy1.firstName = newMatch.firstName;
                newEMP_Copy1.lastName = newMatch.lastName;
                newEMP_Copy1.vacationDays = newMatch.vacationDays;
                newEMP_Copy1.paidToDate = newMatch.paidToDate;
                newEMP_Copy1.paidLastYear = newMatch.paidLastYear;
                newEMP_Copy1.payRate = newMatch.payRate;
                newEMP_Copy1.payRateId = newMatch.payRateId;
                const createdAtDate = new Date(Date.now());
                const updatedAtDate = new Date(Date.now());
                const createdAtFormatted = `${createdAtDate.getUTCDate()}/${createdAtDate.getUTCMonth() + 1}/${createdAtDate.getUTCFullYear()} ${createdAtDate.getUTCHours()}:${createdAtDate.getUTCMinutes()}:${createdAtDate.getUTCSeconds()}`;
                const updatedAtFormatted = `${updatedAtDate.getUTCDate()}/${updatedAtDate.getUTCMonth() + 1}/${updatedAtDate.getUTCFullYear()} ${updatedAtDate.getUTCHours()}:${updatedAtDate.getUTCMinutes()}:${updatedAtDate.getUTCSeconds()}`;
                newEMP_Copy1.createdAt = createdAtFormatted
                newEMP_Copy1.updatedAt = updatedAtFormatted;
                mergedData.push(newEMP_Copy1);
                let EMP = { ...newEMP };
                EMP.employeeId = sqlObject.Employee_ID;
                EMP.firstName = sqlObject.First_Name;
                EMP.lastName = sqlObject.Last_Name;
                EMP.Middle_Initial = sqlObject.Middle_Initial;
                EMP.Address1 = sqlObject.Address1;
                EMP.Address2 = sqlObject.Address2;
                EMP.City = sqlObject.City;
                EMP.State = sqlObject.State;
                EMP.Zip = sqlObject.Zip;
                EMP.Email = sqlObject.Email;
                EMP.Phone_Number = sqlObject.Phone_Number;
                EMP.Social_Security_Number = sqlObject.Social_Security_Number;
                EMP.Drivers_License = sqlObject.Drivers_License;
                EMP.Marital_Status = sqlObject.Marital_Status;
                EMP.Gender = sqlObject.Gender;
                EMP.Shareholder_Status = sqlObject.Shareholder_Status;
                EMP.Benefit_Plans = sqlObject.Benefit_Plans;
                EMP.Ethnicity = sqlObject.Ethnicity;
                mergedData.push(EMP);
                mongoMap.delete(String(sqlObject.Employee_ID));
            }
        } else {
            let EMP = { ...newEMP };
            EMP.employeeId = sqlObject.Employee_ID;
            EMP.firstName = sqlObject.First_Name;
            EMP.lastName = sqlObject.Last_Name;
            EMP.Middle_Initial = sqlObject.Middle_Initial;
            EMP.Address1 = sqlObject.Address1;
            EMP.Address2 = sqlObject.Address2;
            EMP.City = sqlObject.City;
            EMP.State = sqlObject.State;
            EMP.Zip = sqlObject.Zip;
            EMP.Email = sqlObject.Email;
            EMP.Phone_Number = sqlObject.Phone_Number;
            EMP.Social_Security_Number = sqlObject.Social_Security_Number;
            EMP.Drivers_License = sqlObject.Drivers_License;
            EMP.Marital_Status = sqlObject.Marital_Status;
            EMP.Gender = sqlObject.Gender;
            EMP.Shareholder_Status = sqlObject.Shareholder_Status;
            EMP.Benefit_Plans = sqlObject.Benefit_Plans;
            EMP.Ethnicity = sqlObject.Ethnicity;
            mergedData.push(EMP);
        }
    }
    for (let mongoObject of mongoMap.values()) {
        let newEMP_Copy1 = { ...newEMP };
        newEMP_Copy1.employeeId = mongoObject.employeeId
        newEMP_Copy1.firstName = mongoObject.firstName;
        newEMP_Copy1.lastName = mongoObject.lastName;
        newEMP_Copy1.vacationDays = mongoObject.vacationDays;
        newEMP_Copy1.paidToDate = mongoObject.paidToDate;
        newEMP_Copy1.paidLastYear = mongoObject.paidLastYear;
        newEMP_Copy1.payRate = mongoObject.payRate;
        newEMP_Copy1.payRateId = mongoObject.payRateId;
        const createdAtDate = new Date(Date.now());
        const updatedAtDate = new Date(Date.now());
        const createdAtFormatted = `${createdAtDate.getUTCDate()}/${createdAtDate.getUTCMonth() + 1}/${createdAtDate.getUTCFullYear()} ${createdAtDate.getUTCHours()}:${createdAtDate.getUTCMinutes()}:${createdAtDate.getUTCSeconds()}`;
        const updatedAtFormatted = `${updatedAtDate.getUTCDate()}/${updatedAtDate.getUTCMonth() + 1}/${updatedAtDate.getUTCFullYear()} ${updatedAtDate.getUTCHours()}:${updatedAtDate.getUTCMinutes()}:${updatedAtDate.getUTCSeconds()}`;
        newEMP_Copy1.createdAt = createdAtFormatted
        newEMP_Copy1.updatedAt = updatedAtFormatted;
        mergedData.push(newEMP_Copy1);
    }
    mergedData.sort((a, b) => {
        let compare = a.firstName.localeCompare(b.firstName);
        if (compare === 0) {
            compare = a.lastName.localeCompare(b.lastName);
            if (compare === 0) {
                compare = a.employeeId.toString().localeCompare(b.employeeId);
            }
        }
        return compare;
    });
    return mergedData;
}
//await mergeData().then(data => { console.log(data) }).catch(err => console.error(err));


export const numPer = async () => {
    return await mergeData().length();
}
export const fullData = async (req, res) => {
    try {
        const Data = await mergeData();
        return res.status(StatusCodes.OK).json({ success: true, data: Data });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error_Message: 'Cant Integration Data - SQL Server Or MongoDB is Corrupted' })
    }
};