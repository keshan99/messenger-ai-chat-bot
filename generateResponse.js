const axios = require('axios');

async function generateResponse(userMessage) {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
        prompt: userMessage,
        max_tokens: 50,
        temperature: 0.5,
        n: 1,
        stop: '\n'
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
    });

    return response.data.choices[0].text.trim();
}

module.exports = generateResponse;