import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Upload, LogOut, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const PortalAluno = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openThemes, setOpenThemes] = useState<string[]>([]);
  const [showSubmissionDialog, setShowSubmissionDialog] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth-aluno');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: 'Erro ao sair',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      navigate('/');
    }
  };

  const handleSubmissionChoice = (type: 'gs_aprova' | 'external') => {
    navigate(`/enviar-redacao?type=${type}`);
    setShowSubmissionDialog(false);
  };

  const toggleTheme = (themeId: string) => {
    setOpenThemes(prev =>
      prev.includes(themeId) ? prev.filter(id => id !== themeId) : [...prev, themeId]
    );
  };

  const themes = [
    {
      id: '1',
      title: 'Desafios da inclusão social no Brasil contemporâneo',
      supportTexts: [
        'A inclusão social no Brasil enfrenta desafios históricos relacionados à desigualdade socioeconômica, preconceitos estruturais e falta de políticas públicas efetivas.',
        'O acesso limitado à educação de qualidade, saúde e oportunidades de trabalho perpetua ciclos de exclusão social que afetam principalmente grupos vulneráveis.',
        'Iniciativas de inclusão devem considerar aspectos culturais, econômicos e sociais para promover uma sociedade mais justa e igualitária.',
      ],
    },
    {
      id: '2',
      title: 'O papel da tecnologia na educação do século XXI',
      supportTexts: [
        'A tecnologia revolucionou os métodos de ensino e aprendizagem, oferecendo novas possibilidades de acesso ao conhecimento.',
        'Ferramentas digitais podem personalizar o ensino, atendendo às necessidades individuais dos estudantes e promovendo maior engajamento.',
        'Entretanto, a democratização do acesso à tecnologia educacional ainda é um desafio, especialmente em regiões menos favorecidas.',
      ],
    },
    {
      id: '3',
      title: 'Sustentabilidade ambiental e desenvolvimento econômico',
      supportTexts: [
        'O desenvolvimento sustentável busca equilibrar o crescimento econômico com a preservação do meio ambiente para as futuras gerações.',
        'Empresas estão adotando práticas ESG (Ambientais, Sociais e de Governança) como estratégia competitiva e responsabilidade social.',
        'A transição para uma economia verde requer investimentos em tecnologias limpas e mudanças nos padrões de consumo da sociedade.',
      ],
    },
    {
      id: '4',
      title: 'Saúde mental na era digital',
      supportTexts: [
        'O uso excessivo de redes sociais e dispositivos digitais tem impactos significativos na saúde mental, especialmente entre jovens.',
        'A pandemia intensificou problemas como ansiedade e depressão, evidenciando a necessidade de maior atenção à saúde mental.',
        'Estratégias de prevenção e tratamento devem incluir o uso consciente da tecnologia e o fortalecimento de vínculos sociais reais.',
      ],
    },
    {
      id: '5',
      title: 'Democracia e participação cidadã no Brasil',
      supportTexts: [
        'A participação ativa dos cidadãos é fundamental para o fortalecimento da democracia e a construção de políticas públicas efetivas.',
        'Mecanismos de participação como conselhos populares, audiências públicas e plataformas digitais ampliam o diálogo entre sociedade e governo.',
        'O combate à desinformação e a educação política são essenciais para garantir decisões conscientes e informadas da população.',
      ],
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">Portal do Aluno</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/minhas-redacoes')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileText className="size-4" />
              Minhas Redações
            </Button>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
              <LogOut className="size-4" />
              Sair
            </Button>
          </div>
        </header>

        {/* Cards de Preços */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <Card className="border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="mb-2 text-xl font-semibold text-primary">Correção Avulsa</h3>
              <p className="mb-2 text-3xl font-bold text-primary">R$ 70</p>
              <p className="mb-4 text-sm text-muted-foreground">
                Correção individual detalhada com feedback personalizado
              </p>
              <ul className="mb-4 space-y-1 text-left text-sm">
                <li>✓ Correção completa seguindo critérios oficiais</li>
                <li>✓ Feedback detalhado por competência</li>
                <li>✓ Sugestões de melhoria</li>
                <li>✓ Entrega em até 3 dias úteis</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 text-center">
              <h3 className="mb-2 text-xl font-semibold text-primary">Pacote 4 Correções</h3>
              <p className="mb-2 text-3xl font-bold text-primary">R$ 250</p>
              <p className="mb-4 text-sm text-muted-foreground">
                Melhor custo-benefício para acompanhamento contínuo
              </p>
              <ul className="mb-4 space-y-1 text-left text-sm">
                <li>✓ 4 correções completas</li>
                <li>✓ Economia de R$ 30</li>
                <li>✓ Acompanhamento da evolução</li>
                <li>✓ Suporte direto via WhatsApp</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Banner de Entrega */}
        <Card className="mb-8 border-primary/30 bg-gradient-to-r from-primary/10 to-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-primary">📝 Entregar Redação</h2>
            <p className="mb-4 text-muted-foreground">
              Envie sua redação para correção profissional
            </p>
            <p className="mb-6 text-sm text-muted-foreground">
              💰 Pagamento deve ser efetuado pelo WhatsApp do GS Aprova após envio da redação
            </p>
            <Dialog open={showSubmissionDialog} onOpenChange={setShowSubmissionDialog}>
              <DialogTrigger asChild>
                <Button size="lg" className="flex items-center gap-2">
                  <Upload className="size-5" />
                  Enviar Redação
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tipo de Redação</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground">Escolha o tipo da sua redação:</p>
                  <div className="grid grid-cols-1 gap-4">
                    <Button
                      onClick={() => handleSubmissionChoice('gs_aprova')}
                      variant="outline"
                      className="h-auto p-4 text-left"
                    >
                      <div>
                        <h3 className="font-semibold">Redação do GS Aprova</h3>
                        <p className="text-sm text-muted-foreground">
                          Baseada nos temas disponíveis em nosso banco
                        </p>
                      </div>
                    </Button>
                    <Button
                      onClick={() => handleSubmissionChoice('external')}
                      variant="outline"
                      className="h-auto p-4 text-left"
                    >
                      <div>
                        <h3 className="font-semibold">Redação Externa</h3>
                        <p className="text-sm text-muted-foreground">
                          Baseada em proposta de outra instituição
                        </p>
                      </div>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Temas de Redação */}
        <div className="space-y-4">
          <h2 className="mb-6 text-center text-2xl font-semibold">Temas de Redação Disponíveis</h2>

          {themes.map(theme => (
            <Card key={theme.id} className="w-full">
              <Collapsible
                open={openThemes.includes(theme.id)}
                onOpenChange={() => toggleTheme(theme.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer transition-colors hover:bg-muted/50">
                    <CardTitle className="flex items-center justify-between">
                      <span>{theme.title}</span>
                      {openThemes.includes(theme.id) ? (
                        <ChevronDown className="size-5" />
                      ) : (
                        <ChevronRight className="size-5" />
                      )}
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <h4 className="mb-3 font-medium text-primary">Textos de Apoio:</h4>
                      {theme.supportTexts.map((text, index) => (
                        <div key={index} className="rounded-md bg-muted p-3">
                          <p className="text-sm text-muted-foreground">{text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortalAluno;
