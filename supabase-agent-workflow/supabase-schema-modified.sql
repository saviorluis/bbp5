-- Enable the pgvector extension for vector similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Agent Messages Table - Stores conversation history
CREATE TABLE IF NOT EXISTS agent_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  content_embedding VECTOR(1536),
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
  -- Removed foreign key constraint
);

-- Add vector index for faster similarity search
CREATE INDEX IF NOT EXISTS agent_messages_embedding_idx ON agent_messages USING ivfflat (content_embedding vector_cosine_ops) WITH (lists = 100);

-- Agent Tasks Table - Manages tasks for the agent
CREATE TABLE IF NOT EXISTS agent_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  priority INTEGER DEFAULT 1,
  due_date TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
  -- Removed foreign key constraint
);

-- Agent Status Table - Tracks the current state of the agent
CREATE TABLE IF NOT EXISTS agent_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL UNIQUE,
  current_session_id TEXT,
  last_interaction TIMESTAMPTZ DEFAULT NOW(),
  state JSONB DEFAULT '{}'::JSONB
  -- Removed foreign key constraint
);

-- Agent Knowledge Table - Stores domain-specific knowledge for RAG
CREATE TABLE IF NOT EXISTS agent_knowledge (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_embedding VECTOR(1536),
  category TEXT,
  tags TEXT[],
  source_url TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
  -- Removed foreign key constraint
);

-- Add vector index for knowledge base
CREATE INDEX IF NOT EXISTS agent_knowledge_embedding_idx ON agent_knowledge USING ivfflat (content_embedding vector_cosine_ops) WITH (lists = 100);

-- Row Level Security Policies
ALTER TABLE agent_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_knowledge ENABLE ROW LEVEL SECURITY;

-- Create policies - users can only see their own data
CREATE POLICY "Users can only view their own messages" 
  ON agent_messages FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can only insert their own messages" 
  ON agent_messages FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only view their own tasks" 
  ON agent_tasks FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can only manage their own tasks" 
  ON agent_tasks FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only view their own status" 
  ON agent_status FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can only manage their own status" 
  ON agent_status FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only view their own knowledge" 
  ON agent_knowledge FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can only manage their own knowledge" 
  ON agent_knowledge FOR ALL USING (auth.uid() = user_id); 