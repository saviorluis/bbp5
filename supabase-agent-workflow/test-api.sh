#!/bin/bash

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Configuration
API_URL=${N8N_WEBHOOK_URL:-"http://localhost:5678/webhook/mcp/tool/supabase"}
USER_ID=${USER_ID:-"test-user-123"}
SESSION_ID=$(uuidgen | tr '[:upper:]' '[:lower:]')

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Testing AI Agent API${NC}"
echo "URL: $API_URL/$USER_ID"
echo "Session ID: $SESSION_ID"
echo

# Test data
read -p "Enter your message to the AI agent: " USER_MESSAGE

# Create the request payload
REQUEST=$(cat <<EOF
{
  "input": "$USER_MESSAGE",
  "sessionId": "$SESSION_ID",
  "context": {
    "source": "api-test-script"
  }
}
EOF
)

# Make the request
echo -e "${BLUE}Sending request...${NC}"
echo "$REQUEST" | jq .

RESPONSE=$(curl -s -X POST "$API_URL/$USER_ID" \
  -H "Content-Type: application/json" \
  -d "$REQUEST")

# Check if the request was successful
if [ $? -eq 0 ]; then
  echo -e "\n${GREEN}Response received:${NC}"
  echo "$RESPONSE" | jq .
else
  echo -e "\n${RED}Error making request${NC}"
  echo "$RESPONSE"
fi 