import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { preconnectToDomains } from './utils/seo.ts';

// Preconnect to external domains for better performance
preconnectToDomains([
  'https://fonts.googleapis.com',
  'https://www.googletagmanager.com',
  'https://klxkjwreoxvvqtphieah.supabase.co',
]);

createRoot(document.getElementById('root')!).render(<App />);
