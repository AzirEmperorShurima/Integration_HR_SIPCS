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
//import { fetchEmployees1 } from '../controllers/employee.controller.js'
import { Delete_EMP } from './DeleteMonG_SQL.js'
import cookieParser from 'cookie-parser'
import { getCookies } from './cookies.js';
const urlencoded = new MongoClient('mongodb://localhost:27017/');
const app = express();
//const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();
// const identifications = 'Dashboard_BE'
// const socketclient = new WebSocket(`ws://localhost:8080?identification=${identifications}`)
// const guitinnhandenserverthanyeu = {
//     message: ""
// }
// socketclient.on('open', () => {
//     console.log('Connect to Server Successfully !!!!\n CodeLord Hacking ....');
//     guitinnhandenserverthanyeu.message = 'Hi I Am SIPCS Bro';
//     socketclient.send(JSON.stringify(guitinnhandenserverthanyeu));
// });

// //  console.log('Connect to Server Successfully !!!!\n CodeLord Hacking ....');\
// socketclient.on('message', (e) => {
//     try {

//         if (e instanceof Buffer) {
//             const str = e.toString('utf8'); // Chuyển đổi Buffer thành chuỗi UTF-8
//             console.log(str);
//         } else {
//             const data = JSON.parse(e);
//             console.log(data);
//         }
//     } catch (error) {
//         console.log(e);
//     }

// });
// socketclient.on('error', function (error) {
//     console.error('Có lỗi xảy ra:', error);
// });
router.post('/cookies', getCookies)
router.post('/create', add_Data_to_mongodb_SQLserver)
router.get('/codelord', fullData);
router.post('/codelord', Delete_EMP);
router.post('/change', change_Data_in_mongodb_SQLserver);
router.get('/mongodata', DataSourceInMongoose)
router.get('/sqldata', exportDataInSQL);
// setInterval(() => {
//     const dataToSend = {
//         TargetID: 'code2',
//         identification: 'Dashboard_FE',
//         message: 'RELOAD'
//         //JSON.stringify(employees)

//     };
//     socketclient.send(JSON.stringify(dataToSend));
// }, 5000);
// console.log('EMP : ' + await fetchEmployees());
// (async () => {
//     try {
//         await urlencoded.connect();
//         const db = urlencoded.db('apicompany');
//         const collection = db.collection('employees');

//         const changeStream = collection.watch();

//         changeStream.on('change', async (change) => {
//             console.log(`Change: ${change.operationType} on _id ${change.documentKey._id}`);
//             console.log(change.fullDocument);
//             const dataToSend = {
//                 TargetID: 'NULL',
//                 identification: 'Dashboard_FE',
//                 message: JSON.stringify(change.fullDocument)


//             };
//             console.log("Data To SEND :" + dataToSend);
//             socketclient.send(JSON.stringify(dataToSend));
//         });

//         console.log('Watching for changes...');
//     } catch (error) {
//         console.error(error);
//     }
// })();
app.use(cookieParser());
app.use(
    cors({

    })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(router);
// const asciiArt = `
//   _________                                 .___         __________                    .__                 .___         __________              __     ___________  _______  _______  _______   
//  /   _____/ ______________  __ ___________  |   | ______ \______   \__ __  ____   ____ |__| ____    ____   |   | ____   \______   \____________/  |_  /_   \   _  \ \   _  \ \   _  \ \   _  \  
//  \_____  \_/ __ \_  __ \  \/ // __ \_  __ \ |   |/  ___/  |       _/  |  \/    \ /    \|  |/    \  / ___\  |   |/    \   |     ___/  _ \_  __ \   __\  |   /  /_\  \/  /_\  \/  /_\  \/  /_\  \ 
//  /        \  ___/|  | \/\   /\  ___/|  | \/ |   |\___ \   |    |   \  |  /   |  \   |  \  |   |  \/ /_/  > |   |   |  \  |    |  (  <_> )  | \/|  |    |   \  \_/   \  \_/   \  \_/   \  \_/   \
// /_______  /\___  >__|    \_/  \___  >__|    |___/____  >  |____|_  /____/|___|  /___|  /__|___|  /\___  /  |___|___|  /  |____|   \____/|__|   |__|    |___|\_____  /\_____  /\_____  /\_____  /
//         \/     \/                 \/                 \/          \/           \/     \/        \//_____/            \/                                            \/       \/       \/       \/
// `;


const port = 10000;
app.listen(port, () => {
    // console.log(`listening on port ${port}`);
    console.log(`
    ███████╗██████╗ ██╗   ██╗██╗██████╗ ███████╗
    ██╔════╝██╔══██╗██║   ██║██║██╔══██╗██╔════╝
    ███████╗██████╔╝██║   ██║██║██████╔╝█████╗  
    ╚════██║██╔═══╝ ██║   ██║██║██╔═══╝ ██╔══╝  
    ███████║██║     ╚██████╔╝██║██║     ███████╗
    ╚══════╝╚═╝      ╚═════╝ ╚═╝╚═╝     ╚══════╝
    ██████╗ ██████╗  ██████╗ ███████╗██████╗ 
    ██╔══██╗██╔══██╗██╔═══██╗██╔════╝██╔══██╗
    ██████╔╝██████╔╝██║   ██║█████╗  ██████╔╝
    ██╔═══╝ ██╔══██╗██║   ██║██╔══╝  ██╔══██╗
    ██║     ██║  ██║╚██████╔╝███████╗██║  ██║
    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
    ██████╗  ██████╗ ██╗    ██╗███╗   ██╗██╗      ██████╗ ██╗████████╗
    ██╔══██╗██╔═══██╗██║    ██║████╗  ██║██║     ██╔═══██╗██║╚══██╔══╝
    ██████╔╝██║   ██║██║ █╗ ██║██╔██╗ ██║██║     ██║   ██║██║   ██║   
    ██╔═══╝ ██║   ██║██║███╗██║██║╚██╗██║██║     ██║   ██║██║   ██║   
    ██║     ╚██████╔╝╚███╔███╔╝██║ ╚████║███████╗╚██████╔╝██║   ██║   
    ╚═╝      ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝   ╚═╝   
    `);


    //     console.log(`
    //    ______          __          __                   __
    //   / ____/___  ____/ /__  _____/ /   ____  _________/ /
    //  / /   / __ \\/ __  / _  \/ ___/ /   / __ \\/ ___/ __  / 
    // / /___/ /_/ / /_/ /  __/ /  / /___/ /_/ / /  / /_/ /  
    // \\____/\\____/\\__,_/\\___/_/  /_____/\\____/_/   \\__,_/   

    // `)
    //     console.log(`
    //   ____          _                _ _       
    //  / ___|___   __| | ___  _ __ ___| | |_   _ 
    // | |   / _ \\ / _\` |/ _ \\| '__/ _ \\ | | | | |
    // | |__| (_) | (_| | (_) | | |  __/ | | |_| |
    //  \\____\\___/ \\__,_|\\___/|_|  \\___|_|_|\\__, |
    //                                      |___/ 
    // `);
    ascii_art('CodeLord', 'Doom')
        .then(art => console.log(art))
        .catch(err => console.error(err));
    ascii_art(`Server On Port ${port}`, 'Doom')
        .then(art => console.log(art))
        .catch(err => console.error(err));


});
