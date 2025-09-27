import React, { useState } from "react";

const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // Simulação de envio - integre com backend real se necessário
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contato" className="py-16 md:py-24 bg-white">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-center">Entre em Contato</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-xl mx-auto flex flex-col gap-4"
          aria-label="Formulário Fale Conosco"
        >
          <input
            name="name"
            required
            placeholder="Seu nome"
            className="rounded-lg border px-4 py-2"
            value={form.name}
            onChange={handleChange}
            aria-label="Nome"
          />
          <input
            name="email"
            required
            type="email"
            placeholder="Seu e-mail"
            className="rounded-lg border px-4 py-2"
            value={form.email}
            onChange={handleChange}
            aria-label="Email"
          />
          <textarea
            name="message"
            required
            placeholder="Sua mensagem"
            className="rounded-lg border px-4 py-2"
            rows={4}
            value={form.message}
            onChange={handleChange}
            aria-label="Mensagem"
          />
          <button
            type="submit"
            className="bg-[#1E3A8A] text-white py-3 rounded-lg font-bold hover:bg-[#3B82F6] transition"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Enviando..." : "Enviar"}
          </button>
          {status === "success" && (
            <div className="text-green-600 font-medium">Mensagem enviada com sucesso!</div>
          )}
          {status === "error" && (
            <div className="text-red-600 font-medium">Ocorreu um erro. Tente novamente.</div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;