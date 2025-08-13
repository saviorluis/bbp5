# Google Form Setup Instructions for BBPS Application Process

## Step 1: Create the Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Click "Blank" to create a new form
3. Click "Untitled form" at the top and rename it to: **Big Brother Property Solutions - Job Application**

## Step 2: Add Form Description

In the description field, add:

```
Join our team at Big Brother Property Solutions! We're looking for dedicated cleaning professionals to help us provide exceptional service to our clients.

¡Únete a nuestro equipo en Big Brother Property Solutions! Estamos buscando profesionales de limpieza dedicados para ayudarnos a brindar un servicio excepcional a nuestros clientes.
```

## Step 3: Build the Form

Follow the detailed structure in `google-form-structure.md` to create all sections and questions. Here's a quick checklist:

### Sections to Create:

- [ ] Language Preference / Preferencia de Idioma
- [ ] Personal Information / Información Personal
- [ ] Experience & Qualifications / Experiencia y Calificaciones
- [ ] Cleaning Specializations / Especializaciones de Limpieza
- [ ] Work Areas & Availability / Áreas de Trabajo y Disponibilidad
- [ ] Transportation & Further Work / Transporte y Trabajo Adicional
- [ ] Additional Information / Información Adicional

### Key Questions to Include:

- [ ] Language preference (English/Spanish/Both)
- [ ] Years of cleaning experience
- [ ] Types of cleaning services experience
- [ ] Equipment experience
- [ ] Work areas/locations willing to work
- [ ] Maximum travel distance
- [ ] Availability for overnight projects
- [ ] Transportation availability
- [ ] When can start working

## Step 4: Configure Form Settings

1. Click the gear icon (Settings) in the top right
2. **General Tab:**
   - ✅ Collect email addresses
   - ✅ Limit to 1 response
   - ✅ Allow response editing (set to 24 hours)
3. **Presentation Tab:**

   - ✅ Show progress bar
   - ✅ Shuffle question order: OFF
   - Set confirmation message:

   ```
   Thank you for your application! We will review your information and contact you within 3-5 business days.

   ¡Gracias por su aplicación! Revisaremos su información y nos comunicaremos con usted dentro de 3-5 días hábiles.
   ```

4. **Quizzes Tab:** (Leave as default - this is not a quiz)

## Step 5: Set Up Response Collection

1. Click the "Responses" tab
2. Click the green Google Sheets icon to create a spreadsheet
3. Name it: "BBPS Job Applications - [Current Year]"
4. Click "Create"

## Step 6: Get the Embed Code

1. Click the "Send" button (top right)
2. Click the `< >` (embed) icon
3. Adjust width and height:
   - Width: 640 (or leave default)
   - Height: 800+ (to accommodate the long form)
4. Copy the embed code

## Step 7: Extract the Form ID

From the embed code, find the form ID. It looks like this:

```html
<iframe
  src="https://docs.google.com/forms/d/e/1FAIpQLSc...YOUR_FORM_ID.../viewform?embedded=true"
></iframe>
```

The form ID is the long string between `/d/e/` and `/viewform`

## Step 8: Update Your Website

Replace `YOUR_FORM_ID` in the following files with your actual form ID:

**File: `/src/app/work-with-us/page.tsx`**

Lines to update:

- Line 74: `src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"`
- Line 93: `href="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform"`

## Step 9: Set Up Notifications (Optional but Recommended)

1. Open the Google Sheet created in Step 5
2. Go to **Extensions** > **Apps Script**
3. Replace the default code with this notification script:

```javascript
function onFormSubmit(e) {
  // Configuration
  const NOTIFICATION_EMAIL = "your-email@company.com"; // Replace with your email
  const COMPANY_NAME = "Big Brother Property Solutions";

  // Get form responses
  const responses = e.values;
  const timestamp = responses[0];
  const email = responses[1]; // Assuming email is the second field

  // Create email subject and body
  const subject = `New Job Application - ${COMPANY_NAME}`;
  const body = `
    A new job application has been submitted.
    
    Timestamp: ${timestamp}
    Applicant Email: ${email}
    
    View all responses: ${e.range.getSheet().getUrl()}
    
    Please review the application and follow up within 3-5 business days.
  `;

  // Send notification email
  try {
    GmailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
}
```

4. Save the script (Ctrl+S or Cmd+S)
5. Go to **Triggers** (clock icon on the left)
6. Click **+ Add Trigger**
7. Configure:
   - Function: `onFormSubmit`
   - Event source: `From spreadsheet`
   - Event type: `On form submit`
8. Click **Save**

## Step 10: Test the Form

1. Visit your website's work-with-us page
2. Fill out the form completely
3. Submit and verify:
   - Responses appear in Google Sheets
   - Confirmation message displays
   - Notification email is sent (if configured)

## Step 11: Optional Enhancements

### Add Form Analytics

1. In Google Forms, click **Responses** tab
2. Click the three dots menu
3. Select **Get email notifications for new responses**

### Custom Thank You Page

1. In Form Settings > Presentation
2. Set a custom confirmation message or redirect URL

### Backup/Export Responses

1. Regularly export response data from Google Sheets
2. Go to **File** > **Download** > Choose format (Excel, CSV, etc.)

## Troubleshooting

### Form Not Loading

- Check that the form ID is correct
- Ensure the form is set to "Anyone with the link can respond"
- Try the fallback link button

### Iframe Issues

- Some mobile browsers may not display iframes properly
- The fallback link button will open the form in a new tab

### Response Issues

- Verify all required fields are marked as required
- Check Google Sheets permissions
- Ensure notification script has proper permissions

## Security Considerations

1. **Form Access**: Set to "Anyone with the link" but consider "Restricted to organization" if you have Google Workspace
2. **Response Data**: Regularly backup and secure applicant data
3. **Email Notifications**: Use a dedicated hiring email address
4. **Data Retention**: Establish policies for how long to keep application data

## Next Steps After Setup

1. Train your team on accessing and reviewing applications
2. Create a standardized response process
3. Consider integrating with your existing HR/hiring workflow
4. Monitor form completion rates and adjust as needed
5. Regularly review and update form questions based on hiring needs
