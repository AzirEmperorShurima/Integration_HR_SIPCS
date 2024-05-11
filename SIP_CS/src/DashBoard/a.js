import sql from 'msnodesqlv8';
import { promisify } from 'util';
import { connectionString } from './DataSQL.js';

const url = 'mongodb://localhost:27017';

const open = promisify(sql.open);
const SQLClient = await open(connectionString);
export const a = () => {
    const sqlQuery1 = `SELECT * FROM Personal WHERE Employee_ID = '1234567'`;
    SQLClient.query(sqlQuery1, (err, rows) => {
        if (err) {
            console.error("Lỗi khi thực hiện truy vấn:", err);
            return;
        }

        // rows sẽ chứa kết quả truy vấn SELECT
        console.log("Số dòng lấy được:", rows.length);
    });
}