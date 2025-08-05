// src/components/ActivityChart.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ActivityChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <h3 className="text-subtext mb-4">Learning Activity</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="day" tick={{ fill: '#A0AEC0' }} />
          <YAxis tick={{ fill: '#A0AEC0' }} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#6B46C1" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
