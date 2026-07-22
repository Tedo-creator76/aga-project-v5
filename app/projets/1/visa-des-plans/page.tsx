'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const N8N_WEBHOOK_URL = 'https://joinlion.app.n8n.cloud/webhook/analyse-plan'

export default function VisaDesPlansPage() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    try {
      setStatus('uploading')
      setMessage('Envoi du fichier...')

      const fileName = `plan_${Date.now()}.pdf`
      const { error } = await supabase.storage
        .from('plans')
        .upload(fileName, file, {
          contentType: 'application/pdf',
          upsert: true,
        })

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('plans')
        .getPublicUrl(fileName)

      setStatus('analyzing')
      setMessage('Analyse en cours par Camille IA...')

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfUrl: publicUrl,
          fileName: file.name,
          project: 'Résidence Drancy',
          requestId: `plan_${Date.now()}`,
          clientEmail: 'alexagricole92@gmail.com',
          deliverableType: 'Analyse de plan',
        }),
      })

      if (!response.ok) throw new Error('Erreur webhook n8n')

      setStatus('done')
      setMessage('Analyse terminée ! Le rapport a été envoyé par email.')
    } catch (err) {
      setStatus('error')
      setMessage('Une erreur est survenue. Veuillez réessayer.')
      console.error(err)
    }
  }

  const isProcessing = status === 'uploading' || status === 'analyzing'

  return (
    <main className="min-h-screen bg-slate-100 p-8 md:p-10">
      <div className="mx-auto max-w-7xl">

        <Link href="/projets/1" className="text-slate-600 hover:text-slate-900">
          ← Retour au projet
        </Link>

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              📐 Visa des plans
            </h1>
            <p className="mt-2 text-slate-600">
              Résidence Drancy — Analyse IA de vos plans PDF
            </p>
          </div>
          <span className="rounded-full bg-blue-100 px-5 py-2 font-semibold text-blue-700">
            Camille IA
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-2">

          {/* Formulaire upload */}
          <div className="rounded-xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold">Analyser un plan</h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Plan PDF à analyser
                </label>
                <div
                  className="cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-8 text-center transition hover:border-slate-500"
                  onClick={() => document.getElementById('file-input')?.click()}
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
                  id="file-input"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </div>

              <button
                type="submit"
                disabled={!file || isProcessing}
                className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'uploading' && '⏳ Envoi du fichier...'}
                {status === 'analyzing' && '🤖 Analyse en cours...'}
                {!isProcessing && '🤖 Lancer l\'analyse IA'}
              </button>

              {message && (
                <div className={`rounded-xl border p-4 text-sm font-medium ${
                  status === 'done'
                    ? 'border-green-200 bg-green-50 text-green-700'
                    : status === 'error'
                    ? 'border-red-200 bg-red-50 text-red-700'
                    : 'border-blue-200 bg-blue-50 text-blue-700'
                }`}>
                  {status === 'done' && '✅ '}{status === 'error' && '❌ '}{message}
                </div>
              )}
            </form>
          </div>

          {/* Historique des analyses */}
          <div className="rounded-xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold">Analyses récentes</h2>
            <div className="mt-16 text-center text-slate-400">
              <p className="mb-3 text-4xl">📋</p>
              <p>Aucune analyse pour le moment.</p>
              <p className="mt-1 text-sm">Uploadez un plan pour démarrer.</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
