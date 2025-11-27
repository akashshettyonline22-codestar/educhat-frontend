import { useState, useEffect } from "react";
import AddBotModal from "./AddEditBotModal"; // Use the simpler modal we created
import botService from "../../services/botService";
import { useError } from "../../contexts/ErrorContext";

export default function BotsLanding() {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const { setError, setSuccess } = useError(); // Add setSuccess

  // Load bots from API on mount
  useEffect(() => {
    loadBots();
  }, []);

  const loadBots = async () => {
    try {
      setLoading(true);
      const data = await botService.getBots();
      setBots(data);
    } catch (err) {
      setError(err.message || 'Failed to load bots');
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Bot
  const handleSaveBot = async (botData) => {
    try {
     let res= await botService.createBot(botData);
     setSuccess(res.message)
      // await loadBots(); // Reload bots after creation
    } catch (err) {
      setError(err.message || 'Failed to create bot');
      throw err; // Let modal handle it
    }
  };

  const filteredBots = bots.filter(bot =>
    bot.name.toLowerCase().includes(search.toLowerCase()) ||
    bot.subject.toLowerCase().includes(search.toLowerCase())
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
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white shadow-lg rounded-xl py-4 text-sky-800 border border-indigo-100">
            <div className="text-xl font-bold mb-1">Total Bots</div>
            <div className="text-3xl font-extrabold tracking-wide">{bots.length}</div>
          </div>
          <div className="bg-white shadow-lg rounded-xl py-4 text-fuchsia-700 border border-fuchsia-100">
            <div className="text-xl font-bold mb-1">Active Bots</div>
            <div className="text-3xl font-extrabold tracking-wide">{bots.length}</div>
          </div>
          <div className="bg-white shadow-lg rounded-xl py-4 text-indigo-700 border border-indigo-100">
            <div className="text-xl font-bold mb-1">Avg. Engagement</div>
            <div className="text-3xl font-extrabold tracking-wide">85%</div>
          </div>
        </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {filteredBots.map(bot => (
            <div
              key={bot.id}
              className="bg-white/90 border border-indigo-100 rounded-3xl p-7 flex flex-col shadow-2xl hover:ring-4 ring-fuchsia-400 transition group"
            >
              <div className="flex items-center mb-2 gap-3">
                <span className="text-3xl">🤖</span>
                <h2 className="font-bold text-2xl text-sky-700">{bot.name}</h2>
              </div>
              <p className="text-indigo-700 mb-3">{bot.description || 'No description provided'}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-3 py-1 rounded-lg bg-sky-100 text-sky-700 text-xs">{bot.subject}</span>
                <span className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 text-xs">Grade {bot.grade}</span>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4">
                <button
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-500 text-white shadow-lg hover:shadow-xl transition font-bold"
                  onClick={() => alert("Demo not implemented yet")}
                >
                  🚀 Try Demo
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredBots.length === 0 && !loading && (
            <div className="col-span-2 text-center py-20">
              <div className="text-6xl mb-4">🤖</div>
              <p className="text-indigo-400 text-lg mb-4">
                {search ? 'No bots found for your search.' : 'No bots created yet'}
              </p>
              {!search && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-500 text-white font-bold shadow-lg hover:shadow-xl"
                >
                  Create Your First Bot
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
    </div>
  );
}
