# CLAUDE.md

> Contexto do projeto para o Claude Code. Preencha cada seção ao começar um
> novo projeto a partir deste template — quanto mais específico, menos o
> Claude precisa perguntar ou adivinhar.

## Sobre o projeto
- Nome: Victoria — Social Media Manager (@viicksocialmedia)
- Objetivo: Landing page one-page de portfólio da Victoria para mostrar serviços, cases com resultado e depoimentos, e levar o visitante ao WhatsApp
- Público-alvo: Profissionais e pequenos negócios (clínicas, escritórios, consultórios) que querem crescer nas redes sociais; atendimento online para todo o Brasil

## Stack técnica
- Frontend: HTML + CSS + JavaScript puro (sem framework/build step)
- Backend: Nenhum (site estático)
- Banco de dados: Nenhum
- Hospedagem / Deploy: Vercel (https://victoria-social-media-site.vercel.app/)
- Outras ferramentas: Google Fonts (Cormorant Garamond, Poppins); ffmpeg para comprimir vídeos e gerar pôsteres

## Convenções de código
- Padrão de nomenclatura: classes CSS em BEM (`bloco__elemento--modificador`)
- Estrutura de pastas: `index.html`, `src/styles/tokens.css` (tokens, fonte da verdade), `src/styles/main.css`, `src/scripts/main.js`, `assets/` (só arquivos finais otimizados — originais ficam em pastas ignoradas pelo Git)
- Padrão de commits: mensagens curtas e descritivas em português
- Estratégia de testes: verificação visual manual (desktop e mobile), sem suíte automatizada

## Comandos úteis
- Não há build — sirva a pasta com qualquer servidor estático (ex: `python -m http.server`)
- Vídeo novo: `ffmpeg -i ENTRADA -vf "scale=540:-2,fps=30" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k -movflags +faststart assets/NOME.mp4`
- Imagem nova: converter para `.webp` (ex: `ffmpeg -i ENTRADA -quality 80 assets/NOME.webp`)

## Regras e restrições
- Nunca faça commit direto na `main`; sempre abra PR
- Nunca exponha chaves de API, tokens ou segredos em código ou logs
- Contato via WhatsApp usa `wa.me/555596253172` com mensagem pré-preenchida (o link antigo `w.app/viicksocialmedia` estava fora do ar)
- Ao mudar serviços ou perguntas frequentes, atualize também o JSON-LD (`ProfessionalService` e `FAQPage`) no `<head>`
- (adicione restrições específicas do projeto aqui)

## Subagentes disponíveis
Definidos em `.claude/agents/`:

**Produto & UX**
- `product-owner` — transforma pedidos em user stories e critérios de aceite
- `ux-flow` — mapeia fluxos de usuário e jornada antes da implementação

**Design**
- `design-tokens` — extrai e mantém os tokens de design (cores, tipografia, espaçamento)
- `design-wireframe` — gera wireframes/mockups de telas a partir de requisitos
- `design-review` — revisa a UI implementada contra os tokens e acessibilidade

**Desenvolvimento & qualidade**
- `developer` — implementa features e correções seguindo o CLAUDE.md
- `code-reviewer` — revisão de código focada em qualidade e boas práticas
- `security-reviewer` — revisão de segurança (OWASP, segredos, validação de input)
