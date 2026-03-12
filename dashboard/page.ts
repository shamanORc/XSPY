import AppShell from '@/components/layout/AppShell'
import { PageHeader, StatCard } from '@/components/ui'
import { BookOpen, PenTool, Volume2, FileText, TrendingUp, Eye, Video, User, GitBranch, ClipboardCheck, RefreshCw, Search, Mail, Lightbulb } from 'lucide-react'
import Link from 'next/link'

const MODULES = [
  { href: '/analyzer',  icon: BookOpen,       label: 'Analisador',      sub: 'Upload + análise completa + áudio',       color: 'gold' },
  { href: '/copy',      icon: PenTool,        label: 'Copy Spy',        sub: 'Banco de copies bilionárias',             color: 'gold' },
  { href: '/rewriter',  icon: RefreshCw,      label: 'Copy Rewriter',   sub: '5 variações com gatilhos aplicados',      color: 'accent' },
  { href: '/competitor',icon: Eye,            label: 'Espião',          sub: 'Analise qualquer concorrente',            color: 'red' },
  { href: '/trends',    icon: TrendingUp,     label: 'Tendências',      sub: 'O que está viralizando agora',            color: 'green' },
  { href: '/auditor',   icon: ClipboardCheck, label: 'Auditor de LP',   sub: 'Score de conversão + recomendações',      color: 'red' },
  { href: '/emails',    icon: Mail,           label: 'E-mails & Posts', sub: 'Sequências + LinkedIn + Instagram',       color: 'accent' },
  { href: '/creative',  icon: Lightbulb,      label: 'Criativos',       sub: 'Meta, YouTube, TikTok, Google Display',   color: 'gold' },
  { href: '/vsl',       icon: Video,          label: 'VSL Script',      sub: 'Roteiro completo de Video Sales Letter',  color: 'gold' },
  { href: '/avatar',    icon: User,           label: 'Avatar Cliente',  sub: 'ICP completo com psicologia profunda',    color: 'accent' },
  { href: '/funnel',    icon: GitBranch,      label: 'Funil Completo',  sub: 'Topo, meio e fundo com copy por etapa',   color: 'green' },
  { href: '/seo',       icon: Search,         label: 'SEO & Ads',       sub: 'Keywords + Google Ads + Meta Ads',        color: 'accent' },
]

const colorStyle = (c: string) => ({
  gold:   { bg: 'rgba(201,168,76,.09)',  border: 'rgba(201,168,76,.2)',  text: 'var(--gold)' },
  accent: { bg: 'rgba(99,102,241,.09)', border: 'rgba(99,102,241,.2)', text: 'var(--accent)' },
  green:  { bg: 'rgba(34,197,94,.09)',  border: 'rgba(34,197,94,.2)',  text: 'var(--green)' },
  red:    { bg: 'rgba(239,68,68,.09)',  border: 'rgba(239,68,68,.2)',  text: 'var(--red)' },
}[c] || { bg: 'rgba(201,168,76,.09)', border: 'rgba(201,168,76,.2)', text: 'var(--gold)' })

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader title="Dashboard" subtitle="X Spy History — AI Content Intelligence v2.0" badge="14 Módulos" />
      <div className="p-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Módulos Ativos" value="14" icon={<FileText size={12} />} trend="Análise + Inteligência + Produção" />
          <StatCard label="Copy Database"  value="30+" icon={<PenTool size={12} />} trend="Ogilvy · Halbert · Hormozi · +" color="accent" />
          <StatCard label="Áudio TTS"      value="On"  icon={<Volume2 size={12} />} trend="ElevenLabs multilingual v2" color="green" />
          <StatCard label="Histórico"      value="∞"   icon={<BookOpen size={12} />} trend="Salvo localmente, sem perda" color="accent" />
        </div>

        {/* Modules grid */}
        <div>
          <p className="text-xs font-medium uppercase mb-3" style={{ color: 'var(--sub)', letterSpacing: '.07em' }}>Todos os Módulos</p>
          <div className="grid grid-cols-3 gap-3">
            {MODULES.map(({ href, icon: Icon, label, sub, color }) => {
              const c = colorStyle(color)
              return (
                <Link key={href} href={href}
                  className="card-hover flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <Icon size={15} style={{ color: c.text }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{label}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--sub)' }}>{sub}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Copy DB teaser */}
        <div className="rounded-xl p-5" style={{ background: 'var(--card)', border: '1px solid rgba(201,168,76,.2)' }}>
          <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--gold)', letterSpacing: '.07em' }}>Banco de Copies Bilionárias ativo</p>
          <p className="text-sm" style={{ color: 'var(--sub)', lineHeight: 1.7 }}>
            Ogilvy · Halbert · Kennedy · Caples · Hormozi · Schwartz · Hopkins · Sugarman · Collier · Bly · Carlton — todas as copies que geraram bilhões, disponíveis em todos os módulos.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {['Urgência','Autoridade','Curiosidade','Transformação','Identidade','Garantia','FOMO','Direct Response','Era Digital'].map(t => (
              <span key={t} className="tag gold" style={{ fontSize: 10 }}>{t}</span>
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  )
}
