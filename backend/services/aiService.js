const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateSummary(data) {

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
You are a sales analyst.

Analyze the following sales dataset and create a short executive summary.

Dataset:
${JSON.stringify(data.slice(0,20))}

Provide:
- Total revenue
- Best performing region
- Top product
- Key insights
`;

  const result = await Promise.race([
  model.generateContent(prompt),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Gemini timeout")), 60000)
  )
]);

  const response = result.response;

  return response.text();
}

module.exports = generateSummary;