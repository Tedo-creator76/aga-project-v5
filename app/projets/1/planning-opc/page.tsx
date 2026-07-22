import Link from 'next/link'

type Jalon = {
  id: number
  nom: string
  date: string
  statut: 'fait' | 'en-cours' | 'à-venir' | 'retard'
  responsable: string
}

const JALONS: Jalon[] = [
  { id: 1,  nom: 'DOE remis par les entreprises',          date: '2026-03-15', statut: 'fait',     responsable: 'Entreprises GO' },
  { id: 2,  nom: 'Réception provisoire chantier',          date: '2026-04-10', statut: 'fait',     responsable: 'Alex / MOA' },
  { id: 3,  nom: 'Levée des réserves lot Gros Œuvre',      date: '2026-05-05', statut: 'fait',     responsable: 'BATIPRO' },
  { id: 4,  nom: 'Levée des réserves lot Menuiseries',     date: '2026-05-20', statut: 'en-cours', responsable: 'MENUISALU' },
  { id: 5,  nom: 'Levée des réserves lot Plomberie',       date: '2026-06-01', statut: 'retard',   responsable: 'AQUA SAS' },
  { id: 6,  nom: 'Réception définitive',                   date: '2026-07-15', statut: 'à-venir',  responsable: 'Alex / MOA' },
  { id: 7,  nom: 'GPA — visite 6 mois',                   date: '2026-10-10', statut: 'à-venir',  responsable: 'Alex' },
  { id: 8,  nom: 'GPA — visite 1 an',                     date: '2027-04-10', statut: 'à-venir',  responsable: 'Alex' },
  { id: 9,  nom: 'Clôture administrative du marché',       date: '2027-06-30', statut: 'à-venir',  responsable: 'PROMOGIM' },
]

const STATUT_STYLE: Record<Jalon['statut'], { label: string; classes: string }> = {
  'fait':     { label: 'Fait',      classes: 'bg-green-100 text-green-700' },
  'en-cours': { label: 'En cours',  classes: 'bg-blue-100 text-blue-700' },
  'à-venir':  { label: 'À venir',   classes: 'bg-slate-100 text-slate-600' },
  'retard':   { label: 'Retard',    classes: 'bg-red-100 text-red-700' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function PlanningOPCPage() {
  const faits    = JALONS.filter((j) => j.statut === 'fait').length
  const enCours  = JALONS.filter((j) => j.statut === 'en-cours').length
  const retards  = JALONS.filter((j) => j.statut === 'retard').length

  return (
    <main className="min-h-screen bg-slate-100 p-8 md:p-10">
      <div className="mx-auto max-w-7xl">

        <Link href="/projets/1" className="text-slate-600 hover:text-slate-900">
          ← Retour au projet
        </Link>

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">📅 Planning OPC</h1>
            <p className="mt-2 text-slate-600">Résidence Drancy — Jalons et suivi d'avancement</p>
          </div>
          <span className="rounded-full bg-blue-100 px-5 py-2 font-semibold text-blue-700">
            En cours
          </span>
        </div>

        {/* KPIs */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Total jalons</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{JALONS.length}</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Réalisés</p>
            <p className="mt-1 text-3xl font-bold text-green-600">{faits}</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">En cours</p>
            <p className="mt-1 text-3xl font-bold text-blue-600">{enCours}</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Retards</p>
            <p className="mt-1 text-3xl font-bold text-red-600">{retards}</p>
          </div>
        </div>

        {/* Tableau des jalons */}
        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow">
          <div className="flex items-center justify-between p-6">
            <h2 className="text-2xl font-bold">Jalons du projet</h2>
            <button className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800">
              + Ajouter un jalon
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-y border-slate-100 bg-slate-50">
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-6 py-3 font-medium">Jalon</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Responsable</th>
                  <th className="px-6 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {JALONS.map((jalon) => {
                  const s = STATUT_STYLE[jalon.statut]
                  return (
                    <tr key={jalon.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{jalon.nom}</td>
                      <td className="px-6 py-4 text-slate-600">{formatDate(jalon.date)}</td>
                      <td className="px-6 py-4 text-slate-600">{jalon.responsable}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${s.classes}`}>
                          {s.label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  )
}
