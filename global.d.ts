// Global TypeScript declarations
declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

// Declare types for any components that don't have type definitions
declare module 'react-hook-form' {
  export * from 'react-hook-form';
}

declare module '@hookform/resolvers/zod' {
  export * from '@hookform/resolvers/zod';
}

// Allow any prop types temporarily
declare namespace JSX {
  interface IntrinsicAttributes {
    [key: string]: any;
  }
} 