import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req) {
  try {
    const { code } = await req.json();

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: `
You are a senior software engineer.
Your task:
- Detect the code language automatically.
- Optimize the code ONLY (performance, readability, structure).
- Keep logic exactly the same.
- Fix bugs if present.
- Respond ONLY in this format:

\`\`\`<language>
<optimized code>
\`\`\`

**Improvements:** <1–2 short lines only>
          `,
        },
        {
          role: "user",
          content: `Optimize this code:\n${code}`,
        },
      ],
    });

    const text =
      completion.choices?.[0]?.message?.content ||
      "No optimized content returned";

    return NextResponse.json({ optimized: text });
  } catch (err) {
    return NextResponse.json({
      optimized: `Error: ${err.message}`,
    });
  }
}
