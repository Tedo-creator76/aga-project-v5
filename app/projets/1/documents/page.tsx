import Link from "next/link";

export default function DocumentsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            📄 Documents
          </h1>

          <p className="text-slate-500 mt-2">
            Résidence Drancy
          </p>
        </div>

        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-700">
          + Ajouter un document
        </button>

      </div>

      <div className="grid grid-cols-4 gap-6 mt-10">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-lg">📐 Plans</h2>
          <p className="text-slate-500 mt-2">
            32 fichiers
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-lg">📑 CCTP</h2>
          <p className="text-slate-500 mt-2">
            18 fichiers
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-lg">📝 Comptes rendus</h2>
          <p className="text-slate-500 mt-2">
            27 fichiers
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-lg">📷 Photos</h2>
          <p className="text-slate-500 mt-2">
            412 fichiers
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow mt-10 p-8">

        <h2 className="text-2xl font-bold">
          Derniers documents
        </h2>

        <table className="w-full mt-6">

          <thead>

            <tr className="text-left border-b">

              <th className="pb-3">Nom</th>

              <th>Type</th>

              <th>Date</th>

              <th>Auteur</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b">

              <td className="py-4">CCTP Gros Œuvre V4.pdf</td>

              <td>PDF</td>

              <td>08/07/2026</td>

              <td>Alex</td>

            </tr>

            <tr className="border-b">

              <td className="py-4">Plan RDC.pdf</td>

              <td>PDF</td>

              <td>07/07/2026</td>

              <td>Architecte</td>

            </tr>

            <tr>

              <td className="py-4">Compte rendu OPC N°12.pdf</td>

              <td>PDF</td>

              <td>05/07/2026</td>

              <td>Alex</td>

            </tr>

          </tbody>

        </table>

      </div>

    </main>
  );
}