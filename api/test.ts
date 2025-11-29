import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  console.log("HF KEY:", process.env.HUGGING_KEY_API);
  res.status(200).json({ ok: true });
}
