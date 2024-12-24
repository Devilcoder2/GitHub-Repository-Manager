const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require('@google/generative-ai');

const apiKey = 'AIzaSyDO0yzxRSpyvYZ0XmnDNR-CeMF75gXVgy8';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 2000,
    responseMimeType: 'text/plain',
};

const defaultPrompt = (userPrompt) => `
Determine if the following prompt is asking for a code review or not. 
Respond with "yes" if it is asking for a code review or "no" otherwise. 
Prompt: "${userPrompt}"
`;

const runGemini = async (prompt) => {
    // Refined default prompt
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
    console.log(result.response.text());
    return result.response.text();
};

module.exports = { runGemini };
