import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Download, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Essay = {
  id: string;
  origin: 'gs_aprova' | 'external';
  theme_title: string | null;
  bank: string;
  bank_other: string | null;
  status: 'pending' | 'corrected';
  correction_id: string | null;
  correction_file_path: string | null;
  created_at: string;
  downloaded_at: string | null;
};

const MinhasRedacoes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth-aluno");
      return;
    }
    fetchEssays();
  }, [user, navigate]);

  const fetchEssays = async () => {
    try {
      const { data, error } = await supabase
        .from('essays')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setEssays(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar redações",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCorrection = async (essay: Essay) => {
    if (!essay.correction_file_path || !essay.correction_id) return;
    
    try {
      const { data, error } = await supabase.storage
        .from('essay-files')
        .download(essay.correction_file_path);

      if (error) {
        throw error;
      }

      // Create download link
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Correção_${essay.correction_id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Update downloaded_at in database
      if (!essay.downloaded_at) {
        await supabase
          .from('essays')
          .update({ downloaded_at: new Date().toISOString() })
          .eq('id', essay.id);
        
        fetchEssays(); // Refresh data
      }

      toast({
        title: "Download realizado!",
        description: `Em caso de dúvidas, envie mensagem ao WhatsApp informando o ID: ${essay.correction_id}`,
      });

    } catch (error: any) {
      toast({
        title: "Erro no download",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleWhatsAppContact = (correctionId?: string) => {
    const message = correctionId 
      ? `Olá! Tenho dúvidas sobre a correção ID: ${correctionId}`
      : 'Olá! Tenho dúvidas sobre minha redação.';
    
    const url = `https://wa.me/5511974969036?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const getOriginText = (origin: 'gs_aprova' | 'external') => {
    return origin === 'gs_aprova' ? 'GS Aprova' : 'Externa';
  };

  const getBankText = (bank: string, bankOther: string | null) => {
    if (bank === 'other' && bankOther) {
      return bankOther;
    }
    return bank.toUpperCase();
  };

  const getStatusBadge = (status: 'pending' | 'corrected') => {
    if (status === 'pending') {
      return <Badge variant="outline">A Corrigir</Badge>;
    }
    return <Badge>Corrigida</Badge>;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/portal-aluno")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-primary">Minhas Redações</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Redações</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p>Carregando redações...</p>
              </div>
            ) : essays.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhuma redação enviada ainda.</p>
                <Button 
                  onClick={() => navigate("/portal-aluno")}
                  className="mt-4"
                >
                  Enviar Primeira Redação
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead>Tema/Banca</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {essays.map((essay) => (
                      <TableRow key={essay.id}>
                        <TableCell>
                          {format(new Date(essay.created_at), "dd/MM/yyyy", { locale: ptBR })}
                        </TableCell>
                        <TableCell>
                          {getOriginText(essay.origin)}
                        </TableCell>
                        <TableCell>
                          <div>
                            {essay.theme_title && (
                              <div className="font-medium text-sm mb-1">
                                {essay.theme_title}
                              </div>
                            )}
                            <div className="text-sm text-muted-foreground">
                              {getBankText(essay.bank, essay.bank_other)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(essay.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {essay.status === 'corrected' && essay.correction_file_path && (
                              <Button
                                size="sm"
                                onClick={() => handleDownloadCorrection(essay)}
                                className="flex items-center gap-1"
                              >
                                <Download className="h-3 w-3" />
                                Baixar Correção
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleWhatsAppContact(essay.correction_id || undefined)}
                              className="flex items-center gap-1"
                            >
                              <MessageCircle className="h-3 w-3" />
                              WhatsApp
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MinhasRedacoes;