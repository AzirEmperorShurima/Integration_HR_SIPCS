import { cacheData } from "../cache/cache.config.js";
import { SQLCacheData } from "../cache/cacheSQL.config.js";
import sql from 'msnodesqlv8';
import { promisify } from 'util';
import { MongoClient } from 'mongodb';
import { connectionString } from './DataSQL.js';
import { StatusCodes } from "http-status-codes";
const url = 'mongodb://localhost:27017';

const deleteFromMongoDB = async (id) => {
    try {
        const MG_CL = await MongoClient.connect(url)
        const DB = MG_CL.db('apicompany')
        const collection = DB.collection('employees');
        const result = await collection.deleteOne({ employeeId: id });
        MG_CL.close();
        await cacheData();
        return result.deletedCount > 0;
    } catch (error) {
        throw new Error(error);
    }


}

const deleteFromSQLServer = async (id) => {
    let SQLCL = null
    try {
        const SQLOPEN = promisify(sql.open)
        SQLCL = await SQLOPEN(connectionString)
    } catch (error) {
        console.log('Có lỗi Xuất hiện với việc mở Kết nối đến SQL Server')
        throw new Error(StatusCodes.INTERNAL_SERVER_ERROR)
    }

    const query = `DELETE FROM Personal WHERE Employee_Id = ${id}`;
    let success = false;
    try {
        const SQLResult = await SQLCL.query(query);
        success = SQLResult.rowsAffected > 0;
    } catch (error) {
        console.log('Có lỗi Xuất hiện với việc mở Kết nối đến MongoDB')
        throw new Error(StatusCodes.INTERNAL_SERVER_ERROR)
    } finally {

        SQLCL.close();
        await SQLCacheData();
        return success;
    }

}


export const Delete_EMP = async (req, res) => {

    let id = req.body.employeeId;
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: 'Dữ liệu đầu vào không hợp lệ' });
    }
    let MG_DataDB, SQLDT = null
    try {
        MG_DataDB = await cacheData();
        SQLDT = await SQLCacheData();
    } catch (error) {
        return res.status(error.message).json({ success: false, detail_ERROR: "Không thể truy cập để Fetch Data vô Cache" })
    }
    let exist, SQLexist = false
    if (MG_DataDB, SQLDT) {
        exist = MG_DataDB.find(emp => emp.employeeId === String(id))
        SQLexist = SQLDT.find(emp => emp.Employee_ID === parseInt(id))
    }
    if (exist && SQLexist) {
        try {
            const mongoSuccess = await deleteFromMongoDB(String(id));
            const sqlSuccess = await deleteFromSQLServer(parseInt(id));
            return res.status(StatusCodes.OK).json({ success: true, DB: 'MongoDB and SQLServer', Message: `Person with id: ${id} is deleted both in SQLServer and MongoDB` });
        } catch (error) {
            return res.status(error.message).json({ success: false, error: 'Lỗi khi kết nối đến cơ sở dữ liệu' });
        }

    }
    else if (exist) {
        const mongoSuccess = await deleteFromMongoDB(id);
        return res.status(StatusCodes.OK).json({ success: true, DB: 'MongoDB', Message: `Person with id: ${id} is deleted in MongoDB` });
    }
    else if (SQLexist) {
        const sqlSuccess = await deleteFromSQLServer(id);
        return res.status(StatusCodes.OK).json({ success: true, DB: 'SQLServer', Message: `Person with id: ${id} is deleted in SQLServer` });
    }
    else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, Message: `Person with id: ${id} not contain Database` });
    }
}
