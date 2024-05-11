// import { MongoClient } from 'mongodb';
// const url = 'mongodb://localhost:27017';

// export const mongoDataSource = () => {
//     let dataSource;
//     MongoClient.connect(url, function (err, client) {
//         if (err) throw err;
//         const db = client.db('apicompany');
//         db.collection('employees').find({}).toArray(function (err, result) {
//             if (err) throw err;
//             //console.log(result);
//             dataSource = result
//             client.close();
//         });
//     });
//     return dataSource
// }

// console.log(mongoDataSource())
import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017';

export const mongoDataSource = async () => {
    const client = await MongoClient.connect(url);
    const db = client.db('apicompany');
    const result = await db.collection('employees').find({}).toArray();
    client.close();
    return result;
}
export const DataSourceInMongoose = async (req, res) => {
    const monData = await mongoDataSource();
    return res.json({ success: true, Source: 'MongoDB', data: monData })
}

//mongoDataSource().then(data => console.log(data)).catch(err => console.error(err));
