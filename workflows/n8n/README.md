# Using n8n with BBPS Website

This guide explains how to use n8n for automating workflows in the BBPS cleaning website, including form submissions, email notifications, and more.

## Getting Started with n8n

### Running n8n Locally

1. Start the n8n server:

   ```bash
   cd /Users/luis/new\ bbps\ site/bbps-clean
   npm run n8n:dev
   ```

2. Access the n8n dashboard at http://localhost:5678/

3. Create an account or login

### Creating Webhooks for Form Submissions

1. In the n8n dashboard, create a new workflow
2. Add a "Webhook" node as the trigger
3. Configure the webhook with the following settings:

   - Authentication: None
   - HTTP Method: POST
   - Path: Use one of these paths:
     - `/quote-form` - For the main quote form
     - `/contact-form` - For the contact us form
     - `/residential-quote` - For residential quote requests
     - `/commercial-quote` - For commercial quote requests

4. Click "Execute node" to get the webhook URL

### Example Email Notification Workflow

Here's a simple workflow to send an email when a form is submitted:

1. Add a "Webhook" node as described above
2. Add an "Email (SMTP)" node

   - Configure your SMTP settings
   - Set the recipient to your business email
   - Use an expression like this for the subject:
     ```
     New Quote Request from {{$json["name"]}}
     ```
   - Use an expression like this for the body:

     ```
     Name: {{$json["name"]}}
     Email: {{$json["email"]}}
     Phone: {{$json["phone"]}}
     Service Type: {{$json["serviceType"]}}

     Message:
     {{$json["message"]}}
     ```

3. Connect the Webhook node to the Email node
4. Save and activate the workflow

### Other Useful Automations

1. **CRM Integration**: Add a node to create a new contact in your CRM system
2. **Slack Notifications**: Send notifications to your team's Slack channel
3. **Calendar Events**: Create follow-up calendar events
4. **Lead Scoring**: Score leads based on form data
5. **Automated Responses**: Send customized confirmation emails to clients

## Deployment Options

### Option 1: Deploy n8n to a Cloud Provider

1. Deploy n8n to a cloud provider like DigitalOcean, AWS, or Heroku
2. Update your environment variables to point to the deployed n8n instance

### Option 2: Use n8n Cloud

1. Sign up for n8n Cloud at https://www.n8n.cloud/
2. Recreate your workflows in n8n Cloud
3. Update your environment variables to point to your n8n Cloud instance

## Troubleshooting

- If forms aren't being submitted to n8n:

  - Check that n8n is running
  - Verify the webhook URL is correct
  - Check browser console for errors
  - Ensure the API route is working correctly

- If emails aren't being sent:
  - Check your SMTP settings
  - Verify the email node is configured correctly
  - Check workflow execution logs in n8n

## Need Help?

Contact the development team for assistance with n8n workflows and integrations.
