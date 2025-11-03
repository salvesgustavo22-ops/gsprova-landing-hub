import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StickyWhatsApp } from '@/components/StickyWhatsApp';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 'reta-final-enem-2025',
    title: 'Reta Final ENEM 2025: 7 Estratégias Que Funcionam',
    excerpt:
      'Com o ENEM 2025 se aproximando (9 e 16 de novembro), a reta final exige estratégia inteligente. Descubra as 7 táticas mais eficazes baseadas em dados oficiais.',
    date: '2025-01-15',
    readTime: '8 min',
    tags: ['Estratégia', 'ENEM 2025', 'Reta Final'],
    image: '/lovable-uploads/18015f32-572d-4cad-9ba0-16d5315e7060.png',
  },
  {
    id: 'matematica-basica-35-porcento',
    title: 'Por Que 35% das Questões São Matemática Básica',
    excerpt:
      'Analisamos todas as 270 questões de matemática do ENEM 2022-2024 e descobrimos um padrão surpreendente baseado em dados oficiais do INEP.',
    date: '2025-01-10',
    readTime: '10 min',
    tags: ['Matemática', 'Dados INEP', 'Análise'],
    image: '/lovable-uploads/280cddf7-6e06-4b0d-8568-923aca47f9f4.png',
  },
];

const Blog = () => {
  useEffect(() => {
    document.title = 'Blog de Dicas para Redação ENEM – GS Aprova';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Confira os melhores artigos, temas que mais caem e técnicas para melhorar sua redação no ENEM.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#1E3A8A] via-[#3B82F6] to-[#1E3A8A] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Blog – Dicas de Redação ENEM</h1>
            <p className="mx-auto max-w-3xl text-xl text-white/90">
              Estratégias, análises e dicas baseadas em dados oficiais para sua aprovação no ENEM
              2025
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="bg-white py-16 dark:bg-[#0F172A]">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-8">
              {blogPosts.map(post => (
                <Card
                  key={post.id}
                  className="overflow-hidden rounded-xl border-2 border-[#E5E7EB] bg-white shadow-lg transition-all duration-300 hover:border-[#FBBF24] hover:shadow-xl dark:border-[#FBBF24]/20 dark:bg-[#1E3A8A]"
                >
                  <div className="grid gap-6 md:grid-cols-3">
                    {/* Image */}
                    <div className="md:col-span-1">
                      <img 
                        src={post.image} 
                        alt={`Artigo sobre ${post.title} - Dicas de redação ENEM 2025`} 
                        className="size-full object-cover" 
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 md:col-span-2">
                      <CardHeader className="mb-4 p-0">
                        <div className="mb-3 flex items-center space-x-4 text-sm text-gray-600 dark:text-white/70">
                          <div className="flex items-center space-x-1">
                            <Calendar className="size-4" />
                            <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="size-4" />
                            <span>{post.readTime} de leitura</span>
                          </div>
                        </div>

                        <CardTitle className="mb-3 text-2xl text-[#1E3A8A] dark:text-white">
                          {post.title}
                        </CardTitle>

                        <div className="mb-4 flex flex-wrap gap-2">
                          {post.tags.map(tag => (
                            <Badge
                              key={tag}
                              className="border border-[#FBBF24] bg-[#FBBF24]/20 text-[#1E3A8A] dark:text-[#FBBF24]"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>

                      <CardContent className="p-0">
                        <p className="mb-6 text-gray-600 dark:text-white/80">{post.excerpt}</p>

                        <Link to={`/blog/${post.id}`}>
                          <Button className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90">
                            Ler artigo completo
                            <ArrowRight className="ml-2 size-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyWhatsApp />
    </div>
  );
};

export default Blog;
