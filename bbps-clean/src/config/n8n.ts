// Configuration for connecting to n8n workflows
export const n8nConfig = {
  // Base URL for n8n webhooks
  webhookUrl: process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/',
  
  // Webhook IDs for different form types
  webhooks: {
    quoteForm: process.env.QUOTE_FORM_WEBHOOK_ID || 'quote-form',
    contactForm: process.env.CONTACT_FORM_WEBHOOK_ID || 'contact-form',
    residentialQuote: process.env.RESIDENTIAL_QUOTE_WEBHOOK_ID || 'residential-quote',
    commercialQuote: process.env.COMMERCIAL_QUOTE_WEBHOOK_ID || 'commercial-quote',
  },
  
  // Whether to simulate successful form submissions in development
  // (when n8n is not running)
  simulateSuccess: process.env.NODE_ENV === 'development',
}; 