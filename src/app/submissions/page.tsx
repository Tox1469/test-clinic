'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Patient {
  nome?: string
  cpf?: string
  telefone?: string
  celular?: string
  email_paciente?: string
  convenio?: string
  sexo?: string
  data_nascimento?: string
  cidade?: string
  estado?: string
  created_at?: string
  [key: string]: string | undefined
}

export default function SubmissionsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)

  function fetchData() {
    setLoading(true)
    fetch('/api/patients')
      .then(r => r.json())
      .then(data => { setPatients(data.patients || []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  // Auto-refresh every 5s
  useEffect(() => {
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-[10px]">CP</div>
              <span className="text-sm font-semibold text-white">ClinicaPro</span>
            </div>
            <h1 className="text-xl font-semibold text-white">Pacientes cadastrados via automacao</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Esta pagina atualiza automaticamente a cada 5 segundos
            </p>
          </div>
          <div className="flex items-center gap-2">
            {patients.length > 0 && (
              <button
                onClick={() => {
                  fetch('/api/patients', { method: 'DELETE' })
                    .then(() => { setPatients([]); })
                    .catch(() => {})
                }}
                className="px-3 py-2 text-xs text-gray-400 border border-gray-700 rounded-lg hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-colors"
              >
                Limpar tudo
              </button>
            )}
            <button
              onClick={fetchData}
              className="px-3 py-2 text-xs text-gray-400 border border-gray-700 rounded-lg hover:text-white hover:bg-gray-800 transition-colors"
            >
              Atualizar agora
            </button>
            <Link
              href="/login"
              className="px-3 py-2 text-xs text-gray-400 border border-gray-700 rounded-lg hover:text-white hover:bg-gray-800 transition-colors"
            >
              Ir pro login
            </Link>
          </div>
        </div>

        {/* Counter */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-500">Total cadastrados</p>
            <p className="text-3xl font-semibold text-white mt-1">{patients.length}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-500">Status</p>
            <p className="text-lg font-semibold text-emerald-400 mt-1">
              {loading ? 'Carregando...' : patients.length > 0 ? 'Dados recebidos' : 'Aguardando...'}
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-500">Auto-refresh</p>
            <p className="text-lg font-semibold text-white mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              A cada 5s
            </p>
          </div>
        </div>

        {patients.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="text-gray-400 text-sm">Nenhum paciente cadastrado ainda</p>
            <p className="text-gray-600 text-xs mt-1">Inicie a automacao no AgentBox e veja os dados aparecerem aqui</p>
          </div>
        ) : (
          <div className="space-y-3">
            {patients.map((p, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-600">#{i + 1}</span>
                    <span className="text-sm font-semibold text-white">{p.nome || 'Sem nome'}</span>
                    {p.sexo && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">{p.sexo === 'M' ? 'Masculino' : 'Feminino'}</span>
                    )}
                  </div>
                  {p.created_at && (
                    <span className="text-xs text-gray-600">{new Date(p.created_at).toLocaleString('pt-BR')}</span>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  {p.cpf && <div><span className="text-gray-600">CPF: </span><span className="text-gray-300 font-mono">{p.cpf}</span></div>}
                  {(p.celular || p.telefone) && <div><span className="text-gray-600">Tel: </span><span className="text-gray-300">{p.celular || p.telefone}</span></div>}
                  {p.email_paciente && <div><span className="text-gray-600">Email: </span><span className="text-gray-300">{p.email_paciente}</span></div>}
                  {p.convenio && <div><span className="text-gray-600">Convenio: </span><span className="text-emerald-400">{p.convenio}</span></div>}
                  {p.cidade && <div><span className="text-gray-600">Cidade: </span><span className="text-gray-300">{p.cidade}/{p.estado}</span></div>}
                  {p.data_nascimento && <div><span className="text-gray-600">Nasc: </span><span className="text-gray-300">{p.data_nascimento}</span></div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
