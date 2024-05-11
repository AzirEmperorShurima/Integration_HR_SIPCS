// import sql from 'msnodesqlv8';

// const connectionString = 'Driver={ODBC Driver 17 for SQL Server};Server={localhost};Database={HR};Trusted_Connection={yes};';

// export const SQLserverData = async () => {
//     sql.open(connectionString, function (err, conn) {
//         if (err) console.log(err);

//         // Query đến SQL Server
//         conn.query('SELECT * FROM Personal', function (err, data) {
//             if (err) console.log(err);

//             // In dữ liệu
//             console.log(data);
//         });
//     });
// }
import { StatusCodes } from 'http-status-codes';
import sql from 'msnodesqlv8';
import { promisify } from 'util';

export const connectionString = 'Driver={ODBC Driver 17 for SQL Server};Server={localhost};Database={HR};Trusted_Connection={yes};';
export const connectionString1 = "server=.;Database=HR;Trusted_Connection=Yes;Driver= {SQL Server Native Client 11.0}";
export const SQLserverData = async () => {
    try {
        const open = promisify(sql.open);
        const conn = await open(connectionString);

        const query = promisify(conn.query).bind(conn);
        const data = await query('SELECT * FROM Personal');

        return data;
    } catch (error) {
        console.log("Có Lỗi Xảy Ra Với Việc Mở Kết nối đến DB")
        console.error(error);
        return null
    }
}
// export const addData = async () => {
//     const transaction = new sql.Transaction(/* [pool] */);
//     transaction.begin(err => {


//         const request = new sql.Request(transaction);
//         request.query("INSERT INTO YourTable (Column1, Column2) VALUES ('value1', 'value2')", (err, result) => {
//             // ... error checks

//             transaction.commit(err => {
//                 // ... error checks

//                 console.log("Transaction committed.");
//             });
//         });
//     });
// }
export const exportDataInSQL = async (req, res) => {
    const data = await SQLserverData()
    if (data) {
        return res.status(StatusCodes.OK).json({ success: true, source: 'SQLServer', data: data })
    }
    else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: "Không thể truy vấn dữ liệu từ cơ sở dữ liệu" });
    }
}
// let a = await SQLserverData();
// console.log(a);