import { getCompletion } from "@/openAiServices";
import { getGeminiCompletion } from "@/geminiservices";
import Joi from 'joi';

// Function to generate the prompt based on user data
const generatePrompt = (userData) => {
    return `
        Based on the user data below, generate an exercise plan for a week.
        User data:
        ${JSON.stringify(userData)}
        
        Generate 3 exercises per day.
        Saturday and Sunday as rest days.
        
        Sample output JSON:
        [{"day": "Monday","exercises": [{"exercise": "...", "sets": "...", "reps": "...", "weight": "...","rest": "..."}]}]
        
        "reps" in JSON is a string with number of reps with weight if needed
        "rest" in JSON is the rest to be taken between sets
        "weight" in JSON is the weight to be used for exercise, it should be with units if needed e.g. 10 lbs, else make it "---"
        
        For rest days return only one javascript object in exercises array with exercise field as "Rest Day" and remaining fields as "---"
        
        Answer:
    `;
};

// Schema for validating user data
const userDataSchema = Joi.object({
    height: Joi.number().required(),
    weight: Joi.number().required(),
    age: Joi.number().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    fitnessLevel: Joi.string().valid('beginner', 'intermediate', 'advanced').required(),
    goal: Joi.string().valid('weight-loss', 'muscle-gain', 'overall-fitness', 'stress-reduction').required(),
    model: Joi.string().valid('openai', 'gemini').required(),
});

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const validationResult = userDataSchema.validate(req.body);
            if (validationResult.error) {
                return res.status(400).json({ error: validationResult.error.details[0].message });
            }

            let result;
            const {
                height,
                weight,
                age,
                gender,
                fitnessLevel,
                goal,
                model,
            } = req.body;

            // Generate the prompt
            const prompt = generatePrompt({ height, weight, age, gender, fitnessLevel, goal });

            // Check which model to use
            if (model.toLowerCase() === 'gemini') {
                result = await getGeminiCompletion(prompt);
            }

            return res.json({ result });
        } else {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (e) {
        console.error('Internal Server Error:', e.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
