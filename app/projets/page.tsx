import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Projet = {
  id: number;
  name: string;
  promoter: string | null;
  city: string | null;
  mission: string | null;
  budget: string | null;
  status: string | null;
};

export default async function ProjetsPage() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  const projets = (data ?? []) as Projet[];

  return (
    <main className="min-h-screen bg-slate-100 p-8 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              📁 Mes projets
            </h1>

            <p className="mt-2 text-slate-600">
              Projets chargés depuis Supabase.
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white shadow hover:bg-slate-800"
          >
            + Nouveau projet
          </button>
        </div>

        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5">
            <h2 className="font-bold text-red-800">
              Erreur de lecture Supabase
            </h2>

            <p className="mt-2 text-red-700">{error.message}</p>

            <p className="mt-2 text-sm text-red-600">
              Code : {error.code || "non communiqué"}
            </p>
          </div>
        )}

        {!error && projets.length === 0 && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Aucun projet visible
            </h2>

            <p className="mt-2 text-slate-600">
              Vérifie les données et la politique de lecture de la table
              projects dans Supabase.
            </p>
          </div>
        )}

        {!error && projets.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
            {projets.map((projet) => (
              <article
                key={projet.id}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {projet.name}
                    </h2>

                    <div className="mt-4 space-y-2 text-slate-600">
                      <p>
                        <strong>Promoteur :</strong>{" "}
                        {projet.promoter ?? "Non renseigné"}
                      </p>

                      <p>
                        <strong>Ville :</strong>{" "}
                        {projet.city ?? "Non renseignée"}
                      </p>

                      <p>
                        <strong>Mission :</strong>{" "}
                        {projet.mission ?? "Non renseignée"}
                      </p>

                      <p>
                        <strong>Budget :</strong>{" "}
                        {projet.budget ?? "Non renseigné"}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {projet.status ?? "Non défini"}
                  </span>
                </div>

                <Link
                  href={`/projets/${projet.id}`}
                  className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-white hover:bg-slate-800"
                >
                  Ouvrir
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}