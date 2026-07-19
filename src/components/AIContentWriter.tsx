console.log("AIContentWriter Loaded");
import { useState } from "react";
import { generateContent } from "../services/aiService";

function AIContentWriter() {
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("Blog Post");
  const [tone, setTone] = useState("Professional");
  const [country, setCountry] = useState("India");
  const [wordCount, setWordCount] = useState(500);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!keyword) {
      alert("Enter a keyword");
      return;
    }

    setLoading(true);

    const prompt = `
Write a ${type}.

Keyword: ${keyword}
Tone: ${tone}
Target Country: ${country}
Word Count: ${wordCount}

SEO Friendly.
`;

    try {
      const result = await generateContent(prompt);
      setContent(result);
    } catch (err) {
      console.log(err);
      alert("Failed to generate content");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <input
        type="text"
        placeholder="Enter your keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <br /><br />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option>Blog Post</option>
        <option>Landing Page</option>
        <option>Product Description</option>
      </select>

      <br /><br />

      <select value={tone} onChange={(e) => setTone(e.target.value)}>
        <option>Professional</option>
        <option>Friendly</option>
        <option>Casual</option>
      </select>

      <br /><br />

      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option>India</option>
        <option>USA</option>
        <option>Australia</option>
      </select>

      <br /><br />

      <input
        type="number"
        value={wordCount}
        onChange={(e) => setWordCount(e.target.value)}
      />

      <br /><br />

      <button
  onClick={() => {
    alert("Button clicked");
    handleGenerate();
  }}
>
  {loading ? "Generating..." : "Generate Content"}
</button>

      <br /><br />

      <textarea
        rows={15}
        value={content}
        readOnly
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default AIContentWriter;