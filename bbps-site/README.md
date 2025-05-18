# Big Brother Property Solutions (BBPS) Website

This is the codebase for the Big Brother Property Solutions company website. It's built with Next.js and Tailwind CSS.

## Local Development

Follow these steps to run the site locally:

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bbps-cleaning-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **View the site**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Production Deployment

To deploy the site to production:

1. **Build the site**

   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   The easiest way to deploy is using Vercel:
   ```bash
   npm install -g vercel
   vercel
   ```

## Troubleshooting Deployment Issues

If you encounter Content Security Policy (CSP) errors or other deployment issues:

1. **Check your Vercel configuration**

   - Make sure the vercel.json file is correctly set up
   - Verify the build command in Vercel dashboard is set to `npm run build`
   - Set the output directory to `out`

2. **For CSP issues**
   If you see "Content Security Policy blocks the use of 'eval' in JavaScript":

   - Make sure vercel.json includes proper CSP headers
   - Consider temporarily allowing 'unsafe-eval' during development

3. **Domain configuration**
   When setting up custom domains:
   - Allow time for DNS changes to propagate
   - Verify SSL certificates are correctly generated
   - Check your DNS configuration matches Vercel's requirements

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/components/ui` - UI component library
- `/src/lib` - Utility functions
- `/public` - Static assets

## Technology Stack

- Next.js
- React
- Tailwind CSS
- TypeScript
