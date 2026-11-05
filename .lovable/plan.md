# Plantão ENEM 2026 + novo WhatsApp

## 1. Novo WhatsApp em todo o site
- Trocar todos os números antigos (incluindo (11) 97496-9036) por **(11) 98536-3890**, link `https://wa.me/5511985363890` com mensagem pronta: "Olá! Vim pelo site GS Aprova e gostaria de atendimento."
- Centralizar o número num único lugar para facilitar futuras trocas; atualizar botão flutuante, rodapé, contato, planos, portal do aluno, popups, formulários e páginas de obrigado.
- Instrução de Pix no portal do aluno: confirmar se a chave Pix também muda (ver perguntas).

## 2. Barra de aviso no topo (todas as páginas)
- Faixa dourada com texto escuro: "🚨 VÉSPERA ENEM 2026: Plantão de Redação com Correção Expressa em 12h! Garantir Minha Vaga →", levando para `/plantao-enem-2026`.
- Substitui a faixa atual da Black November.
- Novo item no menu: "Plantão ENEM 2026" (destacado em dourado), no computador e no celular.

## 3. Nova página `/plantao-enem-2026`
Fundo azul-marinho profundo, detalhes dourados e geométricos, textos claros. Blocos na ordem do briefing:
1. Barra de urgência fixa ("Redação do ENEM em 3 dias · Plantão hoje às 20h · 10 correções expressas restantes")
2. Abertura: título, subtítulo, arte do produto, botão "QUERO ENTRAR NO PLANTÃO — R$ 97,00" e linha "Pix, cartão ou boleto · Acesso imediato · Garantia de 7 dias"
3. Espelho da dor (3 cartões)
4. É pra você se... (4 itens com check dourado)
5. Não é pra você se... (2 itens)
6. Tabela de entregáveis com valores e total ancorado de R$ 197,00
7. Quem corrige (3 linhas + botão de dúvida no WhatsApp)
8. Como funciona (3 passos)
9. Prova social (grade de prints de comentários)
10. Oferta final: "De R$ 197,00 por R$ 97,00", "ou 3x de R$ 35,00", aviso de últimas vagas e botão final
- Rodapé discreto: "Material GS APROVA® · Proibido reproduzir sem a autorização do Autor GS Aprova 2026"
- Título e descrição próprios para o Google e redes sociais.

## Itens pendentes (uso provisório até você enviar)
- **Link de checkout Hotmart** do Plantão: botões ficam prontos para receber; até lá apontam para o WhatsApp.
- **Arte do produto**: gero uma arte provisória no estilo da marca, se você não enviar.
- **Dados do professor** (anos de experiência, redações corrigidas): texto provisório marcado para revisão.
- **Prints de alunos** (TikTok/WhatsApp): uso cartões de depoimento provisórios até receber as imagens.
- "10 correções restantes" será texto fixo (não contador automático), a menos que você queira atualizá-lo manualmente.

## Detalhes técnicos
- Constante única `WHATSAPP_NUMBER`/`WHATSAPP_URL` em `src/lib/constants.ts`; substituir ocorrências nos ~45 arquivos encontrados.
- Componente `AnnouncementBar` global no layout; rota nova em `App.tsx`; página `src/pages/PlantaoEnem2026.tsx` usando tokens do design system (adicionar tokens navy/dourado se faltarem).
- Link de checkout em constante `PLANTAO_CHECKOUT_URL` para troca simples.
