import Link from "next/link";
export default function ProjetDetailPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <Link
        href="/projets"
        className="text-slate-600 hover:text-slate-900"
      >
        ← Retour aux projets
      </Link>
      <div className="flex justify-between items-start mt-4">
        <div>
          <h1 className="text-5xl font-bold text-slate-900">
            Résidence Drancy
          </h1>
          <p className="text-slate-600 mt-3 text-xl">
            Promoteur : PROMOGIM — Mission : MOEX / OPC
          </p>
        </div>
        <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
          En cours
        </span>
      </div>
      {/* MODULES */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 mt-10">
        <Link
          href="/projets/1/documents"
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-lg font-semibold"
        >
          📄 Documents
        </Link>
        <Link
          href="/projets/1/planning-opc"
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-lg font-semibold"
        >
          📅 Planning OPC
        </Link>
        <Link
          href="/projets/1/comptes-rendus"
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-lg font-semibold"
        >
          📝 Comptes rendus
        </Link>
        <Link
          href="/projets/1/visa-des-plans"
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-lg font-semibold"
        >
          📐 Visa des plans
        </Link>
        <Link
          href="/projets/1/finances"
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-lg font-semibold"
        >
          💰 Finances
        </Link>
        <Link
          href="/projets/1/camille-ia"
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-lg font-semibold"
        >
          🤖 Camille IA
        </Link>
      </div>
      {/* CONTENU */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-3xl font-bold">
            Informations projet
          </h2>
          <div className="space-y-4 mt-6 text-lg">
            <p><strong>Adresse :</strong> 244 Rue Anatole France</p>
            <p><strong>Ville :</strong> Drancy</p>
            <p><strong>Nombre de logements :</strong> 62</p>
            <p><strong>Budget :</strong> 14 M€</p>
            <p><strong>Phase :</strong> Chantier</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-3xl font-bold">
            Activité récente
          </h2>
          <ul className="space-y-5 mt-6 text-lg">
            <li>✅ CCTP Gros Œuvre ajouté.</li>
            <li>📅 Réunion OPC prévue vendredi.</li>
            <li>⚠️ 3 réserves à lever avant réception.</li>
            <li>🤖 Camille IA prête à analyser les documents.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
