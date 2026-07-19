const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateContent(prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No content generated."
  );
}