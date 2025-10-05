// Simple static recommendations list. Replace with dynamic data or AI-backed
// suggestions in the future.
export default function RecommendationsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-[#232a36]/90 to-[#1a1f2b]/90 backdrop-blur-md rounded-3xl shadow-xl border border-[#2d3440] p-8 mb-6">
        <h2 className="text-2xl font-semibold text-blue-200 mb-4 tracking-tight">Today's Recommendations</h2>
        <ul className="space-y-4">
          <li className="text-blue-100">📚 <span className="font-medium">Review your Math notes</span> before tomorrow's class.</li>
          <li className="text-blue-100">🧘 <span className="font-medium">Take a 10-minute mindfulness break</span> this afternoon.</li>
          <li className="text-blue-100">💡 <span className="font-medium">Try the Pomodoro technique</span> for your next study session.</li>
          <li className="text-blue-100">📝 <span className="font-medium">Summarize today's lecture</span> in your notes app.</li>
        </ul>
      </div>
    </div>
  );
}
