import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const TrustSection = () => {
  return (
    <section className="section-modern py-16 lg:py-24">
      <div className="section-content container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Você pode confiar na gente
          </h2>
          <p className="text-lg text-white/85 max-w-2xl mx-auto font-light">
            Conheça a história por trás do GS Aprova
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-xl border border-white/20 bg-white/5 backdrop-blur-md">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Photo Section */}
                <div className="lg:col-span-2 relative">
                  <div className="aspect-square lg:aspect-auto lg:h-full relative overflow-hidden">
                    <img 
                      src="/lovable-uploads/64f0696f-0095-4a0f-abda-c6886cf41b08.png"
                      alt="Gustavo, fundador do GS Aprova"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/20 to-transparent"></div>
                  </div>
                  
                  {/* Name badge */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                    <p className="font-bold text-primary text-lg">Gustavo</p>
                    <p className="text-sm text-muted-foreground">Fundador</p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-4 text-white/85 leading-relaxed font-light">
                    <p>
                      Sou o Gustavo, criador do GS Aprova. Ensino há mais de 15 anos, mas minha história como professor começou bem antes, ainda no ensino médio, quando descobri que explicar Matemática para os colegas era algo que me fazia sentir vivo.
                    </p>
                    
                    <p>
                      Sei, na pele, o que é enfrentar vestibulares. Passei em algumas das principais universidades do país: <strong className="text-white">5º lugar na Unicamp, 8º na Unifesp, entre os 20 primeiros na Fuvest e também na FGV</strong>. Antes disso, fui bolsista integral no colégio. Vivi exatamente o que você vive agora — a pressão dos estudos e a vontade de conquistar a aprovação.
                    </p>
                    
                    <p>
                      Minha trajetória também me levou a diferentes cursinhos, como o Educafro, onde dei aulas, e o cursinho da FEA-USP, que tive a oportunidade de coordenar. Em todas essas experiências, confirmei o que sempre acreditei: <strong className="text-white">a educação abre portas e muda vidas</strong>. Foi o que transformou a minha.
                    </p>
                    
                    <p className="text-white font-medium">
                      O GS Aprova nasceu desse ideal. Quero mostrar que estudar para o ENEM e a Fuvest não precisa ser um caminho confuso ou cheio de sofrimento. É possível ter estratégia, clareza e foco — e é isso que vai te aproximar da vaga que você tanto sonha.
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <Link to="/lead-servicos">
                      <button className="btn-modern px-8">
                        Começar minha jornada
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};