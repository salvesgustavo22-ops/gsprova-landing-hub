import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Contato from "./pages/Contato";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Enem2025 from "./pages/Enem2025";
import Fuvest2025 from "./pages/Fuvest2025";
import LeadChecklist from "./pages/LeadChecklist";
import LeadServicos from "./pages/LeadServicos";
import ObrigadoChecklist from "./pages/ObrigadoChecklist";
import ObrigadoServicos from "./pages/ObrigadoServicos";
import TemasRedacao from "./pages/TemasRedacao";
import AuthAluno from "./pages/AuthAluno";
import PortalAluno from "./pages/PortalAluno";
import EnviarRedacao from "./pages/EnviarRedacao";
import MinhasRedacoes from "./pages/MinhasRedacoes";
import CorretorPanel from "./pages/CorretorPanel";
import RedefinirSenha from "./pages/RedefinirSenha";
import PoliticaDePrivacidade from "./pages/PoliticaDePrivacidade";
import TermoDeUso from "./pages/TermoDeUso";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/enem-2025" element={<Enem2025 />} />
            <Route path="/fuvest-2025" element={<Fuvest2025 />} />
            <Route path="/lead-checklist" element={<LeadChecklist />} />
            <Route path="/lead-servicos" element={<LeadServicos />} />
            <Route path="/obrigado-checklist" element={<ObrigadoChecklist />} />
            <Route path="/obrigado-servicos" element={<ObrigadoServicos />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/temas-redacao-portal-secreto-gs-aprova-2025" element={<TemasRedacao />} />
            <Route path="/auth-aluno" element={<AuthAluno />} />
            <Route path="/portal-aluno" element={<PortalAluno />} />
            <Route path="/enviar-redacao" element={<EnviarRedacao />} />
            <Route path="/minhas-redacoes" element={<MinhasRedacoes />} />
            <Route path="/corretor-painel-gs-aprova" element={<CorretorPanel />} />
            <Route path="/redefinir-senha" element={<RedefinirSenha />} />
            <Route path="/PoliticaDePrivacidade" element={<PoliticaDePrivacidade />} />
            <Route path="/TermoDeUso" element={<TermoDeUso />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
