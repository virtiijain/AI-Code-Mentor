import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req) {
  try {
    const { code } = await req.json();
    if (!code) return NextResponse.json({ flowchart: "No code provided" });

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `
You are an AI assistant.
Convert the user's code into a simple flowchart using mermaid.js syntax.
Keep it concise, clear, and beginner-friendly.
Output only mermaid.js code, no extra text.
Example:
\`\`\`mermaid
flowchart TD
    A[Start] --> B[Do something]
    B --> C{Condition?}
    C -->|Yes| D[Action 1]
    C -->|No| E[Action 2]
    D --> F[End]
    E --> F[End]
\`\`\`
          `,
        },
        { role: "user", content: `Convert this code to a flowchart:\n${code}` },
      ],
    });

    const text = completion.choices?.[0]?.message?.content || "No flowchart generated.";

    return NextResponse.json({ flowchart: text });
  } catch (err) {
    return NextResponse.json({ flowchart: `Error: ${err.message}` });
  }
}
