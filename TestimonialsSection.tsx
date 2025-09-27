import React from "react";

type Testimonial = {
  name: string;
  text: string;
  score?: number;
  photoUrl?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Maria Silva",
    text: "A plataforma facilitou muito minha aprovação! Recomendo para todos.",
    score: 5,
    photoUrl: "/depoimentos/maria.jpg",
  },
  {
    name: "João Souza",
    text: "Atendimento excelente, materiais atualizados e equipe muito atenciosa.",
    score: 5,
    photoUrl: "/depoimentos/joao.jpg",
  },
  {
    name: "Ana Costa",
    text: "O simulado foi essencial para minha preparação.",
    score: 5,
    photoUrl: "/depoimentos/ana.jpg",
  },
];

function TestimonialCard({ name, text, score = 5, photoUrl }: Testimonial) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center border border-[#E0F2FE]">
      <img
        src={photoUrl || "/placeholder-avatar.png"}
        alt={`Foto de ${name}`}
        className="w-16 h-16 rounded-full mb-3 object-cover"
      />
      <div className="flex gap-1 mb-2 justify-center">
        {Array.from({ length: 5 }).map((_, idx) => (
          <span
            key={idx}
            aria-label="estrela"
            className={`text-[#FBBF24] ${idx < (score ?? 0) ? "" : "opacity-30"}`}
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-base mb-2">{text}</p>
      <div className="font-medium text-[#1E3A8A]">{name}</div>
    </div>
  );
}

const TestimonialsSection: React.FC = () => (
  <section id="depoimentos" className="py-16 md:py-24 bg-[#F3F4F6]">
    <h2 className="text-3xl font-bold text-center mb-10">Depoimentos</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {testimonials.map((t, i) => (
        <TestimonialCard key={i} {...t} />
      ))}
    </div>
  </section>
);

export default TestimonialsSection;