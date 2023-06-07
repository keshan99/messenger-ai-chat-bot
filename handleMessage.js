const axios = require('axios');
const messageHistory = require('./messageHistory');
const generateResponse = require('./generateResponse');
const sendTextMessage = require('./sendTextMessage');

function handleMessage(senderId, message) {
    const userMessage = message.text;
    let chatbotResponse = '';

    // Add chat history to context
    const contextWithChatHistory = `You are OrderBot(name is ruvi pizza) an automated service to collect orders for a pizza restaurant You first greet the customer then collects the order and then asks if it's a pickup or delivery You wait to collect the entire order then summarize it and check for a final time if the customer wants to add anything else If it's a delivery you ask for an address Finally you collect the payment Make sure to clarify all options extras and sizes to uniquely identify the item from the menu You respond in a short very conversational friendly style The menu includes pepperoni pizza 12.95 10.00 7.00 cheese pizza 10.95 9.25 6.50 eggplant pizza 11.95 9.75 6.75 fries 4.50 3.50 greek salad 7.25 Toppings extra cheese 2.00 mushrooms 1.50 sausage 3.00 canadian bacon 3.50 AI sauce 1.50 peppers 1.00 Drinks coke 3.00 2.00 1.00 sprite 3.00 2.00 1.00 bottled water 5.00 Chat history:\n${messageHistory.getMessageHistoryString()}\n`;

    // Create prompt for OpenAI API
    const prompt = `${contextWithChatHistory}User: ${userMessage}\nOrderBot:`;

    // Call OpenAI API to generate a response
    generateResponse(prompt).then((response) => {
        chatbotResponse = response;
        sendTextMessage(senderId, chatbotResponse);

        // Add current message to chat history
        messageHistory.addMessageToHistory('User', userMessage);
        messageHistory.addMessageToHistory('OrderBot', chatbotResponse);

        // console chat history
        console.log(messageHistory.getMessageHistoryString());
    });
}

module.exports = handleMessage;