/**
 * AI-1 / Dr. Schedly — Configuration
 */

window.AI1_CONFIG = {
  /**
   * Google Identity Services Client ID.
   * Get one: https://console.cloud.google.com → APIs & Services → Credentials
   */
  GOOGLE_CLIENT_ID: '81385400492-1omf7oc78j0esockc1bmhebbidvc41vk.apps.googleusercontent.com',

  /**
   * Google Gemini API key.
   * Get one: https://aistudio.google.com/apikey
   * If empty, the AI Guru falls back to rule-based responses.
   */
  GEMINI_API_KEY: '',

  GEMINI_MODEL: 'gemini-2.0-flash',
  GEMINI_ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models',

  /** App metadata */
  APP_NAME: 'AI-1 / Dr. Schedly',
  APP_VERSION: '2.0.0'
};