import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Download, Send, LogOut } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Essay = {
  id: string;
  origin: 'gs_aprova' | 'external';
  theme_title: string | null;
  bank: string;
  bank_other: string | null;
  status: 'pending' | 'corrected';
  correction_id: string | null;
  essay_file_path: string;
  proposal_file_path: string | null;
  created_at: string;
  profiles: {
    first_name: string;
    last_name: string;
    phone: string;
  } | null;
};

const CorretorPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(false);
  const [correctionFile, setCorrectionFile] = useState<File | null>(null);
  const [selectedEssayId, setSelectedEssayId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === "CORRETOR" && loginData.password === "GsAprova@34") {
      setIsAuthenticated(true);
      fetchEssays();
    } else {
      toast({
        title: "Credenciais inválidas",
        description: "Usuário ou senha incorretos",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ username: "", password: "" });
    navigate("/");
  };

  const fetchEssays = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('essays')
        .select(`
          *,
          profiles (
            first_name,
            last_name,
            phone
          )
        `)
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      setEssays((data as any) || []);
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

  const handleDownloadFile = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('essay-files')
        .download(filePath);

      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error: any) {
      toast({
        title: "Erro no download",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSendCorrection = async (essayId: string, origin: 'gs_aprova' | 'external') => {
    if (!correctionFile) {
      toast({
        title: "Erro",
        description: "Selecione o arquivo de correção",
        variant: "destructive",
      });
      return;
    }

    try {
      // Generate correction ID
      const { data: correctionIdData, error: correctionIdError } = await supabase
        .rpc('generate_correction_id', { essay_origin: origin });

      if (correctionIdError) {
        throw correctionIdError;
      }

      // Upload correction file
      const fileExt = correctionFile.name.split('.').pop();
      const fileName = `corrections/${correctionIdData}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('essay-files')
        .upload(fileName, correctionFile);

      if (uploadError) {
        throw uploadError;
      }

      // Update essay with correction
      const { error: updateError } = await supabase
        .from('essays')
        .update({
          status: 'corrected',
          correction_id: correctionIdData,
          correction_file_path: uploadData.path
        })
        .eq('id', essayId);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: "Correção enviada!",
        description: `ID da correção: ${correctionIdData}`,
      });

      setCorrectionFile(null);
      setSelectedEssayId(null);
      fetchEssays();

    } catch (error: any) {
      toast({
        title: "Erro ao enviar correção",
        description: error.message,
        variant: "destructive",
      });
    }
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
      return <Badge variant="outline">Pendente</Badge>;
    }
    return <Badge>Corrigida</Badge>;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acesso do Corretor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  value={loginData.username}
                  onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel do Corretor</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Redações para Correção</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p>Carregando redações...</p>
              </div>
            ) : essays.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhuma redação encontrada.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Aluno</TableHead>
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
                          <div>
                            <div className="font-medium">
                              {essay.profiles?.first_name} {essay.profiles?.last_name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {essay.profiles?.phone}
                            </div>
                          </div>
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
                          {essay.correction_id && (
                            <div className="text-xs text-muted-foreground mt-1">
                              ID: {essay.correction_id}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 flex-wrap">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownloadFile(essay.essay_file_path, `Redacao_${essay.id}.pdf`)}
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Redação
                            </Button>
                            {essay.proposal_file_path && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDownloadFile(essay.proposal_file_path!, `Proposta_${essay.id}.pdf`)}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Proposta
                              </Button>
                            )}
                            {essay.status === 'pending' && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm">
                                    <Send className="h-3 w-3 mr-1" />
                                    Enviar Correção
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Enviar Correção</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="correction">Arquivo de Correção</Label>
                                      <Input
                                        id="correction"
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setCorrectionFile(e.target.files?.[0] || null)}
                                      />
                                    </div>
                                    <Button
                                      onClick={() => handleSendCorrection(essay.id, essay.origin)}
                                      className="w-full"
                                      disabled={!correctionFile}
                                    >
                                      Confirmar Envio
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
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

export default CorretorPanel;