import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017';
import { promisify } from 'util';
import sql from 'msnodesqlv8';
import { connectionString } from './DataSQL.js';
export const change_Data_in_mongodb_SQLserver = async (req, res) => {
    if (!req.body.mongoData || !req.body.sqlData || !req.body.mongoData.employeeId || !req.body.sqlData.Employee_ID) {
        return res.json({ success: false, error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    const open = promisify(sql.open);
    const SQLClient = await open(connectionString);

    const mongoClient = await MongoClient.connect(url);
    const MG_SESSION = mongoClient.startSession();
    MG_SESSION.startTransaction();

    try {
        const db = mongoClient.db('apicompany');
        const query = { employeeId: req.body.mongoData.employeeId };
        const newvalues = { $set: req.body.mongoData };
        await db.collection('employees').updateOne(query, newvalues, { session: MG_SESSION });

        const sqlQuery = `BEGIN TRANSACTION;
                          UPDATE Personal SET First_Name = ?, Last_Name = ?, Middle_Initial = ?, Address1 = ?, Address2 = ?, City = ?, State = ?, Zip = ?, Email = ?, Phone_Number = ?, Social_Security_Number = ?, Drivers_License = ?, Marital_Status = ?, Gender = ?, Shareholder_Status = ?, Benefit_Plans = ?, Ethnicity = ? WHERE Employee_ID = ?;
                          COMMIT;`;

        const sqlParams = [
            req.body.sqlData.First_Name,
            req.body.sqlData.Last_Name,
            req.body.sqlData.Middle_Initial,
            req.body.sqlData.Address1,
            req.body.sqlData.Address2,
            req.body.sqlData.City,
            req.body.sqlData.State,
            parseInt(req.body.sqlData.Zip),
            req.body.sqlData.Email,
            req.body.sqlData.Phone_Number,
            req.body.sqlData.Social_Security_Number,
            req.body.sqlData.Drivers_License,
            req.body.sqlData.Marital_Status,
            Boolean(parseInt(req.body.sqlData.Gender)),
            req.body.sqlData.Shareholder_Status === 'on' ? 1 : 0,
            req.body.sqlData.Benefit_Plans ? parseInt(req.body.sqlData.Benefit_Plans) : null,
            req.body.sqlData.Ethnicity,
            parseInt(req.body.sqlData.Employee_ID)
        ];

        await SQLClient.query(sqlQuery, sqlParams);
        await MG_SESSION.commitTransaction();
        MG_SESSION.endSession();
        console.log('Dữ liệu đã được cập nhật thành công vào cả MongoDB và SQL Server');
        return res.json({ success: true, SRC: 'MONGODB', Data: req.body.mongoData, source: 'SQLSERVER', Data: req.body.sqlData });

    } catch (error) {
        console.error('Lỗi khi cập nhật dữ liệu:', error);
        if (MG_SESSION.inTransaction()) {
            MG_SESSION.abortTransaction();
        }
        await SQLClient.query('ROLLBACK;');
        return res.json({ success: false, error: error })

    } finally {
        if (MG_SESSION.inTransaction()) {
            MG_SESSION.endSession();
        }
        SQLClient.close();
        mongoClient.close();
    }
}
