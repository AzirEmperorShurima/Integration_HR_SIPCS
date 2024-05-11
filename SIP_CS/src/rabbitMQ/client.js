import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const amqp = require('amqplib/callback_api');
const text = 'amqps://iqlgaewi:FK5e172A31CByV9kIm_pLGoSRmzuOBTk@beaver.rmq.cloudamqp.com/iqlgaewi'
amqp.connect(text, (err, conn) => {
    if (err) {
        throw err;
    }
    conn.createChannel((err, chanel) => {
        if (err) {
            throw err;
        }
        const queue = 'code'
        const message = 'lò gạch'

        chanel.assertQueue(queue, { durable: false })
        setInterval(() => {
            chanel.sendToQueue(queue, Buffer.from(message));
            console.log(" [x] Sent %s", message);
        }, 100 * 2 * 5)

    })

})