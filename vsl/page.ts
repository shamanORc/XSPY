'use client'
import { useState } from 'react'
import GenericModulePage from '@/components/ui/GenericModulePage'
import { Label } from '@/components/ui'

export default function VSLPage() {
  const [duration, setDuration] = useState('15-20 minutos')
  const [offer, setOffer]       = useState('')
  return (
    <GenericModulePage
      module="vsl" moduleLabel="VSL Script" title="VSL Script Generator"
      subtitle="Roteiro completo de Video Sales Letter — gancho, problema, solução, oferta, CTA"
      badge="Vídeo de Vendas" endpoint="/api/vsl"
      placeholder="Descreva seu produto, serviço ou oferta em detalhes..."
      runLabel="⚡ Gerar Roteiro VSL"
      extraFields={() => (<>
        <div><Label>Duração alvo</Label>
          <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full text-sm px-3 py-2 rounded-xl">
            {['5-10 minutos','15-20 minutos','30-45 minutos','60+ minutos'].map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div><Label>Oferta / Produto</Label>
          <input type="text" value={offer} onChange={e => setOffer(e.target.value)}
            placeholder="Ex: Curso de SaaS — R$997" className="w-full text-sm px-3 py-2 rounded-xl" />
        </div>
      </>)}
      buildBody={({ text, niche }) => ({ text, niche, duration, offer })}
    />
  )
}
