'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const NAV = [
  { label: 'Painel', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'Pacientes', href: '/patients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'Agenda', href: '#', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label: 'Financeiro', href: '#', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Relatorios', href: '#', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
]

const STATS = [
  { label: 'Pacientes ativos', value: '1.247', change: '+12 este mes' },
  { label: 'Consultas hoje', value: '18', change: '3 restantes' },
  { label: 'Receita mensal', value: 'R$ 84.320', change: '+8.2% vs anterior' },
  { label: 'Taxa de retorno', value: '73%', change: 'Meta: 80%' },
]

const APPOINTMENTS = [
  { time: '09:00', patient: 'Maria Silva', type: 'Retorno', status: 'Confirmado' },
  { time: '09:30', patient: 'Joao Santos', type: 'Primeira consulta', status: 'Aguardando' },
  { time: '10:00', patient: 'Ana Oliveira', type: 'Exame', status: 'Confirmado' },
  { time: '10:45', patient: 'Carlos Souza', type: 'Retorno', status: 'Confirmado' },
  { time: '11:30', patient: 'Lucia Ferreira', type: 'Urgencia', status: 'Em atendimento' },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('clinicapro_auth') !== 'true') {
        router.replace('/login')
        return
      }
      setUser(sessionStorage.getItem('clinicapro_user') || 'usuario')
    }
  }, [router])

  function handleLogout() {
    sessionStorage.removeItem('clinicapro_auth')
    sessionStorage.removeItem('clinicapro_user')
    router.replace('/login')
  }

  return (
    <div className="min-h-screen flex bg-gray-950">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">CP</div>
            <span className="text-sm font-semibold text-white">ClinicaPro</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                item.href === '/dashboard'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-800">
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-300">
              {user.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white truncate">{user}</p>
              <p className="text-[10px] text-gray-500">Administrador</p>
            </div>
            <button onClick={handleLogout} title="Sair" className="text-gray-500 hover:text-red-400 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-white">Painel Geral</h1>
              <p className="text-sm text-gray-500 mt-0.5">Visao geral da clinica</p>
            </div>
            <Link
              href="/patients/new"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Novo Paciente
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {STATS.map(s => (
              <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                <p className="text-2xl font-semibold text-white">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.change}</p>
              </div>
            ))}
          </div>

          {/* Appointments */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Consultas de hoje</h2>
              <span className="text-xs text-gray-500">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Horario</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Paciente</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Tipo</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {APPOINTMENTS.map((apt, i) => (
                  <tr key={i} className="border-b border-gray-800/50 last:border-0 hover:bg-gray-800/30">
                    <td className="px-4 py-2.5 text-white font-mono text-xs">{apt.time}</td>
                    <td className="px-4 py-2.5 text-white">{apt.patient}</td>
                    <td className="px-4 py-2.5 text-gray-400">{apt.type}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        apt.status === 'Confirmado' ? 'bg-emerald-500/10 text-emerald-400' :
                        apt.status === 'Em atendimento' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-amber-500/10 text-amber-400'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
