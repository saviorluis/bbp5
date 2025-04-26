import { NextResponse } from 'next/server';
import { n8nConfig } from '../../../config/n8n';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formType, ...formData } = body;
    
    // Determine which n8n webhook to use based on form type
    let webhookId = '';
    switch (formType) {
      case 'quote':
        webhookId = n8nConfig.webhooks.quoteForm;
        break;
      case 'contact':
        webhookId = n8nConfig.webhooks.contactForm;
        break;
      case 'residentialQuote':
        webhookId = n8nConfig.webhooks.residentialQuote;
        break;
      case 'commercialQuote':
        webhookId = n8nConfig.webhooks.commercialQuote;
        break;
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid form type' },
          { status: 400 }
        );
    }
    
    // If in development mode and simulation is enabled, return success without calling n8n
    if (n8nConfig.simulateSuccess) {
      console.log('Simulating successful form submission:', { formType, formData });
      return NextResponse.json({
        success: true,
        message: 'Form submitted successfully (simulated)',
        simulated: true,
      });
    }
    
    // Forward the form data to n8n webhook
    const n8nResponse = await fetch(`${n8nConfig.webhookUrl}${webhookId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!n8nResponse.ok) {
      throw new Error(`n8n webhook responded with status: ${n8nResponse.status}`);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
    });
  } catch (error) {
    console.error('Error submitting form to n8n:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing form submission' },
      { status: 500 }
    );
  }
} 