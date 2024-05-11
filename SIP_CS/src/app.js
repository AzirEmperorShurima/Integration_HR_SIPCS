import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import { MONGODB_URI } from "./config.js";
import pkg from 'express-sse';
const { sse } = pkg;
import { WebSocket } from "ws";
import expressSse from 'express-sse';
// Routes
import indexRoutes from "./routes/index.routes.js";
import productRoutes from "./routes/products.routes.js";
import usersRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import { getEmployees, fetchEmployees } from "./controllers/employee.controller.js";
const socketclient = new WebSocket('ws://localhost:8080?identification=BE_SIPCS')
const app = express();
const urlencoded = new MongoClient('mongodb://localhost:27017/');
const sseInstance = new expressSse(app);
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var amqpConn = null;
var amqp = require('amqplib/callback_api');
export const exchange = 'amq.default'
const amqp_url = 'amqps://iqlgaewi:FK5e172A31CByV9kIm_pLGoSRmzuOBTk@beaver.rmq.cloudamqp.com/iqlgaewi'
const ax = amqp.connect(amqp_url + "?heartbeat=60", (err, conn) => {
  if (err) {
    console.error("[AMQP]", err.message);
    return setTimeout(start, 1000);
  }

  conn.on("error", function (err) {
    if (err.message !== "Connection closing") {
      console.error("[AMQP] conn error", err.message);
    }
  });

  conn.on("close", function () {
    console.error("[AMQP] reconnecting");
    return setTimeout(start, 1000);
  });

  console.log("[AMQP] connected");
  amqpConn = conn;
  whenConnected();
});

function start() {
  console.log("Bắt đầu kết nối lại...");
  ax()
}
//const exchange = 'amq.default' , routingKey = code , content: json
export const publish = (exchange, routingKey, content) => {
  try {
    pubChannel.publish(exchange, routingKey, content, { persistent: true },
      function (err, ok) {
        if (err) {
          console.error("[AMQP] publish", err);
          offlinePubQueue.push([exchange, routingKey, content]);
          pubChannel.connection.close();
        }
      });
  } catch (e) {
    console.error("[AMQP] publish", e.message);
    offlinePubQueue.push([exchange, routingKey, content]);
  }
}

const startWorker = (amqpConn) => {
  amqpConn.createChannel(function (err, ch) {
    if (err) {
      console.error('Worker create Chanel ' + err);
      return;
    }
    console.log("[AMQP] channel opened");
    ch.prefetch(20);
    const queue = 'code'
    // ch.purgeQueue(queue, (err, ok) => {
    //   if (err) {
    //     console.log('Error purging queue:', err);
    //   } else {
    //     console.log('Successfully purged queue:', ok);
    //   }
    // })
    ch.assertQueue(queue, { durable: false }, (err) => {
      err ? console.log(`[AMQP]${err.message}`) : console.log("[AMQP] Worker are already and are working now")
    });

    // Nhận tin Nhắn từ Queue "code"
    ch.consume(queue, (msg) => {
      console.log(" [x] Received %s", msg.content.toString());
    }, { noAck: false });

    ch.on("error", (err) => {
      console.error(`[AMQP] channel ${queue} error`, err.message);
    });

    ch.on("close", () => {
      console.log(`[AMQP] channel ${queue} closed`);
    });
  });
}

const whenConnected = () => {
  console.log("Kết nối thành công đến RabbitMQ!");
  startWorker(amqpConn);
}


socketclient.on('connection', () => {
  console.log('Connect to Server Successfully !!!!\n CodeLord Hacking ....');
  socketclient.send('Hi I Am SIPCS Bro');
})
socketclient.on('error', function (error) {
  console.error('Có lỗi xảy ra:', error);
});
// Mở Readme.md xem trước khi chạy code

// app.get('/api/employeeUpdates', (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.flushHeaders();
// });
// (async () => {
//   try {
//     await urlencoded.connect();
//     const db = urlencoded.db('apicompany');
//     const collection = db.collection('employees');

//     const changeStream = collection.watch([
//       { $match: { operationType: { $in: ['insert', 'update', 'delete'] } } },
//     ]);

//     changeStream.on('change', (change) => {
//       console.log(change);
//       sseInstance.send({
//         type: change.operationType,
//         _id: change.documentKey._id,
//         data: change.document
//       });
//     });

//     console.log('Watching for changes...');
//   } catch (error) {
//     console.error(error);
//   }
// })();

//connectToDb();
// async function connectToDb() {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log("Database is connected to codelord ", mongoose.connection.name);
//     const Stream = mongoose.connection.collections('employees').watch();
//     Stream.on('change', (change) => {
//       console.log(change);

//       // Gửi sự kiện tới tất cả các client
//       clients.forEach(client => {
//         if (!client.finished) { // Kiểm tra xem kết nối còn hoạt động không
//           client.write(`data: ${JSON.stringify(change)}\n\n`);
//         } else {
//           clients = clients.filter(c => c !== client);
//         }
//       }
//       );
//     });
//   } catch (error) {
//     console.error(error.message);
//   }
// }


//---------------------------------
// let clients = [];

app.get('/api/employeeUpdates', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.flushHeaders();

  // clients.push(res);

  req.on('close', () => {
    clients = clients.filter(client => client !== res);
  });
});

(async () => {
  try {
    await urlencoded.connect();
    const db = urlencoded.db('apicompany');
    const collection = db.collection('employees');

    const changeStream = collection.watch();

    changeStream.on('change', (change) => {
      console.log(`Change: ${change.operationType} on _id ${change.documentKey._id}`);
      console.log(change.fullDocument);
      // const dataToSend = {
      //   TargetID: 'NULL',
      //   identification: 'FE_SIP',
      //   message:
      //     JSON.stringify(change.fullDocument)

      // };
      // socketclient.send(JSON.stringify(dataToSend));
      fetchEmployees().then((employees) => {
        //console.log(employees);
        const dataToSend = {
          TargetID: 'NULL',
          identification: 'FE_SIP',
          message:
            JSON.stringify(employees)

        };
        socketclient.send(JSON.stringify(dataToSend));
      }).catch((error) => {
        console.error('Error fetching employees:', error);
      });
    });

    console.log('Watching for changes...');
  } catch (error) {
    console.error(error);
  }
})();
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/static', express.static(__dirname + '/public'));



// Settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
app.use(
  cors({
    // origin: "http://localhost:3000",
    // origin: 'http:///172.25.196.83:5500',
    // credentials: true
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", indexRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use(function (req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

export default app;