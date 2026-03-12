'use client'
import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import { PageHeader, OutputBox, NicheSelect, ModuleLayout, Label, RunButton } from '@/components/ui'
import { useModule } from '@/lib/useModule'

export default function CompetitorPage() {
  const { output, loading, niche, setNiche, run, download } = useModule('competitor', 'Espião de Concorrência')
  const [url, setUrl]       = useState('')
  const [content, setContent] = useState('')

  const go = () => run('/api/competitor', {
    text: content,
    niche, url,
    prompt: `Analise a estratégia de marketing do concorrente abaixo para o nicho ${niche}.\nURL: ${url || 'não informada'}\nConteúdo/Copy do concorrente:\n${content}\n\n## Promessa Principal\n## Posicionamento\n## Gatilhos Psicológicos Usados\n## Público-alvo Identificado\n## Dores Exploradas\n## Pontos Fortes\n## Pontos Fracos e Vulnerabilidades\n## Como Atacar (diferenciação)\n## Headlines Alternativas para Competir\n## Estratégia de Copy para Superar`,
  }, `Análise Concorrente`)

  return (
    <AppShell>
      <PageHeader title="Espião de Concorrência" subtitle="Analise qualquer concorrente — copies, posicionamento, fraquezas e como superar" badge="Intelligence" />
      <ModuleLayout
        left={<>
          <div><Label>Nicho</Label><NicheSelect value={niche} onChange={setNiche} /></div>
          <div><Label>URL do concorrente (opcional)</Label>
            <input type="url" value={url} onChange={e => setUrl(e.target.value)}
              placeholder="https://concorrente.com" className="w-full text-sm px-3 py-2 rounded-xl" />
          </div>
          <div>
            <Label>Cole a copy / conteúdo do concorrente</Label>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={14}
              placeholder="Cole aqui: landing page, copy de email, post, anúncio, headline, descrição de produto — qualquer conteúdo do concorrente..."
              className="w-full text-sm px-3 py-3 rounded-xl resize-none" />
          </div>
          <RunButton onClick={go} loading={loading} label="⚡ Espionar Concorrente" loadingLabel="Analisando..." />
        </>}
        right={<OutputBox title="Análise Competitiva" content={output} loading={loading} onDownload={() => download('concorrente')} />}
      />
    </AppShell>
  )
}
