import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency with proper decimal places and dollar sign
export function formatCurrency(value: number | undefined): string {
  if (value === undefined || value === null) return '$0.00';
  return '$' + value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Get the current quote counter from localStorage
export function getQuoteCounter(): number {
  if (typeof window === 'undefined') return 121;
  const storedCounter = localStorage.getItem('quoteCounter');
  return storedCounter ? parseInt(storedCounter, 10) : 121;
}

// Increment the quote counter and save to localStorage
export function incrementQuoteCounter(): number {
  const currentCounter = getQuoteCounter();
  const newCounter = currentCounter + 1;
  if (typeof window !== 'undefined') {
    localStorage.setItem('quoteCounter', newCounter.toString());
  }
  return newCounter;
}

// Generate a quote number with year and counter
export function generateQuoteNumber(): string {
  const counter = getQuoteCounter();
  return `Q-${new Date().getFullYear()}-${counter}`;
}

// Format date in MM/DD/YYYY format
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
} 