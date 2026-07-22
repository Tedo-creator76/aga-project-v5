import ProjectNav from './_components/ProjectNav'

export default function ProjetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 flex-shrink-0 bg-slate-900 sticky top-0 h-screen overflow-y-auto">
        <ProjectNav />
      </aside>
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  )
}
