import { StatusCodes } from "http-status-codes";
import { SQLserverData } from "../DashBoard/DataSQL.js";
import NodeCache from 'node-cache';

const SQLCache = new NodeCache();

export const SQLCacheData = async (data) => {
    const key = 'SQLCacheData';
    const ttl = 60 * 60
    const value = SQLCache.get(key);
    if (value == undefined) {
        // Nếu chưa có, lấy dữ liệu từ MongoDB
        try {
            data = await SQLserverData();

        } catch (error) {
            throw new Error(StatusCodes.INTERNAL_SERVER_ERROR)
        }

        // Lưu dữ liệu vào cache
        SQLCache.set(key, data, ttl);
        console.log('Data fetched from SQLServer and cached');

        return data;
    } else {
        // Nếu dữ liệu đã có trong cache, trả về dữ liệu từ cache
        console.log('Data fetched from cache');
        return value;
    }
}
// SQLCacheData().then(data => console.log(data));