import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";

const BRAZILIAN_STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", 
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", 
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const STUDY_DIFFICULTIES = [
  "Matemática",
  "Física", 
  "Química",
  "Biologia",
  "Português",
  "Redação",
  "História",
  "Geografia",
  "Filosofia/Sociologia"
];

export default function QuickSurvey() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    state: "",
    hasDifficulties: false,
    difficulties: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already seen the survey
    const hasSeenSurvey = localStorage.getItem('gs_aprova_survey_completed');
    if (!hasSeenSurvey) {
      // Show survey after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
        trackEvent('survey_shown');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('gs_aprova_survey_completed', 'dismissed');
    trackEvent('survey_dismissed');
  };

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        difficulties: [...prev.difficulties, difficulty]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        difficulties: prev.difficulties.filter(d => d !== difficulty)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          name: 'Pesquisa Anônima',
          phone: 'N/A',
          email: null,
          lead_type: 'survey',
          source: 'quick_survey',
          message: JSON.stringify({
            age: formData.age,
            state: formData.state,
            hasDifficulties: formData.hasDifficulties,
            difficulties: formData.difficulties
          })
        });

      if (error) throw error;

      setIsSubmitted(true);
      localStorage.setItem('gs_aprova_survey_completed', 'submitted');
      trackEvent('survey_submitted', {
        age: formData.age,
        state: formData.state,
        difficulties_count: formData.difficulties.length
      });

      // Auto close after 2 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);

    } catch (error) {
      console.error('Error submitting survey:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Pesquisa rápida</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {isSubmitted ? (
            <div className="text-center py-4">
              <p className="text-foreground font-medium mb-2">Obrigado pela sua participação!</p>
              <p className="text-muted-foreground text-sm">Suas respostas nos ajudam a melhorar nossos cursos.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-muted-foreground text-sm mb-4">
                Nos ajude a conhecer melhor nossos estudantes (30 segundos)
              </p>

              <div className="space-y-2">
                <Label htmlFor="age">Qual sua idade?</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="Ex: 18"
                  min="14"
                  max="30"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">Em qual estado você está?</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {BRAZILIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="difficulties"
                    checked={formData.hasDifficulties}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ 
                        ...prev, 
                        hasDifficulties: !!checked,
                        difficulties: checked ? prev.difficulties : []
                      }))
                    }
                  />
                  <Label htmlFor="difficulties">
                    Tenho dificuldades em algumas matérias
                  </Label>
                </div>

                {formData.hasDifficulties && (
                  <div className="pl-6 space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Quais matérias? (marque quantas quiser)
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {STUDY_DIFFICULTIES.map((difficulty) => (
                        <div key={difficulty} className="flex items-center space-x-2">
                          <Checkbox
                            id={difficulty}
                            checked={formData.difficulties.includes(difficulty)}
                            onCheckedChange={(checked) => 
                              handleDifficultyChange(difficulty, !!checked)
                            }
                          />
                          <Label htmlFor={difficulty} className="text-sm">
                            {difficulty}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar pesquisa"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Suas respostas são anônimas e nos ajudam a melhorar nossos cursos.
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}