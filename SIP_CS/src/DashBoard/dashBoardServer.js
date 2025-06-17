// import express from 'express';
// import { ascii_art } from './ASCII_ART.js';
// import cors from "cors";
// import { WebSocket } from "ws";
// import morgan from "morgan";
// import helmet from "helmet";
// import { fullData } from './Integration_Data.js';
// import { exportDataInSQL } from './DataSQL.js';
// import { MongoClient } from 'mongodb';
// import { DataSourceInMongoose } from './MongoData.js';
// import { add_Data_to_mongodb_SQLserver } from './AddToBoldDB.js';
// import { change_Data_in_mongodb_SQLserver } from './ChangeMG_SQL.js';
// //import { fetchEmployees1 } from '../controllers/employee.controller.js'
// import { Delete_EMP } from './DeleteMonG_SQL.js'
// import cookieParser from 'cookie-parser'
// import { Authentication, createNewUser, getCookies } from './cookies.js';
// const urlencoded = new MongoClient('mongodb://localhost:27017/');
// const app = express();
// import httpProxy from 'http-proxy';
// //const { createProxyMiddleware } = require('http-proxy-middleware');
// const codeLordProxy = httpProxy.createProxyServer()
// const router = express.Router();
// // const identifications = 'Dashboard_BE'
// // const socketclient = new WebSocket(`ws://localhost:8080?identification=${identifications}`)
// // const guitinnhandenserverthanyeu = {
// //     message: ""
// // }
// // socketclient.on('open', () => {
// //     console.log('Connect to Server Successfully !!!!\n CodeLord Hacking ....');
// //     guitinnhandenserverthanyeu.message = 'Hi I Am SIPCS Bro';
// //     socketclient.send(JSON.stringify(guitinnhandenserverthanyeu));
// // });

// // //  console.log('Connect to Server Successfully !!!!\n CodeLord Hacking ....');\
// // socketclient.on('message', (e) => {
// //     try {

// //         if (e instanceof Buffer) {
// //             const str = e.toString('utf8'); // Chuyển đổi Buffer thành chuỗi UTF-8
// //             console.log(str);
// //         } else {
// //             const data = JSON.parse(e);
// //             console.log(data);
// //         }
// //     } catch (error) {
// //         console.log(e);
// //     }

// // });
// // socketclient.on('error', function (error) {
// //     console.error('Có lỗi xảy ra:', error);
// // });
// router.post('/testlogin', Authentication, (req, res) => { return res.status(200).json({ message: 'U' }); })
// router.post('/cookies', getCookies)
// router.post('/create', add_Data_to_mongodb_SQLserver)
// router.get('/codelord', fullData);
// router.post('/codelord', Delete_EMP);
// router.post('/change', change_Data_in_mongodb_SQLserver);
// router.get('/mongodata', DataSourceInMongoose)
// router.get('/sqldata', exportDataInSQL);

// // setInterval(() => {
// //     const dataToSend = {
// //         TargetID: 'code2',
// //         identification: 'Dashboard_FE',
// //         message: 'RELOAD'
// //         //JSON.stringify(employees)

// //     };
// //     socketclient.send(JSON.stringify(dataToSend));
// // }, 5000);
// // console.log('EMP : ' + await fetchEmployees());
// // (async () => {
// //     try {
// //         await urlencoded.connect();
// //         const db = urlencoded.db('apicompany');
// //         const collection = db.collection('employees');

// //         const changeStream = collection.watch();

// //         changeStream.on('change', async (change) => {
// //             console.log(`Change: ${change.operationType} on _id ${change.documentKey._id}`);
// //             console.log(change.fullDocument);
// //             const dataToSend = {
// //                 TargetID: 'NULL',
// //                 identification: 'Dashboard_FE',
// //                 message: JSON.stringify(change.fullDocument)


// //             };
// //             console.log("Data To SEND :" + dataToSend);
// //             socketclient.send(JSON.stringify(dataToSend));
// //         });

// //         console.log('Watching for changes...');
// //     } catch (error) {
// //         console.error(error);
// //     }
// // })();
// app.use('/private_Service/*', (req, res) => {

//     codeLordProxy.web(req, res, { target: `http://localhost:10000/testlogin` });
// })
// app.use('/private_Service', (req, res) => {
//     codeLordProxy.web(req, res, { target: 'http://localhost:10000/cookies' });
// })
// app.use(cookieParser());
// app.use(
//     cors({

//     })
// );
// app.use(helmet());
// app.use(morgan("dev"));
// app.use(express.json());
// app.use(router);
// // const asciiArt = `
// //   _________                                 .___         __________                    .__                 .___         __________              __     ___________  _______  _______  _______
// //  /   _____/ ______________  __ ___________  |   | ______ \______   \__ __  ____   ____ |__| ____    ____   |   | ____   \______   \____________/  |_  /_   \   _  \ \   _  \ \   _  \ \   _  \
// //  \_____  \_/ __ \_  __ \  \/ // __ \_  __ \ |   |/  ___/  |       _/  |  \/    \ /    \|  |/    \  / ___\  |   |/    \   |     ___/  _ \_  __ \   __\  |   /  /_\  \/  /_\  \/  /_\  \/  /_\  \
// //  /        \  ___/|  | \/\   /\  ___/|  | \/ |   |\___ \   |    |   \  |  /   |  \   |  \  |   |  \/ /_/  > |   |   |  \  |    |  (  <_> )  | \/|  |    |   \  \_/   \  \_/   \  \_/   \  \_/   \
// // /_______  /\___  >__|    \_/  \___  >__|    |___/____  >  |____|_  /____/|___|  /___|  /__|___|  /\___  /  |___|___|  /  |____|   \____/|__|   |__|    |___|\_____  /\_____  /\_____  /\_____  /
// //         \/     \/                 \/                 \/          \/           \/     \/        \//_____/            \/                                            \/       \/       \/       \/
// // `;


// const port = 10000;
// app.listen(port, () => {
//     // console.log(`listening on port ${port}`);
//     console.log(`
//     ███████╗██████╗ ██╗   ██╗██╗██████╗ ███████╗
//     ██╔════╝██╔══██╗██║   ██║██║██╔══██╗██╔════╝
//     ███████╗██████╔╝██║   ██║██║██████╔╝█████╗
//     ╚════██║██╔═══╝ ██║   ██║██║██╔═══╝ ██╔══╝
//     ███████║██║     ╚██████╔╝██║██║     ███████╗
//     ╚══════╝╚═╝      ╚═════╝ ╚═╝╚═╝     ╚══════╝
//     ██████╗ ██████╗  ██████╗ ███████╗██████╗
//     ██╔══██╗██╔══██╗██╔═══██╗██╔════╝██╔══██╗
//     ██████╔╝██████╔╝██║   ██║█████╗  ██████╔╝
//     ██╔═══╝ ██╔══██╗██║   ██║██╔══╝  ██╔══██╗
//     ██║     ██║  ██║╚██████╔╝███████╗██║  ██║
//     ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
//     ██████╗  ██████╗ ██╗    ██╗███╗   ██╗██╗      ██████╗ ██╗████████╗
//     ██╔══██╗██╔═══██╗██║    ██║████╗  ██║██║     ██╔═══██╗██║╚══██╔══╝
//     ██████╔╝██║   ██║██║ █╗ ██║██╔██╗ ██║██║     ██║   ██║██║   ██║
//     ██╔═══╝ ██║   ██║██║███╗██║██║╚██╗██║██║     ██║   ██║██║   ██║
//     ██║     ╚██████╔╝╚███╔███╔╝██║ ╚████║███████╗╚██████╔╝██║   ██║
//     ╚═╝      ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝   ╚═╝
//     `);


//     //     console.log(`
//     //    ______          __          __                   __
//     //   / ____/___  ____/ /__  _____/ /   ____  _________/ /
//     //  / /   / __ \\/ __  / _  \/ ___/ /   / __ \\/ ___/ __  /
//     // / /___/ /_/ / /_/ /  __/ /  / /___/ /_/ / /  / /_/ /
//     // \\____/\\____/\\__,_/\\___/_/  /_____/\\____/_/   \\__,_/

//     // `)
//     //     console.log(`
//     //   ____          _                _ _
//     //  / ___|___   __| | ___  _ __ ___| | |_   _
//     // | |   / _ \\ / _\` |/ _ \\| '__/ _ \\ | | | | |
//     // | |__| (_) | (_| | (_) | | |  __/ | | |_| |
//     //  \\____\\___/ \\__,_|\\___/|_|  \\___|_|_|\\__, |
//     //                                      |___/
//     // `);
//     ascii_art('CodeLord', 'Doom')
//         .then(art => console.log(art))
//         .catch(err => console.error(err));
//     ascii_art(`Server On Port ${port}`, 'Doom')
//         .then(art => console.log(art))
//         .catch(err => console.error(err));


// });

import express from 'express';
import { ascii_art } from './ASCII_ART.js';
import cors from "cors";
import { WebSocket } from "ws";
import morgan from "morgan";
import helmet from "helmet";
import { fullData } from './Integration_Data.js';
import { exportDataInSQL } from './DataSQL.js';
import { MongoClient } from 'mongodb';
import { DataSourceInMongoose } from './MongoData.js';
import { add_Data_to_mongodb_SQLserver } from './AddToBoldDB.js';
import { change_Data_in_mongodb_SQLserver } from './ChangeMG_SQL.js';
import { Delete_EMP } from './DeleteMonG_SQL.js';
import cookieParser from 'cookie-parser';
import { Authentication, createNewUser, getCookies } from './cookies.js';
import httpProxy from 'http-proxy';
import rateLimit from 'express-rate-limit';
import cluster from 'cluster';
import os from 'os';

const urlencoded = new MongoClient('mongodb://localhost:27017/');
const app = express();
const codeLordProxy = httpProxy.createProxyServer({
    proxyTimeout: 10000, // thời gian chờ proxy
    keepAlive: true,
    timeout: 10000 // thời gian chờ tổng thể
});

codeLordProxy.on('error', (err, req, res) => {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Something went wrong. And we are reporting a custom error message.');
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000 * 6, // 15 phút
    max: 10000 // giới hạn mỗi IP 100 yêu cầu mỗi 15 phút
});

const router = express.Router();
router.post('/testlogin', Authentication, (req, res) => {
    return res.status(200).json({ message: 'U' });
});
router.post('/cookies', getCookies);
router.post('/create', add_Data_to_mongodb_SQLserver);
router.get('/codelord', fullData);
router.post('/codelord', Delete_EMP);
router.post('/change', change_Data_in_mongodb_SQLserver);
router.get('/mongodata', DataSourceInMongoose);
router.get('/sqldata', exportDataInSQL);

app.use('/private_Service/*', (req, res) => {
    codeLordProxy.web(req, res, { target: `http://localhost:10000/testlogin` });
});
app.use('/private_Service', (req, res) => {
    codeLordProxy.web(req, res, { target: 'http://localhost:10000/cookies' });
});

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(limiter);
app.use(router);

if (cluster.isWorker) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    app.listen(10000, () => {
        console.log('Server is running on port 10000');
    });
}
