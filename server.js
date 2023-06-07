// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const request = require('request');
// const app = express();


// // const PAGE_ACCESS_TOKEN = 'EAALOSE5xznABALcQm2HM1bAsZC9QDlx6ahtIyZBzZBzybn5lNAFunjyZCSLbFD8o6tupfJjErqwdwZC7mi0NC9mXJRrWNsLCyvUBXL0usnp2UZAvXsQLpbR7842ZCfdormfZB9sXZBi4CY2oNQKAOZC2TY4mnoYg9pmXOpOEDVAh1u1Qeyf80AumtN';
// // const VERIFY_TOKEN = 'abcd1234';

// // context = [ {'role':'system', 'content':""" You are OrderBot, an automated service to collect orders for a pizza restaurant.
// // You first greet the customer, then collects the order,
// // and then asks if it's a pickup or delivery.
// // You wait to collect the entire order, then summarize it and check for a final
// // time if the customer wants to add anything else.
// // If it's a delivery, you ask for an address.
// // Finally you collect the payment.
// // Make sure to clarify all options, extras and sizes to uniquely
// // identify the item from the menu.
// // You respond in a short, very conversational friendly style.
// // The menu includes
// // pepperoni pizza 12.95, 10.00, 7.00
// // cheese pizza 10.95, 9.25, 6.50
// // eggplant pizza 11.95, 9.75, 6.75
// // fries 4.50, 3.50
// // greek salad 7.25
// // Toppings:
// // extra cheese 2.00,
// // mushrooms 1.50
// // sausage 3.00
// // canadian bacon 3.50
// // AI sauce 1.50
// // peppers 1.00
// // Drinks:
// // coke 3.00, 2.00, 1.00
// // sprite 3.00, 2.00, 1.00
// // bottled water 5.00
// // """} ]

// const context = "You are OrderBot(name is ruvi pizza) an automated service to collect orders for a pizza restaurant You first greet the customer then collects the order and then asks if it's a pickup or delivery You wait to collect the entire order then summarize it and check for a final time if the customer wants to add anything else If it's a delivery you ask for an address Finally you collect the payment Make sure to clarify all options extras and sizes to uniquely identify the item from the menu You respond in a short very conversational friendly style The menu includes pepperoni pizza 12.95 10.00 7.00 cheese pizza 10.95 9.25 6.50 eggplant pizza 11.95 9.75 6.75 fries 4.50 3.50 greek salad 7.25 Toppings extra cheese 2.00 mushrooms 1.50 sausage 3.00 canadian bacon 3.50 AI sauce 1.50 peppers 1.00 Drinks coke 3.00 2.00 1.00 sprite 3.00 2.00 1.00 bottled water 5.00"
// messageHistory = [];
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.get('/webhook', (req, res) => {
//     const mode = req.query['hub.mode'];
//     const token = req.query['hub.verify_token'];
//     const challenge = req.query['hub.challenge'];

//     if (mode && token === process.env.VERIFY_TOKEN) {
//         res.status(200).send(challenge);
//     } else {
//         res.sendStatus(403);
//     }
// });

// app.post('/webhook', (req, res) => {
//     const body = req.body;

//     if (body.object === 'page') {
//         body.entry.forEach((entry) => {
//             const webhookEvent = entry.messaging[0];
//             console.log(webhookEvent);

//             if (webhookEvent.message) {
//                 handleMessage(webhookEvent.sender.id, webhookEvent.message);
//             } else if (webhookEvent.postback) {
//                 handlePostback(webhookEvent.sender.id, webhookEvent.postback);
//             }
//         });

//         res.sendStatus(200);
//     } else {
//         res.sendStatus(404);
//     }
// });

// function handleMessage(senderId, message) {
//     const userMessage = message.text;
//     let chatbotResponse = '';

//     // Add chat history to context
//     const contextWithChatHistory = `${context} Chat history:\n${messageHistoryToString(messageHistory)}\n`;

//     // Create prompt for OpenAI API
//     const prompt = `${contextWithChatHistory}User: ${userMessage}\nOrderBot:`;

//     // Call OpenAI API to generate a response
//     generateResponse(prompt).then((response) => {
//         chatbotResponse = response;
//         sendTextMessage(senderId, chatbotResponse);

//         // Add current message to chat history
//         messageHistory.push({ sender: 'User', message: userMessage });

//         messageHistory.push({ sender: 'OrderBot', message: chatbotResponse });

//         // console chat history
//         console.log(messageHistoryToString(messageHistory));
//     });


// }

// function messageHistoryToString(messageHistory) {
//     let messageHistoryString = '';
//     messageHistory.forEach((message) => {
//         messageHistoryString += `${message.sender}: ${message.message}\n`;
//     });
//     return messageHistoryString;
// }


// const axios = require('axios');

// async function generateResponse(userMessage) {
//     const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
//         prompt: userMessage,
//         max_tokens: 50,
//         temperature: 0.5,
//         n: 1,
//         stop: '\n'
//     }, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
//         }
//     });

//     return response.data.choices[0].text.trim();
// }

// function handlePostback(senderId, postback) {
//     const payload = postback.payload;
//     if (payload === 'WELCOME_MESSAGE') {
//         sendTextMessage(senderId, 'Welcome to my chatbot!');
//     }
// }

// function sendTextMessage(senderId, text) {
//     request({
//         url: 'https://graph.facebook.com/v11.0/me/messages',
//         qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
//         method: 'POST',
//         json: {
//             recipient: { id: senderId },
//             message: { text: text }
//         }
//     }, (error, response, body) => {
//         if (error) {
//             console.error('Error sending message: ', error);
//         } else if (response.body.error) {
//             console.error('Error: ', response.body.error);
//         }
//     });
// }

// app.listen(3000, () => {
//     console.log('Server is listening on port 3000');
// });

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