import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogOut, Mail, Phone, MessageSquare, Calendar, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import gsAprovaLogo from '@/assets/gs-aprova-logo.png';

interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  service_interest: string;
  message: string | null;
  accepts_whatsapp: boolean;
  form_type: string;
  created_at: string;
}

const Admin = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user, signOut, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Fetch contact submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setSubmissions(data || []);
      } catch (err: any) {
        console.error('Error fetching submissions:', err);
        setError(err.message || 'Erro ao carregar submissions');
        toast({
          variant: 'destructive',
          title: 'Erro ao carregar dados',
          description: 'Não foi possível carregar as submissões de contato.'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [user, toast]);

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Erro ao sair',
          description: 'Ocorreu um erro ao fazer logout.'
        });
      } else {
        toast({
          title: 'Logout realizado',
          description: 'Você foi desconectado com sucesso.'
        });
        navigate('/auth');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro inesperado',
        description: 'Ocorreu um erro inesperado.'
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getServiceBadgeColor = (service: string) => {
    switch (service.toLowerCase()) {
      case 'matematica':
      case 'aulas_matematica':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'redacao':
      case 'correcao_redacao':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pacote_completo':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatServiceName = (service: string) => {
    const serviceMap: { [key: string]: string } = {
      'matematica': 'Matemática',
      'aulas_matematica': 'Aulas de Matemática',
      'redacao': 'Redação',
      'correcao_redacao': 'Correção de Redação',
      'pacote_completo': 'Pacote Completo'
    };
    return serviceMap[service] || service;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={gsAprovaLogo} 
              alt="GS Aprova Logo" 
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-lg font-bold text-primary">Painel Administrativo</h1>
              <p className="text-xs text-muted-foreground">GS Aprova - Contatos</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              <User className="inline w-4 h-4 mr-1" />
              {user.email}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSignOut}
              className="flex items-center space-x-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total de Contatos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{submissions.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">WhatsApp Aceito</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {submissions.filter(s => s.accepts_whatsapp).length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Hoje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {submissions.filter(s => 
                    new Date(s.created_at).toDateString() === new Date().toDateString()
                  ).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submissions List */}
          <Card>
            <CardHeader>
              <CardTitle>Submissões de Contato</CardTitle>
              <CardDescription>
                Todas as submissões de contato recebidas através do site
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {submissions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma submissão encontrada</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <Card key={submission.id} className="border-l-4 border-l-primary">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Left Column */}
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="font-semibold">{submission.name}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span>{submission.phone}</span>
                              {submission.accepts_whatsapp && (
                                <Badge variant="secondary" className="text-xs">
                                  WhatsApp OK
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {formatDate(submission.created_at)}
                              </span>
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Interesse:</p>
                              <Badge className={getServiceBadgeColor(submission.service_interest)}>
                                {formatServiceName(submission.service_interest)}
                              </Badge>
                            </div>
                            
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Tipo:</p>
                              <Badge variant="outline" className="text-xs">
                                {submission.form_type}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {submission.message && (
                          <>
                            <Separator className="my-4" />
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium text-muted-foreground">Mensagem:</span>
                              </div>
                              <p className="text-sm bg-muted p-3 rounded-md">
                                {submission.message}
                              </p>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;