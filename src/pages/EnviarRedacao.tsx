import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  const revisionId = searchParams.get('revision');
  const presetBank = searchParams.get('bank');
  
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [dataProtectionAccepted, setDataProtectionAccepted] = useState(false);
  
  // Form data
  const [selectedTheme, setSelectedTheme] = useState("");
  const [bank, setBank] = useState(presetBank || "");
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

      if (!dataProtectionAccepted) {
        toast({
          title: "Aceite os termos",
          description: "Você deve aceitar os termos de proteção de dados para continuar",
          variant: "destructive",
        });
        return;
      }
      
      // Validate files
      if (!validateFile(essayFile)) return;
      if (proposalFile && !validateFile(proposalFile)) return;
      
      // Get user's IP and location
      let userIP = '';
      let userLocation = '';
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        userIP = ipData.ip;
        
        const locationResponse = await fetch(`https://ipapi.co/${userIP}/json/`);
        const locationData = await locationResponse.json();
        userLocation = `${locationData.city || ''}, ${locationData.region || ''}, ${locationData.country_name || ''}`;
      } catch (error) {
        console.log('Could not get IP/location:', error);
      }

      // Upload files
      const essayPath = await uploadFile(essayFile, 'essays');
      let proposalPath = null;
      
      if (proposalFile) {
        proposalPath = await uploadFile(proposalFile, 'proposals');
      }
      
      if (revisionId) {
        // This is a revision - update the existing essay
        const { error } = await supabase
          .from('essays')
          .update({
            revision_essay_file_path: essayPath,
            revision_submitted_at: new Date().toISOString(),
            status: 'a_corrigir'
          })
          .eq('id', revisionId);
          
        if (error) {
          throw error;
        }
      } else {
        // Save new essay to database
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
            ip_address: userIP,
            geolocation: userLocation,
            data_protection_accepted: true,
            data_protection_ip: userIP,
            data_protection_location: userLocation,
            data_protection_timestamp: new Date().toISOString(),
            status: 'enviada'
          });
          
        if (error) {
          throw error;
        }
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
              {revisionId ? 'Enviar Nova Redação (Revisão)' : type === 'gs_aprova' ? 'Redação GS Aprova' : 'Redação Externa'}
            </h1>
          </div>

          {/* Banner de Preços */}
          <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/20 border-primary/30">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-primary mb-4 text-center">
                💰 Valores das Correções
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-center">
                <div>
                  <p className="font-semibold text-primary">Correção Avulsa</p>
                  <p className="text-lg font-bold">R$ 70</p>
                </div>
                <div>
                  <p className="font-semibold text-primary">Pacote 4 Correções</p>
                  <p className="text-lg font-bold">R$ 250 (Economia de R$ 30)</p>
                </div>
              </div>
              <p className="text-sm text-center text-muted-foreground mt-4">
                📱 Após enviar sua redação, efetue o pagamento pelo WhatsApp do GS Aprova
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {revisionId ? 'Enviar Nova Redação para Revisão' : 'Enviar Redação para Correção'}
              </CardTitle>
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

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="data-protection"
                    checked={dataProtectionAccepted}
                    onCheckedChange={(checked) => setDataProtectionAccepted(checked as boolean)}
                  />
                  <Label htmlFor="data-protection" className="text-sm text-muted-foreground">
                    Estou ciente que a GS Aprova segue a legislação brasileira sobre proteção de dados
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !dataProtectionAccepted}
                >
                  {loading ? "Enviando..." : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      {revisionId ? 'Enviar Nova Redação' : 'Entregar Redação'}
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
              {revisionId 
                ? 'Sua nova redação foi recebida com sucesso! Ela será corrigida novamente.' 
                : 'Sua redação foi recebida com sucesso! Para dar continuidade ao processo de correção, entre em contato com nossa equipe pelo WhatsApp para efetuar o pagamento.'
              }
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