
EduChat Frontend 🎓🤖
A modern React-based educational chatbot platform that allows users to create AI-powered tutors by uploading textbooks and interacting with them in real-time.

📋 Table of Contents
Features

Tech Stack

Prerequisites

Installation

Configuration

Running the Application

Project Structure

Available Scripts

API Integration

Authentication

WebSocket Integration

Troubleshooting

✨ Features
🔐 Authentication
User registration and login with JWT tokens

Protected routes with automatic token validation

Auto-redirect to login on token expiration

Persistent authentication state

🤖 Bot Management
Create AI tutors by uploading PDF textbooks

View all created bots with search functionality

Delete bots with confirmation

Real-time bot statistics

💬 Real-time Chat
WebSocket-based instant messaging

Educational image generation for concepts

Typing indicators

Conversation history

Message bubbles with role differentiation

📊 Analytics Dashboard
Total bots count

Study materials uploaded

Total users registered

Conversation statistics

Recently created bots overview

🎨 Modern UI/UX
Responsive design (mobile, tablet, desktop)

Gradient backgrounds and smooth animations

Toast notifications (success/error)

Loading states and spinners

Empty states with call-to-actions

🛠️ Tech Stack

  | Technology       | Purpose                           |
| ---------------- | --------------------------------- |
| React 18         | UI framework                      |
| React Router v6  | Client-side routing               |
| Socket.IO Client | Real-time WebSocket communication |
| Tailwind CSS     | Styling and responsive design     |
| React Icons      | Icon library                      |
| Context API      | State management (Auth, Error)    |
| Fetch API        | HTTP requests                     |

📦 Prerequisites

    Before you begin, ensure you have the following installed:

    Node.js: v16.x or higher (Download)

    npm: v8.x or higher (comes with Node.js)

    Backend API: Running on http://127.0.0.1:8000 (or configured URL)

🚀 Installation
1. Clone the Repository    
   git clone <repository-url>
   cd educhat-frontend

2. Install Dependencies

   npm install

This will install all required packages including:

    react, react-dom

    react-router-dom

    socket.io-client

    react-icons

    tailwindcss

⚙️ Configuration
Environment Variables
Create a .env file in the root directory:
  
 NODE_ENV= 'development'

API Configuration
The API base URL is configured in /src/config/env.js: 

  export const getApiBaseUrl = () => {
  return process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';
};

▶️ Running the Application
    Development Mode

    npm start
 
Opens at http://localhost:3000

Hot-reload enabled

Dev tools available

Production Build

 npm run build

Creates optimized build in /build folder.

Serve Production Build

  npm install -g serve
  serve -s build -p 3000

📁 Project Structure

   <img width="318" height="806" alt="image" src="https://github.com/user-attachments/assets/8180dbed-5ec8-4e7d-9ecb-0f29f22c2095" />

🔗 API Integration
API Client
File: /src/utils/apiClient.js

Features:

✅ Automatic JWT token injection

✅ 401/403 error handling

✅ Auto-redirect on auth failure

✅ Content-Type headers

Service Layer
Auth Service

  authService.register({ name, email, password })
  authService.login({ email, password })

Bot Service

    botService.createBot(formData)   // Upload textbook + metadata
    botService.getBots()             // Get all user bots
    botService.deleteBot(botId)      // Delete a bot

Analytics Service
  
    analyticsService.getAnalytics()  // Get dashboard stats

🔐 Authentication
JWT Token Flow
    User logs in → Token stored in localStorage

    API client → Auto-injects token in headers

    Backend validates → Returns response

    On 401 error → Clear token, redirect to /auth


Protected Routes

   <ProtectedRoute>
  <DashboardLayout />
</ProtectedRoute>

All routes except /auth require authentication.

Route Structure

 | Route | Public | Protected | Redirects To           |
| ----- | ------ | --------- | ---------------------- |
| /     | ❌      | -         | /auth                  |
| /auth | ✅      | ❌         | -                      |
| /home | ❌      | ✅         | /auth if not logged in |
| /bots | ❌      | ✅         | /auth if not logged in |

🌐 WebSocket Integration
Socket Service
File: /src/services/socketService.js

Methods

socketService.connect()                      // Connect with JWT token
socketService.sendMessage(botId, message)    // Send chat message
socketService.onMessage(callback)            // Listen for responses
socketService.onTyping(callback)             // Listen for typing
socketService.disconnect()                   // Close connection


WebSocket Events

| Event        | Direction       | Payload                                | Description        |
| ------------ | --------------- | -------------------------------------- | ------------------ |
| chat_message | Client → Server | { bot_id, message, conversation_id }   | User sends message |
| bot_response | Server → Client | { message, educational_image, bot_id } | Bot replies        |
| bot_typing   | Server → Client | { typing: true }                       | Bot is typing      |


Example Usage

// Connect on component mount
useEffect(() => {
  socketService.connect();
  
  socketService.onMessage((data) => {
    console.log('Bot response:', data.message);
    console.log('Image:', data.educational_image);
  });
  
  return () => socketService.disconnect();
}, []);

// Send message
socketService.sendMessage(botId, "What is photosynthesis?");

🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request



👥 Authors
Your Name - Initial work - akashshettyonline22-codestar

🙏 Acknowledgments
React team for the amazing framework

Tailwind CSS for the utility-first CSS

Socket.IO for real-time communication

All contributors who helped with this project

📞 Support
For issues or questions:

📧 Email: akashshettyonline22@gmail.com

🐛 Issues: GitHub Issues

💬 Discussions: GitHub Discussions

<div align="center">
Built with ❤️ using React, Tailwind CSS, and Socket.IO

⭐ Star this repo if you find it helpful!

</div> ```
