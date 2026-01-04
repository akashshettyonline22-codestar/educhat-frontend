import { useState, useEffect } from "react";
import { FaRobot, FaBook, FaUser, FaChartLine } from "react-icons/fa";
import analyticsService from "../services/analyticsService";
import { useError } from "../contexts/ErrorContext";

export default function HomePage() {
  const [analytics, setAnalytics] = useState(null);
  const [recentBots, setRecentBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName,setUserName]=useState(null)
  const { setError } = useError();

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await analyticsService.getAnalytics();
      console.log('Analytics data:', data);
      setUserName(data.user_name)
      
      setAnalytics(data.analytics);
      setRecentBots(data.recent_bots || []);
    } catch (err) {
      setError(err.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto pb-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-indigo-600 text-lg font-semibold">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">Welcome {userName} 👋</h1>
        <p className="text-gray-500 text-lg">Here's a quick look at your EduChat system performance.</p>
      </div>

      {/* Dynamic Stats Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-10">
        <StatsCard
          icon={<FaRobot className="text-3xl text-indigo-400" />}
          label="Active Bots"
          value={analytics?.total_bots || 0}
          subtext={`${recentBots.length} recently created`}
        />
        <StatsCard
          icon={<FaBook className="text-3xl text-fuchsia-400" />}
          label="Study Materials"
          value={analytics?.total_study_materials || 0}
          subtext="Textbooks uploaded"
        />
        <StatsCard
          icon={<FaUser className="text-3xl text-sky-400" />}
          label="Total Users"
          value={analytics?.total_users || 0}
          subtext="Registered users"
        />
        <StatsCard
          icon={<FaChartLine className="text-3xl text-yellow-400" />}
          label="Conversations"
          value={analytics?.total_conversations || 0}
          subtext="Total chats"
        />
      </div>

      {/* Dynamic Recent Bots */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold text-indigo-600 mb-4">
          Recently Created Bots
          {recentBots.length > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({recentBots.length} bots)
            </span>
          )}
        </h2>
        
        {recentBots.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FaRobot className="text-5xl text-gray-300 mx-auto mb-3" />
            <p>No bots created yet</p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {recentBots.slice(0, 4).map((bot) => (
              <div 
                key={bot.bot_id} 
                className="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <FaRobot className="text-white text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-indigo-700 truncate">
                    {bot.bot_name}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="truncate">{bot.subject}</span>
                    <span className="text-gray-400">•</span>
                    <span>Grade {bot.grade}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {formatDate(bot.created_at)}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* System Announcements */}
      <div className="bg-fuchsia-50 shadow rounded-2xl p-6">
        <h2 className="text-xl font-bold text-fuchsia-600 mb-2">System Updates 🎉</h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li>AI Bots now support educational image generation!</li>
          <li>Real-time chat with WebSocket integration added.</li>
          <li>Analytics dashboard with live statistics available.</li>
          <li>Upload PDF textbooks to create custom AI tutors.</li>
        </ul>
      </div>
    </div>
  );
}

// Stats Card Helper
function StatsCard({ icon, label, value, subtext }) {
  return (
    <div className="flex items-center gap-5 bg-white shadow-lg rounded-2xl px-6 py-5 hover:shadow-xl transition-shadow">
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

// Helper function to format date
function formatDate(dateString) {
  if (!dateString) return 'Unknown date';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
}
