import { useState } from "react";
import { Link } from "react-router-dom";

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  marketingOptIn: boolean;
  acceptedTerms: boolean;
};

export default function ContactForm() {
  const [form, setForm] = useState<LeadPayload>({
    name: "",
    email: "",
    phone: "",
    marketingOptIn: false,
    acceptedTerms: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function update<K extends keyof LeadPayload>(key: K, value: LeadPayload[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validação mínima
    if (!form.name.trim()) return setError("Informe seu nome.");
    if (!/\S+@\S+\.\S+/.test(form.email)) return setError("E-mail inválido.");
    if (!form.acceptedTerms)
      return setError("Você precisa aceitar os Termos e a Política de Privacidade.");

    try {
      setSubmitting(true);

      // 🔽 Substitua por sua chamada ao Supabase/API
      // Exemplo: await supabase.from('leads').insert({ ...form })
      await new Promise((r) => setTimeout(r, 500));

      setSuccess(true);
    } catch (err) {
      setError("Falha ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="p-4 border rounded bg-green-50">
        <p>Recebido! Em breve entraremos em contato.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <div className="p-3 text-sm text-red-700 bg-red-50 border">{error}</div>}

      <div>
        <label className="block text-sm font-medium mb-1">Nome*</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Seu nome"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">E-mail*</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="voce@exemplo.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">WhatsApp (opcional)</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="(11) 9XXXX-XXXX"
        />
      </div>

      {/* 🔽 Checkbox obrigatório: aceitar termos + privacidade */}
      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          className="mt-1"
          checked={form.acceptedTerms}
          onChange={(e) => update("acceptedTerms", e.target.checked)}
          required
        />
        <span>
          Declaro que li e concordo com os{" "}
          <Link to="/termos" className="underline">Termos de Uso</Link> e com a{" "}
          <Link to="/privacidade" className="underline">Política de Privacidade</Link>.
        </span>
      </label>

      {/* 🔽 Checkbox opcional: marketing/WhatsApp */}
      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          className="mt-1"
          checked={form.marketingOptIn}
          onChange={(e) => update("marketingOptIn", e.target.checked)}
        />
        <span>
          Autorizo o envio de comunicações por e-mail/WhatsApp sobre conteúdos e ofertas do GS Aprova. (Opcional)
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 rounded bg-black text-white disabled:opacity-60"
      >
        {submitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}    if (now - lastSubmission < 30000) {
      toast({
        title: "Aguarde um momento",
        description: "Aguarde 30 segundos antes de enviar outra solicitação.",
        variant: "destructive"
      });
      return;
    }

    // Basic validation
    if (!formData.name.trim() || !formData.whatsapp.trim() || !formData.email.trim() || !formData.service) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database
      const { error } = await supabase
        .from('leads')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.whatsapp.trim(),
          lead_type: 'contact_form',
          service_selected: formData.service,
          message: formData.message.trim() || null,
          source: 'homepage_contact'
        });

      if (error) {
        throw error;
      }

      // Track successful submission
      trackEvent('lead_submit', {
        form_type: 'homepage_contact',
        service_interest: formData.service
      });

      toast({
        title: "Solicitação enviada!",
        description: "Entraremos em contato via WhatsApp em breve.",
      });

      // Reset form and update rate limiting
      setFormData({
        name: '',
        whatsapp: '',
        service: '',
        message: '',
        email: ''
      });
      setLastSubmission(now);

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="card-service">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl lg:text-3xl">
                Solicite seu Atendimento
              </CardTitle>
              <CardDescription className="text-lg">
                Preencha o formulário e entraremos em contato via WhatsApp para agendar sua aula ou correção.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Serviço de interesse</Label>
                  <Select onValueChange={(value) => handleChange('service', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math-single">Matemática - Aula Avulsa</SelectItem>
                      <SelectItem value="math-package">Matemática - Pacote 4 Aulas</SelectItem>
                      <SelectItem value="essay-single">Redação - Correção Avulsa</SelectItem>
                      <SelectItem value="essay-package">Redação - Pacote Completo</SelectItem>
                      <SelectItem value="both">Matemática + Redação</SelectItem>
                      <SelectItem value="doubt">Tenho dúvidas, quero conversar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem (opcional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Conte-nos suas principais dificuldades ou objetivos..."
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-hero text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Ou entre em contato diretamente:
                </p>
                <Button 
                  onClick={() => {
                    const message = encodeURIComponent("Oi, quero saber mais sobre aulas de Matemática/Redação. Vim pelo site GS Aprova.");
                    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
                  }}
                  variant="outline"
                  className="border-success text-success hover:bg-success hover:text-success-foreground"
                >
                  WhatsApp Direto
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
