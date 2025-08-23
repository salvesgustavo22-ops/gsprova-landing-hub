import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

interface Testimonial {
  name: string;
  grade: string;
  content: string;
  rating: number;
  result: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ana Clara Santos",
    grade: "3º Ano EM",
    content: "Minha redação saiu de 680 para 920 pontos! O feedback detalhado me ajudou a entender exatamente onde estava errando. Professor muito atencioso e método que funciona de verdade.",
    rating: 5,
    result: "Redação: 680 → 920 pontos"
  },
  {
    name: "Lucas Mendes",
    grade: "Vestibulandos 2024",
    content: "Matemática sempre foi meu terror. Em 4 aulas consegui entender conceitos que não entendia há anos. Passei em Engenharia na USP! Muito obrigado pela dedicação.",
    rating: 5,
    result: "Aprovado Engenharia USP"
  },
  {
    name: "Mariana Costa",
    grade: "Cursinho",
    content: "O pacote de redação foi essencial para minha aprovação. 5 correções que realmente fizeram a diferença. Método objetivo e professor que entende do ENEM. Super recomendo!",
    rating: 5,
    result: "Aprovada Medicina"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            O que nossos alunos <span className="text-success">conquistaram</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resultados reais de quem confiou no nosso método e alcançou seus objetivos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-service hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Result Badge */}
                  <div className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium text-center">
                    {testimonial.result}
                  </div>

                  {/* Author */}
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.grade}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};