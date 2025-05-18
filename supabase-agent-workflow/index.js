/**
 * Simple Express server to test the n8n workflow locally
 * 
 * This acts as a client to the n8n webhook and demonstrates
 * how to integrate with the AI agent from a Node.js application.
 * 
 * Usage:
 *   1. Install dependencies: npm install express dotenv axios
 *   2. Start server: node index.js
 *   3. Visit http://localhost:3000 in your browser
 */

const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuration
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/mcp/tool/supabase';
const USER_ID = process.env.USER_ID || 'test-user-123';

// Create HTML for the chat interface
app.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Agent Chat</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      .chat-container {
        border: 1px solid #ccc;
        border-radius: 8px;
        height: 400px;
        padding: 10px;
        overflow-y: auto;
        margin-bottom: 10px;
        background-color: #f9f9f9;
      }
      .message {
        padding: 8px 15px;
        margin-bottom: 10px;
        border-radius: 18px;
        max-width: 70%;
        word-wrap: break-word;
      }
      .user-message {
        background-color: #0084ff;
        color: white;
        margin-left: auto;
      }
      .agent-message {
        background-color: #e5e5ea;
        color: black;
      }
      .input-container {
        display: flex;
      }
      #user-input {
        flex-grow: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
      }
      button {
        padding: 10px 15px;
        margin-left: 10px;
        background-color: #0084ff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .session-info {
        font-size: 12px;
        color: #666;
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <h1>AI Agent Chat</h1>
    <div class="session-info">
      User ID: <span id="userId">${USER_ID}</span> | 
      Session ID: <span id="sessionId"></span>
    </div>
    <div class="chat-container" id="chat-container"></div>
    <div class="input-container">
      <input type="text" id="user-input" placeholder="Type your message here...">
      <button onclick="sendMessage()">Send</button>
    </div>

    <script>
      // Generate session ID (normally you'd get this from your backend)
      const sessionId = 'session-' + Math.random().toString(36).substring(2, 10);
      document.getElementById('sessionId').textContent = sessionId;
      
      // Add event listener for Enter key
      document.getElementById('user-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
      
      async function sendMessage() {
        const userInput = document.getElementById('user-input');
        const message = userInput.value.trim();
        
        if (!message) return;
        
        // Add user message to the chat
        addMessageToChat(message, 'user');
        userInput.value = '';
        
        try {
          // Call the API
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              input: message,
              sessionId: sessionId
            })
          });
          
          const data = await response.json();
          
          // Add AI response to the chat
          addMessageToChat(data.aiResponse, 'agent');
          
          // Scroll to bottom
          const chatContainer = document.getElementById('chat-container');
          chatContainer.scrollTop = chatContainer.scrollHeight;
          
        } catch (error) {
          console.error('Error:', error);
          addMessageToChat('Sorry, there was an error processing your request.', 'agent');
        }
      }
      
      function addMessageToChat(message, sender) {
        const chatContainer = document.getElementById('chat-container');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'agent-message');
        messageDiv.textContent = message;
        chatContainer.appendChild(messageDiv);
        
        // Scroll to the bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    </script>
  </body>
  </html>
  `;
  
  res.send(html);
});

// API endpoint to proxy requests to n8n
app.post('/api/chat', async (req, res) => {
  try {
    const { input, sessionId } = req.body;
    
    // Validate input
    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }
    
    // Call the n8n webhook
    const response = await axios.post(`${N8N_WEBHOOK_URL}/${USER_ID}`, {
      input,
      sessionId,
      context: {
        source: 'web-client'
      }
    });
    
    // Return the AI response
    res.json(response.data);
    
  } catch (error) {
    console.error('Error calling n8n webhook:', error.message);
    res.status(500).json({ 
      error: 'An error occurred while processing your request',
      details: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 