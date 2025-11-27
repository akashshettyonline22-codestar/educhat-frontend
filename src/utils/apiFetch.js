import { getApiBaseUrl } from '../config/env';

/**
 * Centralized API fetch function with automatic:
 * - Auth header injection
 * - 401/403 handling (redirect to /auth)
 * - Error handling
 * - JSON/FormData support
 */
export async function apiFetch(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Build headers
  const headers = {
    ...options.headers,
  };

  // Add Authorization if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Only set Content-Type for non-FormData bodies
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  try {
    // Make the fetch request
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle 401 Unauthorized or 403 Forbidden
    if (response.status === 401 || response.status === 403) {
      // Clear token
      localStorage.removeItem('token');
      
      // Redirect to auth page
      window.location.href = '/auth';
      
      throw new Error('Session expired. Please login again.');
    }

    // Handle 404
    if (response.status === 404) {
      throw new Error('Resource not found (404)');
    }

    // Try to parse JSON response
    let data = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    }

    // Handle other error status codes
    if (!response.ok) {
      const errorMessage = (data && (data.detail || data.message)) || `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}

// Convenience wrapper functions
export const apiGet = (endpoint) => {
  return apiFetch(endpoint, { method: 'GET' });
};

export const apiPost = (endpoint, body) => {
  return apiFetch(endpoint, {
    method: 'POST',
    body: body instanceof FormData ? body : JSON.stringify(body),
  });
};

export const apiPut = (endpoint, body) => {
  return apiFetch(endpoint, {
    method: 'PUT',
    body: body instanceof FormData ? body : JSON.stringify(body),
  });
};

export const apiDelete = (endpoint) => {
  return apiFetch(endpoint, { method: 'DELETE' });
};
