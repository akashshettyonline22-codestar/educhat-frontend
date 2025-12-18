import { useState, useEffect } from "react";
import AddBotModal from "./AddEditBotModal"; // Use the simpler modal we created
import botService from "../../services/botService";
import { useError } from "../../contexts/ErrorContext";
import ChatModal from "../ChatModal";

export default function BotsLanding() {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const { setError, setSuccess } = useError(); // Add setSuccess
  const [chatBot, setChatBot] = useState(null);


  // Load bots from API on mount
  useEffect(() => {
    loadBots();
  }, []);

  const loadBots = async () => {
    try {
      setLoading(true);
      const data = await botService.getBots();
      console.log(data)
      setBots(data.bots);
    } catch (err) {
      setError(err.message || 'Failed to load bots');
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Bot
  const handleSaveBot = async (botData) => {
    try {
      console.log("inside save bot")
     let res= await botService.createBot(botData);
     setSuccess(res.message)
     await loadBots(); // Reload bots after creation
    } catch (err) {
      console.log("err",err)
     
      throw err; // Let modal handle it
    }
  };
  const handleDeleteBot = async (botId, botName) => {
  // Confirmation dialog
  const confirmed = window.confirm(
    `Are you sure you want to delete "${botName}"?\n\nThis action cannot be undone.`
  );
  
  if (!confirmed) return;

  try {
    setLoading(true);
    await botService.deleteBot(botId);
    setSuccess(`Bot "${botName}" deleted successfully! 🗑️`);
    await loadBots(); // Reload the list
  } catch (err) {
    setError(err.message || 'Failed to delete bot');
  } finally {
    setLoading(false);
  }
};


  const filteredBots = bots.filter(bot =>
  (bot.bot_name?.toLowerCase() || '').includes(search.toLowerCase()) ||
  (bot.subject?.toLowerCase() || '').includes(search.toLowerCase())
);


  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-sky-100 to-fuchsia-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-indigo-600 text-lg font-semibold">Loading bots...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-fuchsia-100 py-10 px-4 flex flex-col">
      <div className="max-w-4xl mx-auto w-full">
        {/* Stats Banner */}
     

        {/* Page Header */}
        <header className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight drop-shadow mb-1">
              🌠 Educational Bots Platform
            </h1>
            <p className="text-fuchsia-500 text-lg">
              AI-powered bots for personalized student learning.
              Create new bots tailored for every subject!
            </p>
          </div>
          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <input
              className="px-4 py-2 rounded-xl shadow-inner bg-white/60 text-indigo-900 focus:outline-none border border-indigo-400"
              type="text"
              placeholder="Search by name/subject..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span className="text-indigo-400 ml-1 cursor-help" title="Type to filter bots by name or subject">ⓘ</span>
          </div>
        </header>

        {/* Bots Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
  {filteredBots.map(bot => {
    // Subject icon mapping
    const subjectIcons = {
      'Mathematics': '📐',
      'Maths': '📐',
      'Science': '🔬',
      'Physics': '⚛️',
      'Chemistry': '🧪',
      'Biology': '🧬',
      'English': '📚',
      'History': '📜',
      'Geography': '🌍',
    };
    
    const icon = subjectIcons[bot.subject] || '📖';
    
    return (
      <div
        key={bot.id}
        className="group relative bg-white/95 backdrop-blur-sm border-2 border-indigo-100 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:border-indigo-300 transition-all duration-300 flex flex-col"
      >
        {/* Top Right - Grade Badge & Delete Button */}
        <div className="absolute top-4 right-4 flex items-center gap-1">
         
          <button
            onClick={() => handleDeleteBot(bot.bot_id, bot.bot_name)}
            className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg group/delete"
            title="Delete Bot"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
          </button>
        </div>

        {/* Header with Subject Icon & Bot Name */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-4xl shadow-md border-2 border-indigo-200 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <div className="flex-1 min-w-0 pr-20">
            <h2 className="font-bold text-xl text-gray-800 mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {bot.bot_name || 'Unnamed Bot'}
            </h2>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-medium">{bot.subject || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex-grow mb-4">
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {bot.description || 'No description provided for this educational bot.'}
          </p>
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 text-xs font-semibold border border-sky-200 flex items-center gap-1">
            🎯 {bot.subject}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200 flex items-center gap-1">
            🎓 Grade {bot.grade}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent mb-4"></div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-fuchsia-600"
            onClick={() => setChatBot(bot)}
          >
            <span className="text-lg">🚀</span>
            <span>Try IT OUT</span>
          </button>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-400 to-fuchsia-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    );
  })}

  {/* Empty State */}
  {filteredBots.length === 0 && !loading && (
    <div className="col-span-full text-center py-20 px-4">
      <div className="inline-block">
        <div className="text-8xl mb-6 animate-bounce">🤖</div>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 mx-auto mb-6 rounded-full"></div>
      </div>
      <h3 className="text-3xl font-bold text-gray-800 mb-3">
        {search ? 'No Bots Found' : 'No Bots Yet'}
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
        {search 
          ? `We couldn't find any bots matching "${search}". Try a different search term.`
          : 'Create your first AI-powered educational bot to revolutionize learning!'}
      </p>
      {!search && (
        <button
          onClick={() => setShowAddModal(true)}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-500 text-white font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 text-lg"
        >
          <span className="text-2xl">✨</span>
          <span>Create Your First Bot</span>
        </button>
      )}
    </div>
  )}
</div>


      </div>

      {/* Floating "Add Bot" Button */}
      {bots.length > 0 && (
        <button
          onClick={() => setShowAddModal(true)}
          className="fixed bottom-10 right-10 px-7 py-3 rounded-full bg-gradient-to-br from-blue-700 via-purple-700 to-fuchsia-600 text-white text-lg font-semibold shadow-xl hover:scale-110 transition"
        >
          <span className="text-2xl">✚</span> Add Bot
        </button>
      )}

      {/* Add Bot Modal */}
      <AddBotModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleSaveBot}
      />

    {/* Add this right before the final </div> */}
      {chatBot && (
        <ChatModal
          show={!!chatBot}
          onClose={() => setChatBot(null)}
          bot={chatBot}
        />
      )}

    </div>
  );
}
