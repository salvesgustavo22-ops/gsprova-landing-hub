import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: "reta-final-enem-2025",
    title: "Reta Final ENEM 2025: 7 Estratégias Que Funcionam",
    excerpt: "Com o ENEM 2025 se aproximando (9 e 16 de novembro), a reta final exige estratégia inteligente. Descubra as 7 táticas mais eficazes baseadas em dados oficiais.",
    date: "2025-01-15",
    readTime: "8 min",
    tags: ["Estratégia", "ENEM 2025", "Reta Final"],
    image: "/lovable-uploads/18015f32-572d-4cad-9ba0-16d5315e7060.png"
  },
  {
    id: "matematica-basica-35-porcento",
    title: "Por Que 35% das Questões São Matemática Básica",
    excerpt: "Analisamos todas as 270 questões de matemática do ENEM 2022-2024 e descobrimos um padrão surpreendente baseado em dados oficiais do INEP.",
    date: "2025-01-10",
    readTime: "10 min",
    tags: ["Matemática", "Dados INEP", "Análise"],
    image: "/lovable-uploads/280cddf7-6e06-4b0d-8568-923aca47f9f4.png"
  }
];

const Blog = () => {
  useEffect(() => {
    document.title = "Blog - Dicas e Estratégias ENEM 2025 | GS Aprova";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Artigos exclusivos sobre estratégias ENEM 2025, análise de dados oficiais INEP e dicas para a reta final. Conteúdo baseado em evidências.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#1E3A8A] via-[#3B82F6] to-[#1E3A8A]">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Blog GS Aprova
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Estratégias, análises e dicas baseadas em dados oficiais para sua aprovação no ENEM 2025
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 bg-white dark:bg-[#0F172A]">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 max-w-6xl mx-auto">
              {blogPosts.map((post) => (
                <Card 
                  key={post.id}
                  className="bg-white dark:bg-[#1E3A8A] shadow-lg rounded-xl border-2 border-[#E5E7EB] dark:border-[#FBBF24]/20 hover:shadow-xl hover:border-[#FBBF24] transition-all duration-300 overflow-hidden"
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Image */}
                    <div className="md:col-span-1">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="md:col-span-2 p-6">
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-white/70 mb-3">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime} de leitura</span>
                          </div>
                        </div>
                        
                        <CardTitle className="text-2xl text-[#1E3A8A] dark:text-white mb-3">
                          {post.title}
                        </CardTitle>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge 
                              key={tag}
                              className="bg-[#FBBF24]/20 text-[#1E3A8A] dark:text-[#FBBF24] border border-[#FBBF24]"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-0">
                        <p className="text-gray-600 dark:text-white/80 mb-6">
                          {post.excerpt}
                        </p>
                        
                        <Link to={`/blog/${post.id}`}>
                          <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white">
                            Ler artigo completo
                            <ArrowRight className="w-4 h-4 ml-2" />
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
