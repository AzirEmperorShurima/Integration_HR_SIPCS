import url from 'url';
import { faker } from '@faker-js/faker';
import http from 'http';
import { Worker } from 'worker_threads';
import { WebSocketServer } from "ws";
import WebSocket from 'ws';
import CryptoJS from 'crypto-js';

let availableIDs = [];
const server = http.createServer();
server.listen(8080, () => {
    console.log('HTTP and WebSocket server is listening on port 8080');
});
const wss = new WebSocketServer({ server });
const clientID = {};
const removeClients = {}
let IP
let id = null;
let secretKey;
const key = 'CoderLord'
let num = 0;

const encrypt = async (message, key) => {
    const cipherText = CryptoJS.AES.encrypt(message, key).toString();
    console.log(cipherText)
    return cipherText;
}

const decrypt = async (cipherText, key) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

wss.on('connection', async (ws, req) => {
    try {
        const parsedUrl = url.parse(req.url, true);
        const __identification = parsedUrl.query.identification;
        const existingClient = Object.values(clientID).find(client => client.identification === __identification);
        let removeclient = Object.values(removeClients).find(client => client.identification === __identification);
        console.log(`Identification: ${__identification}`);
        if (existingClient) {
            console.log(`Client with ID ${existingClient.id}  And identification ${__identification} already exists.`);
            existingClient.ws = ws;
            console.log(`WebSocket of client With ID ${existingClient.id} And identification ${__identification} has been updated.`);
        } else if (removeclient) {
            console.log(`This Connection Was Removed and RollBack now`)
            secretKey = faker.internet.password();
            clientID[removeclient.id] = { ws, identification: __identification, IP: req.socket.remoteAddress };
            delete removeClients[removeclient.id];
            console.log(`ID: ${id}, Address: ${req.socket.remoteAddress} , identification:${__identification}`);
            console.log("Rollback Successfully")
        }
        else {
            num++;
            id = 'code' + num
            secretKey = faker.internet.password();
            clientID[id] = { ws, identification: __identification, IP: req.socket.remoteAddress };
            console.log(`ID: ${id}, Address: ${req.socket.remoteAddress} , identification:${__identification}`);
        }
    } catch (error) {
        id = req.headers['sec-websocket-key'];
        secretKey = "CODERLORDHACKER_" + req.headers['sec-websocket-key'];
        clientID[id] = ws;
        console.log(`ID: ${id}, Address: ${req.socket.remoteAddress}`);
        console.log("Cant Create ID With Faker Directory", error);
    }
    console.log(secretKey)
    let ad = await encrypt(secretKey, key)
        .then()
    console.log(`SECRET KSY : ${ad}`)
    ws.send(` This is your key ${ad}`)
    ws.send(`Xin chào client ${id}!`);
    console.log('Current connections:', Object.keys(clientID), Object.values(clientID).map(client => client ? client.identification : 'undefined'));
    wss.clients.forEach(client => {
        if (client !== null && client.readyState === WebSocket.OPEN) {
            const clientList = Object.keys(clientID);
            client.send("WEB SOCKET IS OPEN !!! \n This is List of Client instances" + JSON.stringify(clientList));
        }
    });
    ws.on('message', message => {
        let data;
        try {
            data = JSON.parse(message);
            console.log("Data:" + ' ' + data)
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
        if (data.identification) {
            const clientsWithIdentification = Object.values(clientID).filter(client => client.identification === data.identification);
            if (clientsWithIdentification.length > 0) {
                clientsWithIdentification.forEach(client => {
                    if (client.id !== id && client.ws.readyState === WebSocket.OPEN) {
                        client.ws.send(data.message);
                        console.log(data.message);
                        console.log('Send Message Successfully');
                    }
                });
                ws.send('Tin nhắn đã được gửi');
            } else {

                if (clientID[data.TargetID] && data.message !== null && clientID[data.TargetID].ws.readyState === WebSocket.OPEN) {
                    clientID[data.TargetID].ws.send(data.message);
                    ws.send('Tin nhắn đã được gửi');
                    clientID[data.TargetID].ws.send(`Đã nhận tin nhắn từ ${id} với nội Dung : ${data.message}`);
                } else if (!clientID[data.TargetID]) {
                    ws.send('Không thể gửi tin nhắn');
                    console.log(`Error to Send Message From ${id} to clientID[${data.TargetID}] \n With Message ${message}`);
                }
            }
        } else if (clientID[data.TargetID] && data.message !== null && clientID[data.TargetID].ws.readyState === WebSocket.OPEN) {
            clientID[data.TargetID].ws.send(data.message);
            ws.send('Tin nhắn đã được gửi');
            clientID[data.TargetID].ws.send(`Đã nhận tin nhắn từ ${id} với nội Dung : ${data.message}`);
        }
        else if (!clientID[data.TargetID] && data.TargetID) {
            ws.send('Không thể gửi tin nhắn');
            console.log(`Error to Send Message From ${id} to clientID[${data.TargetID}] \n With Message ${message}`);
        }
        else if (data.message && !data.TargetID) {
            console.log(`Received message from client ${id}: ${data.message}`);
        }
        else {
            console.log('có lỗi gì đấy rồi bạn ơi');
            ws.send(JSON.stringify('có lỗi gì đấy rồi bạn ơi' + data));
        }
    });

    ws.on('error', (error) => {
        console.log(`WebSocket error: ${error}`);
    });
    ws.on('ping', () => {
        ws.pong();
        console.log(`Ping From ${id} to Another Bridge Keep This Connection`);
    });
    ws.on('pong', () => {
        console.log(`Pong From ${id} to Another Bridge Keep This Connection`);
    });
    setInterval(() => {
        ws.ping();
    }, 600000);

    ws.on('close', () => {
        console.log(`Client with ID : ${id} And WS : ${IP} was disconnected`);
        if (clientID[id]) {
            removeClients[id] = { ...clientID[id], id: id };
            delete clientID[id];
        }
        console.log('Current Removeconnections:', Object.keys(removeClients))
        setTimeout(() => {
            availableIDs.push(id);
            if (removeClients[id]) {
                delete removeClients[id];
            }
        }, 5 * 60 * 1000);
    })
});

const start = async () => {
    const worker = new Worker('./worker.js');
    worker.postMessage('Hello, worker!');
    worker.on('message', (data) => {
        console.log(`Received data from worker thread: ${data}`);
    });
    worker.on('error', (error) => {
        console.error(`Worker error: ${error}`);
    });
    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
        }
    });
}
start().catch(console.error);
console.log(`Server is listening on port ${server.address().port}`);
