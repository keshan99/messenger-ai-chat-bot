require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const messageHistory = require('./messageHistory');
const handleMessage = require('./handleMessage');
const handlePostback = require('./handlePostback');
const sendTextMessage = require('./sendTextMessage');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === process.env.VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

app.post('/webhook', (req, res) => {
    const body = req.body;

    if (body.object === 'page') {
        body.entry.forEach((entry) => {
            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent);

            if (webhookEvent.message) {
                handleMessage(webhookEvent.sender.id, webhookEvent.message);
            } else if (webhookEvent.postback) {
                handlePostback(webhookEvent.sender.id, webhookEvent.postback);
            }
        });

        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});



app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
