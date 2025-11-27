import { apiPost, apiGet } from '../utils/apiFetch';

class BotService {
  // Create a new bot
  async createBot(botData) {
    try {
      const formData = new FormData();
      formData.append('name', botData.name);
      formData.append('subject', botData.subject);
      formData.append('grade', botData.grade);
      
      if (botData.description) {
        formData.append('description', botData.description);
      }
      
      if (botData.textbook) {
        formData.append('textbook', botData.textbook);
      }

      const data = await apiPost('/textbooks/upload', formData);

      // Check for custom success flag from your API
      if (!data.success) {
        throw new Error(data.error || 'Failed to create bot');
      }

      return data;
    } catch (error) {
      console.error('Create bot error:', error);
      throw error;
    }
  }

  // Get all bots
  async getBots() {
    try {
      return await apiGet('/bots');
    } catch (error) {
      console.error('Get bots error:', error);
      throw error;
    }
  }
}

export default new BotService();
