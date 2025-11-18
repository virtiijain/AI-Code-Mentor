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
        {
          role: "system",
          content: `
Explain code in this exact style:

1) Start with a super simple one-line explanation of what the whole code does.
2) Then break the code into small blocks or steps.
3) Explain each block in short, clear, beginner-friendly sentences.
4) Keep the flow natural and easy, like you're casually teaching someone.
5) Avoid technical jargon unless necessary.
6) Keep explanations short but meaningful.
7) Add a tiny wrap-up summary at the end.
`,
        },
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
