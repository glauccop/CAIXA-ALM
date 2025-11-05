import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard.jsx'
import NecessidadesManager from './components/NecessidadesManager.jsx'
import RequisitosManager from './components/RequisitosManager.jsx'
import HistoriasUsuarioManager from './components/HistoriasUsuarioManager.jsx'
import PlanosTeste from './components/PlanosTeste.jsx'
import './RequirementsApp.css'

export default function RequirementsApp() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [viewParams, setViewParams] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'dashboard'
      const [view, ...params] = hash.split('/')
      setCurrentView(view)
      setViewParams(params.join('/'))
    }
    
    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Initial load
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (view, params) => {
    window.location.hash = params ? `${view}/${params}` : view
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'necessidades', label: 'Necessidades', icon: '💡' },
    { id: 'requisitos', label: 'Requisitos', icon: '📋' },
    { id: 'historias', label: 'Histórias de Usuário', icon: '👤' },
    { id: 'planos-teste', label: 'Planos de Teste', icon: '🧪' },
  ]

  const renderView = () => {
    switch(currentView) {
      case 'necessidades':
        return <NecessidadesManager />
      case 'requisitos':
        return <RequisitosManager />
      case 'historias':
        return <HistoriasUsuarioManager />
      case 'planos-teste':
        return <PlanosTeste />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="requirements-app">
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🏛️</span>
            {!sidebarCollapsed && <span className="logo-text">CAIXA ALM</span>}
          </div>
          <button 
            className="collapse-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? '▶️' : '◀️'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => navigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {!sidebarCollapsed && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        {renderView()}
      </main>
    </div>
  )
}