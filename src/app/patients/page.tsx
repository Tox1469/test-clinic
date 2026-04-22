'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SEED_PATIENTS = [
  { nome: 'Carlos Eduardo Souza', cpf: '321.654.987-00', telefone: '(31) 96543-2109', convenio: 'Bradesco Saude', created_at: '2026-04-10' },
  { nome: 'Lucia Helena Martins', cpf: '654.987.321-00', telefone: '(41) 95432-1098', convenio: 'Particular', created_at: '2026-04-05' },
]

interface Patient {
  nome?: string
  cpf?: string
  telefone?: string
  celular?: string
  convenio?: string
  created_at?: string
  [key: string]: string | undefined
}

export default function PatientsPage() {
  const router = useRouter()
  const [saved, setSaved] = useState<Patient[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('clinicapro_auth') !== 'true') {
        router.replace('/login')
        return
      }
      fetch('/api/patients')
        .then(r => r.json())
        .then(data => setSaved(data.patients || []))
        .catch(() => {})
    }
  }, [router])

  const allPatients = [...saved.reverse(), ...SEED_PATIENTS]

  function handleClear() {
    fetch('/api/patients', { method: 'DELETE' }).catch(() => {})
    setSaved([])
  }

  return (
    <div className="min-h-screen flex bg-gray-950">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">CP</div>
            <span className="text-sm font-semibold text-white">ClinicaPro</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Painel
          </Link>
          <Link href="/patients" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm bg-gray-800 text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Pacientes
          </Link>
          <Link href="#" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Agenda
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-white">Pacientes</h1>
              <p className="text-sm text-gray-500 mt-0.5">{allPatients.length} pacientes cadastrados</p>
            </div>
            <div className="flex items-center gap-2">
              {saved.length > 0 && (
                <button
                  onClick={handleClear}
                  className="px-3 py-2 text-xs text-gray-400 border border-gray-700 rounded-lg hover:text-red-400 hover:border-red-400/30 transition-colors"
                >
                  Limpar cadastrados
                </button>
              )}
              <Link
                href="/patients/new"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Novo Paciente
              </Link>
            </div>
          </div>

          {/* Saved by automation banner */}
          {saved.length > 0 && (
            <div className="mb-4 px-4 py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-sm text-emerald-400 font-medium">{saved.length} paciente(s) cadastrado(s) via automacao</p>
                <p className="text-xs text-gray-500 mt-0.5">Esses registros foram preenchidos automaticamente pelo AgentBox</p>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por nome, CPF ou telefone..."
              className="w-full max-w-md px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          {/* Table */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Nome</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">CPF</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Telefone</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Convenio</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Origem</th>
                </tr>
              </thead>
              <tbody>
                {allPatients.map((p, i) => {
                  const isFromAutomation = i < saved.length
                  return (
                    <tr key={i} className="border-b border-gray-800/50 last:border-0 hover:bg-gray-800/30 cursor-pointer">
                      <td className="px-4 py-3 text-white font-medium">{p.nome || '-'}</td>
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs">{p.cpf || '-'}</td>
                      <td className="px-4 py-3 text-gray-400">{p.celular || p.telefone || '-'}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-300">{p.convenio || '-'}</span>
                      </td>
                      <td className="px-4 py-3">
                        {isFromAutomation ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            AgentBox
                          </span>
                        ) : (
                          <span className="text-xs text-gray-600">Manual</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
