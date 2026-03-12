'use client'
import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import { PageHeader, OutputBox, NicheSelect, ModuleLayout, Label, RunButton, UploadZone } from '@/components/ui'
import { useModule } from '@/lib/useModule'

const PLATFORMS = ['ads','email','linkedin','instagram','youtube','tiktok']

export default function CopyPage() {
  const { output, loading, niche, setNiche, text, setText, run, download } = useModule('copy', 'Copy Spy')
  const [platforms, setPlatforms] = useState(['ads','email','linkedin'])
  const toggle = (p: string) => setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])

  const handleFile = async (f: File) => setText(await f.text())

  return (
    <AppShell>
      <PageHeader title="Copy Spy" subtitle="Extraia e adapte copies bilionárias de qualquer conteúdo" badge="Banco de Bilhões" />
      <ModuleLayout
        left={<>
          <div><Label>Nicho</Label><NicheSelect value={niche} onChange={setNiche} /></div>
          <div>
            <Label>Plataformas alvo</Label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map(p => (
                <button key={p} onClick={() => toggle(p)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all font-medium"
                  style={platforms.includes(p)
                    ? { background: 'rgba(201,168,76,.12)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,.25)' }
                    : { background: 'var(--card)', color: 'var(--sub)', border: '1px solid var(--border)' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <UploadZone onFile={handleFile} hint="Ou cole o texto abaixo" />
          <div>
            <Label>Conteúdo fonte</Label>
            <textarea value={text} onChange={e => setText(e.target.value)} rows={8}
              placeholder="Cole aqui o texto, trecho do livro ou qualquer conteúdo para extrair copies..."
              className="w-full text-sm px-3 py-3 rounded-xl resize-none" />
          </div>
          <RunButton onClick={() => run('/api/copy', { text, niche, platforms }, 'Copies')} loading={loading}
            label="⚡ Extrair Copies Bilionárias" loadingLabel="Extraindo..." />
          <div className="rounded-xl p-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--gold)' }}>Banco ativo</p>
            <p className="text-xs" style={{ color: 'var(--sub)', lineHeight: 1.6 }}>Ogilvy · Halbert · Kennedy · Caples · Hormozi · Schwartz · Hopkins · Sugarman · Collier · Bly · Carlton</p>
          </div>
        </>}
        right={<OutputBox title={`Copies — ${niche}`} content={output} loading={loading} onDownload={() => download('copies')} />}
      />
    </AppShell>
  )
}
