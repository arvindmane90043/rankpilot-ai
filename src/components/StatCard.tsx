type Props = {
  title: string;
  value: string;
  icon: string;
};

export default function StatCard({ title, value, icon }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="text-4xl">{icon}</div>

      <h3 className="text-gray-500 mt-4">{title}</h3>

      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}