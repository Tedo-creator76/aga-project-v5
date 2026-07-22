'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const N8N_WEBHOOK_URL = 'https://joinlion.app.n8n.cloud/webhook/camille-chat'

type Message = {
  id: string
  role: 'user' | 'camille'
  content: string
  timestamp: Date
}

const WELCOME: Message = {
  id: 'welcome',
  role: 'camille',
  content: 'Bonjour ! Je suis Camille, votre assistante IA dédiée au projet Résidence Drancy. Posez-moi une question sur vos documents, vos plans, votre planning ou vos comptes rendus.',
  timestamp: new Date(),
}

export default function CamilleIAPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          project: 'Résidence Drancy',
          clientEmail: 'alexagricole92@gmail.com',
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      const data = await response.json().catch(() => null)
      const reply = data?.reply ?? data?.output ?? data?.text ?? 'Réponse reçue.'

      setMessages((prev) => [
        ...prev,
        {
          id: `camille_${Date.now()}`,
          role: 'camille',
          content: reply,
          timestamp: new Date(),
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'camille',
          content: 'Désolée, une erreur est survenue. Veuillez réessayer.',
          timestamp: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8 md:p-10">
      <div className="mx-auto max-w-4xl">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">🤖 Camille IA</h1>
            <p className="mt-2 text-slate-600">
              Résidence Drancy — Interrogez vos documents de projet
            </p>
          </div>
          <span className="rounded-full bg-violet-100 px-5 py-2 font-semibold text-violet-700">
            En ligne
          </span>
        </div>

        {/* Zone de chat */}
        <div className="mt-8 flex flex-col rounded-2xl bg-white shadow" style={{ height: '65vh' }}>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                  msg.role === 'camille'
                    ? 'bg-violet-100 text-violet-700'
                    : 'bg-slate-900 text-white'
                }`}>
                  {msg.role === 'camille' ? '🤖' : 'A'}
                </div>

                {/* Bulle */}
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'camille'
                    ? 'bg-slate-100 text-slate-800'
                    : 'bg-slate-900 text-white'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center text-sm">
                  🤖
                </div>
                <div className="bg-slate-100 rounded-2xl px-4 py-3 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Suggestions rapides */}
          {messages.length === 1 && (
            <div className="px-6 pb-3 flex flex-wrap gap-2">
              {[
                'Quels sont les derniers documents ajoutés ?',
                'Résume les réserves en cours.',
                'Quelle est la prochaine échéance ?',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => { setInput(suggestion); }}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 hover:border-slate-400 hover:bg-slate-100 transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-200 p-4 flex gap-3 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez une question à Camille… (Entrée pour envoyer)"
              rows={1}
              className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Envoyer
            </button>
          </div>
        </div>

      </div>
    </main>
  )
}
