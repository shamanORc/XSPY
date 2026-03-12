'use client'
import { useState, useEffect } from 'react'
import AppShell from '@/components/layout/AppShell'
import { PageHeader, OutputBox } from '@/components/ui'
import { getHistory, deleteHistoryItem, clearHistory, HistoryItem } from '@/lib/storage'
import { Trash2, Search, X, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

export default function HistoryPage() {
  const [items, setItems]     = useState<HistoryItem[]>([])
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')
  const [selected, setSelected] = useState<HistoryItem | null>(null)

  useEffect(() => { setItems(getHistory()) }, [])

  const modules = ['all', ...new Set(items.map(i => i.module))]

  const filtered = items.filter(i => {
    const matchFilter = filter === 'all' || i.module === filter
    const matchSearch = !search || i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.output.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const del = (id: string) => {
    deleteHistoryItem(id)
    setItems(getHistory())
    if (selected?.id === id) setSelected(null)
    toast.success('Removido')
  }

  const clear = () => {
    if (!confirm('Limpar todo o histórico?')) return
    clearHistory(); setItems([]); setSelected(null)
    toast.success('Histórico limpo')
  }

  const fmt = (iso: string) => new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })

  const MOD_LABELS: Record<string,string> = {
    analyzer:'Analisador',copy:'Copy Spy',emails:'E-mails',creative:'Criativos',seo:'SEO',
    trends:'Tendências',competitor:'Espião',vsl:'VSL',avatar:'Avatar',funnel:'Funil',rewriter:'Rewriter',auditor:'Auditor',
  }

  return (
    <AppShell>
      <PageHeader title="Histórico" subtitle={`${items.length} itens salvos localmente`} badge="Biblioteca"
        actions={items.length > 0 ? (
          <button onClick={clear} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg btn-ghost" style={{ color: 'var(--red)' }}>
            <Trash2 size={11} /> Limpar tudo
          </button>
        ) : undefined}
      />
      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar list */}
        <div className="w-72 flex-shrink-0 flex flex-col" style={{ borderRight: '1px solid var(--border)' }}>
          {/* Search + filter */}
          <div className="p-3 space-y-2" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="relative">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--sub)' }} />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Buscar..."
                className="w-full text-xs pl-8 pr-3 py-2 rounded-lg"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }} />
              {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2"><X size={11} style={{ color: 'var(--sub)' }} /></button>}
            </div>
            <div className="flex gap-1 overflow-x-auto pb-1">
              {modules.map(m => (
                <button key={m} onClick={() => setFilter(m)}
                  className="text-xs px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 transition-all"
                  style={filter === m
                    ? { background: 'rgba(201,168,76,.12)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,.25)' }
                    : { background: 'var(--card)', color: 'var(--sub)', border: '1px solid var(--border)' }}>
                  {m === 'all' ? 'Todos' : MOD_LABELS[m] || m}
                </button>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12" style={{ color: 'var(--sub)' }}>
                <Clock size={24} style={{ opacity: .3, marginBottom: 8 }} />
                <p className="text-xs">Nenhum item encontrado</p>
              </div>
            ) : filtered.map(item => (
              <div key={item.id}
                onClick={() => setSelected(item)}
                className="px-4 py-3 cursor-pointer transition-colors group"
                style={{
                  borderBottom: '1px solid var(--border)',
                  background: selected?.id === item.id ? 'rgba(201,168,76,.06)' : 'transparent',
                }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="tag" style={{ fontSize: 9, marginBottom: 4, display: 'inline-block' }}>{MOD_LABELS[item.module] || item.module}</span>
                    <p className="text-xs font-medium truncate" style={{ color: 'var(--text)' }}>{item.title}</p>
                    <p style={{ color: 'var(--sub)', fontSize: 10, marginTop: 2 }}>{item.niche} · {fmt(item.createdAt)}</p>
                  </div>
                  <button onClick={e => { e.stopPropagation(); del(item.id) }}
                    className="opacity-0 group-hover:opacity-100 flex-shrink-0 mt-0.5 transition-opacity">
                    <Trash2 size={12} style={{ color: 'var(--red)' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-hidden">
          {selected ? (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="tag mb-2 inline-block">{MOD_LABELS[selected.module] || selected.module}</span>
                  <h2 className="font-display text-lg font-bold" style={{ color: 'var(--text)' }}>{selected.title}</h2>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--sub)' }}>{selected.niche} · {fmt(selected.createdAt)}</p>
                </div>
                <button onClick={() => del(selected.id)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg btn-ghost" style={{ color: 'var(--red)' }}>
                  <Trash2 size={11} /> Deletar
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <OutputBox title={selected.title} content={selected.output} minHeight={100}
                  onDownload={() => {
                    const blob = new Blob([selected.output], { type: 'text/markdown' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a'); a.href = url; a.download = selected.title + '.md'; a.click()
                  }} />
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center" style={{ color: 'var(--sub)' }}>
              <Clock size={32} style={{ opacity: .2, marginBottom: 12 }} />
              <p className="text-sm">Selecione um item para visualizar</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
