import { useState, useEffect } from "react";
import { generateContent } from "../services/aiService";
import { exportPDF } from "../utils/exportUtils";
import { exportDOCX } from "../utils/exportDocx";
import { exportFullReport } from "../utils/exportFullReport";

function ContentWriter() {
  // Form States
  const [projectName, setProjectName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [topic, setTopic] = useState("");

  // AI Result
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // History
  const [history, setHistory] = useState<any[]>([]);
  const [projects, setProjects] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState("");

  // Edit Mode
  const [editingKey, setEditingKey] = useState("");
  const [editedValue, setEditedValue] = useState("");

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("contentHistory") || "[]"
    );

    setHistory(savedHistory);

    const uniqueProjects = [
      ...new Set(savedHistory.map((item: any) => item.project))
    ];

    setProjects(uniqueProjects as string[]);
  }, []);

  const handleGenerate = async () => {
    if (!projectName.trim()) {
      alert("Please enter Project Name");
      return;
    }

    setLoading(true);

    const prompt = `
You are an expert SEO strategist.

Analyze and create SEO optimized content.

Project:
${projectName}

Keyword:
${keyword}

Topic:
${topic}

Return exactly this format:

SEO_SCORE:
(number between 0-100)

SEO_GRADE:
A+, A, B, C

KEYWORD_ANALYSIS:
Primary Keyword:
Related Keywords:
Search Intent:

SEO_CHECK:
- Keyword in Title:
- Keyword in Meta:
- Heading Optimization:
- Content Length:
- FAQ Optimization:

TITLE:
SEO title

META:
Meta description

SLUG:
URL slug

OUTLINE:
H1:
H2:
H3:

ARTICLE:
Complete article

WORD_COUNT:
Total article words

KEYWORD_CHECK:
Keyword usage analysis

IMPROVEMENTS:
SEO improvement suggestions

FAQ:
5 FAQs
`;

    const response = await generateContent(prompt);
const sections: any = {
      seo_score: "",
      seo_grade: "",
      keyword_analysis: "",
      seo_check: "",
      keyword_check: "",
      title: "",
      meta: "",
      slug: "",
      outline: "",
      article: "",
      word_count: "",
      improvements: "",
      faq: ""
    };

    let current = "";

    response.split("\n").forEach((line: string) => {

      if (line.startsWith("SEO_SCORE:"))
        current = "seo_score";

      else if (line.startsWith("SEO_GRADE:"))
        current = "seo_grade";

      else if (line.startsWith("KEYWORD_ANALYSIS:"))
        current = "keyword_analysis";

      else if (line.startsWith("SEO_CHECK:"))
        current = "seo_check";

      else if (line.startsWith("KEYWORD_CHECK:"))
        current = "keyword_check";

      else if (line.startsWith("TITLE:"))
        current = "title";

      else if (line.startsWith("META:"))
        current = "meta";

      else if (line.startsWith("SLUG:"))
        current = "slug";

      else if (line.startsWith("OUTLINE:"))
        current = "outline";

      else if (line.startsWith("ARTICLE:"))
        current = "article";

      else if (line.startsWith("WORD_COUNT:"))
        current = "word_count";

      else if (line.startsWith("IMPROVEMENTS:"))
        current = "improvements";

      else if (line.startsWith("FAQ:"))
        current = "faq";

      else if (current) {
        sections[current] += line + "\n";
      }

    });

    setResult(sections);

    const newHistory = {
      project: projectName,
      keyword,
      topic,
      date: new Date().toLocaleDateString(),
      content: sections
    };

    const oldHistory = JSON.parse(
      localStorage.getItem("contentHistory") || "[]"
    );

    const updatedHistory = [
      newHistory,
      ...oldHistory
    ];

    localStorage.setItem(
      "contentHistory",
      JSON.stringify(updatedHistory)
    );

    setHistory(updatedHistory);

    if (!projects.includes(projectName)) {
      setProjects([...projects, projectName]);
    }

    setLoading(false);
  };
return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-5">
        SEO Content Generator V8
      </h1>

      <input
        className="border p-3 w-full mb-3 rounded"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />

      <select
        className="border p-3 w-full mb-3 rounded"
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
      >
        <option value="">All Projects</option>

        {projects.map((project, index) => (
  <option key={project + index} value={project}>
    {project}
  </option>
))}
      </select>

      <input
        className="border p-3 w-full mb-3 rounded"
        placeholder="Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-3 rounded"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-5 py-3 rounded"
      >
        {loading ? "Generating..." : "Generate Content"}
      </button>
{/* 
<button
  onClick={() => {
    if (result) {
      exportFullReport(projectName, keyword, topic, result);
    }
  }}
  className="bg-indigo-600 text-white px-5 py-3 rounded ml-3"
>
  📊 Export Full SEO Report
</button>
*/}
      {result && (
        <div className="mt-6 space-y-4">

          {Object.entries(result).map(([key, value]: any) => (

            <div
              key={key}
              className="bg-white shadow p-5 rounded"
            >

              <h2 className="text-xl font-bold capitalize">
                {key.replace("_", " ")}
              </h2>

              {editingKey === key ? (
                <textarea
                  className="w-full border p-3 mt-3 rounded h-60"
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                />
              ) : (
                <p className="whitespace-pre-wrap mt-3">
                  {String(value)}
                </p>
              )}

              <div className="flex gap-3 mt-4 flex-wrap">

                <button
                  onClick={() => {
                    setEditingKey(key);
                    setEditedValue(String(value));
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>

                {editingKey === key && (
                  <>
                    <button
                      onClick={() => {
                        const updated = {
                          ...result,
                          [key]: editedValue
                        };

                        setResult(updated);
                        setEditingKey("");
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => {
                        setEditingKey("");
                        setEditedValue("");
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </>
                )}

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(String(value))
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Copy
                </button>

                <button
  onClick={() =>
    exportPDF(
      key.replace("_", " ").toUpperCase(),
      String(value)
    )
  }
  className="bg-red-600 text-white px-4 py-2 rounded"
>
  Export PDF
</button>

<button
  onClick={() =>
    exportDOCX(
      key.replace("_", " ").toUpperCase(),
      String(value)
    )
  }
  className="bg-purple-600 text-white px-4 py-2 rounded"
>
  Export DOCX
</button>
                

              </div>

            </div>

          ))}

        </div>
      )}
<div className="mt-8">

        <h2 className="text-2xl font-bold mb-4">
          📚 Content History
        </h2>

        {history
          .filter(
            (item) =>
              selectedProject === "" ||
              item.project === selectedProject
          )
          .map((item, index) => (

            <div
              key={index}
              className="bg-white shadow p-4 rounded mb-3"
            >

              <p className="text-blue-600 font-semibold">
                📁 {item.project}
              </p>

              <h3 className="font-bold mt-2">
                {item.keyword}
              </h3>

              <p>
                Topic: {item.topic}
              </p>

              <p className="text-sm text-gray-500">
                Date: {item.date}
              </p>

            </div>

          ))}

      </div>

    </div>
  );
}

export default ContentWriter;