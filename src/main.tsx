import { createRoot } from 'react-dom/client'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
