/**
 * BBPS AI Agent - Website Integration
 * 
 * This file contains code to integrate the AI agent into your website.
 * Copy the relevant parts into your existing website code.
 */

// ======== SERVER-SIDE CODE (Node.js) ========
// Add this to your existing server file (e.g., app.js, server.js)

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Configuration - update with your actual values
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/mcp/tool/supabase';
const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || 'default-user'; // Used for anonymous sessions

// API route for the chat
router.post('/api/chat', async (req, res) => {
  try {
    const { input, sessionId, userId = DEFAULT_USER_ID } = req.body;
    
    // Validate input
    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }
    
    // Generate a session ID if not provided
    const activeSessionId = sessionId || `session-${Date.now()}`;
    
    // Call the n8n webhook
    const response = await axios.post(`${N8N_WEBHOOK_URL}/${userId}`, {
      input,
      sessionId: activeSessionId,
      context: {
        source: 'website',
        url: req.headers.referer || 'unknown',
        // Add any other context you want to pass to the agent
      }
    });
    
    // Return the AI response
    res.json(response.data);
    
  } catch (error) {
    console.error('Error calling AI agent:', error.message);
    res.status(500).json({ 
      error: 'An error occurred while processing your request',
      details: error.message
    });
  }
});

// Export the router for use in your main app
// app.use(router);

// ======== CLIENT-SIDE CODE (JavaScript) ========
// Add this to your website's JavaScript file or in a <script> tag

/**
 * BBPS AI Chat Widget
 * Add this to your website to create a chat interface for the AI agent
 */
class BBPSAIChat {
  constructor(options = {}) {
    this.apiEndpoint = options.apiEndpoint || '/api/chat';
    this.position = options.position || 'bottom-right';
    this.userId = options.userId;
    this.sessionId = options.sessionId || `session-${Math.random().toString(36).substring(2, 10)}`;
    this.theme = options.theme || {
      primary: '#0084ff',
      secondary: '#e5e5ea',
      background: '#fff',
      text: '#333'
    };
    
    this.isOpen = false;
    this.messages = [];
    
    this.createWidget();
    this.attachEventListeners();
  }
  
  createWidget() {
    // Create the chat button
    const button = document.createElement('div');
    button.className = 'bbps-chat-button';
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
    
    // Create the chat container
    const container = document.createElement('div');
    container.className = 'bbps-chat-container';
    container.style.display = 'none';
    
    // Create chat header
    const header = document.createElement('div');
    header.className = 'bbps-chat-header';
    header.innerHTML = `
      <h3>BBPS Assistant</h3>
      <button class="bbps-chat-close">&times;</button>
    `;
    
    // Create chat messages area
    const messages = document.createElement('div');
    messages.className = 'bbps-chat-messages';
    
    // Create input area
    const inputArea = document.createElement('div');
    inputArea.className = 'bbps-chat-input';
    inputArea.innerHTML = `
      <input type="text" placeholder="Type your question here...">
      <button type="submit">Send</button>
    `;
    
    // Assemble the components
    container.appendChild(header);
    container.appendChild(messages);
    container.appendChild(inputArea);
    
    // Add to document
    const widgetWrapper = document.createElement('div');
    widgetWrapper.className = `bbps-chat-widget ${this.position}`;
    widgetWrapper.appendChild(button);
    widgetWrapper.appendChild(container);
    
    document.body.appendChild(widgetWrapper);
    
    // Add styles
    this.addStyles();
    
    // Store references
    this.widgetWrapper = widgetWrapper;
    this.button = button;
    this.container = container;
    this.messagesEl = messages;
    this.inputEl = inputArea.querySelector('input');
    this.sendButton = inputArea.querySelector('button');
    this.closeButton = header.querySelector('.bbps-chat-close');
  }
  
  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .bbps-chat-widget {
        position: fixed;
        z-index: 9999;
        font-family: Arial, sans-serif;
      }
      
      .bottom-right {
        bottom: 20px;
        right: 20px;
      }
      
      .bottom-left {
        bottom: 20px;
        left: 20px;
      }
      
      .bbps-chat-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: ${this.theme.primary};
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      }
      
      .bbps-chat-container {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 350px;
        height: 500px;
        background-color: ${this.theme.background};
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
      }
      
      .bbps-chat-header {
        padding: 15px;
        background-color: ${this.theme.primary};
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .bbps-chat-header h3 {
        margin: 0;
        font-size: 16px;
      }
      
      .bbps-chat-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
      }
      
      .bbps-chat-messages {
        flex-grow: 1;
        padding: 15px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
      }
      
      .bbps-chat-message {
        padding: 10px 15px;
        border-radius: 18px;
        margin-bottom: 10px;
        max-width: 70%;
        word-wrap: break-word;
      }
      
      .bbps-chat-message.user {
        background-color: ${this.theme.primary};
        color: white;
        align-self: flex-end;
      }
      
      .bbps-chat-message.agent {
        background-color: ${this.theme.secondary};
        color: ${this.theme.text};
        align-self: flex-start;
      }
      
      .bbps-chat-input {
        display: flex;
        padding: 10px;
        border-top: 1px solid #e0e0e0;
      }
      
      .bbps-chat-input input {
        flex-grow: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
      }
      
      .bbps-chat-input button {
        padding: 10px 15px;
        margin-left: 10px;
        background-color: ${this.theme.primary};
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .bbps-typing-indicator {
        display: flex;
        padding: 10px 15px;
        background-color: ${this.theme.secondary};
        border-radius: 18px;
        margin-bottom: 10px;
        align-self: flex-start;
        max-width: 70%;
      }
      
      .bbps-typing-indicator span {
        height: 8px;
        width: 8px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        display: inline-block;
        margin-right: 5px;
        animation: bbpsTypingBounce 1.5s infinite ease-in-out;
      }
      
      .bbps-typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .bbps-typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
        margin-right: 0;
      }
      
      @keyframes bbpsTypingBounce {
        0%, 60%, 100% {
          transform: translateY(0);
        }
        30% {
          transform: translateY(-4px);
        }
      }
    `;
    
    document.head.appendChild(style);
  }
  
  attachEventListeners() {
    // Toggle chat on button click
    this.button.addEventListener('click', () => {
      this.toggleChat();
    });
    
    // Close chat
    this.closeButton.addEventListener('click', () => {
      this.toggleChat(false);
    });
    
    // Send message on button click
    this.sendButton.addEventListener('click', () => {
      this.sendMessage();
    });
    
    // Send message on Enter key
    this.inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
  }
  
  toggleChat(forceState) {
    this.isOpen = forceState !== undefined ? forceState : !this.isOpen;
    this.container.style.display = this.isOpen ? 'flex' : 'none';
    
    if (this.isOpen) {
      this.inputEl.focus();
      
      // Add welcome message if this is the first open
      if (this.messages.length === 0) {
        this.addMessage('How can I help you today?', 'agent');
      }
    }
  }
  
  addMessage(content, sender) {
    // Store the message
    this.messages.push({ content, sender });
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `bbps-chat-message ${sender}`;
    messageEl.textContent = content;
    
    // Add to chat
    this.messagesEl.appendChild(messageEl);
    
    // Scroll to bottom
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }
  
  showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'bbps-typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    
    this.messagesEl.appendChild(indicator);
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    
    return indicator;
  }
  
  async sendMessage() {
    const message = this.inputEl.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    this.addMessage(message, 'user');
    
    // Clear input
    this.inputEl.value = '';
    
    // Show typing indicator
    const typingIndicator = this.showTypingIndicator();
    
    try {
      // Call the API
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: message,
          sessionId: this.sessionId,
          userId: this.userId
        })
      });
      
      const data = await response.json();
      
      // Remove typing indicator
      typingIndicator.remove();
      
      // Add AI response to chat
      this.addMessage(data.aiResponse, 'agent');
      
    } catch (error) {
      console.error('Error:', error);
      
      // Remove typing indicator
      typingIndicator.remove();
      
      // Add error message
      this.addMessage('Sorry, there was an error processing your request.', 'agent');
    }
  }
}

// Usage: Initialize the chat widget
// window.addEventListener('DOMContentLoaded', () => {
//   const chat = new BBPSAIChat({
//     apiEndpoint: '/api/chat',
//     position: 'bottom-right',
//     theme: {
//       primary: '#4a90e2',
//       secondary: '#f0f0f0'
//     }
//   });
// }); 