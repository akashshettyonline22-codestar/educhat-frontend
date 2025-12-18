import { apiGet } from "../utils/apiFetch";

class AnalyticsService {
  // Get dashboard analytics
  async getAnalytics() {
    try {
      return await apiGet('/analytics/');
    } catch (error) {
      console.error('Get analytics error:', error);
      throw error;
    }
  }
}

export default new AnalyticsService();
