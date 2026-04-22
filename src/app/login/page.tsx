'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const email = form.get('email') as string
    const password = form.get('password') as string

    // Simulate network delay
    await new Promise(r => setTimeout(r, 800))

    if (password === 'clinic123') {
      sessionStorage.setItem('clinicapro_auth', 'true')
      sessionStorage.setItem('clinicapro_user', email)
      router.push('/dashboard')
    } else {
      toast.error('Credenciais invalidas. Verifique seu email e senha.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">CP</div>
            <span className="text-xl font-semibold text-white tracking-tight">ClinicaPro</span>
          </div>
          <p className="text-sm text-gray-500">Sistema de Gestao Clinica</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <div className="text-center mb-2">
            <h2 className="text-lg font-semibold text-white">Acessar o sistema</h2>
            <p className="text-xs text-gray-500 mt-1">Insira suas credenciais para continuar</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              placeholder="seu@email.com"
              required
              autoComplete="email"
              className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              required
              autoComplete="current-password"
              className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="remember" className="w-3.5 h-3.5 rounded bg-gray-800 border-gray-700 text-emerald-500 focus:ring-emerald-500/40" />
              <span className="text-xs text-gray-400">Lembrar-me</span>
            </label>
            <button type="button" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
              Esqueci a senha
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-4">
          ClinicaPro v2.4.1 — Ambiente de demonstracao
        </p>
      </div>
    </div>
  )
}
