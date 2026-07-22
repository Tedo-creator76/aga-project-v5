'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type CR = {
  id: number
  nom: string
  date: string
  auteur: string
  type: string
}

const CR_EXISTANTS: CR[] = [
  { id: 1, nom: 'CR OPC N°14 — Réunion de chantier',  date: '2026-07-18', auteur: 'Alex',       type: 'OPC' },
  { id: 2, nom: 'CR OPC N°13 — Réunion de chantier',  date: '2026-07-11', auteur: 'Alex',       type: 'OPC' },
  { id: 3, nom: 'CR Synthèse N°06 — Coordination',    date: '2026-07-04', auteur: 'Alex',       type: 'Synthèse' },
  { id: 4, nom: 'CR OPC N°12 — Réunion de chantier',  date: '2026-06-27', auteur: 'Alex',       type: 'OPC' },
  { id: 5, nom: 'CR Levée de réserves GO',             date: '2026-06-20', auteur: 'Architecte', type: 'Réserves' },
]

export default function ComptesRendusPage() {
  const [file, setFile]     = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    try {
      setStatus('uploading')
      setMessage('Envoi du compte rendu...')

      const fileName = `cr_${Date.now()}_${file.name}`
      const { error } = await supabase.storage
        .from('comptes-rendus')
        .upload(fileName, file, { contentType: 'application/pdf', upsert: true })

      if (error) throw error

      setStatus('done')
      setMessage('Compte rendu déposé avec succès.')
      setFile(null)
    } catch (err) {
      setStatus('error')
      setMessage('Une erreur est survenue. Veuillez réessayer.')
      console.error(err)
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8 md:p-10">
      <div className="mx-auto max-w-7xl">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">📝 Comptes rendus</h1>
            <p className="mt-2 text-slate-600">Résidence Drancy — Réunions OPC et synthèses</p>
          </div>
          <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">
            {CR_EXISTANTS.length} CR
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-3">

          {/* Formulaire dépôt */}
          <div className="rounded-xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold">Déposer un CR</h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Fichier PDF
                </label>
                <div
                  className="cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-8 text-center transition hover:border-slate-500"
                  onClick={() => document.getElementById('cr-input')?.click()}
                >
                  {file ? (
                    <p className="font-medium text-slate-700">📄 {file.name}</p>
                  ) : (
                    <>
                      <p className="mb-3 text-4xl">📂</p>
                      <p className="font-medium text-slate-500">Glissez votre PDF ici</p>
                      <p className="mt-1 text-sm text-slate-400">ou cliquez pour sélectionner</p>
                    </>
                  )}
                </div>
                <input
                  id="cr-input"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => { setFile(e.target.files?.[0] ?? null); setStatus('idle'); setMessage('') }}
                />
              </div>

              <button
                type="submit"
                disabled={!file || status === 'uploading'}
                className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'uploading' ? '⏳ Envoi...' : '⬆️ Déposer'}
              </button>

              {message && (
                <div className={`rounded-xl border p-4 text-sm font-medium ${
                  status === 'done'  ? 'border-green-200 bg-green-50 text-green-700' :
                  status === 'error' ? 'border-red-200 bg-red-50 text-red-700' :
                                       'border-blue-200 bg-blue-50 text-blue-700'
                }`}>
                  {status === 'done' && '✅ '}{status === 'error' && '❌ '}{message}
                </div>
              )}
            </form>
          </div>

          {/* Liste des CR */}
          <div className="xl:col-span-2 rounded-xl bg-white shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold">Comptes rendus récents</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-y border-slate-100 bg-slate-50">
                  <tr className="text-left text-sm text-slate-500">
                    <th className="px-6 py-3 font-medium">Nom</th>
                    <th className="px-6 py-3 font-medium">Type</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Auteur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CR_EXISTANTS.map((cr) => (
                    <tr key={cr.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{cr.nom}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                          {cr.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(cr.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{cr.auteur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
