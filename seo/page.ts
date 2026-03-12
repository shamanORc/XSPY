'use client'
import { useState } from 'react'
import GenericModulePage from '@/components/ui/GenericModulePage'
import { Label } from '@/components/ui'

export default function SEOPage() {
  const [url, setUrl] = useState('')
  return (
    <GenericModulePage
      module="seo" moduleLabel="SEO & Ads" title="SEO & Ads Intelligence"
      subtitle="Análise de keywords, Google Ads RSA, Meta Ads targeting e estratégia integrada"
      badge="SEO + Paid" endpoint="/api/seo"
      placeholder="Cole o conteúdo da página, landing page ou artigo para análise completa..."
      runLabel="⚡ Analisar SEO & Ads"
      extraFields={() => (
        <div><Label>URL (opcional)</Label>
          <input type="url" value={url} onChange={e => setUrl(e.target.value)}
            placeholder="https://seusite.com/landing-page" className="w-full text-sm px-3 py-2 rounded-xl" />
        </div>
      )}
      buildBody={({ text, niche }) => ({ text, niche, url })}
    />
  )
}
