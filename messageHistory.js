let messageHistory = [];

function addMessageToHistory(sender, message) {
    messageHistory.push({ sender, message });
}

function getMessageHistoryString() {
    let messageHistoryString = '';
    messageHistory.forEach((message) => {
        messageHistoryString += `${message.sender}: ${message.message}\n`;
    });
    return messageHistoryString;
}

module.exports = {
    addMessageToHistory,
    getMessageHistoryString
};