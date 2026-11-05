# Ajustes do site: ano 2026, destaque do Plantão, menu e fontes

## 1. Trocar 2025 por 2026 em todo o site
- Textos visíveis: topo, Hero, Materiais, planos, Blog, rodapé (© 2026), Checklist, Privacidade/Termos, títulos das abas e descrições para buscadores.
- Páginas ENEM e Fuvest: os endereços passam a ser `/enem-2026` e `/fuvest-2026`; os antigos (`/enem-2025`, `/fuvest-2025`) redirecionam para os novos, para não perder links já compartilhados.
- Datas dos artigos do blog continuam como estão (são datas de publicação reais).

## 2. Plantão no lugar da Sprint Redação
- Remover o box da Sprint Redação da home.
- No lugar dele, colocar um box idêntico ao topo da página do Plantão ENEM 2026 (mesmo visual, textos, imagem, preço R$197 por R$97 e botão para a Hotmart).

## 3. Remover os popups da abertura
- Tirar o popup de newsletter (e-mail) e o segundo popup de e-mail que aparecem ao carregar a home.

## 4. Arrumar o menu de cima
- Logo com tamanho e espaço próprios, sem cobrir "Início".
- "Plantão ENEM 2026" com a mesma fonte e o mesmo alinhamento dos outros itens (mantido em destaque dourado discreto).
- Remover o botão "Matricular agora" (no computador e no celular).

## 5. Matemática (Materiais Exclusivos)
- Trocar ano para 2026.
- Botões sem preço: "Em 72h" no lugar de "Garantir por R$ 9,90" e "Quero o Pacote Completo — R$ 15,90". Os preços continuam visíveis nos cards; só os botões mudam.

## 6. Fonte única: Montserrat
- Montserrat como fonte padrão de todo o site (textos e títulos), incluindo a parte de correção de redação, que hoje usa outra fonte.

## Detalhes técnicos
- `fontFamily.sans` no Tailwind e `body` em index.html passam a Montserrat; Inter removida do carregamento.
- Novo componente `PlantaoHeroBox` extraído de `PlantaoEnem2026.tsx`, reutilizado na home e na landing (garante que fiquem iguais).
- Remover `NewsletterPopup`/`EmailPopup` do `Index.tsx`.
- Renomear rotas/arquivos Enem2025/Fuvest2025 e adicionar `<Navigate>` dos caminhos antigos; atualizar `ThematicSections` e mensagens de WhatsApp em `constants.ts`.
