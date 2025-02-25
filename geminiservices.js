const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const getGeminiCompletion = async (prompt) => {
    try {
        const completion = await model.generateContent({
            contents: [{ parts: [{ text: prompt }] }]
        });

        // Log the response structure for debugging
        console.log('Gemini API Response:', JSON.stringify(completion, null, 2));

        // Check if the response contains the expected data
        if (
            completion &&
            completion.response &&
            completion.response.candidates &&
            completion.response.candidates.length > 0 &&
            completion.response.candidates[0].content &&
            completion.response.candidates[0].content.parts &&
            completion.response.candidates[0].content.parts.length > 0 &&
            completion.response.candidates[0].content.parts[0].text
        ) {
            const jsonResponse = completion.response.candidates[0].content.parts[0].text;
            // Remove the surrounding code block if exists
            const cleanedResponse = jsonResponse.replace(/```json\n|\n```/g, '');
            return JSON.parse(cleanedResponse);
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error) {
        console.error('Error fetching Gemini completion:', error);
        throw new Error('Failed to fetch Gemini completion');
    }
};
