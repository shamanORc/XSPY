'use client'
import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import { PageHeader, UploadZone, OutputBox, NicheSelect, ModuleLayout, Label, RunButton, AudioPlayer } from '@/components/ui'
import { useModule } from '@/lib/useModule'
import { Volume2, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

async function extractText(file: File): Promise<string> {
  if (file.type === 'text/plain') return file.text()
  if (file.name.endsWith('.docx')) {
    const mammoth = await import('mammoth')
    const ab = await file.arrayBuffer()
    return (await mammoth.extractRawText({ arrayBuffer: ab })).value
  }
  const pdfjsLib = await import('pdfjs-dist')
  pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.worker.min.mjs'
  const ab = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: ab }).promise
  const pages = await Promise.all(
    Array.from({ length: Math.min(pdf.numPages, 80) }, (_, i) =>
      pdf.getPage(i + 1).then(p => p.getTextContent()).then(c => c.items.map((x: any) => x.str).join(' '))
    )
  )
  return pages.join('\n\n')
}

export default function AnalyzerPage() {
  const { output, loading, niche, setNiche, run, download } = useModule('analyzer', 'Analisador')
  const [title, setTitle]     = useState('')
  const [text, setText]       = useState('')
  const [reading, setReading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioLoading, setAudioLoading] = useState(false)

  const handleFile = async (file: File) => {
    setReading(true)
    try {
      const t = await extractText(file)
      setText(t)
      setTitle(file.name.replace(/\.[^.]+$/, ''))
    } catch { toast.error('Erro ao ler arquivo') }
    finally { setReading(false) }
  }

  const analyze = () => run('/api/analyze', { text, title }, title || 'Análise')

  const genAudio = async () => {
    if (!output) return
    setAudioLoading(true)
    try {
      const summary = output.split('## Conceitos')[0] || output.slice(0, 3000)
      const res = await fetch('/api/audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: summary, title }),
      })
      if (!res.ok) throw new Error('ElevenLabs error')
      const blob = await res.blob()
      setAudioUrl(URL.createObjectURL(blob))
      toast.success('Áudio gerado!')
    } catch { toast.error('Erro ao gerar áudio') }
    finally { setAudioLoading(false) }
  }

  return (
    <AppShell>
      <PageHeader title="Analisador" subtitle="Upload de livros, PDFs e documentos — análise completa + áudio ElevenLabs" badge="IA" />
      <ModuleLayout
        left={<>
          <div><Label>Nicho</Label><NicheSelect value={niche} onChange={setNiche} /></div>
          <div><Label>Título (opcional)</Label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Nome do livro ou documento" className="w-full text-sm px-3 py-2 rounded-xl" />
          </div>
          <UploadZone onFile={handleFile} loading={reading} />
          <div>
            <Label>Ou cole o texto</Label>
            <textarea value={text} onChange={e => setText(e.target.value)} rows={8}
              placeholder="Cole aqui o conteúdo do livro, artigo ou qualquer documento..."
              className="w-full text-sm px-3 py-3 rounded-xl resize-none" />
          </div>
          <RunButton onClick={analyze} loading={loading || reading}
            label="⚡ Analisar com IA" loadingLabel="Analisando..." />
          {output && (
            <button onClick={genAudio} disabled={audioLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium btn-ghost">
              {audioLoading ? <><Loader2 size={13} className="animate-spin" />Gerando áudio...</> : <><Volume2 size={13} />Gerar Áudio (ElevenLabs)</>}
            </button>
          )}
          {audioUrl && <AudioPlayer src={audioUrl} title={`Resumo — ${title}`} />}
        </>}
        right={<OutputBox title={`Análise — ${title || 'Documento'}`} content={output} loading={loading}
          onDownload={() => download(title || 'analise')} />}
      />
    </AppShell>
  )
}
