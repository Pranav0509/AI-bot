import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export const chatWithAI = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Local Chatbot",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from OpenRouter" });
  }
};
