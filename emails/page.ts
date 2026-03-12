'use client'
import { useState } from 'react'
import GenericModulePage from '@/components/ui/GenericModulePage'
import { Label } from '@/components/ui'

const TONES = ['Direto e profissional','Casual e amigável','Urgente e persuasivo','Educativo e autoridade','Storytelling emocional']

export default function EmailsPage() {
  const [tone, setTone] = useState(TONES[0])
  return (
    <GenericModulePage
      module="emails" moduleLabel="E-mails & Posts"
      title="E-mails & Posts" subtitle="Sequências de email, LinkedIn, Instagram, Twitter e roteiros de Reels"
      badge="Multi-plataforma" endpoint="/api/emails"
      placeholder="Cole o conteúdo base (livro, artigo, análise) para gerar sequências e posts..."
      runLabel="⚡ Gerar Sequências"
      extraFields={() => (
        <div><Label>Tom de voz</Label>
          <select value={tone} onChange={e => setTone(e.target.value)} className="w-full text-sm px-3 py-2 rounded-xl">
            {TONES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      )}
      buildBody={({ text, niche }) => ({ text, niche, tone })}
    />
  )
}
