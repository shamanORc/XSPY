'use client'
import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import { PageHeader, OutputBox, NicheSelect, ModuleLayout, Label, RunButton } from '@/components/ui'
import { useModule } from '@/lib/useModule'

export default function AuditorPage() {
  const { output, loading, niche, setNiche, run, download } = useModule('auditor', 'Auditor de LP')
  const [url, setUrl]   = useState('')
  const [lp, setLp]     = useState('')

  const go = () => run('/api/auditor', {
    text: lp, niche, url,
    prompt: `Faça uma auditoria completa de CRO desta landing page para o nicho ${niche}.\nURL: ${url || 'não informada'}\nConteúdo da LP:\n${lp}\n\n## Score de Conversão: X/100\n### Breakdown do Score\n## ❌ O que Está Matando a Conversão\n## ✅ O que Está Funcionando\n## 🔧 Recomendações Prioritárias (top 5)\n## 💬 Headline Original vs Alternativas (3 opções)\n## 🎯 CTA Original vs Otimizado\n## 🧠 Objeções Não Tratadas\n## 📊 Prova Social — o que está faltando\n## 🚀 Plano de Otimização — Próximos 30 dias`,
  }, `Auditoria LP`)

  return (
    <AppShell>
      <PageHeader title="Auditor de Landing Page" subtitle="Score de conversão, o que está matando a venda e recomendações CRO completas" badge="CRO" />
      <ModuleLayout
        left={<>
          <div><Label>Nicho</Label><NicheSelect value={niche} onChange={setNiche} /></div>
          <div><Label>URL da Landing Page (opcional)</Label>
            <input type="url" value={url} onChange={e => setUrl(e.target.value)}
              placeholder="https://seusite.com/landing" className="w-full text-sm px-3 py-2 rounded-xl" />
          </div>
          <div>
            <Label>Cole o conteúdo da Landing Page</Label>
            <textarea value={lp} onChange={e => setLp(e.target.value)} rows={14}
              placeholder="Cole aqui todo o texto da sua landing page — headline, subheadline, copy, bullets, CTAs, depoimentos, garantia..."
              className="w-full text-sm px-3 py-3 rounded-xl resize-none" />
          </div>
          <RunButton onClick={go} loading={loading} label="⚡ Auditar Landing Page" loadingLabel="Analisando..." />
        </>}
        right={<OutputBox title="Auditoria CRO" content={output} loading={loading} onDownload={() => download('auditoria-lp')} />}
      />
    </AppShell>
  )
}
