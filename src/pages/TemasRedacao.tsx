import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';

const TemasRedacao = () => {
  const [openThemes, setOpenThemes] = useState<string[]>([]);

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary">Portal de Redações - GS Aprova</h1>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-primary">
              Orientações para Envio de Redação
            </h2>
            <div className="space-y-3 text-left text-muted-foreground">
              <p>• A redação deve estar em formato PDF, JPG ou PNG (máximo 2MB)</p>
              <p>• Redações manuscritas devem estar legíveis e com boa qualidade de imagem</p>
              <p>• Para redações do banco GS Aprova, selecione o tema correspondente</p>
              <p>• Para redações externas, inclua também a proposta de redação</p>
              <p>• Após o envio, entre em contato pelo WhatsApp para efetuar o pagamento</p>
              <p>• O prazo de correção é de até 7 dias úteis após confirmação do pagamento</p>
            </div>
          </div>
        </header>

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

export default TemasRedacao;
