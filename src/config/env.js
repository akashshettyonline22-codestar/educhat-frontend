// Environment configuration
const config = {
  development: {
    API_BASE_URL: 'http://127.0.0.1:8000'
  },
  production: {
    API_BASE_URL: 'https://your-production-api.com'
  },
  test: {
    API_BASE_URL: 'http://127.0.0.1:8000'
  }
};

// Get current environment (defaults to development)
const environment = process.env.NODE_ENV || 'development';

// Export the configuration for current environment
export const ENV_CONFIG = config[environment];

// Helper function to get API base URL
export const getApiBaseUrl = () => ENV_CONFIG.API_BASE_URL;
