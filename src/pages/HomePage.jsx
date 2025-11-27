import { FaRobot, FaBook, FaUser, FaChartLine } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto pb-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">Welcome, Admin! 👋</h1>
        <p className="text-gray-500 text-lg">Here’s a quick look at your EduChat system performance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-10">
        <StatsCard
          icon={<FaRobot className="text-3xl text-indigo-400" />}
          label="Active Bots"
          value="8"
          subtext="2 new this week"
        />
        <StatsCard
          icon={<FaBook className="text-3xl text-fuchsia-400" />}
          label="Study Materials"
          value="154"
          subtext="+12 uploaded"
        />
        <StatsCard
          icon={<FaUser className="text-3xl text-sky-400" />}
          label="Active Users"
          value="420"
          subtext="38 new joined"
        />
        <StatsCard
          icon={<FaChartLine className="text-3xl text-yellow-400" />}
          label="Conversations"
          value="1,248"
          subtext="256 today"
        />
      </div>

      {/* Active Bots Preview */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold text-indigo-600 mb-4">Recently Active Bots</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {[
            { name: "Math Helper", status: "Online" },
            { name: "Science Buddy", status: "Online" },
            { name: "History Pro", status: "Offline" },
            { name: "Literature Genie", status: "Online" },
          ].map((bot) => (
            <div key={bot.name} className="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg shadow-sm">
              <FaRobot className="text-indigo-500 text-xl" />
              <div>
                <div className="font-semibold text-indigo-700">{bot.name}</div>
                <div className={`text-xs ${bot.status === "Online" ? "text-green-500" : "text-gray-400"}`}>{bot.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Announcements (example) */}
      <div className="bg-fuchsia-50 shadow rounded-2xl p-6">
        <h2 className="text-xl font-bold text-fuchsia-600 mb-2">System Updates</h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li>AI Bots now support math equation rendering!</li>
          <li>Admin notifications panel added in dashboard header.</li>
          <li>Performance reports downloadable as PDF from the Analytics tab.</li>
        </ul>
      </div>
    </div>
  );
}

// Stats Card Helper
function StatsCard({ icon, label, value, subtext }) {
  return (
    <div className="flex items-center gap-5 bg-white shadow-lg rounded-2xl px-6 py-5">
      <div className="rounded-xl bg-indigo-100 p-3 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-indigo-700">{value}</div>
        <div className="font-semibold text-gray-500">{label}</div>
        <div className="text-xs text-indigo-400">{subtext}</div>
      </div>
    </div>
  );
}
