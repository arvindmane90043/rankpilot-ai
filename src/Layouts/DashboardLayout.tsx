import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";

export default function DashboardLayout() {

  const [history, setHistory] = useState<any[]>([]);


  useEffect(() => {

    const data = JSON.parse(
      localStorage.getItem("contentHistory") || "[]"
    );

    setHistory(data);

  }, []);



  const totalArticles = history.length;


  const totalKeywords = new Set(
    history.map(item => item.keyword)
  ).size;



  const avgSeoScore = history.length
  ? Math.round(
      history.reduce((total, item) => {

        let score = Number(
          item.content.seo_score
            ?.match(/\d+/)?.[0]
        ) || 0;

        // score should be between 0-100
        if(score > 100){
          score = 0;
        }

        return total + score;

      }, 0) / history.length
    )
  : 0;



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


            <StatCard
              title="Total Articles"
              value={totalArticles}
              icon="📝"
            />


            <StatCard
              title="Keywords"
              value={totalKeywords}
              icon="🔍"
            />


            <StatCard
              title="AI Content"
              value={totalArticles}
              icon="🤖"
            />


            <StatCard
              title="Average SEO Score"
              value={`${avgSeoScore}%`}
              icon="📈"
            />


          </div>



          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-5">
              📚 Recent Content
            </h2>


            {history.slice(0,5).map((item,index)=>(


              <div
                key={index}
                className="bg-white shadow rounded p-4 mb-3"
              >

                <h3 className="font-bold">
                  {item.keyword}
                </h3>


                <p>
                  Topic: {item.topic}
                </p>


                <p className="text-gray-500">
                  Date: {item.date}
                </p>


              </div>


            ))}


            {history.length === 0 && (
              <p>No content generated yet</p>
            )}


          </div>


        </main>


      </div>


    </div>
  );
}