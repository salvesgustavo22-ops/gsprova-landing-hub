import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StickyWhatsApp } from '@/components/StickyWhatsApp';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const blogContent: Record<string, any> = {
  'mandar-bem-no-enem': {
    title: 'Reta Final ENEM 2025: 7 Estratégias Que Funcionam',
    date: '2025-01-15',
    readTime: '8 min',
    tags: ['Estratégia', 'ENEM 2025', 'Reta Final'],
    image: '/lovable-uploads/18015f32-572d-4cad-9ba0-16d5315e7060.png',
    content: `
Com o ENEM 2025 se aproximando (9 e 16 de novembro), a reta final exige estratégia inteligente. Baseado na análise das provas 2022-2024, aqui estão as 7 estratégias mais eficazes para o preparatório para o ENEM 2025:

## 1. Foque nos 35% Que Mais Caem
Nossa análise das provas oficiais mostrou que **35% das questões de matemática são básicas**: razão, proporção, porcentagem e transformações de unidades.

## 2. Priorize Geometria Espacial  
Representa **11,2% das questões**. Domine volumes de cilindros, prismas e pirâmides.

## 3. Estatística é Garantia de Pontos
**11,7% das questões** são interpretação de gráficos e medidas centrais. ROI altíssimo.

## 4. Funções Afim e Quadrática
**11% das questões** sempre envolvem esses tipos. Foque em problemas práticos.

## 5. Matemática Financeira Contextualizada  
**11% das questões** abordam juros e descontos em situações reais.

## 6. Tendências 2025
Baseado nas lacunas identificadas, esperamos mais questões sobre:
- Sustentabilidade e energia renovável
- Big data e tecnologia  
- Saúde mental pós-pandemia

## 7. Cronograma ENEM 2025 Otimizado (30 dias)
Um cronograma ENEM 2025 bem estruturado é essencial:
- **Semana 1-2**: Matemática básica (maior ROI)
- **Semana 3**: Geometria + Estatística  
- **Semana 4**: Funções + Financeira + Revisão

**Conclusão:** Uma estratégia baseada em dados pode fazer toda a diferença na sua aprovação. Foque no que realmente importa e otimize seu tempo de estudo.
    `,
  },
  'matematica-conteudos-enem': {
    title: 'matemática no enem 2025: os conteúdos que mais caem',
    date: '2025-01-10',
    readTime: '10 min',
    tags: ['Matemática', 'Dados INEP', 'Análise'],
    image: '/lovable-uploads/280cddf7-6e06-4b0d-8568-923aca47f9f4.png',
    content: `
Analisamos todas as 270 questões de matemática do ENEM 2022-2024 e descobrimos um padrão surpreendente.

## A Descoberta

Dos PDFs oficiais do INEP, identificamos que **94 questões (35%)** abordam matemática básica:
- Razão e proporção: 28 questões
- Porcentagem: 31 questões  
- Transformações de unidades: 35 questões

## Por Que Isso Acontece?

O ENEM testa **competências práticas**, não decoreba. Matemática básica aparece em contextos como:

### Contextos Recorrentes:
- Escalas cartográficas (mapas, plantas)
- Densidade populacional  
- Indicadores econômicos
- Pesquisas sociais
- Receitas e misturas

### Exemplo Real (ENEM 2024):
"Um mapa na escala 1:50.000 mostra uma área de 6cm x 4cm. Qual a área real?"

## Lacunas Identificadas para 2025

Nossa análise revelou contextos ainda não explorados:
- Sustentabilidade (redução de emissões em %)
- Energia renovável (proporções)  
- Demografia digital
- Big data básico

## Estratégia Killer

Se você dominar apenas matemática básica, garante **35% da prova**. Isso pode ser a diferença entre passar ou não.

### Como Estudar:
1. **Domine as 4 operações básicas** sem calculadora
2. **Pratique regra de três** em contextos diversos
3. **Memorize conversões** mais comuns (km/m, L/mL, etc.)
4. **Interprete gráficos** de todas as formas
5. **Resolva 100+ questões** de provas anteriores

**Conclusão:** A matemática do ENEM é menos sobre fórmulas complexas e mais sobre raciocínio lógico aplicado a situações cotidianas. Foque no básico e garanta pontos valiosos.
    `,
  },
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? blogContent[id] : null;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Blog GS Aprova`;

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.content.substring(0, 155));
      }
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-16 pt-20 text-center">
          <h1 className="mb-4 text-3xl font-bold text-[#1E3A8A]">Artigo não encontrado</h1>
          <Link to="/blog">
            <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90">Voltar ao Blog</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Image */}
        <div className="relative h-[400px] bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]">
          <img src={post.image} alt={`Imagem ilustrativa do artigo: ${post.title}`} className="size-full object-cover opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <Link to="/blog">
                <Button variant="ghost" className="mb-6 text-white hover:bg-white/20">
                  <ArrowLeft className="mr-2 size-4" />
                  Voltar ao Blog
                </Button>
              </Link>
              <h1 className="mx-auto mb-4 max-w-4xl text-3xl font-bold text-white md:text-5xl">
                {post.title}
              </h1>
              <div className="flex items-center justify-center space-x-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <Calendar className="size-5" />
                  <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="size-5" />
                  <span>{post.readTime} de leitura</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="bg-white py-16 dark:bg-[#0F172A]">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="mb-8 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  className="border border-[#FBBF24] bg-[#FBBF24]/20 text-[#1E3A8A] dark:text-[#FBBF24]"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose prose-lg dark:prose-invert prose-headings:text-[#1E3A8A] dark:prose-headings:text-white prose-p:text-black dark:prose-p:text-white/80 prose-strong:text-[#1E3A8A] dark:prose-strong:text-[#FBBF24] prose-ul:text-black dark:prose-ul:text-white/80 prose-li:text-black dark:prose-li:text-white/80 max-w-none">
              {post.content.split('\n').map((paragraph: string, index: number) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="mb-4 mt-8 text-2xl font-bold">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="mb-3 mt-6 text-xl font-bold">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('- ')) {
                  return (
                    <li key={index} className="ml-6">
                      {paragraph.replace('- ', '')}
                    </li>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] p-8 text-center">
              <h3 className="mb-4 text-2xl font-bold text-white">Quer nossa trilha completa?</h3>
              <p className="mb-6 text-white/90">
                Conheça nossos materiais exclusivos baseados em análise de dados oficiais
              </p>
              <Link to="/#materiais-exclusivos">
                <Button className="bg-[#FBBF24] px-8 py-6 text-lg font-semibold text-[#1E3A8A] hover:brightness-95">
                  Ver Matemática ENEM 2025
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
      <StickyWhatsApp />
    </div>
  );
};

export default BlogPost;
