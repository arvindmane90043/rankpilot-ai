function AIContentWriter() {
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fff",
      }}
    >
      <h2>AI Content Writer</h2>

      <input
        type="text"
        placeholder="Enter your keyword"
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      />

      <select
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      >
        <option>Blog Post</option>
        <option>Landing Page</option>
        <option>Product Description</option>
      </select>

      <select
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      >
        <option>Professional</option>
        <option>Friendly</option>
        <option>Casual</option>
      </select>

      <select
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      >
        <option>India</option>
        <option>USA</option>
        <option>Australia</option>
        <option>United Kingdom</option>
      </select>

      <input
        type="number"
        placeholder="Word Count"
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      />

      <button
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Generate Content
      </button>

      <textarea
        placeholder="Generated content will appear here..."
        rows="10"
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "12px",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <button style={{ flex: 1, padding: "10px" }}>Copy</button>
        <button style={{ flex: 1, padding: "10px" }}>Download</button>
      </div>
    </div>
  );
}

export default AIContentWriter;