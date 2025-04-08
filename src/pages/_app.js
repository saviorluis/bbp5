import '../app/globals.css';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  // Disable any problematic scripts that might be causing CSP errors
  useEffect(() => {
    // Function to remove problematic scripts
    const removeScripts = () => {
      // Remove any lockdown scripts that might be injected
      const lockdownScripts = document.querySelectorAll('script[src*="lockdown-install.js"]');
      lockdownScripts.forEach(script => script.remove());
      
      // Remove any other security scripts that might be causing issues
      const securityScripts = document.querySelectorAll('script[src*="security"]');
      securityScripts.forEach(script => script.remove());
    };
    
    // Run immediately
    removeScripts();
    
    // Also set up a MutationObserver to catch dynamically added scripts
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          removeScripts();
        }
      }
    });
    
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        {/* Explicitly set favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        {/* Meta tag to allow unsafe-eval */}
        <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://*; connect-src 'self' https://*;" />
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
