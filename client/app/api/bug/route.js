import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ bugs: "No code provided." });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `
You are a senior developer. 
Your job:
1. Detect any bugs, errors, or vulnerabilities in the code.
2. Explain the issues in **simple, short, clear bullet points**.
3. Suggest fixes in plain language.
4. Keep the original logic intact.
5. Avoid long paragraphs; keep it concise.
          `,
        },
        {
          role: "user",
          content: `Check this code for bugs and explain simply:\n${code}`,
        },
      ],
    });

    const text =
      completion.choices?.[0]?.message?.content || "No bugs detected.";

    return NextResponse.json({ bugs: text });
  } catch (err) {
    return NextResponse.json({ bugs: `Error: ${err.message}` });
  }
}
