/**
 * Knowledge Base Populator for Supabase RAG Agent
 * 
 * This script helps you add initial documents to your knowledge base
 * and generates embeddings for them using OpenAI.
 */

// Import required packages
// Use these if running with Node.js:
// npm install @supabase/supabase-js openai dotenv

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { Configuration, OpenAIApi } = require('openai');

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const USER_ID = process.env.USER_ID; // The user ID to associate with this knowledge

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Initialize OpenAI configuration
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Example knowledge items to add
const knowledgeItems = [
  {
    title: 'Company Mission Statement',
    content: 'Our mission is to create innovative solutions that empower businesses to achieve their full potential. We believe in sustainable practices and putting customers first.',
    category: 'About',
    tags: ['mission', 'vision', 'values'],
    source_url: 'https://example.com/about',
  },
  {
    title: 'Product Features',
    content: 'Our flagship product includes real-time analytics, automated reporting, and AI-powered insights. All features are accessible through our user-friendly dashboard and mobile app.',
    category: 'Products',
    tags: ['features', 'analytics', 'dashboard'],
    source_url: 'https://example.com/products',
  },
  {
    title: 'Pricing Plans',
    content: 'We offer three tiers of subscription: Basic ($10/mo), Pro ($25/mo), and Enterprise ($100/mo). All plans include core features with varying limits on usage and premium features.',
    category: 'Sales',
    tags: ['pricing', 'subscription', 'plans'],
    source_url: 'https://example.com/pricing',
  },
];

/**
 * Creates an embedding for a given text using OpenAI API
 * @param {string} text - The text to create an embedding for
 * @returns {Promise<Array<number>>} - The embedding vector
 */
async function createEmbedding(text) {
  try {
    const response = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: text,
    });
    return response.data.data[0].embedding;
  } catch (error) {
    console.error('Error creating embedding:', error);
    throw error;
  }
}

/**
 * Adds a knowledge item to the database with its embedding
 * @param {Object} item - The knowledge item to add
 * @returns {Promise<Object>} - The result of the database insertion
 */
async function addKnowledgeItem(item) {
  try {
    // Create embedding for the content
    const embedding = await createEmbedding(item.content);
    
    // Insert into the database
    const { data, error } = await supabase
      .from('agent_knowledge')
      .insert({
        user_id: USER_ID,
        title: item.title,
        content: item.content,
        content_embedding: embedding,
        category: item.category,
        tags: item.tags,
        source_url: item.source_url,
        metadata: {},
      });
    
    if (error) throw error;
    
    console.log(`Added knowledge item: ${item.title}`);
    return data;
  } catch (error) {
    console.error(`Error adding knowledge item "${item.title}":`, error);
    throw error;
  }
}

/**
 * Main function to populate the knowledge base
 */
async function populateKnowledgeBase() {
  console.log('Starting knowledge base population...');
  
  try {
    for (const item of knowledgeItems) {
      await addKnowledgeItem(item);
    }
    console.log('Knowledge base population completed successfully!');
  } catch (error) {
    console.error('Error populating knowledge base:', error);
  }
}

// Run the function
populateKnowledgeBase(); 