import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-6">
          <h1 className="text-3xl font-bold mb-8">
            Welcome to RankPilot AI 🚀
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Projects" value="12" icon="📁" />
            <StatCard title="Keywords" value="1254" icon="🔍" />
            <StatCard title="AI Articles" value="87" icon="📝" />
            <StatCard title="SEO Score" value="92%" icon="📈" />
          </div>
        </main>
      </div>
    </div>
  );
}