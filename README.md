# X Spy History v2.0 🕵️
### AI Content Intelligence Platform — 14 Módulos

---

## Setup em 3 passos

```bash
# 1. Instalar
cd xspyhistory && npm install

# 2. Configurar .env.local
cp .env.local .env.local
# Edite com suas chaves (veja abaixo)

# 3. Rodar
npm run dev
# → http://localhost:3000
```

## Variáveis de ambiente

```env
ANTHROPIC_API_KEY=sk-ant-...          # console.anthropic.com
ELEVENLABS_API_KEY=...                # elevenlabs.io
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
NEXT_PUBLIC_SUPABASE_URL=...          # supabase.com (opcional)
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Deploy Vercel

```bash
npm i -g vercel
vercel --prod
# Configure as 3 env vars no Vercel dashboard
```

---

## 14 Módulos

| Módulo | O que faz |
|--------|-----------|
| **Analisador** | Upload PDF/DOCX/TXT → análise completa streaming + áudio ElevenLabs |
| **Copy Spy** | Extrai e adapta copies bilionárias (Ogilvy, Halbert, Hormozi...) |
| **Copy Rewriter** | Reescreve qualquer texto com 5 variações e gatilhos aplicados |
| **Espião de Concorrência** | Analisa copy, posicionamento e fraquezas de concorrentes |
| **Radar de Tendências** | O que está viralizando no nicho — formatos, ângulos, timing |
| **Auditor de LP** | Score CRO 0-100, o que mata a conversão, recomendações práticas |
| **E-mails & Posts** | Sequências de email + LinkedIn + Instagram + Twitter + Reels |
| **Criativos** | Meta, YouTube, TikTok, Google Display com roteiro completo |
| **VSL Script** | Roteiro de Video Sales Letter pronto para gravar |
| **Avatar Cliente** | ICP completo com psicologia profunda, dores e linguagem |
| **Funil Completo** | Topo/Meio/Fundo com copy, ads e emails por etapa |
| **SEO & Ads** | Keywords, Google Ads RSA, Meta targeting, estratégia integrada |
| **Histórico** | Biblioteca local de todos os outputs — busca, filtro, exportar |
| **Dashboard** | Visão geral e acesso rápido a todos os módulos |

## Histórico local

O histórico é salvo no **localStorage** do browser — sem necessidade de banco de dados.
Para cloud persistence, rode o `supabase-schema.sql` no Supabase.

## Custo estimado/mês

| Serviço | Custo |
|---------|-------|
| Anthropic Claude API | ~R$15-50 |
| ElevenLabs | ~R$25 (Starter) |
| Vercel | Grátis |
| Supabase | Grátis (opcional) |
| **Total** | **~R$40-75/mês** |
