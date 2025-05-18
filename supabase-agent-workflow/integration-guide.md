# Integrating the AI Agent with Your Website

This guide explains how to add the AI agent to your existing BBPS website.

## Step 1: Set Up Backend API Endpoint

First, you need to add an API endpoint to your website's server code that will forward requests to the n8n workflow.

### For Next.js (if your site uses Next.js):

Create an API route at `pages/api/chat.js` or `app/api/chat/route.js` (for App Router):

```javascript
// pages/api/chat.js (for Pages Router)
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { input, sessionId } = req.body;
    const userId = process.env.DEFAULT_USER_ID || "default-user";

    if (!input) {
      return res.status(400).json({ error: "Input is required" });
    }

    // Call the n8n webhook
    const response = await axios.post(
      `${process.env.N8N_WEBHOOK_URL}/${userId}`,
      {
        input,
        sessionId: sessionId || `session-${Date.now()}`,
        context: {
          source: "bbps-website",
          url: req.headers.referer || "unknown",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error calling AI agent:", error.message);
    res.status(500).json({
      error: "An error occurred while processing your request",
      details: error.message,
    });
  }
}
```

### For Express.js:

Add to your server.js or app.js file:

```javascript
const express = require("express");
const axios = require("axios");
const router = express.Router();

// API route for the chat
router.post("/api/chat", async (req, res) => {
  try {
    const { input, sessionId } = req.body;
    const userId = process.env.DEFAULT_USER_ID || "default-user";

    if (!input) {
      return res.status(400).json({ error: "Input is required" });
    }

    // Call the n8n webhook
    const response = await axios.post(
      `${process.env.N8N_WEBHOOK_URL}/${userId}`,
      {
        input,
        sessionId: sessionId || `session-${Date.now()}`,
        context: {
          source: "bbps-website",
          url: req.headers.referer || "unknown",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error calling AI agent:", error.message);
    res.status(500).json({
      error: "An error occurred while processing your request",
      details: error.message,
    });
  }
});

app.use(router);
```

## Step 2: Add Environment Variables

Create or update your `.env` file with:

```
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/mcp/tool/supabase
DEFAULT_USER_ID=default-user
```

Make sure to replace the URL with your actual n8n webhook URL.

## Step 3: Add the Chat Widget to Your Website

### Option 1: Add the Chat Widget to a Specific Page

Add the following code to your page component (for example, in a React component):

```jsx
import { useEffect } from "react";
import Script from "next/script"; // For Next.js

export default function YourPage() {
  useEffect(() => {
    // Initialize chat widget after the component mounts
    if (typeof window !== "undefined") {
      const chat = new window.BBPSAIChat({
        apiEndpoint: "/api/chat",
        position: "bottom-right",
        theme: {
          primary: "#4a90e2", // Match your brand colors
          secondary: "#f0f0f0",
        },
      });
    }
  }, []);

  return (
    <div>
      <h1>Your Page Content</h1>

      {/* Include the chat widget script */}
      <Script
        id="bbps-chat-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            ${BBPSAIChatScript}
          `,
        }}
      />
    </div>
  );
}

// The chat widget script (copy from website-integration.js)
const BBPSAIChatScript = `
class BBPSAIChat {
  // ... (copy the entire class from website-integration.js)
}
`;
```

### Option 2: Add to Your Entire Site (Next.js)

For Next.js, you can add it to `_app.js` or `layout.js` to include it on all pages.

### Option 3: Add to Your Entire Site (Regular HTML/JS)

For a regular website, add this to your HTML:

```html
<script src="/path/to/bbps-ai-chat.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const chat = new BBPSAIChat({
      apiEndpoint: "/api/chat",
      position: "bottom-right",
    });
  });
</script>
```

## Step 4: Customize the Widget (Optional)

You can customize the appearance of the chat widget by modifying:

1. **Widget position**: 'bottom-right' or 'bottom-left'
2. **Theme colors**: Change primary, secondary colors to match your branding
3. **Widget text**: Update welcome messages or placeholder text

## Step 5: Populate Knowledge Base

Before your agent can give good answers about your business, you need to populate the knowledge base:

1. Run the `setup-knowledge-base.js` script after customizing it with your business information
2. Add information about:
   - Your cleaning services and pricing
   - Common FAQs
   - Service areas
   - Booking procedures

## Troubleshooting

If you encounter issues:

1. **Widget doesn't appear**: Check browser console for JavaScript errors
2. **Agent doesn't respond**: Verify your n8n workflow is active and the webhook URL is correct
3. **Agent gives generic answers**: Make sure you've populated the knowledge base

## Advanced: Adding Authentication

For authenticated users, you can pass the user ID to the chat widget:

```javascript
const chat = new BBPSAIChat({
  apiEndpoint: "/api/chat",
  position: "bottom-right",
  userId: "actual-user-id-from-auth-system", // Pass the authenticated user's ID
});
```

This will ensure the conversation history is linked to the specific user.
