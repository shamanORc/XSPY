import Sidebar from './Sidebar'
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <Sidebar />
      <main className="flex-1 ml-52 min-h-screen overflow-x-hidden">{children}</main>
    </div>
  )
}
