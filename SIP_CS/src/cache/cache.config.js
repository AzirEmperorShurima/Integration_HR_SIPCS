import { MongoClient } from 'mongodb';
import NodeCache from 'node-cache';

// Khởi tạo bộ nhớ cache
const myCache = new NodeCache();

const url = 'mongodb://localhost:27017';
const dbName = 'apicompany';

const fetchDataFromDB = async () => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('employees');
    const data = await collection.find({}).toArray();
    client.close();
    return data;
};

export const cacheData = async () => {
    const key = 'Codelordinate';
    const ttl = 60 * 60; // Thời gian sống của cache là 1 giờ

    // Kiểm tra xem dữ liệu đã được lưu trong cache chưa
    const value = myCache.get(key);
    if (value == undefined) {
        // Nếu chưa có, lấy dữ liệu từ MongoDB
        const data = await fetchDataFromDB();

        // Lưu dữ liệu vào cache
        myCache.set(key, data, ttl);
        console.log('Data fetched from MongoDB and cached');

        return data;
    } else {
        // Nếu dữ liệu đã có trong cache, trả về dữ liệu từ cache
        console.log('Data fetched from cache');
        return value;
    }
};

// cacheData().then(data => console.log(data));
