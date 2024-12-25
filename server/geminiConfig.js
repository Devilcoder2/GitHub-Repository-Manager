const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require('@google/generative-ai');
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

//SETUP GEMINI MODEL
const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
});

//CONFIGURE GEMINI
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 2000,
    responseMimeType: 'text/plain',
};

const runGemini = async (prompt) => {
    const validationPrompt = `
        Determine if the following text is a code snippet. If it is, review it by providing:
        1. What is the code doing.
        2. Good aspects of the code.
        3. Things that can be improved.
        If it is not a code snippet, respond: "Sorry, I can only provide a code review."
        
        Input: ${prompt}
    `;

    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const result = await chatSession.sendMessage(validationPrompt);
    return result.response.text();
};

module.exports = { runGemini };
