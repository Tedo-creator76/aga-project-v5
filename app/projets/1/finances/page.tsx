import Link from 'next/link'

type Lot = {
  id: number
  nom: string
  entreprise: string
  budget: number
  marche: number
  depense: number
}

const LOTS: Lot[] = [
  { id: 1,  nom: 'Gros Œuvre',         entreprise: 'BATIPRO SAS',      budget: 3_200_000, marche: 3_150_000, depense: 3_150_000 },
  { id: 2,  nom: 'Charpente',          entreprise: 'BOIS & STRUCTURE',  budget:   420_000, marche:   415_000, depense:   415_000 },
  { id: 3,  nom: 'Couverture',         entreprise: 'TOITURE IDF',       budget:   280_000, marche:   275_000, depense:   270_000 },
  { id: 4,  nom: 'Menuiseries ext.',   entreprise: 'MENUISALU',         budget:   950_000, marche:   940_000, depense:   820_000 },
  { id: 5,  nom: 'Cloisons / plâtre',  entreprise: 'PLATRIDF',          budget:   560_000, marche:   555_000, depense:   480_000 },
  { id: 6,  nom: 'Plomberie / CVC',    entreprise: 'AQUA SAS',          budget:   780_000, marche:   790_000, depense:   650_000 },
  { id: 7,  nom: 'Électricité',        entreprise: 'ELEC PRO 93',       budget:   620_000, marche:   615_000, depense:   530_000 },
  { id: 8,  nom: 'Carrelage / faïence',entreprise: 'CARRELUX',          budget:   310_000, marche:   308_000, depense:   270_000 },
  { id: 9,  nom: 'Peinture',           entreprise: 'COULEURS 92',       budget:   190_000, marche:   185_000, depense:   140_000 },
  { id: 10, nom: 'VRD / Espaces verts',entreprise: 'TERRASSEMENTS IDF', budget:   390_000, marche:   382_000, depense:   370_000 },
  { id: 11, nom: 'Ascenseurs',         entreprise: 'OTIS FRANCE',       budget:   180_000, marche:   178_000, depense:   160_000 },
  { id: 12, nom: 'Divers / imprévus',  entreprise: '—',                 budget:   320_000, marche:         0, depense:    95_000 },
]

function euros(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

function ecart(lot: Lot) {
  return lot.marche - lot.budget
}

export default function FinancesPage() {
  const totalBudget  = LOTS.reduce((s, l) => s + l.budget,  0)
  const totalMarche  = LOTS.reduce((s, l) => s + l.marche,  0)
  const totalDepense = LOTS.reduce((s, l) => s + l.depense, 0)
  const totalEcart   = totalMarche - totalBudget
  const tauxEngagement = Math.round((totalDepense / totalBudget) * 100)

  return (
    <main className="min-h-screen bg-slate-100 p-8 md:p-10">
      <div className="mx-auto max-w-7xl">

        <Link href="/projets/1" className="text-slate-600 hover:text-slate-900">
          ← Retour au projet
        </Link>

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">💰 Finances</h1>
            <p className="mt-2 text-slate-600">Résidence Drancy — Suivi budgétaire par lot</p>
          </div>
          <span className={`rounded-full px-5 py-2 font-semibold ${
            totalEcart > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {totalEcart > 0 ? '⚠️ Dépassement' : '✅ Dans le budget'}
          </span>
        </div>

        {/* KPIs */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Budget total</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{euros(totalBudget)}</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Marchés signés</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{euros(totalMarche)}</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Dépensé</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{euros(totalDepense)}</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Taux d'engagement</p>
            <p className={`mt-1 text-2xl font-bold ${tauxEngagement > 90 ? 'text-red-600' : 'text-green-600'}`}>
              {tauxEngagement} %
            </p>
          </div>
        </div>

        {/* Barre de progression globale */}
        <div className="mt-4 rounded-xl bg-white p-6 shadow">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>Avancement budgétaire global</span>
            <span>{tauxEngagement} %</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-100">
            <div
              className="h-3 rounded-full bg-slate-900 transition-all"
              style={{ width: `${Math.min(tauxEngagement, 100)}%` }}
            />
          </div>
        </div>

        {/* Tableau par lot */}
        <div className="mt-6 overflow-hidden rounded-xl bg-white shadow">
          <div className="p-6">
            <h2 className="text-2xl font-bold">Détail par lot</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-y border-slate-100 bg-slate-50">
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-6 py-3 font-medium">Lot</th>
                  <th className="px-6 py-3 font-medium">Entreprise</th>
                  <th className="px-6 py-3 font-medium text-right">Budget</th>
                  <th className="px-6 py-3 font-medium text-right">Marché</th>
                  <th className="px-6 py-3 font-medium text-right">Dépensé</th>
                  <th className="px-6 py-3 font-medium text-right">Écart</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {LOTS.map((lot) => {
                  const e = ecart(lot)
                  return (
                    <tr key={lot.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{lot.nom}</td>
                      <td className="px-6 py-4 text-slate-600">{lot.entreprise}</td>
                      <td className="px-6 py-4 text-right text-slate-600">{euros(lot.budget)}</td>
                      <td className="px-6 py-4 text-right text-slate-600">{lot.marche ? euros(lot.marche) : '—'}</td>
                      <td className="px-6 py-4 text-right text-slate-600">{euros(lot.depense)}</td>
                      <td className={`px-6 py-4 text-right font-semibold ${
                        e > 0 ? 'text-red-600' : e < 0 ? 'text-green-600' : 'text-slate-400'
                      }`}>
                        {lot.marche ? (e > 0 ? `+${euros(e)}` : euros(e)) : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot className="border-t-2 border-slate-200 bg-slate-50">
                <tr className="text-sm font-bold text-slate-900">
                  <td className="px-6 py-4" colSpan={2}>Total</td>
                  <td className="px-6 py-4 text-right">{euros(totalBudget)}</td>
                  <td className="px-6 py-4 text-right">{euros(totalMarche)}</td>
                  <td className="px-6 py-4 text-right">{euros(totalDepense)}</td>
                  <td className={`px-6 py-4 text-right ${totalEcart > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {totalEcart > 0 ? `+${euros(totalEcart)}` : euros(totalEcart)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

      </div>
    </main>
  )
}
