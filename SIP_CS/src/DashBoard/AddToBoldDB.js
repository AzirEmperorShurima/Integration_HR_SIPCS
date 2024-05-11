// import sql from 'msnodesqlv8';
// import { promisify } from 'util';
// import { MongoClient } from 'mongodb';
// import { connectionString } from './DataSQL';
// const url = 'mongodb://localhost:27017';

// export const add_Data_to_mongodb_SQLserver = async (req, res) => {
//     const open = promisify(sql.open);
//     const SQLClient = await open(connectionString);
//     const SQL_TRANSACTION = new sql.Transaction(SQLClient);
//     const mongoClient = await MongoClient.connect(url)
//     const MG_SESSION = mongoClient.startSession()
//     MG_SESSION.startTransaction();
//     SQL_TRANSACTION.begin();

//     // Truy cập mongoData và sqlData từ req.body
//     const mongoData = req.body.mongoData;
//     const sqlData = req.body.sqlData;

//     try {
//         const db = mongoClient.db('apicompany');
//         await db.collection('employees').insertOne(mongoData, { session: MG_SESSION });

//         await new sql.Request(SQL_TRANSACTION).query(`INSERT INTO Personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity) VALUES (@Employee_ID, @First_Name, @Last_Name, @Middle_Initial, @Address1, @Address2, @City, @State, @Zip, @Email, @Phone_Number, @Social_Security_Number, @Drivers_License, @Marital_Status, @Gender, @Shareholder_Status, @Benefit_Plans, @Ethnicity)`,
//             {
//                 Employee_ID: sqlData.Employee_ID,
//                 First_Name: sqlData.First_Name,
//                 Last_Name: sqlData.Last_Name,
//                 Middle_Initial: sqlData.Middle_Initial,
//                 Address1: sqlData.Address1,
//                 Address2: sqlData.Address2,
//                 City: sqlData.City,
//                 State: sqlData.State,
//                 Zip: sqlData.Zip,
//                 Email: sqlData.Email,
//                 Phone_Number: sqlData.Phone_Number,
//                 Social_Security_Number: sqlData.Social_Security_Number,
//                 Drivers_License: sqlData.Drivers_License,
//                 Marital_Status: sqlData.Marital_Status,
//                 Gender: sqlData.Gender,
//                 Shareholder_Status: sqlData.Shareholder_Status,
//                 Benefit_Plans: sqlData.Benefit_Plans,
//                 Ethnicity: sqlData.Ethnicity
//             });

//         await MG_SESSION.commitTransaction();
//         SQL_TRANSACTION.commit(err => {
//             if (err) throw err;
//         });

//         console.log('Data added successfully to both MongoDB and SQL Server');
//     } catch (error) {
//         console.error('Error adding data:', error);

//         MG_SESSION.abortTransaction();
//         SQL_TRANSACTION.rollback(err => {
//             if (err) throw err;
//         });

//         console.log('Transaction rolled back due to error');
//         return res.json({ success: false, error: err })
//     } finally {
//         MG_SESSION.endSession();
//         SQLClient.close();
//         mongoClient.close();
//     }

//     return res.json({ success: true, SRC: 'MONGODB', Data: mongoData, source: 'SQLSERVER', Data: sqlData })
// }
// import sql from 'msnodesqlv8';
// import { promisify } from 'util';
// import { MongoClient } from 'mongodb';
// import { connectionString } from './DataSQL.js';
// const url = 'mongodb://localhost:27017';
// export const add_Data_to_mongodb_SQLserver = async (req, res) => {
//     const open = promisify(sql.open);
//     const SQLClient = await open(connectionString);

//     const mongoClient = await MongoClient.connect(url);
//     const MG_SESSION = mongoClient.startSession();
//     MG_SESSION.startTransaction();

//     try {
//         const db = mongoClient.db('apicompany');
//         await db.collection('employees').insertOne(req.body.mongoData, { session: MG_SESSION });

//         const sqlQuery = `INSERT INTO Personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//         const sqlParams = [
//             parseInt(req.body.sqlData.Employee_ID),
//             req.body.sqlData.First_Name,
//             req.body.sqlData.Last_Name,
//             req.body.sqlData.Middle_Initial,
//             req.body.sqlData.Address1,
//             req.body.sqlData.Address2,
//             req.body.sqlData.City,
//             req.body.sqlData.State,
//             parseInt(req.body.sqlData.Zip),
//             req.body.sqlData.Email,
//             req.body.sqlData.Phone_Number,
//             req.body.sqlData.Social_Security_Number,
//             req.body.sqlData.Drivers_License,
//             req.body.sqlData.Marital_Status,
//             Boolean(parseInt(req.body.sqlData.Gender)),
//             req.body.sqlData.Shareholder_Status === 'on' ? 1 : 0,
//             req.body.sqlData.Benefit_Plans ? parseInt(req.body.sqlData.Benefit_Plans) : null,
//             req.body.sqlData.Ethnicity
//         ];

//         console.log(sqlParams)
//         await SQLClient.query(sqlQuery, sqlParams);
//         await MG_SESSION.commitTransaction();
//         console.log('Dữ liệu đã được thêm thành công vào cả MongoDB và SQL Server');
//         return res.json({ success: true, SRC: 'MONGODB', Data: req.body.mongoData, source: 'SQLSERVER', Data: req.body.sqlData });



//     } catch (error) {
//         console.error('Lỗi khi thêm dữ liệu:', error);
//         if (MG_SESSION.inTransaction()) {
//             MG_SESSION.abortTransaction();
//         }
//         return res.json({ success: false, error: error })

//     } finally {
//         // MG_SESSION.endSession();
//         SQLClient.close();
//         mongoClient.close();
//     }


// }
// import sql from 'msnodesqlv8';
// import { promisify } from 'util';
// import { MongoClient } from 'mongodb';
// import { StatusCodes } from 'http-status-codes';
// import { connectionString } from './DataSQL.js';
// const url = 'mongodb://localhost:27017';

// export const add_Data_to_mongodb_SQLserver = async (req, res) => {
//     if (!req.body.mongoData || !req.body.sqlData) {
//         return res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: 'Dữ liệu đầu vào không hợp lệ' });
//     }

//     let SQLClient, mongoClient;

//     try {
//         const open = promisify(sql.open);
//         SQLClient = await open(connectionString);
//         mongoClient = await MongoClient.connect(url);
//     } catch (error) {
//         console.log('Có lỗi Xảy ra ')
//         console.error(error);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error });
//     }

//     const MG_SESSION = mongoClient.startSession();
//     MG_SESSION.startTransaction();

//     try {
//         const db = mongoClient.db('apicompany');
//         const mongoResult = await db.collection('employees').insertOne(req.body.mongoData, { session: MG_SESSION });

//         const sqlQuery = `BEGIN TRANSACTION;
//                           INSERT INTO Personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//                           ;`;

//         const sqlParams = [
//             parseInt(req.body.sqlData.Employee_ID),
//             req.body.sqlData.First_Name,
//             req.body.sqlData.Last_Name,
//             req.body.sqlData.Middle_Initial,
//             req.body.sqlData.Address1,
//             req.body.sqlData.Address2,
//             req.body.sqlData.City,
//             req.body.sqlData.State,
//             parseInt(req.body.sqlData.Zip),
//             req.body.sqlData.Email,
//             req.body.sqlData.Phone_Number,
//             req.body.sqlData.Social_Security_Number,
//             req.body.sqlData.Drivers_License,
//             req.body.sqlData.Marital_Status,
//             Boolean(parseInt(req.body.sqlData.Gender)),
//             req.body.sqlData.Shareholder_Status === 'on' ? 1 : 0,
//             req.body.sqlData.Benefit_Plans ? parseInt(req.body.sqlData.Benefit_Plans) : null,
//             req.body.sqlData.Ethnicity
//         ];

//         console.log(sqlParams)
//         // const sqlResult = SQLClient.query(sqlQuery, sqlParams);
//         // sqlResult.on('done', function (rowCount, more, rows) {
//         //     if (rowCount === 0) {
//         //         throw new Error('Lỗi khi thêm dữ liệu vào  -------- SQL SERVER --------');
//         //     }
//         //     else {

//         //         console.log("KHặt Lỏ");
//         //     }
//         // });

//         SQLClient.query(sqlQuery, sqlParams, (err, results) => {
//             if (err) {
//                 console.error('Lỗi khi thêm dữ liệu:', err);
//                 throw new Error('Chim COOK')
//                 // Thực hiện rollback nếu có lỗi
//                 //SQLClient.query('ROLLBACK;');
//             } else {
//                 console.log(`Số dòng bị tác động: ${results.rowsAffected}`);
//                 // Nếu không có lỗi, thực hiện commit
//                 //SQLClient.query('COMMIT;');
//             }
//         });

//         if (mongoResult.insertedCount === 0) {
//             throw new Error('Lỗi khi thêm dữ liệu vào MongoDB');
//         }

//         SQLClient.query('COMMIT;')
//         await MG_SESSION.commitTransaction();
//         MG_SESSION.endSession();
//         console.log('Dữ liệu đã được thêm thành công vào cả MongoDB và SQL Server');
//         return res.status(StatusCodes.OK).json({
//             success: true,
//             data: {
//                 mongoDB: req.body.mongoData,
//                 SQLServer: req.body.sqlData
//             }
//         });


//     } catch (error) {
//         console.error('Lỗi khi thêm dữ liệu:', error);
//         try {
//             await SQLClient.query('ROLLBACK;');
//         } catch (rollbackError) {
//             console.error('Lỗi khi thực hiện rollback trên SQL Server:', rollbackError);
//         }
//         if (MG_SESSION.inTransaction()) {
//             await MG_SESSION.abortTransaction();
//         }

//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error })

//     } finally {
//         if (MG_SESSION.inTransaction()) {
//             MG_SESSION.endSession();
//         }
//         if (SQLClient) {
//             SQLClient.close();
//         }
//         if (mongoClient) {
//             mongoClient.close();
//         }
//     }
// }







import sql from 'msnodesqlv8';
import { promisify } from 'util';
import { MongoClient } from 'mongodb';
import { StatusCodes } from 'http-status-codes';
import { connectionString } from './DataSQL.js';

const url = 'mongodb://localhost:27017';

export const add_Data_to_mongodb_SQLserver = async (req, res) => {
    try {
        if (!req.body.mongoData || !req.body.sqlData) {
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: 'Dữ liệu đầu vào không hợp lệ' });
        }

        let SQLClient, mongoClient;

        try {
            const open = promisify(sql.open);
            SQLClient = await open(connectionString);
            mongoClient = await MongoClient.connect(url);
        } catch (error) {
            console.error('Có lỗi xảy ra khi mở kết nối:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error });
        }

        const MG_SESSION = mongoClient.startSession();
        MG_SESSION.startTransaction();
        SQLClient.beginTransaction();
        try {
            const db = mongoClient.db('apicompany');
            const mongoResult = await db.collection('employees').insertOne(req.body.mongoData, { session: MG_SESSION });

            const sqlQuery = `
            INSERT INTO Personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

            const sqlParams = [
                parseInt(req.body.sqlData.Employee_ID),
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
                req.body.sqlData.Ethnicity
            ];

            const sqlQueryPromise = promisify(SQLClient.query).bind(SQLClient);
            const sqlResult = await sqlQueryPromise(sqlQuery, sqlParams);
            // const rowsAffected = sqlResult.rowsAffected.reduce((acc, val) => acc + val, 0);
            // // const sqlResult = await promisify(SQLClient.query)(sqlQuery, sqlParams);
            // //const sqlResult = SQLClient.query(sqlQuery, sqlParams)
            // console.log(`Số dòng bị tác động: ${rowsAffected}`);
            let rowsAffecteds;
            try {

                const affectedRows = await rowsAffected(req.body.sqlData.Employee_ID, SQLClient);
                sqlResult.rowsAffecteds = affectedRows;
                rowsAffecteds = Array.isArray(sqlResult.rowsAffected) ? sqlResult.rowsAffected.reduce((acc, val) => acc + val, 0) : sqlResult.rowsAffected;
                if (rowsAffecteds === 0) {
                    throw new Error('Lỗi khi thêm dữ liệu vào SQL Server');
                }
            } catch (error) {
                throw new Error("Hất Cùn On lai " + error)
            }

            if (!sqlResult) {

                throw new Error('Lỗi khi thêm dữ liệu vào SQL Server');
            }

            else if (mongoResult.insertedCount === 0) {
                throw new Error('Lỗi khi thêm dữ liệu vào MongoDB');
            }
            else {
                await MG_SESSION.commitTransaction();
                MG_SESSION.endSession();
                SQLClient.commit()
                // await promisify(SQLClient.query)('COMMIT;');
                console.log('Dữ liệu đã được thêm thành công vào cả MongoDB và SQL Server');

                return res.status(StatusCodes.OK).json({
                    success: true,
                    data: {
                        mongoDB: req.body.mongoData,
                        SQLServer: req.body.sqlData
                    }
                });
            }
        } catch (error) {
            console.error('Lỗi khi thêm dữ liệu:', error);
            SQLClient.rollback();
            // await promisify(SQLClient.query)('ROLLBACK;');
            if (MG_SESSION.inTransaction()) {
                await MG_SESSION.abortTransaction();
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error });
        } finally {
            if (MG_SESSION.inTransaction()) {
                MG_SESSION.endSession();
            }
            if (SQLClient) {
                SQLClient.close();
            }
            if (mongoClient) {
                mongoClient.close();
            }
        }
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error });
    }
};
const rowsAffected = (id, SQLClient) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM Personal WHERE Employee_ID = '${parseInt(id)}'`;
        SQLClient.query(sqlQuery, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                console.log("Số dòng lấy được:", rows.length);
                resolve(rows);
            }
        });
    });
};

// import sql from 'msnodesqlv8';
// import { promisify } from 'util';
// import { MongoClient } from 'mongodb';
// import { StatusCodes } from 'http-status-codes';
// import { connectionString } from './DataSQL.js';

// const url = 'mongodb://localhost:27017';

// export const add_Data_to_mongodb_SQLserver = async (req, res) => {
//     if (!req.body.mongoData || !req.body.sqlData) {
//         return res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: 'Dữ liệu đầu vào không hợp lệ' });
//     }

//     let SQLClient, mongoClient;

//     try {
//         const open = promisify(sql.open);
//         SQLClient = await open(connectionString);
//         mongoClient = await MongoClient.connect(url);
//     } catch (error) {
//         console.error('Có lỗi xảy ra khi mở kết nối:', error);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error });
//     }

//     const MG_SESSION = mongoClient.startSession();
//     MG_SESSION.startTransaction();
//     // Hàm chuyển đổi prepare thành promise
//     function promisifyPrepare(stmt, sqlQuery) {
//         return new Promise((resolve, reject) => {
//             stmt.prepare(sqlQuery, (err) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(stmt);
//                 }
//             });
//         });
//     }
//     function executeWithPromise(stmt, params) {
//         return new Promise((resolve, reject) => {
//             stmt.execute(params, (err, result) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(result);
//                 }
//             });
//         });
//     }


//     // Hàm chuyển đổi execute thành promise
//     function promisifyExecute(stmt, sqlParams) {
//         return new Promise((resolve, reject) => {
//             stmt.execute(sqlParams, (err, result) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(result);
//                 }
//             });
//         });
//     }


//     try {
//         const db = mongoClient.db('apicompany');
//         const mongoResult = await db.collection('employees').insertOne(req.body.mongoData, { session: MG_SESSION });

//         const sqlQuery = `
//             INSERT INTO Personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//         `;

//         const preparePromise = promisify(SQLClient.prepare).bind(SQLClient);
//         // const stmt = await preparePromise(sqlQuery);
//         const stmt = await promisifyPrepare(SQLClient, sqlQuery);


//         const sqlParams = [
//             parseInt(req.body.sqlData.Employee_ID),
//             req.body.sqlData.First_Name,
//             req.body.sqlData.Last_Name,
//             req.body.sqlData.Middle_Initial,
//             req.body.sqlData.Address1,
//             req.body.sqlData.Address2,
//             req.body.sqlData.City,
//             req.body.sqlData.State,
//             parseInt(req.body.sqlData.Zip),
//             req.body.sqlData.Email,
//             req.body.sqlData.Phone_Number,
//             req.body.sqlData.Social_Security_Number,
//             req.body.sqlData.Drivers_License,
//             req.body.sqlData.Marital_Status,
//             Boolean(parseInt(req.body.sqlData.Gender)),
//             req.body.sqlData.Shareholder_Status === 'on' ? 1 : 0,
//             req.body.sqlData.Benefit_Plans ? parseInt(req.body.sqlData.Benefit_Plans) : null,
//             req.body.sqlData.Ethnicity
//         ];

//         const executePromise = promisify(stmt.execute).bind(stmt);
//         // const sqlResult = await promisifyExecute(stmt, sqlParams);
//         const sqlResult = await executeWithPromise(stmt, sqlParams);

//         //const sqlResult = await executePromise(sqlParams);

//         const rowsAffected = sqlResult.rowsAffected.reduce((acc, val) => acc + val, 0);

//         console.log(`Số dòng bị tác động: ${rowsAffected}`);

//         if (rowsAffected === 0) {
//             throw new Error('Lỗi khi thêm dữ liệu vào SQL Server');
//         }

//         if (mongoResult.insertedCount === 0) {
//             throw new Error('Lỗi khi thêm dữ liệu vào MongoDB');
//         }

//         await MG_SESSION.commitTransaction();
//         MG_SESSION.endSession();
//         console.log('Dữ liệu đã được thêm thành công vào cả MongoDB và SQL Server');

//         return res.status(StatusCodes.OK).json({
//             success: true,
//             data: {
//                 mongoDB: req.body.mongoData,
//                 SQLServer: req.body.sqlData
//             }
//         });
//     } catch (error) {
//         console.error('Lỗi khi thêm dữ liệu:', error);
//         try {
//             await SQLClient.query('ROLLBACK;');
//         } catch (rollbackError) {
//             console.error('Lỗi khi thực hiện rollback trên SQL Server:', rollbackError);
//         }
//         if (MG_SESSION.inTransaction()) {
//             await MG_SESSION.abortTransaction();
//         }
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error });
//     } finally {
//         if (MG_SESSION.inTransaction()) {
//             MG_SESSION.endSession();
//         }
//         if (SQLClient) {
//             SQLClient.close();
//         }
//         if (mongoClient) {
//             mongoClient.close();
//         }
//     }
// };

// import sql from 'msnodesqlv8';
// import { promisify } from 'util';
// import { MongoClient } from 'mongodb';
// import { StatusCodes } from 'http-status-codes';
// import { connectionString } from './DataSQL.js';

// const url = 'mongodb://localhost:27017';

// export const add_Data_to_mongodb_SQLserver = async (req, res) => {
//     if (!req.body.mongoData || !req.body.sqlData) {
//         return res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: 'Dữ liệu đầu vào không hợp lệ' });
//     }

//     let SQLClient, mongoClient;

//     try {
//         SQLClient = await promisify(sql.open)(connectionString);
//         mongoClient = await MongoClient.connect(url);
//     } catch (error) {
//         console.error('Có lỗi xảy ra khi mở kết nối:', error);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error });
//     }

//     const MG_SESSION = mongoClient.startSession();
//     MG_SESSION.startTransaction();

//     try {
//         const db = mongoClient.db('apicompany');
//         const mongoResult = await db.collection('employees').insertOne(req.body.mongoData, { session: MG_SESSION });

//         const sqlQuery = `
//             INSERT INTO Personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//         `;

//         const stmt = await promisify(SQLClient.prepare)(sqlQuery);
//         const sqlParams = [
//             parseInt(req.body.sqlData.Employee_ID),
//             req.body.sqlData.First_Name,
//             req.body.sqlData.Last_Name,
//             req.body.sqlData.Middle_Initial,
//             req.body.sqlData.Address1,
//             req.body.sqlData.Address2,
//             req.body.sqlData.City,
//             req.body.sqlData.State,
//             parseInt(req.body.sqlData.Zip),
//             req.body.sqlData.Email,
//             req.body.sqlData.Phone_Number,
//             req.body.sqlData.Social_Security_Number,
//             req.body.sqlData.Drivers_License,
//             req.body.sqlData.Marital_Status,
//             Boolean(parseInt(req.body.sqlData.Gender)),
//             req.body.sqlData.Shareholder_Status === 'on' ? 1 : 0,
//             req.body.sqlData.Benefit_Plans ? parseInt(req.body.sqlData.Benefit_Plans) : null,
//             req.body.sqlData.Ethnicity
//         ];

//         const result = await promisify(stmt.execute)(sqlParams);
//         const rowsAffected = result.rowsAffected.reduce((acc, val) => acc + val, 0);

//         console.log(`Số dòng bị tác động: ${rowsAffected}`);

//         if (rowsAffected === 0) {
//             throw new Error('Lỗi khi thêm dữ liệu vào SQL Server');
//         }

//         if (mongoResult.insertedCount === 0) {
//             throw new Error('Lỗi khi thêm dữ liệu vào MongoDB');
//         }

//         await MG_SESSION.commitTransaction();
//         MG_SESSION.endSession();
//         console.log('Dữ liệu đã được thêm thành công vào cả MongoDB và SQL Server');

//         return res.status(StatusCodes.OK).json({
//             success: true,
//             data: {
//                 mongoDB: req.body.mongoData,
//                 SQLServer: req.body.sqlData
//             }
//         });
//     } catch (error) {
//         console.error('Lỗi khi thêm dữ liệu:', error);
//         try {
//             await SQLClient.query('ROLLBACK;');
//         } catch (rollbackError) {
//             console.error('Lỗi khi thực hiện rollback trên SQL Server:', rollbackError);
//         }
//         if (MG_SESSION.inTransaction()) {
//             await MG_SESSION.abortTransaction();
//         }
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error });
//     } finally {
//         if (MG_SESSION.inTransaction()) {
//             MG_SESSION.endSession();
//         }
//         if (SQLClient) {
//             SQLClient.close();
//         }
//         if (mongoClient) {
//             mongoClient.close();
//         }
//     }
// };


// try {
//     const db = mongoClient.db('apicompany');
//     const mongoResult = await db.collection('employees').insertOne(req.body.mongoData, { session: MG_SESSION });

//     if (mongoResult.insertedCount === 0) {
//         throw new Error('Lỗi khi thêm dữ liệu vào MongoDB');
//     }

//     const sqlQuery = `
//         INSERT INTO Personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//     `;

//     const stmt = new sql.PreparedStatement(SQLClient);
//     stmt.input('Employee_ID', sql.Int);
//     // Thêm các định nghĩa đầu vào khác ở đây...

//     const preparePromise = promisify(stmt.prepare).bind(stmt);
//     await preparePromise(sqlQuery);

//     const sqlParams = [
//         parseInt(req.body.sqlData.Employee_ID),
//         req.body.sqlData.First_Name,
//         req.body.sqlData.Last_Name,
//         req.body.sqlData.Middle_Initial,
//         req.body.sqlData.Address1,
//         req.body.sqlData.Address2,
//         req.body.sqlData.City,
//         req.body.sqlData.State,
//         parseInt(req.body.sqlData.Zip),
//         req.body.sqlData.Email,
//         req.body.sqlData.Phone_Number,
//         req.body.sqlData.Social_Security_Number,
//         req.body.sqlData.Drivers_License,
//         req.body.sqlData.Marital_Status,
//         Boolean(parseInt(req.body.sqlData.Gender)),
//         req.body.sqlData.Shareholder_Status === 'on' ? 1 : 0,
//         req.body.sqlData.Benefit_Plans ? parseInt(req.body.sqlData.Benefit_Plans) : null,
//         req.body.sqlData.Ethnicity
//     ];

//     const executePromise = promisify(stmt.execute).bind(stmt);
//     const sqlResult = await executePromise(sqlParams);

//     const rowsAffected = sqlResult.rowsAffected.reduce((acc, val) => acc + val, 0);

//     console.log(`Số dòng bị tác động: ${rowsAffected}`);

//     if (rowsAffected === 0) {
//         throw new Error('Lỗi khi thêm dữ liệu vào SQL Server');
//     }

//     await MG_SESSION.commitTransaction();
//     MG_SESSION.endSession();
//     console.log('Dữ liệu đã được thêm thành công vào cả MongoDB và SQL Server');

//     return res.status(StatusCodes.OK).json({
//         success: true,
//         data: {
//             mongoDB: req.body.mongoData,
//             SQLServer: req.body.sqlData
//         }
//     });
// } catch (error) {
//     console.error('Lỗi khi thêm dữ liệu:', error);
//     try {
//         await SQLClient.query('ROLLBACK;');
//     } catch (rollbackError) {
//         console.error('Lỗi khi thực hiện rollback trên SQL Server:', rollbackError);
//     }
//     if (MG_SESSION.inTransaction()) {
//         await MG_SESSION.abortTransaction();
//     }
//     // Xóa dữ liệu đã thêm vào MongoDB
//     if (mongoResult && mongoResult.insertedId) {
//         await db.collection('employees').deleteOne({ _id: mongoResult.insertedId });
//     }
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error });
// } finally {
//     if (MG_SESSION.inTransaction()) {
//         MG_SESSION.endSession();
//     }
//     if (SQLClient) {
//         SQLClient.close();
//     }
//     if (mongoClient) {
//         mongoClient.close();
//     }
// }
