import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import LogoutButton from './_components/LogoutButton'

const NAV = [
  { href: '/',        icon: '🏠', label: 'Tableau de bord', exact: true },
  { href: '/projets', icon: '📁', label: 'Projets' },
]

export default async function Home() {
  const { data: projects } = await supabase
    .from('projects')
    .select('id, name, status, city, mission')
    .order('id', { ascending: true })

  const projets = projects ?? []
  const actifs  = projets.filter((p) => p.status === 'En cours').length

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">

        {/* Sidebar globale */}
        <aside className="w-64 flex-shrink-0 bg-slate-900 text-white flex flex-col sticky top-0 h-screen">
          <div className="px-6 pt-7 pb-5 border-b border-slate-800">
            <h1 className="text-xl font-bold tracking-tight">AGA Project</h1>
            <p className="text-slate-400 text-xs mt-1">MOEX · OPC · AMO</p>
          </div>

          <nav className="flex-1 px-3 py-5 space-y-0.5">
            <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Navigation
            </p>
            {NAV.map(({ href, icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <span>{icon}</span>
                <span>{label}</span>
              </Link>
            ))}

            <div className="pt-4">
              <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                À venir
              </p>
              {[
                { icon: '📄', label: 'Documents' },
                { icon: '📅', label: 'Planning global' },
                { icon: '💰', label: 'Finances' },
                { icon: '🤖', label: 'Camille IA' },
                { icon: '⚙', label: 'Paramètres' },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 cursor-not-allowed select-none"
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                  <span className="ml-auto text-xs bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded">Bientôt</span>
                </div>
              ))}
            </div>
          </nav>

          <div className="px-5 py-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold">A</div>
              <div>
                <p className="text-sm font-semibold text-white">Alex</p>
                <p className="text-xs text-slate-500">Administrateur</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </aside>

        {/* Contenu principal */}
        <section className="flex-1 p-8 md:p-10">
          <div className="max-w-6xl mx-auto">

            {/* En-tête */}
            <div className="flex items-start justify-between mb-10">
              <div>
                <h2 className="text-4xl font-bold text-slate-900">Bienvenue Alex 👋</h2>
                <p className="text-slate-600 mt-2">Tableau de bord AGA Project V5 — {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <Link
                href="/projets"
                className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white shadow hover:bg-slate-800 transition-colors"
              >
                Voir mes projets →
              </Link>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-slate-500">Projets actifs</p>
                <p className="text-4xl font-bold text-slate-900 mt-2">{actifs}</p>
                <p className="text-xs text-slate-400 mt-1">{projets.length} projet{projets.length > 1 ? 's' : ''} au total</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-slate-500">Documents</p>
                <p className="text-4xl font-bold text-slate-900 mt-2">489</p>
                <p className="text-xs text-slate-400 mt-1">Tous projets confondus</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-slate-500">Réserves ouvertes</p>
                <p className="text-4xl font-bold text-red-600 mt-2">3</p>
                <p className="text-xs text-slate-400 mt-1">Résidence Drancy</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-slate-500">Prochaine réunion</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">Vendredi</p>
                <p className="text-xs text-slate-400 mt-1">Réunion OPC N°15</p>
              </div>
            </div>

            {/* Projets + Activité */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

              {/* Liste projets Supabase */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-bold text-slate-900">Mes projets</h3>
                  <Link href="/projets" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                    Voir tout →
                  </Link>
                </div>
                {projets.length === 0 ? (
                  <p className="text-slate-400 text-sm">Aucun projet chargé depuis Supabase.</p>
                ) : (
                  <ul className="space-y-3">
                    {projets.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/projets/${p.id}`}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <div>
                            <p className="font-semibold text-slate-900 group-hover:text-slate-700">{p.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{p.city} · {p.mission}</p>
                          </div>
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold flex-shrink-0 ${
                            p.status === 'En cours'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {p.status}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Activité + Camille */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Activité récente</h3>
                  <ul className="space-y-3 text-slate-600 text-sm">
                    <li className="flex gap-2">✅ <span>CCTP Gros Œuvre ajouté — Résidence Drancy</span></li>
                    <li className="flex gap-2">📅 <span>Réunion OPC N°15 prévue vendredi à 10h</span></li>
                    <li className="flex gap-2">⚠️ <span>3 réserves restent à lever avant réception</span></li>
                    <li className="flex gap-2">📐 <span>Plan RDC analysé par Camille IA</span></li>
                    <li className="flex gap-2">💰 <span>Budget Plomberie : dépassement de 10 000 €</span></li>
                  </ul>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">🤖 Camille IA</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Analyse vos plans, CCTP et comptes rendus. Disponible dans chaque module projet.
                  </p>
                  <Link
                    href="/projets/1/camille-ia"
                    className="mt-4 inline-block rounded-lg bg-white text-slate-900 px-4 py-2 text-sm font-semibold hover:bg-slate-100 transition-colors"
                  >
                    Ouvrir Camille IA →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
