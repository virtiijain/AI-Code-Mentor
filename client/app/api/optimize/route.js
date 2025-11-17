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
You are a professional senior developer skilled in ALL programming languages.
Your job:
1. Automatically detect the programming language of the provided code.
2. Optimize the code for performance, readability, structure, and best practices.
3. Fix bugs, vulnerabilities, and redundant logic.
4. Keep original logic the same.
5. Return improved code wrapped in correct code block like:
\`\`\`python
<code>
\`\`\`
(Use correct language automatically.)
6. Then provide bullet points explaining optimization.
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
