import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const amqp = require('amqplib/callback_api');

const amqp_url = 'amqps://iqlgaewi:FK5e172A31CByV9kIm_pLGoSRmzuOBTk@beaver.rmq.cloudamqp.com/iqlgaewi'
amqp.connect(amqp_url, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        const queue = 'code';

        channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            console.log(" [x] Answer: 42");
        }, {
            noAck: true
        });
    });
});
