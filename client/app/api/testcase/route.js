export async function POST(req) {
  try {
    const { code } = await req.json();

    if (!code) {
      return new Response(JSON.stringify({ testcases: [] }), { status: 400 });
    }

    // Very simple demo logic: generate test cases based on code content
    // Replace this with AI call later
    const testcases = [
      `Input: sample1, Output: result1`,
      `Input: sample2, Output: result2`,
      `Input: sample3, Output: result3`,
    ];

    return new Response(JSON.stringify({ testcases }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to generate test cases" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
