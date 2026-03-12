'use client'
import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import { PageHeader, OutputBox, NicheSelect, ModuleLayout, Label, RunButton } from '@/components/ui'
import { useModule } from '@/lib/useModule'

const FOCUS = ['Tendências gerais do nicho','Conteúdo viral agora','Ângulos de copy em alta','Formatos e plataformas em crescimento','Oportunidades de posicionamento','Calendário de datas quentes']

export default function TrendsPage() {
  const { output, loading, niche, setNiche, run, download } = useModule('trends', 'Tendências')
  const [focus, setFocus] = useState(FOCUS[0])
  const [context, setContext] = useState('')

  const go = () => run('/api/trends', {
    text: context,
    niche,
    prompt: `Foco: ${focus}\nNicho: ${niche}\nContexto adicional: ${context || 'nenhum'}\n\nIdentifique tendências quentes, ângulos de copy viralizando, formatos em crescimento e oportunidades de timing para o nicho ${niche}. Entregue ações práticas para aproveitar cada tendência AGORA.\n\n## Tendências Quentes Agora\n## Conteúdos Viralizando\n## Ângulos de Copy em Alta\n## Formatos em Crescimento\n## Oportunidades de Timing\n## Datas e Eventos Estratégicos\n## Plano de Ação — Próximos 30 dias`,
  }, `Tendências ${niche}`)

  return (
    <AppShell>
      <PageHeader title="Radar de Tendências" subtitle="O que está viralizando no seu nicho — ângulos, formatos e oportunidades de timing" badge="Trends" />
      <ModuleLayout
        left={<>
          <div><Label>Nicho</Label><NicheSelect value={niche} onChange={setNiche} /></div>
          <div>
            <Label>Foco da análise</Label>
            <div className="space-y-1.5">
              {FOCUS.map(f => (
                <button key={f} onClick={() => setFocus(f)}
                  className="w-full text-left text-xs px-3 py-2.5 rounded-xl transition-all"
                  style={focus === f
                    ? { background: 'rgba(201,168,76,.1)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,.2)' }
                    : { background: 'var(--card)', color: 'var(--sub)', border: '1px solid var(--border)' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label>Contexto adicional (opcional)</Label>
            <textarea value={context} onChange={e => setContext(e.target.value)} rows={4}
              placeholder="Ex: Lançamento de produto em 2 semanas, foco em SaaS B2B enterprise..."
              className="w-full text-sm px-3 py-2.5 rounded-xl resize-none" />
          </div>
          <RunButton onClick={go} loading={loading} label="⚡ Analisar Tendências" loadingLabel="Analisando mercado..." />
        </>}
        right={<OutputBox title={`Tendências — ${niche}`} content={output} loading={loading} onDownload={() => download('tendencias')} />}
      />
    </AppShell>
  )
}
