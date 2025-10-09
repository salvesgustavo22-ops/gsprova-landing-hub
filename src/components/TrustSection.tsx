import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export const TrustSection = () => {
  return (
    <section className="section-modern py-16 lg:py-24">
      <div className="section-content container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
            Você pode confiar na gente
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-white/85">
            Conheça a história por trás do GS Aprova
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden border border-white/20 bg-white/5 shadow-xl backdrop-blur-md">
            <CardContent className="p-0">
              <div className="grid gap-0 lg:grid-cols-5">
                {/* Photo Section */}
                <div className="relative lg:col-span-2">
                  <div className="relative aspect-square overflow-hidden lg:aspect-auto lg:h-full">
                    <img
                      src="/lovable-uploads/64f0696f-0095-4a0f-abda-c6886cf41b08.png"
                      alt="Gustavo, fundador do GS Aprova"
                      className="size-full object-cover"
                    />
                    {/* Overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-r"></div>
                  </div>

                  {/* Name badge */}
                  <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-4 py-2 backdrop-blur-sm">
                    <p className="text-lg font-bold text-primary">Gustavo</p>
                    <p className="text-sm text-muted-foreground">Fundador</p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center p-8 lg:col-span-3 lg:p-12">
                  <div className="space-y-4 font-light leading-relaxed text-white/85">
                    <p>
                      Sou o Gustavo, criador do GS Aprova. Ensino há mais de 15 anos, mas minha
                      história como professor começou bem antes, ainda no ensino médio, quando
                      descobri que explicar Matemática para os colegas era algo que me fazia sentir
                      vivo.
                    </p>

                    <p>
                      Sei, na pele, o que é enfrentar vestibulares. Passei em algumas das principais
                      universidades do país:{' '}
                      <strong className="text-white">
                        5º lugar na Unicamp, 8º na Unifesp, entre os 20 primeiros na Fuvest e também
                        na FGV
                      </strong>
                      . Antes disso, fui bolsista integral no colégio. Vivi exatamente o que você
                      vive agora — a pressão dos estudos e a vontade de conquistar a aprovação.
                    </p>

                    <p>
                      Minha trajetória também me levou a diferentes cursinhos, como o Educafro, onde
                      dei aulas, e o cursinho da FEA-USP, que tive a oportunidade de coordenar. Em
                      todas essas experiências, confirmei o que sempre acreditei:{' '}
                      <strong className="text-white">a educação abre portas e muda vidas</strong>.
                      Foi o que transformou a minha.
                    </p>

                    <p className="font-medium text-white">
                      O GS Aprova nasceu desse ideal. Quero mostrar que estudar para o ENEM e a
                      Fuvest não precisa ser um caminho confuso ou cheio de sofrimento. É possível
                      ter estratégia, clareza e foco — e é isso que vai te aproximar da vaga que
                      você tanto sonha.
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 border-t border-white/20 pt-6">
                    <Link to="/lead-servicos">
                      <button className="btn-modern px-8">Começar minha jornada</button>
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
