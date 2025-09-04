import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, ArrowLeft, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const EnviarRedacao = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') as 'gs_aprova' | 'external';
  
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  // Form data
  const [selectedTheme, setSelectedTheme] = useState("");
  const [bank, setBank] = useState("");
  const [bankOther, setBankOther] = useState("");
  const [proposalFile, setProposalFile] = useState<File | null>(null);
  const [essayFile, setEssayFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth-aluno");
    }
    if (!type || (type !== 'gs_aprova' && type !== 'external')) {
      navigate("/portal-aluno");
    }
  }, [user, type, navigate]);

  const themes = [
    "Desafios da inclusão social no Brasil contemporâneo",
    "O papel da tecnologia na educação do século XXI",
    "Sustentabilidade ambiental e desenvolvimento econômico",
    "Saúde mental na era digital",
    "Democracia e participação cidadã no Brasil"
  ];

  const validateFile = (file: File) => {
    const maxSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    
    if (file.size > maxSize) {
      toast({
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 2MB",
        variant: "destructive",
      });
      return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Apenas PDF, JPG e PNG são permitidos",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const uploadFile = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${user!.id}/${folder}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('essay-files')
      .upload(fileName, file);
      
    if (error) {
      throw error;
    }
    
    return data.path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validations
      if (!essayFile) {
        toast({
          title: "Erro",
          description: "A redação é obrigatória",
          variant: "destructive",
        });
        return;
      }
      
      if (type === 'external' && !proposalFile) {
        toast({
          title: "Erro", 
          description: "A proposta de redação é obrigatória para redações externas",
          variant: "destructive",
        });
        return;
      }
      
      if (type === 'gs_aprova' && !selectedTheme) {
        toast({
          title: "Erro",
          description: "Selecione um tema de redação",
          variant: "destructive",
        });
        return;
      }
      
      if (!bank) {
        toast({
          title: "Erro",
          description: "Selecione a banca corretora",
          variant: "destructive",
        });
        return;
      }
      
      if (bank === 'other' && !bankOther) {
        toast({
          title: "Erro",
          description: "Especifique a banca corretora",
          variant: "destructive",
        });
        return;
      }
      
      // Validate files
      if (!validateFile(essayFile)) return;
      if (proposalFile && !validateFile(proposalFile)) return;
      
      // Upload files
      const essayPath = await uploadFile(essayFile, 'essays');
      let proposalPath = null;
      
      if (proposalFile) {
        proposalPath = await uploadFile(proposalFile, 'proposals');
      }
      
      // Save to database
      const { error } = await supabase
        .from('essays')
        .insert({
          user_id: user!.id,
          origin: type,
          theme_title: type === 'gs_aprova' ? selectedTheme : null,
          bank: bank as any,
          bank_other: bank === 'other' ? bankOther : null,
          proposal_file_path: proposalPath,
          essay_file_path: essayPath,
        });
        
      if (error) {
        throw error;
      }
      
      setShowSuccessDialog(true);
      
    } catch (error: any) {
      toast({
        title: "Erro ao enviar redação",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/5511974969036', '_blank');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/portal-aluno")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold text-primary">
              {type === 'gs_aprova' ? 'Redação GS Aprova' : 'Redação Externa'}
            </h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Enviar Redação para Correção</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {type === 'gs_aprova' && (
                  <div>
                    <Label htmlFor="theme">Tema da Redação *</Label>
                    <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tema" />
                      </SelectTrigger>
                      <SelectContent>
                        {themes.map((theme) => (
                          <SelectItem key={theme} value={theme}>
                            {theme}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="bank">Banca Corretora *</Label>
                  <Select value={bank} onValueChange={setBank}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a banca" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enem">ENEM</SelectItem>
                      <SelectItem value="fuvest">FUVEST</SelectItem>
                      <SelectItem value="vunesp">VUNESP</SelectItem>
                      <SelectItem value="other">Outras</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {bank === 'other' && (
                  <div>
                    <Label htmlFor="bankOther">Especifique a Banca *</Label>
                    <Input
                      id="bankOther"
                      value={bankOther}
                      onChange={(e) => setBankOther(e.target.value)}
                      placeholder="Digite o nome da banca"
                    />
                  </div>
                )}

                {type === 'external' && (
                  <div>
                    <Label htmlFor="proposal">Proposta de Redação *</Label>
                    <Input
                      id="proposal"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setProposalFile(e.target.files?.[0] || null)}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      PDF, JPG ou PNG - máximo 2MB
                    </p>
                  </div>
                )}

                <div>
                  <Label htmlFor="essay">Redação *</Label>
                  <Input
                    id="essay"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setEssayFile(e.target.files?.[0] || null)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    PDF, JPG ou PNG - máximo 2MB
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Entregar Redação
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>✅ Redação Recebida!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Sua redação foi recebida com sucesso! Para dar continuidade ao processo de correção, 
              entre em contato com nossa equipe pelo WhatsApp para efetuar o pagamento.
            </p>
            <Button 
              onClick={handleWhatsAppContact} 
              className="w-full flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Entrar em Contato - WhatsApp
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/portal-aluno")} 
              className="w-full"
            >
              Voltar ao Portal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnviarRedacao;