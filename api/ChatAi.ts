import { InferenceClient } from "@huggingface/inference";
import { VercelRequest, VercelResponse } from "@vercel/node";
import dotenv from "dotenv";

dotenv.config(); //
const hf = new InferenceClient(process.env.HUGGING_KEY_API!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "POST required" });

  const { message } = req.body;
  if (!message)
    return res.status(400).json({ error: "Message is required" });

  try {
    const result = await hf.chatCompletion({
      model: "meta-llama/Llama-3.2-1B-Instruct",
      messages: [{ role: "user", content: message }],
      max_tokens: 200,
    });

    return res.status(200).json({
      reply: result.choices[0].message.content,
    });
  } catch (err: any) {
    console.error("BACKEND ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
