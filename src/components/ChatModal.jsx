import { useState } from 'react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import { useEffect } from 'react';
import socketService from '../services/socketService';


export default function ChatModal({ show, onClose, bot }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: `Hi! I'm ${bot.bot_name}. Ask me anything!` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId] = useState(`conv_${Date.now()}`);

  if (!show) return null;

 const handleSend = () => {
  if (!input.trim() || isTyping) return;

  const userMessage = input.trim();
  console.log('🔵 User sending:', userMessage);
  setInput('');

  // Add user message
  setMessages(prev => [...prev, { role: 'user', text: userMessage }]);

  // Send via socket
  try {
    console.log('🔵 Calling socketService.sendMessage');
    socketService.sendMessage(bot.bot_id, userMessage, conversationId);
    setIsTyping(true);
  } catch (err) {
    console.error('❌ Send error:', err);
    alert(err.message);
  }
};


  useEffect(() => {
  if (!show) return;

  console.log('🔌 Connecting socket...');
  socketService.connect();

  // Listen for bot responses
  socketService.onMessage((data) => {
    console.log('📥 Got response:', data);
    setIsTyping(false);
    setMessages(prev => [...prev, {
      role: 'bot',
      text: data.message || data.reply || 'No response',
      image: data.educational_image || null 
    }]);
  });

  // Listen for typing
  socketService.onTyping(() => {
    console.log('⌨️ Bot typing...');
    setIsTyping(true);
  });

  return () => {
    socketService.removeAllListeners();
  };
}, [show]);

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
              🤖
            </div>
            <div>
              <h2 className="font-bold text-lg">{bot.bot_name}</h2>
              <p className="text-xs text-white/80">{bot.subject} • Grade {bot.grade}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                 {msg.role === 'bot' && msg.image && (
        <div className="flex justify-start">
          <div className="max-w-[70%] rounded-2xl overflow-hidden border-2 border-indigo-200 shadow-lg bg-white">
            <img 
              src={`http://127.0.0.1:8000${msg.image}`}
              alt="Educational illustration"
              className="w-full h-auto"
              onError={(e) => {
                console.error('Image load error:', e.target.src);
                e.target.parentElement.innerHTML = '<p class="p-4 text-sm text-gray-500">Image failed to load</p>';
              }}
            />
            <p className="text-xs text-gray-500 px-3 py-2 bg-gray-50 text-center border-t border-gray-200">
              📚 Educational Illustration
            </p>
          </div>
        </div>
      )}
              </div>
               {/* Educational Image - Show AFTER bot's text message */}
     
            </div>
            
            
          ))}
          {isTyping && (
            <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                </div>
            </div>
            )}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-2"
            >
              <FaPaperPlane />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
