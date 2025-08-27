# Google Analytics 4 Setup Instructions

## Como configurar o Google Analytics 4 no seu site

### 1. Criar uma conta no Google Analytics

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Clique em "Começar"
3. Configure sua conta:
   - Nome da conta: GS Aprova
   - Nome da propriedade: GS Aprova Website
   - Categoria: Educação
   - País: Brasil

### 2. Obter o Measurement ID

1. Após criar a propriedade, vá em **Admin** (engrenagem no canto inferior esquerdo)
2. Na coluna **Propriedade**, clique em **Fluxos de dados**
3. Clique em **Adicionar fluxo** > **Web**
4. Digite a URL do seu site (ex: https://gsaprova.com)
5. Nomeie o fluxo: "Site GS Aprova"
6. Depois de criado, clique no fluxo para ver o **ID de medição** (formato: G-XXXXXXXXXX)

### 3. Configurar no código

1. Abra o arquivo `src/pages/Index.tsx`
2. Encontre a linha que contém: `initializeGA4('G-XXXXXXXXXX');`
3. Substitua `G-XXXXXXXXXX` pelo seu Measurement ID real

Exemplo:
```typescript
// Substitua por seu ID real
initializeGA4('G-ABC123XYZ');
```

### 4. Eventos que estão sendo rastreados

O sistema já está configurado para rastrear automaticamente:

#### **Conversões e Leads**
- `form_start` - Quando usuário começa a preencher formulário
- `form_submit` - Envio de formulário de contato
- `conversion` - Conversões gerais
- `generate_lead` - Geração de leads

#### **Engajamento**
- `whatsapp_click` - Cliques em botões do WhatsApp
- `select_item` - Seleção de planos/serviços
- `service_selection` - Mudança entre tipos de serviço
- `faq_interaction` - Interação com perguntas frequentes
- `scroll` - Marcos de rolagem da página (25%, 50%, 75%, 100%)
- `time_on_page` - Tempo gasto na página

#### **Sinais de Confiança**
- `security_indicator_view` - Visualização de indicadores de segurança
- `guarantee_view` - Visualização da garantia

### 5. Configurar conversões importantes

No Google Analytics, vá em **Admin** > **Conversões** e marque estes eventos como conversões:

1. `form_submit` - Envio de formulários
2. `whatsapp_click` (source: hero_main_cta) - WhatsApp do hero
3. `conversion` - Conversões gerais

### 6. Verificar se está funcionando

1. Abra seu site
2. No Google Analytics, vá em **Relatórios** > **Tempo real**
3. Interaja com o site (clique em botões, role a página, etc.)
4. Verifique se os eventos aparecem em tempo real

### 7. Dados importantes para acompanhar

#### **Métricas de Conversão**
- Taxa de conversão de visitante para lead
- Custo por lead (se usar anúncios pagos)
- Origem dos leads de maior qualidade

#### **Comportamento do Usuário**
- Páginas mais visitadas
- Tempo médio na página
- Taxa de rejeição
- Fluxo de navegação

#### **Performance por Fonte**
- Orgânico (Google)
- Redes sociais
- Anúncios pagos
- WhatsApp/Indicação

### 8. Relatórios personalizados sugeridos

Crie relatórios personalizados para:

1. **Funil de Conversão**
   - Visualizações → Cliques CTA → Formulários iniciados → Formulários enviados

2. **Performance por Serviço**
   - Cliques por tipo de serviço (Matemática, Redação, Trilha, Completo)

3. **Qualidade do Tráfego**
   - Tempo na página por fonte de tráfego
   - Taxa de engajamento por fonte

### Suporte

Se precisar de ajuda com a configuração, entre em contato pelo WhatsApp: (11) 97496-9036