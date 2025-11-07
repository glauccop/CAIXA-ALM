import React, { useState, useEffect, useMemo } from 'react'
import { PlanosTesteService } from '../services/RequirementsServices.js'
import { display, value } from '../utils/fields.js'

export default function PlanosTeste() {
  const [planos, setPlanos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPrioridade, setFilterPrioridade] = useState('')
  const [viewMode, setViewMode] = useState('cards') // 'cards', 'list', 'kanban'

  const service = useMemo(() => new PlanosTesteService(), [])

  const refreshData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await service.list()
      setPlanos(data)
    } catch (err) {
      setError('Falha ao carregar planos de teste: ' + (err.message || 'Erro desconhecido'))
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  const handleCreate = () => {
    setSelectedItem(null)
    setShowForm(true)
  }

  const handleEdit = (item) => {
    setSelectedItem(item)
    setShowForm(true)
  }

  const handleDelete = async (item) => {
    if (!confirm('Tem certeza de que deseja excluir este plano de teste?')) return
    
    try {
      const sysId = value(item.sys_id)
      await service.delete(sysId)
      await refreshData()
    } catch (err) {
      setError('Falha ao excluir plano de teste: ' + (err.message || 'Erro desconhecido'))
    }
  }

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true)
      if (selectedItem) {
        const sysId = value(selectedItem.sys_id)
        await service.update(sysId, formData)
      } else {
        await service.create(formData)
      }
      setShowForm(false)
      await refreshData()
    } catch (err) {
      setError('Falha ao salvar plano de teste: ' + (err.message || 'Erro desconhecido'))
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (item, newStatus) => {
    try {
      const sysId = value(item.sys_id)
      await service.update(sysId, { status: newStatus })
      await refreshData()
    } catch (err) {
      setError('Falha ao atualizar status: ' + (err.message || 'Erro desconhecido'))
    }
  }

  const filteredPlanos = planos.filter(item => {
    const matchesSearch = display(item.titulo).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         display(item.codigo).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         display(item.numero).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         display(item.descricao).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !filterStatus || display(item.status) === filterStatus
    const matchesPrioridade = !filterPrioridade || display(item.prioridade) === filterPrioridade
    
    return matchesSearch && matchesStatus && matchesPrioridade
  })

  const getStatusBadge = (status) => {
    const statusMap = {
      'planejado': 'badge-secondary',
      'em_execucao': 'badge-info',
      'passou': 'badge-success',
      'falhou': 'badge-danger',
      'bloqueado': 'badge-warning'
    }
    return statusMap[value(status)] || 'badge-secondary'
  }

  const getPrioridadeBadge = (prioridade) => {
    const prioridadeMap = {
      'critica': 'badge-danger',
      'alta': 'badge-warning',
      'media': 'badge-info', 
      'baixa': 'badge-secondary'
    }
    return prioridadeMap[value(prioridade)] || 'badge-secondary'
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    try {
      return new Date(display(dateStr)).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return 'N/A'
    }
  }

  if (loading && planos.length === 0) {
    return (
      <div className="content-container">
        <div className="loading">Carregando planos de teste...</div>
      </div>
    )
  }

  return (
    <div className="content-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Planos de Teste</h1>
          <p className="page-subtitle">Definição de casos de teste com pré-condições, passos e resultados esperados</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleCreate}>
            ➕ Novo Plano de Teste
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>Fechar</button>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <div className="filters-section">
            <h2 className="card-title">
              Planos de Teste ({filteredPlanos.length})
            </h2>
            <div className="view-toggle">
              <button 
                className={`btn btn-sm ${viewMode === 'cards' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setViewMode('cards')}
              >
                📊 Cards
              </button>
              <button 
                className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setViewMode('list')}
              >
                📋 Lista
              </button>
              <button 
                className={`btn btn-sm ${viewMode === 'kanban' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setViewMode('kanban')}
              >
                🗂️ Kanban
              </button>
            </div>
          </div>
        </div>
        
        <div className="filters-row">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por título, código, número ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <select
              className="form-control form-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Todos os Status</option>
              <option value="Planejado">Planejado</option>
              <option value="Em Execução">Em Execução</option>
              <option value="Passou">Passou</option>
              <option value="Falhou">Falhou</option>
              <option value="Bloqueado">Bloqueado</option>
            </select>
          </div>
          
          <div className="form-group">
            <select
              className="form-control form-select"
              value={filterPrioridade}
              onChange={(e) => setFilterPrioridade(e.target.value)}
            >
              <option value="">Todas as Prioridades</option>
              <option value="Crítica">Crítica</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Visualização em Cards */}
      {viewMode === 'cards' && (
        <CardsView
          planos={filteredPlanos}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getStatusBadge={getStatusBadge}
          getPrioridadeBadge={getPrioridadeBadge}
        />
      )}

      {/* Visualização em Lista */}
      {viewMode === 'list' && (
        <ListaView
          planos={filteredPlanos}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getStatusBadge={getStatusBadge}
          getPrioridadeBadge={getPrioridadeBadge}
          formatDate={formatDate}
        />
      )}

      {/* Visualização em Kanban */}
      {viewMode === 'kanban' && (
        <KanbanView
          planos={filteredPlanos}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          getStatusBadge={getStatusBadge}
          getPrioridadeBadge={getPrioridadeBadge}
          formatDate={formatDate}
        />
      )}

      {filteredPlanos.length === 0 && !loading && (
        <div className="empty-state">
          <p>Nenhum plano de teste encontrado.</p>
        </div>
      )}

      {showForm && (
        <PlanoTesteForm
          item={selectedItem}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f0f2f5;
        }
        
        .page-title-section h1 {
          margin: 0 0 0.5rem 0;
        }
        
        .page-title-section p {
          margin: 0;
          color: #666;
        }

        .filters-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .view-toggle {
          display: flex;
          gap: 0.5rem;
        }

        .filters-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 1rem;
          margin-bottom: 0;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #666;
          font-size: 1.1rem;
        }

        .error-message {
          background: #f8d7da;
          border: 1px solid #f5c6cb;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
          color: #721c24;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .error-message button {
          background: none;
          border: none;
          color: #721c24;
          cursor: pointer;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: 1rem;
          }

          .filters-section {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .filters-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

// Cards View Component
function CardsView({ planos, onEdit, onDelete, getStatusBadge, getPrioridadeBadge }) {
  return (
    <div className="planos-grid">
      {planos.map(item => (
        <div key={value(item.sys_id)} className="plano-card">
          <div className="card-header">
            <div className="plano-badges">
              <span className="badge badge-primary">
                {display(item.numero)}
              </span>
              <span className="badge badge-accent">
                {display(item.codigo)}
              </span>
            </div>
            <div className="status-badges">
              <span className={`badge ${getStatusBadge(item.status)}`}>
                {display(item.status)}
              </span>
              <span className={`badge ${getPrioridadeBadge(item.prioridade)}`}>
                {display(item.prioridade)}
              </span>
            </div>
          </div>
          
          <div className="plano-content">
            <h3 className="plano-titulo">{display(item.titulo)}</h3>
            
            <div className="plano-descricao-section">
              <p className="plano-descricao">{display(item.descricao)}</p>
            </div>

            {display(item.pre_condicoes) && (
              <div className="plano-section">
                <strong>Pré-condições:</strong>
                <p>{display(item.pre_condicoes).substring(0, 100)}...</p>
              </div>
            )}

            <div className="plano-section">
              <strong>Passos do Teste:</strong>
              <p>{display(item.passos_teste).substring(0, 150)}...</p>
            </div>

            <div className="plano-section">
              <strong>Resultado Esperado:</strong>
              <p>{display(item.resultado_esperado).substring(0, 100)}...</p>
            </div>

            <div className="plano-info">
              <p className="plano-data">
                <strong>Criado em:</strong> {new Date(display(item.data_criacao)).toLocaleDateString('pt-BR')}
              </p>
              {display(item.data_execucao) && (
                <p className="plano-execucao">
                  <strong>Executado em:</strong> {new Date(display(item.data_execucao)).toLocaleDateString('pt-BR')}
                </p>
              )}
            </div>
          </div>
          
          <div className="card-actions">
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => onEdit(item)}
            >
              ✏️ Editar
            </button>
            <button 
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(item)}
            >
              🗑️ Excluir
            </button>
          </div>
        </div>
      ))}

      <style jsx>{`
        .planos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .plano-card {
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          padding: 1.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .plano-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        
        .plano-badges {
          display: flex;
          gap: 0.5rem;
        }

        .status-badges {
          display: flex;
          gap: 0.5rem;
        }
        
        .plano-titulo {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--primary);
          margin: 1rem 0;
        }
        
        .plano-descricao-section {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
        }

        .plano-descricao {
          margin: 0;
          line-height: 1.5;
          color: var(--dark);
        }

        .plano-section {
          margin: 1rem 0;
          padding: 0.75rem;
          background: #e3f2fd;
          border-radius: 6px;
          font-size: 0.9rem;
          border-left: 4px solid #2196f3;
        }

        .plano-section p {
          margin: 0.5rem 0 0 0;
          color: #666;
          line-height: 1.4;
        }

        .plano-info {
          margin: 1rem 0;
          padding: 0.75rem;
          background: #f0f8ff;
          border-radius: 6px;
          font-size: 0.9rem;
        }

        .plano-data,
        .plano-execucao {
          margin: 0.25rem 0;
          color: #666;
          line-height: 1.4;
        }

        .plano-execucao {
          color: #28a745;
          font-weight: 500;
        }
        
        .card-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }

        @media (max-width: 768px) {
          .planos-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

// Lista View Component - APLICANDO EXATAMENTE O PADRÃO DAS HISTÓRIAS DE USUÁRIO
function ListaView({ planos, onEdit, onDelete, getStatusBadge, getPrioridadeBadge, formatDate }) {
  return (
    <div className="planos-table-container">
      <table className="planos-table">
        <thead>
          <tr>
            <th style={{ width: '120px' }}>Número</th>
            <th style={{ width: '100px' }}>Código</th>
            <th style={{ width: '200px' }}>Título</th>
            <th style={{ width: '350px' }}>Detalhes do Teste</th>
            <th style={{ width: '120px' }}>Prioridade</th>
            <th style={{ width: '140px' }}>Status</th>
            <th style={{ width: '150px' }}>Data Criação</th>
            <th style={{ width: '120px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {planos.map(item => (
            <tr key={value(item.sys_id)}>
              <td className="numero-cell">
                <strong>{display(item.numero)}</strong>
              </td>
              <td className="codigo-cell">
                <span className="codigo-badge">{display(item.codigo)}</span>
              </td>
              <td className="titulo-cell">
                <div className="titulo-text">
                  {display(item.titulo)}
                </div>
              </td>
              <td className="detalhes-cell">
                <div className="detalhes-truncated">
                  <strong>Descrição:</strong> {display(item.descricao).substring(0, 80)}...
                  <br />
                  <strong>Passos:</strong> {display(item.passos_teste).substring(0, 60)}...
                  <br />
                  <strong>Esperado:</strong> {display(item.resultado_esperado).substring(0, 60)}...
                </div>
              </td>
              <td className="prioridade-cell">
                <span className={`badge ${getPrioridadeBadge(item.prioridade)}`}>
                  {display(item.prioridade)}
                </span>
              </td>
              <td className="status-cell">
                <span className={`badge ${getStatusBadge(item.status)}`}>
                  {display(item.status)}
                </span>
              </td>
              <td className="data-cell">
                <div className="data-text">
                  {formatDate(item.data_criacao)}
                </div>
              </td>
              <td className="actions-cell">
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => onEdit(item)}
                  title="Editar"
                >
                  ✏️
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(item)}
                  title="Excluir"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .planos-table-container {
          margin-top: 1.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }
        
        .planos-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }
        
        .planos-table th {
          background: var(--primary);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.9rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .planos-table td {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          vertical-align: top;
          overflow: hidden;
        }
        
        .planos-table tbody tr:hover {
          background: #f8f9fa;
        }
        
        .numero-cell {
          width: 120px;
          font-family: monospace;
          white-space: nowrap;
        }
        
        .codigo-cell {
          width: 100px;
          text-align: center;
        }
        
        .codigo-badge {
          background: var(--accent);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
          display: inline-block;
        }
        
        .titulo-cell {
          width: 200px;
        }

        .titulo-text {
          font-weight: 600;
          color: var(--primary);
          word-wrap: break-word;
          line-height: 1.3;
          max-height: 3.9rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        
        .detalhes-cell {
          width: 350px;
        }
        
        .detalhes-truncated {
          line-height: 1.4;
          font-size: 0.85rem;
          max-height: 4.2rem;
          overflow: hidden;
        }

        .detalhes-truncated strong {
          color: var(--primary);
        }

        .prioridade-cell {
          width: 120px;
          text-align: center;
        }

        .prioridade-cell .badge {
          white-space: nowrap;
          min-width: 60px;
          text-align: center;
        }

        .status-cell {
          width: 140px;
          text-align: center;
        }

        .status-cell .badge {
          white-space: nowrap;
          min-width: 80px;
          text-align: center;
        }
        
        .data-cell {
          width: 150px;
        }

        .data-text {
          font-size: 0.85rem;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .actions-cell {
          width: 120px;
          text-align: center;
        }
        
        .actions-cell .btn {
          margin-right: 0.25rem;
        }

        @media (max-width: 768px) {
          .planos-table-container {
            overflow-x: auto;
          }
          
          .planos-table {
            min-width: 1300px;
            table-layout: auto;
          }
        }
      `}</style>
    </div>
  )
}

// Kanban View Component
function KanbanView({ planos, onEdit, onDelete, onStatusChange, getStatusBadge, getPrioridadeBadge, formatDate }) {
  const statusColumns = [
    { key: 'planejado', label: 'Planejado', color: '#6c757d' },
    { key: 'em_execucao', label: 'Em Execução', color: '#17a2b8' },
    { key: 'passou', label: 'Passou', color: '#28a745' },
    { key: 'falhou', label: 'Falhou', color: '#dc3545' },
    { key: 'bloqueado', label: 'Bloqueado', color: '#ffc107' }
  ]

  const getPlanosPorStatus = (status) => {
    return planos.filter(item => value(item.status) === status)
  }

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', value(item.sys_id))
    e.dataTransfer.setData('application/json', JSON.stringify(item))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, newStatus) => {
    e.preventDefault()
    try {
      const itemData = e.dataTransfer.getData('application/json')
      const item = JSON.parse(itemData)
      
      if (value(item.status) !== newStatus) {
        onStatusChange(item, newStatus)
      }
    } catch (error) {
      console.error('Erro ao processar drop:', error)
    }
  }

  return (
    <div className="kanban-container">
      <div className="kanban-board">
        {statusColumns.map(column => (
          <div 
            key={column.key}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.key)}
          >
            <div className="column-header" style={{ backgroundColor: column.color }}>
              <h3 className="column-title">{column.label}</h3>
              <span className="column-count">
                {getPlanosPorStatus(column.key).length}
              </span>
            </div>
            
            <div className="column-content">
              {getPlanosPorStatus(column.key).map(item => (
                <div
                  key={value(item.sys_id)}
                  className="kanban-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                >
                  <div className="card-badges">
                    <span className="badge badge-primary">
                      {display(item.numero)}
                    </span>
                    <span className="badge badge-accent">
                      {display(item.codigo)}
                    </span>
                  </div>
                  
                  <h4 className="card-title">{display(item.titulo)}</h4>
                  
                  <div className="card-description">
                    <p>{display(item.descricao).substring(0, 80)}...</p>
                  </div>

                  <div className="card-test-info">
                    {display(item.passos_teste) && (
                      <div className="test-steps">
                        <strong>Passos:</strong>
                        <p>{display(item.passos_teste).substring(0, 60)}...</p>
                      </div>
                    )}
                    {display(item.resultado_esperado) && (
                      <div className="expected-result">
                        <strong>Esperado:</strong>
                        <p>{display(item.resultado_esperado).substring(0, 60)}...</p>
                      </div>
                    )}
                  </div>

                  <div className="card-meta">
                    <span className={`badge ${getPrioridadeBadge(item.prioridade)}`}>
                      {display(item.prioridade)}
                    </span>
                    <span className="card-date">
                      📅 {formatDate(item.data_criacao).split(' ')[0]}
                    </span>
                  </div>

                  {display(item.data_execucao) && (
                    <div className="execution-date">
                      ✅ Executado: {formatDate(item.data_execucao).split(' ')[0]}
                    </div>
                  )}
                  
                  <div className="card-actions">
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => onEdit(item)}
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(item)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .kanban-container {
          margin-top: 1.5rem;
        }

        .kanban-board {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
          min-height: 600px;
        }

        .kanban-column {
          background: #f8f9fa;
          border-radius: 8px;
          overflow: hidden;
        }

        .column-header {
          padding: 1rem;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .column-title {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .column-count {
          background: rgba(255,255,255,0.2);
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
        }

        .column-content {
          padding: 1rem;
          min-height: 500px;
        }

        .kanban-card {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 0.75rem;
          box-shadow: var(--shadow-sm);
          cursor: grab;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .kanban-card:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .kanban-card:active {
          cursor: grabbing;
        }

        .card-badges {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 0.75rem;
        }

        .card-badges .badge {
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
        }

        .card-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--primary);
          margin: 0 0 0.75rem 0;
          line-height: 1.3;
        }

        .card-description {
          background: #f8f9fa;
          padding: 0.5rem;
          border-radius: 4px;
          margin-bottom: 0.75rem;
        }

        .card-description p {
          margin: 0;
          font-size: 0.8rem;
          line-height: 1.3;
          color: #666;
        }

        .card-test-info {
          font-size: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .test-steps {
          background: #e3f2fd;
          padding: 0.5rem;
          border-radius: 4px;
          margin-bottom: 0.5rem;
          border-left: 3px solid #2196f3;
        }

        .expected-result {
          background: #e8f5e8;
          padding: 0.5rem;
          border-radius: 4px;
          border-left: 3px solid #4caf50;
        }

        .test-steps strong,
        .expected-result strong {
          color: var(--primary);
          display: block;
          margin-bottom: 0.25rem;
        }

        .test-steps p,
        .expected-result p {
          margin: 0;
          line-height: 1.3;
          color: #666;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .card-meta .badge {
          font-size: 0.6rem;
          padding: 0.2rem 0.4rem;
        }

        .card-date {
          font-size: 0.7rem;
          color: #666;
        }

        .execution-date {
          background: #d4edda;
          color: #155724;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.7rem;
          margin-bottom: 0.75rem;
          font-weight: 500;
        }

        .card-actions {
          display: flex;
          gap: 0.25rem;
          justify-content: flex-end;
        }

        .card-actions .btn {
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
        }

        @media (max-width: 1400px) {
          .kanban-board {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1000px) {
          .kanban-board {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .kanban-board {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

// Form Component for Plano de Teste
function PlanoTesteForm({ item, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    codigo: item ? display(item.codigo) : '',
    titulo: item ? display(item.titulo) : '',
    descricao: item ? display(item.descricao) : '',
    pre_condicoes: item ? display(item.pre_condicoes) : '',
    passos_teste: item ? display(item.passos_teste) : '',
    resultado_esperado: item ? display(item.resultado_esperado) : '',
    prioridade: item ? value(item.prioridade) : 'media',
    status: item ? value(item.status) : 'planejado'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ width: '900px', maxHeight: '90vh' }}>
        <div className="modal-header">
          <h2 className="modal-title">
            {item ? `Editar Plano de Teste ${display(item.numero)}` : 'Novo Plano de Teste'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {item && (
              <div className="form-group">
                <label className="form-label">Número</label>
                <input
                  type="text"
                  className="form-control"
                  value={display(item.numero)}
                  disabled
                  style={{ background: '#f8f9fa', color: '#666' }}
                />
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Código *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.codigo}
                  onChange={(e) => handleChange('codigo', e.target.value)}
                  placeholder="TC-001"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Título *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.titulo}
                  onChange={(e) => handleChange('titulo', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Descrição *</label>
              <textarea
                className="form-control textarea"
                value={formData.descricao}
                onChange={(e) => handleChange('descricao', e.target.value)}
                required
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Pré-condições</label>
              <textarea
                className="form-control textarea"
                value={formData.pre_condicoes}
                onChange={(e) => handleChange('pre_condicoes', e.target.value)}
                placeholder="- Condição 1&#10;- Condição 2&#10;- Condição 3"
                rows="4"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Passos do Teste *</label>
              <textarea
                className="form-control textarea"
                value={formData.passos_teste}
                onChange={(e) => handleChange('passos_teste', e.target.value)}
                placeholder="1. Primeiro passo&#10;2. Segundo passo&#10;3. Terceiro passo"
                required
                rows="6"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Resultado Esperado *</label>
              <textarea
                className="form-control textarea"
                value={formData.resultado_esperado}
                onChange={(e) => handleChange('resultado_esperado', e.target.value)}
                placeholder="- Resultado 1&#10;- Resultado 2&#10;- Resultado 3"
                required
                rows="4"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Prioridade</label>
                <select
                  className="form-control form-select"
                  value={formData.prioridade}
                  onChange={(e) => handleChange('prioridade', e.target.value)}
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                  <option value="critica">Crítica</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-control form-select"
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <option value="planejado">Planejado</option>
                  <option value="em_execucao">Em Execução</option>
                  <option value="passou">Passou</option>
                  <option value="falhou">Falhou</option>
                  <option value="bloqueado">Bloqueado</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {item ? 'Salvar Alterações' : 'Criar Plano de Teste'}
            </button>
          </div>
        </form>
        
        <style jsx>{`
          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }

          @media (max-width: 768px) {
            .form-row {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </div>
  )
}