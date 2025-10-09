import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Download, Send, LogOut, Save, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { User } from '@supabase/supabase-js';

type Essay = {
  id: string;
  origin: 'gs_aprova' | 'external';
  theme_title: string | null;
  bank: string;
  bank_other: string | null;
  status: 'enviada' | 'a_corrigir' | 'corrigida' | 'revisar' | 'pending' | 'corrected';
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
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);
  const [correctionFile, setCorrectionFile] = useState<File | null>(null);
  const [selectedEssayId, setSelectedEssayId] = useState<string | null>(null);
  const [statusChanges, setStatusChanges] = useState<{ [key: string]: string }>({});
  const [pendingChanges, setPendingChanges] = useState<string[]>([]);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        fetchEssays();
      }
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        fetchEssays();
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
        toast({
          title: 'Login realizado!',
          description: 'Bem-vindo ao painel do corretor.',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Erro no login',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  const fetchEssays = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('essays')
        .select(
          `
          *,
          profiles (
            first_name,
            last_name,
            phone
          )
        `
        )
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      setEssays((data as any) || []);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar redações',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadFile = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage.from('essay-files').download(filePath);

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
        title: 'Erro no download',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleSendCorrection = async (essayId: string, origin: 'gs_aprova' | 'external') => {
    if (!correctionFile) {
      toast({
        title: 'Erro',
        description: 'Selecione o arquivo de correção',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Generate correction ID
      const { data: correctionIdData, error: correctionIdError } = await supabase.rpc(
        'generate_correction_id',
        { essay_origin: origin }
      );

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
          status: 'corrigida',
          correction_id: correctionIdData,
          correction_file_path: uploadData.path,
        })
        .eq('id', essayId);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: 'Correção enviada!',
        description: `ID da correção: ${correctionIdData}`,
      });

      setCorrectionFile(null);
      setSelectedEssayId(null);
      fetchEssays();
    } catch (error: any) {
      toast({
        title: 'Erro ao enviar correção',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleStatusChange = (essayId: string, newStatus: string) => {
    setStatusChanges(prev => ({ ...prev, [essayId]: newStatus }));
    setPendingChanges(prev => (prev.includes(essayId) ? prev : [...prev, essayId]));
  };

  const handleSaveChanges = async () => {
    if (pendingChanges.length === 0) {
      toast({
        title: 'Nenhuma alteração',
        description: 'Não há alterações pendentes para salvar',
        variant: 'destructive',
      });
      return;
    }

    try {
      for (const essayId of pendingChanges) {
        const newStatus = statusChanges[essayId];
        if (newStatus) {
          const { error } = await supabase
            .from('essays')
            .update({ status: newStatus as any })
            .eq('id', essayId);

          if (error) {
            throw error;
          }
        }
      }

      toast({
        title: 'Alterações salvas!',
        description: `${pendingChanges.length} status atualizados com sucesso`,
      });

      setStatusChanges({});
      setPendingChanges([]);
      fetchEssays();
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar alterações',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleWhatsAppContact = (correctionId: string) => {
    const message = `Olá! Tenho uma dúvida sobre a correção ID: ${correctionId}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
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

  const getStatusBadge = (
    status: 'enviada' | 'a_corrigir' | 'corrigida' | 'revisar' | 'pending' | 'corrected'
  ) => {
    switch (status) {
      case 'enviada':
        return <Badge variant="outline">Enviada</Badge>;
      case 'a_corrigir':
        return <Badge variant="secondary">A Corrigir</Badge>;
      case 'corrigida':
        return <Badge>Corrigida</Badge>;
      case 'revisar':
        return <Badge variant="destructive">Revisar</Badge>;
      case 'pending':
        return <Badge variant="secondary">A Corrigir</Badge>;
      case 'corrected':
        return <Badge>Corrigida</Badge>;
      default:
        return <Badge variant="outline">Enviada</Badge>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acesso do Corretor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={e => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={e => setLoginData(prev => ({ ...prev, password: e.target.value }))}
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
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Painel do Corretor</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 size-4" />
            Sair
          </Button>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div></div>
          {pendingChanges.length > 0 && (
            <Button onClick={handleSaveChanges} className="gap-2">
              <Save className="size-4" />
              Salvar Alterações ({pendingChanges.length})
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Redações para Correção</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center">
                <p>Carregando redações...</p>
              </div>
            ) : essays.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Nenhuma redação encontrada.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Correção</TableHead>
                      <TableHead>Aluno</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead>Banca</TableHead>
                      <TableHead>Arquivos</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {essays.map(essay => (
                      <TableRow key={essay.id}>
                        <TableCell>
                          <div className="font-mono text-sm">
                            {essay.correction_id || 'Pendente'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(essay.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                          </div>
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
                          <Badge variant="outline">{getOriginText(essay.origin)}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            {essay.theme_title && (
                              <div className="mb-1 text-sm font-medium">{essay.theme_title}</div>
                            )}
                            <div className="text-sm text-muted-foreground">
                              {getBankText(essay.bank, essay.bank_other)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleDownloadFile(essay.essay_file_path, `Redacao_${essay.id}.pdf`)
                              }
                              className="h-7 text-xs"
                            >
                              <Download className="mr-1 size-3" />
                              Redação
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                essay.proposal_file_path
                                  ? handleDownloadFile(
                                      essay.proposal_file_path,
                                      `Proposta_${essay.id}.pdf`
                                    )
                                  : null
                              }
                              disabled={!essay.proposal_file_path}
                              className="h-7 text-xs"
                            >
                              <Download className="mr-1 size-3" />
                              {essay.proposal_file_path ? 'Proposta' : '-'}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={statusChanges[essay.id] || essay.status}
                            onValueChange={value => handleStatusChange(essay.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="enviada">Enviada</SelectItem>
                              <SelectItem value="a_corrigir">A Corrigir</SelectItem>
                              <SelectItem value="corrigida">Corrigida</SelectItem>
                              <SelectItem value="revisar">Revisar</SelectItem>
                            </SelectContent>
                          </Select>
                          {pendingChanges.includes(essay.id) && (
                            <div className="mt-1 text-xs text-orange-600">Alteração pendente</div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="default" className="h-7 text-xs">
                                  <Send className="mr-1 size-3" />
                                  Enviar Correção
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Enviar Correção - {essay.correction_id || 'Nova'}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="correction">Arquivo de Correção (PDF)</Label>
                                    <Input
                                      id="correction"
                                      type="file"
                                      accept=".pdf"
                                      onChange={e => setCorrectionFile(e.target.files?.[0] || null)}
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

                            {essay.correction_id && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleWhatsAppContact(essay.correction_id!)}
                                className="h-7 text-xs"
                              >
                                <MessageCircle className="mr-1 size-3" />
                                Dúvidas
                              </Button>
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
