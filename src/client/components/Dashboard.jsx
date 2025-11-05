import React, { useState, useEffect } from 'react'

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    necessidades: 0,
    requisitos: 0,
    historias: 0,
    planos: 0
  })
  const [loading, setLoading] = useState(true)
  const [recentActivities] = useState([
    { id: 1, type: 'necessidade', title: 'Nova necessidade criada: Portal de Autoatendimento', time: '2 horas atrás' },
    { id: 2, type: 'requisito', title: 'Requisito RF-001 aprovado', time: '4 horas atrás' },
    { id: 3, type: 'historia', title: 'História US-005 movida para "Em Teste"', time: '6 horas atrás' },
    { id: 4, type: 'plano', title: 'Plano de teste TC-001 executado com sucesso', time: '1 dia atrás' },
  ])

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        // Load metrics from each table
        const [necesRes, reqRes, histRes, planRes] = await Promise.all([
          fetch('/api/now/table/x_snc_almcaixa_necessidades?sysparm_limit=1&sysparm_display_value=all', {
            headers: { "Accept": "application/json", "X-UserToken": window.g_ck }
          }),
          fetch('/api/now/table/x_snc_almcaixa_requisitos?sysparm_limit=1&sysparm_display_value=all', {
            headers: { "Accept": "application/json", "X-UserToken": window.g_ck }
          }),
          fetch('/api/now/table/x_snc_almcaixa_historias_usuario?sysparm_limit=1&sysparm_display_value=all', {
            headers: { "Accept": "application/json", "X-UserToken": window.g_ck }
          }),
          fetch('/api/now/table/x_snc_almcaixa_planos_teste?sysparm_limit=1&sysparm_display_value=all', {
            headers: { "Accept": "application/json", "X-UserToken": window.g_ck }
          })
        ])

        setMetrics({
          necessidades: necesRes.headers.get('X-Total-Count') || 0,
          requisitos: reqRes.headers.get('X-Total-Count') || 0,
          historias: histRes.headers.get('X-Total-Count') || 0,
          planos: planRes.headers.get('X-Total-Count') || 0
        })
      } catch (error) {
        console.error('Failed to load metrics:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMetrics()
  }, [])

  const metricCards = [
    {
      title: 'Necessidades',
      value: metrics.necessidades,
      icon: '💡',
      color: 'var(--primary)',
      bgGradient: 'linear-gradient(135deg, #0073E6 0%, #005bb5 100%)'
    },
    {
      title: 'Requisitos',
      value: metrics.requisitos,
      icon: '📋',
      color: 'var(--success)',
      bgGradient: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
    },
    {
      title: 'Histórias de Usuário',
      value: metrics.historias,
      icon: '👤',
      color: 'var(--accent)',
      bgGradient: 'linear-gradient(135deg, #17A2B8 0%, #20c997 100%)'
    },
    {
      title: 'Planos de Teste',
      value: metrics.planos,
      icon: '🧪',
      color: 'var(--warning)',
      bgGradient: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)'
    }
  ]

  if (loading) {
    return (
      <div className="content-container">
        <div className="loading">Carregando dashboard...</div>
      </div>
    )
  }

  return (
    <div className="content-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Visão geral do sistema de gestão de requisitos</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
        {metricCards.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-icon">{metric.icon}</div>
            <div className="metric-content">
              <h3 className="metric-value">{metric.value}</h3>
              <p className="metric-title">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-2">
        {/* Recent Activities */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Atividades Recentes</h2>
          </div>
          <div className="activities-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'necessidade' && '💡'}
                  {activity.type === 'requisito' && '📋'}
                  {activity.type === 'historia' && '👤'}
                  {activity.type === 'plano' && '🧪'}
                </div>
                <div className="activity-content">
                  <p className="activity-title">{activity.title}</p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Ações Rápidas</h2>
          </div>
          <div className="quick-actions">
            <button 
              className="quick-action-btn"
              onClick={() => window.location.hash = 'necessidades'}
            >
              <span className="action-icon">💡</span>
              <span className="action-label">Nova Necessidade</span>
            </button>
            <button 
              className="quick-action-btn"
              onClick={() => window.location.hash = 'requisitos'}
            >
              <span className="action-icon">📋</span>
              <span className="action-label">Novo Requisito</span>
            </button>
            <button 
              className="quick-action-btn"
              onClick={() => window.location.hash = 'historias'}
            >
              <span className="action-icon">👤</span>
              <span className="action-label">Nova História</span>
            </button>
            <button 
              className="quick-action-btn"
              onClick={() => window.location.hash = 'planos-teste'}
            >
              <span className="action-icon">🧪</span>
              <span className="action-label">Novo Plano de Teste</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .metric-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: var(--shadow-md);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        
        .metric-icon {
          font-size: 2.5rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--light);
        }
        
        .metric-content {
          flex: 1;
        }
        
        .metric-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary);
          margin: 0 0 0.25rem 0;
        }
        
        .metric-title {
          font-size: 0.9rem;
          color: #666;
          margin: 0;
          font-weight: 500;
        }
        
        .activities-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 8px;
          background: var(--light);
        }
        
        .activity-icon {
          font-size: 1.25rem;
        }
        
        .activity-content {
          flex: 1;
        }
        
        .activity-title {
          margin: 0 0 0.25rem 0;
          font-weight: 500;
          color: var(--dark);
        }
        
        .activity-time {
          margin: 0;
          font-size: 0.8rem;
          color: #666;
        }
        
        .quick-actions {
          display: grid;
          gap: 1rem;
        }
        
        .quick-action-btn {
          background: var(--light);
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        
        .quick-action-btn:hover {
          background: white;
          border-color: var(--primary);
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }
        
        .action-icon {
          font-size: 1.25rem;
        }
        
        .action-label {
          font-weight: 500;
          color: var(--dark);
        }
      `}</style>
    </div>
  )
}