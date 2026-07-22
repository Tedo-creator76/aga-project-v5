'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const MODULES = [
  { href: '/projets/1',               icon: '🏠', label: 'Vue d\'ensemble', exact: true },
  { href: '/projets/1/documents',     icon: '📄', label: 'Documents' },
  { href: '/projets/1/planning-opc',  icon: '📅', label: 'Planning OPC' },
  { href: '/projets/1/comptes-rendus',icon: '📝', label: 'Comptes rendus' },
  { href: '/projets/1/visa-des-plans',icon: '📐', label: 'Visa des plans' },
  { href: '/projets/1/finances',      icon: '💰', label: 'Finances' },
  { href: '/projets/1/camille-ia',    icon: '🤖', label: 'Camille IA' },
]

export default function ProjectNav() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Back link */}
      <div className="px-4 pt-5 pb-4 border-b border-slate-800">
        <Link
          href="/projets"
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
        >
          <span>←</span>
          <span>Mes projets</span>
        </Link>
      </div>

      {/* Project identity */}
      <div className="px-4 py-5 border-b border-slate-800">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Projet actif
        </p>
        <h2 className="text-white font-bold text-base leading-tight">
          Résidence Drancy
        </h2>
        <p className="text-slate-400 text-xs mt-1">PROMOGIM · MOEX / OPC</p>
        <span className="mt-3 inline-block rounded-full bg-green-900/60 text-green-400 px-2.5 py-0.5 text-xs font-semibold">
          En cours
        </span>
      </div>

      {/* Module list */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="px-2 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Modules
        </p>
        {MODULES.map(({ href, icon, label, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-base">{icon}</span>
              <span>{label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-800 space-y-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <span>🚪</span>
          <span>Déconnexion</span>
        </button>
        <p className="text-xs text-slate-600">AGA Project · Dashboard V5</p>
      </div>
    </div>
  )
}
