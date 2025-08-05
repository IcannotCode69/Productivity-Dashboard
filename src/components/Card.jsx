// src/components/Card.jsx
export default function Card({ title, metric, children, className }) {
  return (
    <div
      className={`bg-gradient-to-br from-[#232a36]/90 to-[#1a1f2b]/90 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col gap-2 border border-[#2d3440] transform transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-blue-900/40 hover:border-blue-500/60 opacity-0 animate-fadein ${className}`}
      style={{ animationDelay: `${Math.random() * 0.2 + 0.1}s` }}
    >
      <h3 className="text-base font-semibold text-blue-200 mb-1 tracking-tight">{title}</h3>
      <p className="text-3xl font-bold text-blue-100 drop-shadow-sm">{metric}</p>
      {children}
    </div>
  );
}
{/* <Card title="2400 XP" metric="Level 12">
  <ProgressBar percent={75} className="mt-4" />
</Card> */}
