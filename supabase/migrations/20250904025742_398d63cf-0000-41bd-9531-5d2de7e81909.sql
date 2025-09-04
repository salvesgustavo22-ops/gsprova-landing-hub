-- Adicionar novos valores ao enum essay_status
ALTER TYPE essay_status ADD VALUE 'enviada';
ALTER TYPE essay_status ADD VALUE 'a_corrigir';  
ALTER TYPE essay_status ADD VALUE 'corrigida';
ALTER TYPE essay_status ADD VALUE 'revisar';