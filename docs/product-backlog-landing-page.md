# Backlog — Landing Page Victoria (@viicksocialmedia)

**Épico:** Recriar como código de produção, em HTML/CSS/JS puro (sem framework, sem build tooling), a landing page single-page de portfólio da Victoria, a partir do handoff de design em `prototype_extracted/design_handoff_portfolio_victoria/README.md` e da referência visual `Portfolio Victoria.dc.html`.

**Objetivo de negócio:** publicar uma landing page de alta conversão que posiciona a Victoria como social media profissional (não substituível por IA), mostra prova social real (case do Instituto Neurônio & Pensamento, depoimentos) e direciona tráfego qualificado para WhatsApp/Instagram — os dois únicos canais de conversão do site.

**Decisão já tomada:** implementação estática (HTML/CSS/JS vanilla), sem framework/build tooling, pois não há lógica de app nem estado.

---

## Suposições assumidas (pedido não deixa 100% explícito)

1. O arquivo `Portfolio Victoria.dc.html` usa um custom element `<image-slot>` e um script `./support.js` que são infraestrutura do **ambiente de prototipagem** (não existem no bundle entregue) — assume-se que os 3 placeholders da seção Portfólio (`case-2`, `case-3`, `case-4`) devem ser recriados em HTML/CSS puro (ex.: `div` com estado visual "placeholder", sem depender de nenhum script externo), já que o README confirma que são "unfilled image placeholders" a serem preenchidos depois pela cliente.
2. Nenhum `<title>`, meta description, favicon, `lang`, Open Graph ou `robots`/sitemap estão definidos no protótipo (ele é só um fragmento de body). Como este vai para produção, assume-se que isso precisa ser definido mesmo não estando no handoff — story dedicada abaixo, com suposições de copy que a Victoria/cliente deve validar.
3. Assume-se hospedagem estática simples (ex. Netlify/Vercel/GitHub Pages/hosting compartilhado) — a escolha de hospedagem e o processo de deploy **não fazem parte deste backlog** (non-goal), pois não foram solicitados.
4. O mapeamento de links dos Highlights (ícones B/P/F/S) foi confirmado lendo o `.dc.html` linha a linha, pois o README só diz "cada um linka para a seção relevante" sem detalhar — o mapeamento real não é 1:1 óbvio:
   - **B — Bastidores** → `#sobre`
   - **P — Pacotes** → `#contato`
   - **F — Feedbacks** → `#depoimentos`
   - **S — Serviços** → `#contato`
   Isto é copiado literalmente do protótipo (não é um bug óbvio de replicar — Pacotes e Serviços apontam ambos para Contato porque não existe seção dedicada a eles nesta página). Sinalizado como risco/confirmação abaixo.
5. Idioma do documento: `pt-BR` (todo o copy é em português).

---

## Priorização (MoSCoW)

| Prioridade | Stories |
|---|---|
| **Must** | 1 (Estrutura base), 2 (Nav), 3 (Hero), 4 (Highlights), 5 (Métricas+Manifesto), 6 (Sobre), 7 (Case em destaque), 8 (Portfólio), 9 (Depoimentos), 10 (Contato+Footer), 11 (Responsividade fluida), 12 (Acessibilidade/foco), 13 (Otimização de imagens) |
| **Should** | 14 (Meta tags/SEO básico/favicon) |
| **Could** | 15 (Checklist cross-browser/performance final) |
| **Won't (neste backlog)** | Deploy/hospedagem, formulário de contato, CMS/edição de conteúdo, animações JS, internacionalização |

Todas as stories "Must" são necessárias para uma primeira publicação fiel ao handoff; nenhuma é opcional porque a página é curta e cada seção é parte do fluxo de conversão único (Hero → prova social → CTA).

---

## Dependências entre stories

- **Story 1 (Estrutura base)** é pré-requisito de todas as outras — define tokens CSS (cores, fontes, espaçamento, clamp scale), reset, e o arquivo/estrutura de projeto.
- **Story 2 (Nav)** referencia `id`s de âncora (`#sobre`, `#case`, `#portfolio`, `#depoimentos`, `#contato`) que só existem depois que as Stories 6–10 criam essas seções — o nav pode ser implementado com os links desde o início, mas a **verificação funcional dos anchors** só fecha quando todas as seções-alvo existem. Rodar o teste de scroll-to-anchor como parte da Definition of Done da Story 2 só faz sentido após 6–10.
- **Story 4 (Highlights)** tem a mesma dependência de anchors, específica com `#sobre` e `#depoimentos` (via Stories 6 e 9) e `#contato` (via Story 10).
- **Story 13 (Otimização de imagens)** deveria rodar **antes ou em paralelo** às Stories 3 (Hero) e 7 (Case em destaque), já que são essas que consomem os arquivos mais pesados (`victoria-hero.png`, `inp-reel-editor.png`) — evita retrabalho de já ter integrado os arquivos originais não otimizados no HTML.
- **Story 11 (Responsividade fluida)** e **Story 12 (Acessibilidade)** são transversais: aplicam-se a cada seção conforme ela é construída, mas cada uma também vira uma story própria de **verificação end-to-end** depois que todas as seções (Stories 2–10) existem — porque só aí dá para validar o empilhamento fluido da página inteira e o percurso completo de tab.

---

## Riscos

1. **`assets/inp-reel-editor.png` tem ~6,97 MB** e `assets/victoria-hero.png` tem ~2,96 MB — ambos muito acima do razoável para web (o resto dos assets está entre 100–325 KB). Sem otimização, isso vai degradar fortemente o LCP/tempo de carregamento da página, especialmente no Hero (primeira dobra) e no Case em destaque. Tratado na Story 13, priorizado como Must.
2. **Sem `<title>`/meta description/favicon/OG no handoff** — como é a primeira vez que este conteúdo vira produção, alguém precisa definir esse copy (não existe no design handoff). Sinalizado como suposição/Story 14; requer validação de copy com a cliente antes de publicar.
3. **Custom element `<image-slot>` e `support.js`** do protótipo não são portáveis — precisam ser recriados como HTML/CSS estático simples na Story 8. Risco baixo (visual simples: placeholder retangular com texto "Próximo case"), mas deve ser confirmado com quem aprovou o design que o placeholder final bate visualmente com o protótipo.
4. **Mapeamento não-óbvio dos links de Highlights** (Pacotes → `#contato`, Serviços → `#contato`, não para seções próprias) pode parecer um "bug" para quem revisar sem ter lido o `.dc.html` linha a linha — deixado explícito na Story 4 para não ser "corrigido" incorretamente durante a implementação ou revisão.
5. **Fonte de terceiros (Google Fonts)** — carregar Cormorant Garamond + Poppins via `fonts.googleapis.com` introduz uma dependência externa de rede; se performance/privacidade for preocupação futura, poderia virar host local — fora de escopo agora, mas registrado como risco técnico menor.
6. **Sem breakpoints fixos, só `clamp()`/`auto-fit`/`minmax()`** — qualquer implementação que usar media queries fixas em vez de fluid layout diverge do handoff (o README é explícito: "no separate mobile layout was designed; recreate this fluid stacking rather than fixed breakpoints"). Risco de retrabalho se um dev aplicar padrões de projeto anteriores por hábito.

---

## Non-goals (fora de escopo deste backlog)

- Formulário de contato — o handoff confirma que não existe formulário, apenas links para WhatsApp (`https://w.app/viicksocialmedia`) e Instagram (`https://www.instagram.com/viicksocialmedia/`).
- Qualquer JS de estado, animação ou interatividade além de scroll-to-anchor nativo — o handoff é explícito: "No JS-driven state, animation, or forms in this design — it is static/scroll-only."
- CMS ou qualquer mecanismo para a cliente editar conteúdo sem tocar em código — os 3 placeholders da seção Portfólio ficam como placeholders estáticos; popular com casos reais é trabalho futuro, fora deste backlog.
- Deploy, domínio, hospedagem, HTTPS, analytics/pixels de tracking — nada disso foi pedido; se necessário, deve virar backlog separado.
- Internacionalização / segundo idioma.
- Dark mode / temas alternativos — o handoff define uma única paleta de cores fixa por seção (a "alternância de fundo" descrita não é dark mode, é parte do layout).
- Testes automatizados (unit/E2E) — não solicitados; página estática sem lógica não exige suíte de testes além de checagem manual/QA visual, que está coberta pelos critérios de aceite abaixo.

---

## Stories

### Story 1 — Estrutura base do projeto + fundações de design tokens
**Como** desenvolvedor que vai construir a landing page,
**quero** um esqueleto HTML/CSS/JS estático com os design tokens (cores, tipografia, espaçamento) centralizados,
**para** que todas as seções sejam construídas sobre a mesma base visual consistente, sem duplicar valores mágicos.

**Critérios de aceite:**
- Dado o projeto, quando eu abrir a estrutura de arquivos, então existe um `index.html`, um (ou mais) arquivo(s) CSS e nenhuma dependência de build tooling/framework (sem `package.json` obrigatório para rodar; o site abre direto no navegador ou via qualquer servidor estático simples).
- Dado o CSS, quando eu inspecionar as variáveis/tokens, então as cores abaixo estão definidas em um único lugar (ex. `:root` custom properties) e reutilizadas em todas as seções, não hardcoded seção a seção:
  - Cream `#F6F3EF`, tan `#EFE6D9`, near-black `#151515` e `#2B1E17`, terracota `#6D4B3A`, gold `#D9A566`.
- Dado o `<head>`, quando a página carrega, então as fontes Google Fonts `Cormorant Garamond` (400/500/600, itálico incluso) e `Poppins` (300–800) estão carregadas via `<link>` com `preconnect`.
- Dado o body, quando renderizado, então `font-family` padrão é Poppins, cor de texto padrão `#2B1E17`, background padrão `#F6F3EF`.
- Dado qualquer link (`a`), quando não tem estilo de botão explícito, então segue o comportamento padrão: cor `#2B1E17`, hover `#6D4B3A`, `text-decoration: none`.
- Dado o documento, quando inspecionado, então `<html lang="pt-BR">` está definido.
- Dado a escala de espaçamento, quando aplicada, então usa `clamp()` conforme os valores do handoff (padding vertical de seções grandes `clamp(90px,13vw,150px)`; seções menores `clamp(36px,6vw,90px)`; padding horizontal `clamp(24px,5vw,64px)`; largura máxima de conteúdo `1280px` centralizada).

**Riscos/dependências:** nenhuma dependência; é a base de tudo.

---

### Story 2 — Nav sticky
**Como** visitante da página,
**quero** uma barra de navegação fixa no topo com acesso rápido às seções e ao contato,
**para** navegar sem precisar rolar até o topo e ter sempre um CTA de contato visível.

**Critérios de aceite:**
- Dado o topo da página, quando eu rolo a página para baixo, então a nav permanece fixa (`position: sticky; top: 0`) sobre o conteúdo, com `z-index` acima das seções.
- Dado o fundo da nav, quando visível sobre conteúdo rolado, então usa `rgba(246,243,239,0.9)` com `backdrop-filter: blur(8px)`.
- Dado o lado esquerdo da nav, quando renderizado, então mostra um avatar circular de 34px (`assets/victoria-hero.png`, `object-fit: cover`, `border-radius: 50%`) com `alt="Victoria"`, seguido do texto "viicksocialmedia" (Poppins 700, 15px).
- Dado o lado direito da nav, quando renderizado, então mostra links "Sobre" (`#sobre`), "Case" (`#case`), "Portfólio" (`#portfolio`), "Depoimentos" (`#depoimentos`) em uppercase, 12px, opacidade 0.8, e um botão "Contato" (`#contato`) com fundo `#2B1E17`, texto cream, em formato pill/padding sólido, opacidade 1.
- Dado qualquer um dos 4 links de texto, quando clicado, então a página rola suavemente (ou por padrão do navegador) até a seção correspondente pelo `id` do alvo — **este critério só pode ser validado completamente após as Stories 6–10 (seções de destino) existirem.**
- Dado o botão "Contato" (pill), quando comparado ao restante do nav, então é visualmente destacado como CTA (não como link de texto padrão).
- Dado uma viewport estreita, quando os itens de nav não cabem em uma linha, então eles quebram em `flex-wrap` em vez de causar overflow horizontal.

**Riscos/dependências:** depende de Stories 6–10 para verificação funcional completa dos anchors (ver seção de Dependências). Depende da Story 13 se o avatar reaproveitar a imagem otimizada do Hero.

---

### Story 3 — Hero
**Como** visitante que chega à página,
**quero** entender em segundos quem é a Victoria, sua proposta de valor e como falar com ela,
**para** decidir rapidamente se quero prosseguir (ver o case ou entrar em contato).

**Critérios de aceite:**
- Dado o layout do Hero, quando renderizado em tela larga, então é um grid de duas colunas (`grid-template-columns: repeat(auto-fit, minmax(380px,1fr))`), coluna esquerda com o texto, direita com a foto.
- Dado o texto do Hero, quando renderizado, então contém, nesta ordem: aspas decorativas grandes (itálico Cormorant, ~120px, cor terracota em baixa opacidade), eyebrow "Eu sei o que você pensa" (itálico Cormorant, cor `#6D4B3A`), headline "quando ouve" + `<span>` "social media" em terracota (Poppins 800, uppercase, `clamp(34px,6.4vw,58px)`), parágrafo "Estratégia, conteúdo e anúncios para negócios que querem crescer de verdade — não só postar todo dia."
- Dado os CTAs do Hero, quando renderizados, então existem exatamente dois botões: "Ver case real" (sólido, fundo `#2B1E17`, link `href="#case"`) e "Falar com a Victoria" (outline `1.5px solid #2B1E17`, link `href="https://w.app/viicksocialmedia"`, abre link externo).
- Dado a linha de estatísticas do Hero, quando renderizada, então mostra "16 posts · 62 seguidores · @viicksocialmedia" com os números em `<strong>`.
- Dado a coluna direita, quando renderizada, então mostra `assets/victoria-hero.png` com `object-fit: cover; object-position: 50% 20%` preenchendo a coluna (o crop deve manter o rosto enquadrado, não cortado no topo).
- Dado uma viewport abaixo de ~760px de largura (coluna efetiva menor que 380px), quando renderizada, então as duas colunas empilham verticalmente (comportamento natural do `auto-fit`/`minmax`, sem media query manual fixa).

**Riscos/dependências:** depende da Story 13 para a imagem `victoria-hero.png` (2,96 MB) ser otimizada antes de ir para produção. O link "Ver case real" depende do `id="case"` existir (Story 7).

---

### Story 4 — Highlights (linha de ícones circulares)
**Como** visitante familiarizado com o Instagram da Victoria,
**quero** uma linha de atalhos no estilo "destaques" do Instagram,
**para** pular direto para o que mais me interessa (bastidores, pacotes, feedbacks, serviços).

**Critérios de aceite:**
- Dado a seção Highlights, quando renderizada, então mostra 4 links em linha, cada um com um círculo outline de 44px contendo uma inicial em itálico serif (Cormorant), e um rótulo em uppercase 11.5px abaixo.
- Dado os 4 itens, quando inspecionados, então os rótulos e destinos são exatamente:
  | Inicial | Rótulo | `href` |
  |---|---|---|
  | B | Bastidores | `#sobre` |
  | P | Pacotes | `#contato` |
  | F | Feedbacks | `#depoimentos` |
  | S | Serviços | `#contato` |
  (Este mapeamento vem do `.dc.html` original — Pacotes e Serviços intencionalmente apontam para `#contato` por não haver seção dedicada a eles nesta página; não "corrigir" para outro destino sem validar com quem aprovou o design.)
- Dado espaço insuficiente em uma linha, quando a viewport é estreita, então os 4 itens quebram (`flex-wrap: wrap`) permanecendo centralizados, sem overflow horizontal.

**Riscos/dependências:** depende de `#sobre` (Story 6), `#depoimentos` (Story 9) e `#contato` (Story 10) existirem para validação funcional.

---

### Story 5 — Métricas + Manifesto (faixa escura)
**Como** visitante avaliando se a Victoria é confiável,
**quero** ver números concretos de resultado e entender por que contratar uma pessoa (não uma IA),
**para** ganhar confiança na proposta antes de rolar para o resto da página.

**Critérios de aceite:**
- Dado a faixa, quando renderizada, então tem fundo `#151515` e texto cream `#F6F3EF`, ocupando a largura da seção (isto quebra a alternância cream do Nav/Hero/Highlights — não usar o mesmo fundo cream aqui).
- Dado o grid de métricas, quando renderizado, então mostra 3 colunas (`repeat(auto-fit, minmax(220px,1fr))`), cada uma com um número grande em Cormorant Garamond cor `#D9A566` e uma legenda pequena em cream a 70% de opacidade:
  1. "+22%" — "seguidores em 2 meses / Instituto Neurônio & Pensamento"
  2. "98,7 mil" — "visualizações em / um único reel"
  3. "45" — "novos pacientes / captados em 2 meses"
- Dado o manifesto abaixo do grid, quando renderizado, então mostra, centralizado, max-width 720px: eyebrow itálico gold "Uma IA não substitui", headline uppercase bold "um social media." (Poppins 800), parágrafo "Estratégia, conteúdo e anúncios exigem alguém que conhece a sua marca — não um algoritmo." em cream a 75% de opacidade.
- Dado qualquer viewport, quando as 3 colunas não cabem lado a lado, então empilham fluida e centralizadamente (sem breakpoint fixo).

**Riscos/dependências:** nenhuma dependência de outras seções; pode ser feita em paralelo a 3/4.

---

### Story 6 — Sobre (About)
**Como** visitante interessado em contratar a Victoria,
**quero** conhecer quem ela é e o que ela faz,
**para** avaliar se o perfil dela combina com o que eu preciso.

**Critérios de aceite:**
- Dado a seção, quando renderizada, então tem `id="sobre"`, fundo cream, layout de duas colunas (`repeat(auto-fit, minmax(300px,1fr))`): foto à esquerda, texto à direita.
- Dado a foto, quando renderizada, então usa `assets/victoria-about.jpg`, `object-fit: cover`, altura `clamp(360px,50vw,500px)`, `border-radius: 4px`.
- Dado o texto, quando renderizado, então contém, nesta ordem: label de índice itálico "01 — Sobre" (Cormorant, ~15px, baixa opacidade), headline itálico "Olá, eu sou a Victoria." (Cormorant, `clamp(30px,5vw,40px)`), parágrafo de bio: "Social media para negócios que querem crescer. Cuido do conteúdo, da estratégia e dos anúncios de marcas e profissionais — mostrando também os bastidores, o marketing e a rotina de quem trabalha PJ nesse mercado.", e linha de stats "16 posts · 62 seguidores · 144 seguindo" (números em `<strong>`).
- Dado uma viewport estreita (coluna < 300px efetivo), quando renderizada, então as colunas empilham (foto acima, texto abaixo), fluido via grid, sem media query fixa.

**Riscos/dependências:** nenhuma; provê o `id="sobre"` usado por Nav (Story 2) e Highlights (Story 4).

---

### Story 7 — Case em destaque (Instituto Neurônio & Pensamento)
**Como** visitante em dúvida se a Victoria entrega resultado,
**quero** ver um case real e completo, com prints e números,
**para** ter prova concreta antes de entrar em contato.

**Critérios de aceite:**
- Dado a seção, quando renderizada, então tem `id="case"`, fundo tan `#EFE6D9`, label de índice "02 — Case em destaque", título itálico "Instituto Neurônio & Pensamento" e, alinhado à direita/baseline, "Clínica de neurociências · Porto Alegre, RS".
- Dado o grid de imagens, quando renderizado, então mostra 3 colunas (`repeat(auto-fit, minmax(240px,1fr))`):
  1. `assets/inp-reel-editor.png`, `alt="Reel do Instituto Neurônio e Pensamento"`, `object-fit: contain`, fundo `#151515`, altura 420px.
  2. `assets/inp-reel-insights.png`, `alt="Insights do reel: 98,7 mil visualizações"`, `object-fit: contain`, fundo branco, altura 420px.
  3. Coluna empilhada com `assets/inp-profile-before.png` (`alt="Perfil antes: 3.376 seguidores"`) e `assets/inp-profile-after.png` (`alt="Perfil depois: 4.062 seguidores"`), cada uma `object-fit: contain`, fundo branco, altura 190px.
  - Nenhuma dessas imagens é cortada (`object-fit: contain`, nunca `cover`) — são capturas de tela reais, cortar destruiria a informação.
- Dado a barra de estatísticas abaixo do grid, quando renderizada, então tem fundo `#2B1E17`, texto cream, 4 colunas (`repeat(auto-fit, minmax(140px,1fr))`) com divisores verticais sutis entre elas:
  1. "3.376 → 4.062" — "seguidores"
  2. "4,3 mil" — "curtidas no reel"
  3. "528 / 502" — "envios / salvamentos"
  4. "175,8 mil" — "visualizações do perfil (30 dias)"
- Dado qualquer viewport, quando as colunas não cabem, então empilham fluidamente.

**Riscos/dependências:** depende fortemente da Story 13 — `inp-reel-editor.png` tem ~6,97 MB, o maior asset do projeto; não deve ir para produção sem otimização.

---

### Story 8 — Portfólio (Outros trabalhos)
**Como** visitante que quer ver mais volume de trabalho,
**quero** ver uma prévia de que existem outros casos (mesmo vazios por ora),
**para** entender que o case em destaque não é o único trabalho da Victoria.

**Critérios de aceite:**
- Dado a seção, quando renderizada, então tem `id="portfolio"`, fundo cream, label de índice "03 — Portfólio", headline itálico "Outros trabalhos".
- Dado o grid, quando renderizado, então mostra 3 placeholders retangulares (`repeat(auto-fit, minmax(240px,1fr))`, altura 320px), cada um exibindo visualmente o texto "Próximo case" centralizado, construídos em HTML/CSS puro (não depender de nenhum custom element ou script externo do protótipo original, que não é portável).
- Dado os 3 placeholders, quando inspecionados, então são visualmente consistentes com o restante da paleta (ex. fundo neutro/tan com borda sutil) — não precisam ser pixel-idênticos ao `<image-slot>` do protótipo, mas devem comunicar claramente "espaço reservado para case futuro".
- Dado esta seção, quando o conteúdo real de novos cases existir no futuro, então a estrutura permite substituir cada placeholder por uma imagem real sem redesenhar o grid (fora de escopo implementar isso agora, só não pode ser um obstáculo estrutural).

**Riscos/dependências:** decisão de implementação: recriar `<image-slot>`/`support.js` do protótipo como HTML/CSS estático (ver Risco 3).

---

### Story 9 — Depoimentos (Testimonials)
**Como** visitante em fase final de decisão,
**quero** ver depoimentos reais de outros clientes,
**para** confirmar a percepção de qualidade antes de entrar em contato.

**Critérios de aceite:**
- Dado a seção, quando renderizada, então tem `id="depoimentos"`, fundo tan `#EFE6D9`, label de índice "04 — Depoimentos", headline itálico "O que dizem os clientes".
- Dado o grid, quando renderizado, então mostra 3 colunas (`repeat(auto-fit, minmax(240px,1fr))`) com `assets/testimonial-1.png` (`alt="Depoimento: feed parecia de Pinterest"`), `assets/testimonial-2.png` (`alt="Depoimento: 45 novos pacientes"`), `assets/testimonial-3.png` (`alt="Depoimento: perfil mais profissional"`), cada uma com `border-radius: 6px` e `box-shadow: 0 12px 30px rgba(43,30,23,0.12)`.
- Dado qualquer viewport, quando as colunas não cabem lado a lado, então empilham fluidamente.

**Riscos/dependências:** nenhuma; provê `id="depoimentos"` usado por Nav e Highlights.

---

### Story 10 — Contato + Footer
**Como** visitante convencido pela página,
**quero** um CTA final claro e direto,
**para** entrar em contato imediatamente pelo canal que preferir.

**Critérios de aceite:**
- Dado a seção Contato, quando renderizada, então tem `id="contato"`, fundo `#151515`, texto cream, conteúdo centralizado: eyebrow itálico gold "Vamos conversar?", headline uppercase bold "Seu próximo conteúdo / começa aqui.", parágrafo "Disponível para novos projetos de gestão e estratégia de redes sociais." (cream a 72% opacidade).
- Dado os CTAs, quando renderizados, então existem exatamente dois: "Falar no WhatsApp" (sólido, fundo cream `#F6F3EF`, texto `#151515`, `href="https://w.app/viicksocialmedia"`) e "@viicksocialmedia" (outline cream, `href="https://www.instagram.com/viicksocialmedia/"`) — ambos abrindo destino externo.
- Dado o footer, quando renderizado, então mostra uma linha simples centralizada: "© 2026 Victoria — @viicksocialmedia".
- Dado os dois CTAs, quando a viewport é estreita, então quebram em `flex-wrap` permanecendo centralizados.

**Riscos/dependências:** nenhuma dependência de outras seções de conteúdo; fecha o funil de conversão da página.

---

### Story 11 — Verificação de responsividade fluida (cross-cutting)
**Como** Product Owner validando a entrega,
**quero** confirmar que a página inteira segue o comportamento fluido descrito no handoff (sem breakpoints fixos),
**para** garantir que a experiência funciona bem em qualquer largura de tela, não só nos tamanhos testados manualmente.

**Critérios de aceite:**
- Dado o CSS de toda a página, quando revisado, então nenhuma seção usa `@media` fixo para reorganizar colunas em layout — todas as grids usam `auto-fit`/`minmax()` conforme especificado seção a seção.
- Dado qualquer tamanho de fonte ou padding de seção especificado com `clamp()` no handoff, quando inspecionado no CSS final, então usa `clamp()` com os mesmos valores mín/preferido/máx (não convertido para px fixo por breakpoint).
- Dado a página aberta em larguras de viewport de 320px, 600px, 760px, 1024px, 1440px e 1920px, quando inspecionada visualmente, então: nenhum elemento vaza horizontalmente (sem scroll horizontal indesejado), nenhum texto se sobrepõe, e o empilhamento de colunas (Hero, Sobre, grids de imagem) ocorre suavemente conforme o espaço disponível, não abruptamente.
- Dado a imagem do Hero e a foto da seção Sobre, quando a viewport muda de largura, então o enquadramento (`object-position`) mantém o rosto da Victoria visível, sem cortar de forma estranha.

**Riscos/dependências:** só pode ser totalmente verificada depois que as Stories 2–10 estiverem implementadas.

---

### Story 12 — Verificação de acessibilidade e foco de teclado (cross-cutting)
**Como** visitante que navega por teclado ou usa leitor de tela,
**quero** conseguir navegar por toda a página e entender o conteúdo das imagens,
**para** ter acesso equivalente à informação, independente de como eu navego.

**Critérios de aceite:**
- Dado qualquer link (`a`) da página, quando recebe foco via teclado (`:focus-visible`), então exibe outline visível `2px solid #6D4B3A` com `outline-offset: 3px` — em todas as seções, inclusive sobre fundos escuros (validar contraste do outline em `#151515`/`#2B1E17`).
- Dado a ordem de tab da página, quando percorrida do topo ao fim usando só o teclado (Tab/Shift+Tab), então segue a ordem visual/lógica: Nav → Hero CTAs → Highlights → Sobre (sem link) → Case (sem link) → Portfólio (sem link) → Depoimentos (sem link) → Contato CTAs → nenhum elemento é pulado ou fica inacessível.
- Dado qualquer imagem de conteúdo (`<img>`), quando inspecionada, então tem `alt` descritivo e não-vazio, usando exatamente os textos definidos por seção (ex. "Perfil antes: 3.376 seguidores", "Insights do reel: 98,7 mil visualizações" etc., conforme listado nas Stories 6/7/9).
- Dado os textos de baixo contraste (ex. cream a 65–78% de opacidade sobre fundo escuro, ou `#2B1E17` a 68–78% sobre cream), quando avaliados com um checador de contraste, então corpo de texto atinge no mínimo AA (4.5:1) para texto normal — se algum valor do handoff ficar abaixo disso, sinalizar para o designer antes de "corrigir" silenciosamente (pode ser intencional em elementos decorativos, não em texto de leitura).
- Dado a estrutura HTML, quando inspecionada, então usa heading hierarchy sensata (ex. um único ponto de entrada H1 no Hero, headings de seção como H2) mesmo que o handoff não especifique tags semânticas explicitamente — isto é adição de acessibilidade sobre o handoff visual, necessária para leitores de tela.

**Riscos/dependências:** só pode ser totalmente verificada depois que as Stories 2–10 estiverem implementadas. Depende de decisão de heading hierarchy não coberta explicitamente pelo handoff (suposição registrada acima).

---

### Story 13 — Otimização de imagens (assets pesados)
**Como** visitante em conexão móvel,
**quero** que a página carregue rápido mesmo com várias imagens grandes,
**para** não abandonar a página antes dela terminar de carregar.

**Critérios de aceite:**
- Dado `assets/inp-reel-editor.png` (atualmente ~6,97 MB), quando otimizado para produção, então seu tamanho final é reduzido para uma faixa comparável aos demais assets do case (~100–350 KB), sem perda visível de qualidade na exibição em `object-fit: contain` dentro de um container de 420px de altura.
- Dado `assets/victoria-hero.png` (atualmente ~2,96 MB), quando otimizado para produção, então seu tamanho final é reduzido de forma equivalente, mantendo a qualidade necessária para preencher a coluna do Hero em telas grandes (`object-fit: cover`).
- Dado todas as imagens da página, quando servidas, então usam um formato/compressão adequado (ex. WebP/AVIF com fallback, ou PNG/JPEG bem comprimidos) mantendo fidelidade visual às capturas de tela originais (que precisam continuar legíveis — números e textos das screenshots do case não podem ficar borrados).
- Dado a implementação final, quando o peso total de assets da página é somado, então não excede uma meta razoável a ser definida com o time (ex. < 3–4 MB de imagens no total, a validar) — o objetivo é sair de ~11 MB de imagens brutas para algo compatível com uma landing page de conversão.
- Dado o HTML final, quando aplicável, então usa `loading="lazy"` em imagens fora da primeira dobra (tudo abaixo do Hero) para não competir por banda com o carregamento inicial.

**Riscos/dependências:** deve rodar antes/junto das Stories 3 e 7, que consomem os dois assets mais pesados — ver Risco 1.

---

### Story 14 — Meta tags básicas, título e favicon (Should)
**Como** pessoa que compartilha o link da página ou encontra ela numa busca,
**quero** ver um título, descrição e ícone corretos,
**para** identificar do que se trata antes mesmo de abrir a página.

**Critérios de aceite:**
- Dado o `<head>`, quando inspecionado, então existe `<title>` com o nome da Victoria/proposta (copy a validar com a cliente — sugestão: "Victoria — Social Media Manager | @viicksocialmedia").
- Dado o `<head>`, quando inspecionado, então existe `<meta name="description">` resumindo a proposta de valor (copy a validar — sugestão baseada no manifesto: "Estratégia, conteúdo e anúncios para negócios que querem crescer de verdade. Social media manager — @viicksocialmedia.").
- Dado o `<head>`, quando inspecionado, então existe um favicon definido (asset a ser fornecido ou recortado de `assets/victoria-hero.png` como placeholder, a validar com a cliente).
- Dado redes sociais, quando o link é compartilhado (ex. WhatsApp, Instagram, Twitter/X), então exibe um preview correto via Open Graph básico (`og:title`, `og:description`, `og:image` — usar `victoria-hero.png` otimizada como imagem padrão).

**Riscos/dependências:** copy de título/descrição não está no handoff — precisa validação da cliente antes de publicar (ver Suposição 2). Depende da Story 13 para a imagem do OG já estar otimizada.

---

### Story 15 — Checklist final cross-browser/performance (Could)
**Como** Product Owner fechando a entrega,
**quero** uma checagem final de compatibilidade e performance antes de considerar a página pronta,
**para** evitar surpresas depois de publicada.

**Critérios de aceite:**
- Dado a página finalizada, quando aberta nos navegadores mais comuns (Chrome, Firefox, Safari, Edge — desktop e mobile), então o layout, tipografia e comportamento de hover/focus são visualmente consistentes.
- Dado a página finalizada, quando testada com uma ferramenta de auditoria de performance (ex. Lighthouse), então não há regressões óbvias causadas por assets não otimizados (relacionar com Story 13) — meta de referência a acordar com o time (ex. Performance score > 80 mobile).
- Dado os links externos (WhatsApp, Instagram), quando clicados, então abrem corretamente e apontam para os handles corretos (`w.app/viicksocialmedia`, `instagram.com/viicksocialmedia`).

**Riscos/dependências:** só faz sentido após todas as demais stories Must/Should estarem concluídas; é a última etapa antes de considerar a página pronta para deploy (deploy em si é non-goal deste backlog).

---

## Resumo para o board

13 stories **Must** (1 fundação + 9 de seção/conteúdo + 3 transversais de qualidade), 1 **Should** (meta/SEO/favicon), 1 **Could** (checklist final). Nenhuma story depende de decisão de negócio pendente, exceto: (a) copy de `<title>`/meta description/favicon (Story 14) e (b) confirmação do mapeamento de links dos Highlights (Story 4) — ambos sinalizados para validação com quem aprovou o design/cliente antes do merge final.
