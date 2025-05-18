import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Big Brother Property Solutions',
  description: 'Professional cleaning services for residential and commercial properties',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 