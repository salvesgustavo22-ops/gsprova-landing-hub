import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.tsx';
import './index.css';
import { preconnectToDomains } from './utils/seo.ts';
import Termos from "./pages/Termos.tsx";
import Privacidade from "./pages/Privacidade.tsx";
import Sobre from "./pages/Sobre.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/termos" element={<Termos />} />
      <Route path="/privacidade" element={<Privacidade />} />
    </Routes>
  </BrowserRouter>
);
// Preconnect to external domains for better performance
preconnectToDomains([
  'https://fonts.googleapis.com',
  'https://www.googletagmanager.com',
  'https://klxkjwreoxvvqtphieah.supabase.co'
]);

createRoot(document.getElementById("root")!).render(<App />);
