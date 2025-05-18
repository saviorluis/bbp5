# Stateful AI Agent Workflow with Supabase and RAG

A complete n8n workflow for building AI agents with persistent memory and Retrieval-Augmented Generation using Supabase and OpenAI.

## Features

- 🧠 **Retrieval-Augmented Generation (RAG)**: Uses OpenAI embeddings and Supabase vector search to provide context-aware responses
- 🗃️ **Full CRUD Operations**: Manage conversations, tasks, status, and knowledge in real-time
- 📤 **Multi-Tenant Ready**: Supports per-user/organization data isolation with dynamic table names
- 🔒 **Secure**: Uses Supabase's Row Level Security (RLS) for data protection

## Setup Instructions

### 1. Prerequisites

- [n8n](https://n8n.io/) instance (self-hosted or cloud)
- [Supabase](https://supabase.com/) account and project
- [OpenAI](https://openai.com/) API key

### 2. Supabase Setup

1. Create a new Supabase project
2. Enable the `pgvector` extension in the SQL editor:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
3. Run the SQL script in `supabase-schema.sql` to create your database tables and policies

### 3. n8n Setup

1. Import the `n8n-workflow.json` file in n8n:
   - Go to n8n > Workflows > Import From File
   - Upload the workflow JSON file
2. Configure your credentials:

   - Add Supabase API credentials under Settings > Credentials
   - Add OpenAI API credentials under Settings > Credentials

3. Activate the workflow

### 4. Usage

#### Endpoint Structure

The workflow exposes a webhook at:

```
https://your-n8n-instance.com/webhook/mcp/tool/supabase/:userId
```

Where `:userId` is a unique identifier for the user or organization (used for multi-tenancy).

#### Request Format

Send a POST request with the following JSON body:

```json
{
  "input": "Your question or prompt here",
  "sessionId": "optional-session-id",
  "context": {
    "any": "additional context"
  }
}
```

#### Response Format

The webhook will return a JSON response:

```json
{
  "userId": "user-id",
  "sessionId": "session-id",
  "aiResponse": "The AI's response text",
  "detectedTasks": [{ "title": "Task 1", "status": "pending" }],
  "timestamp": "2023-05-01T12:34:56Z"
}
```

## Customization

### Modifying the Agent's Behavior

The AI agent's behavior can be customized by editing the system prompt in the "Prepare AI Context" node.

### Adding Functionality

You can extend the workflow with additional nodes to:

- Connect to external APIs
- Add Slack/Microsoft Teams notifications
- Implement approval workflows
- Add custom document processing

## Use Cases

- **Customer Support**: Build chatbots that remember conversation history and reference your knowledge base
- **Task Management**: Create agents that can detect and manage tasks automatically
- **Knowledge Management**: Build a system that can retrieve relevant information from your documents

## License

MIT
