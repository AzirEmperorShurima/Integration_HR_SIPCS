import Employee from "../models/Employee.js";
import { promisify } from 'util';
import sql from 'msnodesqlv8';
import { connectionString } from '../DashBoard/DataSQL.js';
export const createEmployee = async (req, res) => {

    const { employeeId, firstName, lastName, vacationDays, paidToDate, paidLastYear, payRate, payRateId } = req.body;

    // creating a new Employee object
    const employee = new Employee({
        employeeId,
        firstName,
        lastName,
        vacationDays,
        paidToDate,
        paidLastYear,
        payRate,
        payRateId
    });
    const open = promisify(sql.open);
    const SQLClient = await open(connectionString);

    const session = await Employee.startSession();
    session.startTransaction();
    let getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    try {
        const savedUser = await employee.save({ session });
        const sqlData = {
            Employee_ID: savedUser.employeeId,
            First_Name: savedUser.firstName,
            Last_Name: savedUser.lastName,
            Shareholder_Status: getRandomInt(0, 1)
        }
        const sqlQuery = `BEGIN TRANSACTION;
                          INSERT INTO Personal (Employee_ID, First_Name, Last_Name,Shareholder_Status) VALUES (?, ?, ?,?);
                          COMMIT;`;
        const sqlParams = [
            sqlData.Employee_ID,
            sqlData.First_Name,
            sqlData.Last_Name,
            sqlData.Shareholder_Status
        ];
        console.log(sqlParams)
        await SQLClient.query(sqlQuery, sqlParams);

        await session.commitTransaction();
        return res.status(200).json({
            success: true, data: {
                _id: savedUser._id,
                employeeId: savedUser.employeeId,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                vacationDays: savedUser.vacationDays,
                paidToDate: savedUser.paidToDate,
                paidLastYear: savedUser.paidLastYear,
                payRate: savedUser.payRate,
                payRateId: savedUser.payRateId
            }

        });
    }
    catch (error) {
        console.error({ success: true, data: error });
        if (session.inTransaction()) {
            session.abortTransaction();
        }

        await SQLClient.query('ROLLBACK;');
    }
    finally {
        if (session.inTransaction()) {
            //session.abortTransaction();
            session.endSession();
        }
        SQLClient.close();
    }

    // saving the new employee
    // const savedUser = await employee.save(); default


};

export const getEmployee = async (req, res, next) => {
    const employee = await Employee.findById(req.params.employeeId);
    return res.json({ success: true, data: employee });
};

export const getEmployees = async (req, res, next) => {
    const employees = await Employee.find();
    return res.json({ success: true, data: employees });
}
export const fetchEmployees = async () => {
    return await Employee.find();
}
export const fetchEmployees1 = async () => {
    return await Employee.find();
}
