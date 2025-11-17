import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ explanation: "No code provided" });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      stream: false,
      temperature: 0.2,
      messages: [
        { role: "system", content: "You explain code clearly and simply." },
        { role: "user", content: `Explain this code:\n\n${code}` },
      ],
    });

    const text =
      completion.choices?.[0]?.message?.content || "No explanation returned";

    return NextResponse.json({ explanation: text });
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json({
      explanation: `Error processing request: ${err.message || err}`,
    });
  }
}

