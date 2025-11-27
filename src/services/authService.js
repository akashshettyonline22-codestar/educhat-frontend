import { getApiBaseUrl } from '../config/env';

class AuthService {
  constructor() {
    this.baseUrl = getApiBaseUrl();
  }

  async register(userData) {
    try {
      const response = await fetch(`${this.baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || 'Registration failed');
      }

      // Store token if provided
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
      }

      return data;
    } catch (error) {
      console.error('Register API Error:', error);
      throw error;
    }
  }
   // 🔥 LOGIN METHOD - NEW
  async login(loginData) {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || 'Login failed');
      }

      // Store token if provided
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
      }

      return data;
    } catch (error) {
      console.error('Login API Error:', error);
      throw error;
    }
  }

  // Helper methods
  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new AuthService();
