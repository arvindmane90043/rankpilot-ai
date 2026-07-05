export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-700 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        RankPilot AI
      </h1>

      <ul className="space-y-4">
        <li>🏠 Dashboard</li>
        <li>📝 Content Writer</li>
        <li>🔍 Keyword Research</li>
        <li>📊 SEO Audit</li>
        <li>⚙️ Settings</li>
      </ul>
    </aside>
  );
}