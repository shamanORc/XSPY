'use client'
import { ReactNode } from 'react'
import AppShell from '@/components/layout/AppShell'
import { PageHeader, OutputBox, NicheSelect, ModuleLayout, Label, RunButton, UploadZone } from '@/components/ui'
import { useModule } from '@/lib/useModule'

interface GenericModulePageProps {
  module: string
  moduleLabel: string
  title: string
  subtitle: string
  badge: string
  endpoint: string
  placeholder: string
  extraFields?: (opts: { niche: string; text: string; setText: (v: string) => void }) => ReactNode
  buildBody?: (opts: { text: string; niche: string }) => Record<string, any>
  showUpload?: boolean
  runLabel?: string
}

export default function GenericModulePage({
  module, moduleLabel, title, subtitle, badge, endpoint,
  placeholder, extraFields, buildBody, showUpload = false, runLabel = '⚡ Gerar',
}: GenericModulePageProps) {
  const { output, loading, niche, setNiche, text, setText, run, download } = useModule(module, moduleLabel)

  const handleRun = () => {
    const body = buildBody ? buildBody({ text, niche }) : { text, niche }
    run(endpoint, body, title)
  }

  const handleFile = async (file: File) => {
    const t = await file.text()
    setText(t)
  }

  return (
    <AppShell>
      <PageHeader title={title} subtitle={subtitle} badge={badge} />
      <ModuleLayout
        left={<>
          <div><Label>Nicho</Label><NicheSelect value={niche} onChange={setNiche} /></div>
          {extraFields?.({ niche, text, setText })}
          {showUpload && <UploadZone onFile={handleFile} />}
          <div>
            <Label>Conteúdo</Label>
            <textarea value={text} onChange={e => setText(e.target.value)} rows={12}
              placeholder={placeholder}
              className="w-full text-sm px-3 py-3 rounded-xl resize-none" />
          </div>
          <RunButton onClick={handleRun} loading={loading} label={runLabel} loadingLabel="Processando..." />
        </>}
        right={<OutputBox title={moduleLabel} content={output} loading={loading}
          onDownload={() => download(module)} />}
      />
    </AppShell>
  )
}
