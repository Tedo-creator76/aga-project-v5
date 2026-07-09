export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <aside className="w-72 bg-slate-900 text-white p-6">
          <h1 className="text-2xl font-bold">PROJET AGA</h1>
          <p className="text-slate-400 text-sm mt-1">MOEX • OPC • AMO</p>

          <nav className="mt-10 space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800">
              🏠 Tableau de bord
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
              📁 Projets
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
              📄 Documents
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
              📋 Visa des plans
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
              📅 Planning OPC
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
              💰 Finances
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
              👷 Entreprises
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
              🤖 Camille IA
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
              ⚙ Paramètres
            </a>
          </nav>
        </aside>

        <section className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Bienvenue Alex 👋
              </h2>
              <p className="text-slate-600 mt-2">
                Voici votre tableau de bord AGA PROJECT V5.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow px-5 py-3 text-sm text-slate-600">
              Administrateur
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-slate-500">Projets actifs</p>
              <h3 className="text-3xl font-bold mt-2">12</h3>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-slate-500">Documents</p>
              <h3 className="text-3xl font-bold mt-2">286</h3>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-slate-500">Réunions</p>
              <h3 className="text-3xl font-bold mt-2">8</h3>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-slate-500">Réserves ouvertes</p>
              <h3 className="text-3xl font-bold mt-2">14</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-bold text-slate-800">
                Activité récente
              </h3>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>✅ Nouveau document ajouté au projet Drancy.</li>
                <li>📅 Réunion OPC prévue vendredi à 10h.</li>
                <li>⚠️ 3 réserves restent à lever.</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-bold text-slate-800">
                Camille IA
              </h3>
              <p className="text-slate-600 mt-3">
                Votre assistant IA pourra analyser les CCTP, générer des
                additifs, préparer les comptes rendus et vérifier les documents
                techniques.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}