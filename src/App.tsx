import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import Index from './pages/Index';
import Planos from './pages/Planos';
import Leads from './pages/Leads';
import Obrigado from './pages/Obrigado';
import Contato from './pages/Contato';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Enem2026 from './pages/Enem2026';
import Fuvest2026 from './pages/Fuvest2026';
import LeadChecklist from './pages/LeadChecklist';
import LeadServicos from './pages/LeadServicos';
import ObrigadoChecklist from './pages/ObrigadoChecklist';
import ObrigadoServicos from './pages/ObrigadoServicos';
import TemasRedacao from './pages/TemasRedacao';
import AuthAluno from './pages/AuthAluno';
import PortalAluno from './pages/PortalAluno';
import EnviarRedacao from './pages/EnviarRedacao';
import MinhasRedacoes from './pages/MinhasRedacoes';
import CorretorPanel from './pages/CorretorPanel';
import RedefinirSenha from './pages/RedefinirSenha';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PlantaoEnem2026 from './pages/PlantaoEnem2026';
import AnnouncementBar from './components/AnnouncementBar';
import PlantaoFloatingBox from './components/PlantaoFloatingBox';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnnouncementBar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/planos" element={<Planos />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/obrigado" element={<Obrigado />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/enem-2026" element={<Enem2026 />} />
            <Route path="/enem-2025" element={<Navigate to="/enem-2026" replace />} />
            <Route path="/fuvest-2025" element={<Navigate to="/fuvest-2026" replace />} />
            <Route path="/temas-redacao-portal-secreto-gs-aprova-2025" element={<Navigate to="/temas-redacao-portal-secreto-gs-aprova-2026" replace />} />
            <Route path="/fuvest-2026" element={<Fuvest2026 />} />
            <Route path="/lead-checklist" element={<LeadChecklist />} />
            <Route path="/lead-servicos" element={<LeadServicos />} />
            <Route path="/obrigado-checklist" element={<ObrigadoChecklist />} />
            <Route path="/obrigado-servicos" element={<ObrigadoServicos />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/temas-redacao-portal-secreto-gs-aprova-2026" element={<TemasRedacao />} />
            <Route path="/auth-aluno" element={<AuthAluno />} />
            <Route path="/portal-aluno" element={<PortalAluno />} />
            <Route path="/enviar-redacao" element={<EnviarRedacao />} />
            <Route path="/minhas-redacoes" element={<MinhasRedacoes />} />
            <Route path="/corretor-painel-gs-aprova" element={<CorretorPanel />} />
            <Route path="/redefinir-senha" element={<RedefinirSenha />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/plantao-enem-2026" element={<PlantaoEnem2026 />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <PlantaoFloatingBox />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
