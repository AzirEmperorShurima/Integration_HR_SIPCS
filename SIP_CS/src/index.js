import app from "./app.js";
import "./database.js";
import { PORT } from "./config.js";
import "./libs/initialSetup.js";
import https from 'https';
import fs from 'fs';

app.listen(PORT);
console.log("Server on port", app.get("port"));

// const options = {
//     key: fs.readFileSync('src/SSL/server.key'),
//     cert: fs.readFileSync('src/SSL/server.cert')
// };

// https.createServer(options, app).listen(PORT, function () {
//     console.log('HTTPS server listening on port ' + PORT);
// });
