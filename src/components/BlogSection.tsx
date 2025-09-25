import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// Blog posts data - easily updatable
const blogPosts = [
  {
    id: 1,
    title: "10 erros que derrubam a sua redação do ENEM",
    excerpt: "Descubra os principais erros que podem comprometer sua nota na redação e como evitá-los.",
    author: "Prof. Ana Silva",
    date: "2025-01-15",
    readTime: "8 min",
    category: "Redação",
    image: "/lovable-uploads/280cddf7-6e06-4b0d-8568-923aca47f9f4.png",
    featured: true
  },
  {
    id: 2,
    title: "Matemática sem enrolação: funções que mais caem no ENEM",
    excerpt: "Revisão completa dos tipos de funções mais cobrados na prova, com dicas práticas.",
    author: "Prof. Carlos Santos",
    date: "2025-01-12",
    readTime: "12 min",
    category: "Matemática",
    image: "/lovable-uploads/3e196025-f642-4155-ba69-da7ca6ee1d2c.png",
    featured: false
  },
  {
    id: 3,
    title: "Cronograma de estudos: como revisar tudo até o ENEM",
    excerpt: "Estratégias eficazes para organizar seus estudos e não deixar nada para trás.",
    author: "Equipe GS Aprova",
    date: "2025-01-10",
    readTime: "6 min",
    category: "Estudos",
    image: "/lovable-uploads/7cea088c-1e84-4b15-86ab-6a6c2aa3d4ed.png",
    featured: false
  }
];

export const BlogSection = () => {
  const handleBlogClick = (postId: number) => {
    trackEvent('blog_post_click', { post_id: postId });
    // Navigate to blog post - for now just track the event
    console.log(`Navigate to blog post ${postId}`);
  };

  const handleVerTodosClick = () => {
    trackEvent('blog_see_all_click');
    // Navigate to blog listing page
    console.log('Navigate to blog listing');
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Últimas do blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dicas, estratégias e conteúdos para turbinar seus estudos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <Card 
              key={post.id}
              className={`group cursor-pointer bg-card border border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
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
                <Badge 
                  className="absolute top-3 left-3 bg-primary text-primary-foreground"
                >
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge 
                    className="absolute top-3 right-3 bg-accent text-accent-foreground"
                  >
                    Destaque
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-2">
                <h3 className={`font-bold text-card-foreground group-hover:text-primary transition-colors ${
                  post.featured ? 'text-xl md:text-2xl' : 'text-lg'
                }`}>
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-primary font-medium text-sm group-hover:underline">
                    Ler artigo
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={handleVerTodosClick}
            variant="outline"
            size="lg"
            className="px-8"
          >
            Ver todos os artigos
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};