'use client'
import { useCallback, useState, useRef, useEffect, ReactNode } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, Loader2, Copy, CheckCheck, Download, Play, Pause, Volume2 } from 'lucide-react'
import { clsx } from 'clsx'
import toast from 'react-hot-toast'

// ── PageHeader ──────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, badge, actions }: {
  title: string; subtitle?: string; badge?: string; actions?: ReactNode
}) {
  return (
    <div className="flex items-start justify-between px-8 pt-7 pb-5" style={{ borderBottom: '1px solid var(--border)' }}>
      <div>
        {badge && <span className="tag gold mb-2 inline-block">{badge}</span>}
        <h1 className="font-display text-xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm" style={{ color: 'var(--sub)' }}>{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 mt-1">{actions}</div>}
    </div>
  )
}

// ── StatCard ────────────────────────────────────────────────────────
export function StatCard({ label, value, icon, trend, color = 'gold' }: {
  label: string; value: string | number; icon?: ReactNode; trend?: string; color?: 'gold'|'green'|'accent'|'red'
}) {
  const c = {
    gold:   { bg: 'rgba(201,168,76,.08)',  border: 'rgba(201,168,76,.15)',  text: 'var(--gold)' },
    green:  { bg: 'rgba(34,197,94,.08)',   border: 'rgba(34,197,94,.15)',   text: 'var(--green)' },
    accent: { bg: 'rgba(99,102,241,.08)',  border: 'rgba(99,102,241,.15)',  text: 'var(--accent)' },
    red:    { bg: 'rgba(239,68,68,.08)',   border: 'rgba(239,68,68,.15)',   text: 'var(--red)' },
  }[color]
  return (
    <div className="rounded-xl p-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium uppercase" style={{ color: 'var(--sub)', fontSize: 10, letterSpacing: '.07em' }}>{label}</span>
        {icon && <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: c.bg, border: `1px solid ${c.border}` }}><span style={{ color: c.text }}>{icon}</span></div>}
      </div>
      <p className="font-display text-2xl font-bold" style={{ color: 'var(--text)' }}>{value}</p>
      {trend && <p className="text-xs mt-0.5" style={{ color: 'var(--sub)' }}>{trend}</p>}
    </div>
  )
}

// ── NicheSelect ─────────────────────────────────────────────────────
export const NICHES = ['SaaS/Tech','Infoprodutos','E-commerce','Saúde/Bem-estar','Finanças','Marketing Digital','Coaching','Imóveis','Advocacia','Educação']

export function NicheSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="text-sm px-3 py-2 rounded-xl w-full">
      {NICHES.map(n => <option key={n}>{n}</option>)}
    </select>
  )
}

// ── UploadZone ──────────────────────────────────────────────────────
export function UploadZone({ onFile, loading = false, hint = 'PDF, DOCX ou TXT — até 50MB' }: {
  onFile: (f: File) => void; loading?: boolean; hint?: string
}) {
  const [file, setFile] = useState<File | null>(null)
  const [err, setErr] = useState('')
  const onDrop = useCallback((accepted: File[], rejected: any[]) => {
    setErr('')
    if (rejected.length) { setErr('Arquivo inválido'); return }
    if (accepted[0]) { setFile(accepted[0]); onFile(accepted[0]) }
  }, [onFile])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, multiple: false, disabled: loading,
    accept: { 'application/pdf': ['.pdf'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'], 'text/plain': ['.txt'] },
    maxSize: 50 * 1024 * 1024,
  })
  const clear = (e: React.MouseEvent) => { e.stopPropagation(); setFile(null); setErr('') }

  return (
    <div {...getRootProps()} className={clsx('upload-zone rounded-xl p-6 text-center cursor-pointer', loading && 'opacity-50 pointer-events-none')}>
      <input {...getInputProps()} />
      {loading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 size={20} className="animate-spin" style={{ color: 'var(--gold)' }} />
          <p className="text-xs" style={{ color: 'var(--sub)' }}>Processando...</p>
        </div>
      ) : file ? (
        <div className="flex flex-col items-center gap-2">
          <FileText size={18} style={{ color: 'var(--green)' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{file.name}</p>
          <button onClick={clear} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full" style={{ background: 'var(--muted)', color: 'var(--sub)' }}>
            <X size={10} /> Remover
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Upload size={18} style={{ color: isDragActive ? 'var(--gold)' : 'var(--sub)' }} />
          <p className="text-sm" style={{ color: isDragActive ? 'var(--gold)' : 'var(--sub)' }}>
            {isDragActive ? 'Solte aqui' : 'Arraste ou clique para upload'}
          </p>
          <p style={{ color: 'var(--sub)', fontSize: 11 }}>{hint}</p>
        </div>
      )}
      {err && <p className="mt-2 text-xs" style={{ color: 'var(--red)' }}>{err}</p>}
    </div>
  )
}

// ── OutputBox ────────────────────────────────────────────────────────
export function OutputBox({ title, content, loading, onDownload, minHeight = 400 }: {
  title: string; content: string; loading?: boolean; onDownload?: () => void; minHeight?: number
}) {
  const [copied, setCopied] = useState(false)
  const copyAll = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
    toast.success('Copiado!')
  }
  if (!content && !loading) return (
    <div className="flex flex-col items-center justify-center rounded-xl" style={{ background: 'var(--card)', border: '1px solid var(--border)', minHeight }}>
      <p className="text-sm" style={{ color: 'var(--muted)' }}>O resultado aparecerá aqui</p>
    </div>
  )
  return (
    <div className="rounded-xl overflow-hidden flex flex-col" style={{ background: 'var(--card)', border: '1px solid var(--border)', minHeight }}>
      <div className="flex items-center justify-between px-4 py-2.5 flex-shrink-0" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>{title}</span>
          {loading && <Loader2 size={11} className="animate-spin" style={{ color: 'var(--sub)' }} />}
        </div>
        <div className="flex items-center gap-1.5">
          {content && <>
            <button onClick={copyAll} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg btn-ghost">
              {copied ? <CheckCheck size={11} style={{ color: 'var(--green)' }} /> : <Copy size={11} />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
            {onDownload && (
              <button onClick={onDownload} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg btn-ghost">
                <Download size={11} /> Exportar
              </button>
            )}
          </>}
        </div>
      </div>
      <div className="p-5 flex-1 prose-xspy text-sm overflow-y-auto" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, maxHeight: 'calc(100vh - 260px)' }}>
        {content || <div className="shimmer h-4 rounded w-3/4 mb-2" />}
      </div>
    </div>
  )
}

// ── AudioPlayer ──────────────────────────────────────────────────────
export function AudioPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [time, setTime] = useState('0:00')
  useEffect(() => {
    const a = audioRef.current; if (!a) return
    const onTime = () => {
      setProgress((a.currentTime / a.duration) * 100 || 0)
      setTime(`${Math.floor(a.currentTime / 60)}:${Math.floor(a.currentTime % 60).toString().padStart(2,'0')}`)
    }
    const onEnd = () => { setPlaying(false); setProgress(0) }
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('ended', onEnd)
    return () => { a.removeEventListener('timeupdate', onTime); a.removeEventListener('ended', onEnd) }
  }, [])
  const toggle = async () => {
    const a = audioRef.current; if (!a) return
    if (playing) { a.pause(); setPlaying(false) } else { await a.play(); setPlaying(true) }
  }
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current; if (!a) return
    const r = e.currentTarget.getBoundingClientRect()
    a.currentTime = ((e.clientX - r.left) / r.width) * a.duration
  }
  const BARS = 18
  return (
    <div className="rounded-xl p-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--gold)' }}>
          {playing ? <Pause size={13} fill="black" className="text-black" /> : <Play size={13} fill="black" className="text-black" style={{ marginLeft: 1 }} />}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate" style={{ color: 'var(--text)' }}>{title}</p>
          <p style={{ color: 'var(--sub)', fontSize: 10 }}>ElevenLabs TTS</p>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: BARS }).map((_, i) => (
            <div key={i} className={`audio-bar ${playing ? 'playing' : ''}`}
              style={{ height: [6,10,14,8,16,12,18,8,14,10,20,12,16,8,14,18,10,12][i] + 'px', animationDelay: `${i*.05}s`, opacity: i/BARS <= progress/100 ? 1 : .2 }} />
          ))}
        </div>
        <span className="text-xs flex-shrink-0" style={{ color: 'var(--sub)', fontFamily: 'var(--font-mono)', fontSize: 10 }}>{time}</span>
        <a href={src} download className="w-7 h-7 rounded-lg flex items-center justify-center btn-ghost flex-shrink-0">
          <Download size={11} style={{ color: 'var(--sub)' }} />
        </a>
      </div>
      <div onClick={seek} className="mt-3 h-1 rounded-full cursor-pointer" style={{ background: 'var(--muted)' }}>
        <div className="h-full rounded-full" style={{ width: `${progress}%`, background: 'var(--gold)', transition: 'width .1s' }} />
      </div>
    </div>
  )
}

// ── ModuleLayout: two-column split ──────────────────────────────────
export function ModuleLayout({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="p-6 grid gap-6" style={{ gridTemplateColumns: '1fr 1fr' }}>
      <div className="space-y-4 min-w-0">{left}</div>
      <div className="min-w-0">{right}</div>
    </div>
  )
}

// ── Label ────────────────────────────────────────────────────────────
export function Label({ children }: { children: ReactNode }) {
  return <p className="text-xs font-medium uppercase mb-1.5" style={{ color: 'var(--sub)', letterSpacing: '.07em' }}>{children}</p>
}

// ── RunButton ────────────────────────────────────────────────────────
export function RunButton({ onClick, loading, label, loadingLabel }: {
  onClick: () => void; loading: boolean; label: string; loadingLabel: string
}) {
  return (
    <button onClick={onClick} disabled={loading}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold btn-primary">
      {loading ? <><Loader2 size={14} className="animate-spin" />{loadingLabel}</> : label}
    </button>
  )
}
