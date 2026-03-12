'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, BookOpen, PenTool, Mail, Lightbulb, Search,
  TrendingUp, Eye, History, Video, User, GitBranch, RefreshCw,
  ClipboardCheck, Zap
} from 'lucide-react'
import { clsx } from 'clsx'

const NAV = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard',        group: 'core' },
  { href: '/history',   icon: History,         label: 'Histórico',         group: 'core' },
  { href: '/analyzer',  icon: BookOpen,        label: 'Analisador',        group: 'analise' },
  { href: '/copy',      icon: PenTool,         label: 'Copy Spy',          group: 'analise' },
  { href: '/rewriter',  icon: RefreshCw,       label: 'Copy Rewriter',     group: 'analise' },
  { href: '/competitor',icon: Eye,             label: 'Espião',            group: 'inteligencia' },
  { href: '/trends',    icon: TrendingUp,      label: 'Tendências',        group: 'inteligencia' },
  { href: '/auditor',   icon: ClipboardCheck,  label: 'Auditor de LP',     group: 'inteligencia' },
  { href: '/emails',    icon: Mail,            label: 'E-mails & Posts',   group: 'producao' },
  { href: '/creative',  icon: Lightbulb,       label: 'Criativos',         group: 'producao' },
  { href: '/vsl',       icon: Video,           label: 'VSL Script',        group: 'producao' },
  { href: '/avatar',    icon: User,            label: 'Avatar Cliente',    group: 'estrategia' },
  { href: '/funnel',    icon: GitBranch,       label: 'Funil Completo',    group: 'estrategia' },
  { href: '/seo',       icon: Search,          label: 'SEO & Ads',         group: 'estrategia' },
]

const GROUPS: Record<string, string> = {
  core:         'Geral',
  analise:      'Análise',
  inteligencia: 'Inteligência',
  producao:     'Produção',
  estrategia:   'Estratégia',
}

export default function Sidebar() {
  const path = usePathname()
  const groups = [...new Set(NAV.map(n => n.group))]

  return (
    <aside className="fixed left-0 top-0 h-screen w-52 flex flex-col z-40 overflow-hidden"
      style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)' }}>

      {/* Logo */}
      <div className="px-4 py-5 flex-shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--gold)' }}>
            <Zap size={13} className="text-black" />
          </div>
          <div>
            <p className="font-display text-sm font-bold tracking-tight" style={{ color: 'var(--text)', lineHeight: 1.2 }}>X Spy History</p>
            <p style={{ color: 'var(--sub)', fontSize: 10 }}>AI Intelligence v2</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {groups.map(group => (
          <div key={group} className="mb-3">
            <p className="px-4 mb-1 font-medium uppercase" style={{ color: 'var(--sub)', fontSize: 9, letterSpacing: '.08em', opacity: .6 }}>
              {GROUPS[group]}
            </p>
            {NAV.filter(n => n.group === group).map(({ href, icon: Icon, label }) => {
              const active = path === href
              return (
                <Link key={href} href={href}
                  className={clsx('flex items-center gap-2.5 mx-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-150')}
                  style={active
                    ? { background: 'rgba(201,168,76,.1)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,.15)' }
                    : { color: 'var(--sub)', border: '1px solid transparent' }
                  }>
                  <Icon size={13} />
                  <span>{label}</span>
                  {active && <span className="ml-auto w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Status */}
      <div className="px-4 py-3 flex-shrink-0" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span style={{ color: 'var(--sub)', fontSize: 10 }}>Claude + ElevenLabs online</span>
        </div>
        <p style={{ color: 'var(--sub)', fontSize: 10, opacity: .5 }}>Nicho: SaaS / Tech</p>
      </div>
    </aside>
  )
}
