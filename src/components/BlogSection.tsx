import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

// Blog posts data - easily updatable
const blogPosts = [
  {
    id: 1,
    title: '10 erros que derrubam a sua redação do ENEM',
    excerpt:
      'Descubra os principais erros que podem comprometer sua nota na redação e como evitá-los.',
    author: 'Prof. Ana Silva',
    date: '2025-01-15',
    readTime: '8 min',
    category: 'Redação',
    image: '/lovable-uploads/280cddf7-6e06-4b0d-8568-923aca47f9f4.png',
    featured: true,
  },
  {
    id: 2,
    title: 'Matemática sem enrolação: funções que mais caem no ENEM',
    excerpt: 'Revisão completa dos tipos de funções mais cobrados na prova, com dicas práticas.',
    author: 'Prof. Carlos Santos',
    date: '2025-01-12',
    readTime: '12 min',
    category: 'Matemática',
    image: '/lovable-uploads/3e196025-f642-4155-ba69-da7ca6ee1d2c.png',
    featured: false,
  },
  {
    id: 3,
    title: 'Cronograma de estudos: como revisar tudo até o ENEM',
    excerpt: 'Estratégias eficazes para organizar seus estudos e não deixar nada para trás.',
    author: 'Equipe GS Aprova',
    date: '2025-01-10',
    readTime: '6 min',
    category: 'Estudos',
    image: '/lovable-uploads/7cea088c-1e84-4b15-86ab-6a6c2aa3d4ed.png',
    featured: false,
  },
];

export const BlogSection = () => {
  const handleBlogClick = (postId: number) => {
    trackEvent('blog_post_click', { post_id: postId });
    // Navigate to blog post - for now just track the event
    console.warn(`Navigate to blog post ${postId}`);
  };

  const handleVerTodosClick = () => {
    trackEvent('blog_see_all_click');
    // Navigate to blog listing page
    console.warn('Navigate to blog listing');
  };

  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Últimas do blog</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Dicas, estratégias e conteúdos para turbinar seus estudos
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {blogPosts.map(post => (
            <Card
              key={post.id}
              className={`group cursor-pointer border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                post.featured ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => handleBlogClick(post.id)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                    post.featured ? 'h-48 md:h-64' : 'h-40'
                  }`}
                />
                <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge className="absolute right-3 top-3 bg-accent text-accent-foreground">
                    Destaque
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-2">
                <h3
                  className={`font-bold text-white transition-colors group-hover:text-accent ${
                    post.featured ? 'text-xl md:text-2xl' : 'text-lg'
                  }`}
                >
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="size-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="size-3" />
                      <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="size-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-white group-hover:underline group-hover:text-accent">
                    Ler artigo
                  </span>
                  <ArrowRight className="size-4 text-white transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button onClick={handleVerTodosClick} variant="outline" size="lg" className="px-8">
            Ver todos os artigos
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
