import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Download, MessageCircle, MoreHorizontal, X, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Essay = {
  id: string;
  origin: 'gs_aprova' | 'external';
  theme_title: string | null;
  bank: string;
  bank_other: string | null;
  status: 'enviada' | 'a_corrigir' | 'corrigida' | 'revisar' | 'pending' | 'corrected';
  correction_id: string | null;
  correction_file_path: string | null;
  created_at: string;
  downloaded_at: string | null;
  essay_file_path: string;
  corrector_comments?: string | null;
  revision_essay_file_path?: string | null;
  is_revision?: boolean;
};

const MinhasRedacoes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEssays = useCallback(async () => {
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
        title: 'Erro ao carregar redações',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (!user) {
      navigate('/auth-aluno');
      return;
    }
    fetchEssays();
  }, [user, navigate, fetchEssays]);

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
        title: 'Download realizado!',
        description: `Em caso de dúvidas, envie mensagem ao WhatsApp informando o ID: ${essay.correction_id}`,
      });
    } catch (error: any) {
      toast({
        title: 'Erro no download',
        description: error.message,
        variant: 'destructive',
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

  const handleDownloadEssay = async (essay: Essay) => {
    try {
      const { data, error } = await supabase.storage
        .from('essay-files')
        .download(essay.essay_file_path);

      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Redacao_${essay.correction_id || essay.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: 'Download realizado!',
        description: 'Sua redação foi baixada com sucesso.',
      });
    } catch (error: any) {
      toast({
        title: 'Erro no download',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleCancelSubmission = async (essayId: string) => {
    try {
      const { error } = await supabase.from('essays').delete().eq('id', essayId);

      if (error) {
        throw error;
      }

      toast({
        title: 'Envio cancelado',
        description: 'Sua redação foi removida com sucesso.',
      });

      fetchEssays();
    } catch (error: any) {
      toast({
        title: 'Erro ao cancelar',
        description: error.message,
        variant: 'destructive',
      });
    }
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
        return <Badge variant="outline">A Corrigir</Badge>;
      case 'corrected':
        return <Badge>Corrigida</Badge>;
      default:
        return <Badge variant="outline">Enviada</Badge>;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/portal-aluno')}>
            <ArrowLeft className="mr-2 size-4" />
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
              <div className="py-8 text-center">
                <p>Carregando redações...</p>
              </div>
            ) : essays.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Nenhuma redação enviada ainda.</p>
                <Button onClick={() => navigate('/portal-aluno')} className="mt-4">
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
                    {essays.map(essay => (
                      <TableRow key={essay.id}>
                        <TableCell>
                          {format(new Date(essay.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                        </TableCell>
                        <TableCell>{getOriginText(essay.origin)}</TableCell>
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
                        <TableCell>{getStatusBadge(essay.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {essay.status === 'corrigida' && essay.correction_file_path && (
                              <Button
                                size="sm"
                                onClick={() => handleDownloadCorrection(essay)}
                                className="flex items-center gap-1"
                              >
                                <Download className="size-3" />
                                Baixar Correção
                              </Button>
                            )}

                            {essay.status === 'revisar' && (
                              <div className="space-y-2">
                                {essay.corrector_comments && (
                                  <div className="rounded bg-muted p-2 text-xs text-muted-foreground">
                                    <strong>Comentários:</strong> {essay.corrector_comments}
                                  </div>
                                )}
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    navigate(
                                      `/enviar-redacao?type=${essay.origin}&revision=${essay.id}&bank=${essay.bank}`
                                    )
                                  }
                                  className="flex items-center gap-1"
                                >
                                  <Upload className="size-3" />
                                  Enviar Nova Redação
                                </Button>
                              </div>
                            )}

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <MoreHorizontal className="size-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleDownloadEssay(essay)}>
                                  <Download className="mr-1 size-3" />
                                  Baixar Redação
                                </DropdownMenuItem>
                                {essay.correction_file_path && (
                                  <DropdownMenuItem onClick={() => handleDownloadCorrection(essay)}>
                                    <Download className="mr-1 size-3" />
                                    Baixar Correção
                                  </DropdownMenuItem>
                                )}
                                {essay.status === 'enviada' && (
                                  <DropdownMenuItem
                                    onClick={() => handleCancelSubmission(essay.id)}
                                    className="text-destructive"
                                  >
                                    <X className="mr-1 size-3" />
                                    Cancelar Envio
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleWhatsAppContact(essay.correction_id || undefined)
                                  }
                                >
                                  <MessageCircle className="mr-1 size-3" />
                                  Enviar Dúvidas
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
