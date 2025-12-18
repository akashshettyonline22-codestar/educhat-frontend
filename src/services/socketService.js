import { io } from 'socket.io-client';
import { getApiBaseUrl } from '../config/env';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (this.socket?.connected) {
      console.log('Already connected');
      return this.socket;
    }

    const baseUrl = getApiBaseUrl();
    const token = localStorage.getItem('token');

    this.socket = io(baseUrl, {
      auth: { token: token },
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Send message to bot
  sendMessage(botId, message, conversationId) {
    if (!this.socket?.connected) {
      throw new Error('Not connected to server');
    }

    console.log('📤 Sending:', message);
    this.socket.emit('chat_message', {
      bot_id: botId,
      message: message,
      conversation_id: conversationId
    });
  }

  // Listen for bot responses
  onMessage(callback) {
    if (!this.socket) return;
    this.socket.on('bot_response', callback);
  }

  // Listen for typing
  onTyping(callback) {
    if (!this.socket) return;
    this.socket.on('bot_typing', callback);
  }

  // Remove listeners
  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }

  isConnected() {
    return this.socket?.connected || false;
  }
}

export default new SocketService();
