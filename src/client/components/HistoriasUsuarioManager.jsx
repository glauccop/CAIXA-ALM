import React, { useState, useEffect, useMemo } from 'react'
import { HistoriasUsuarioService } from '../services/RequirementsServices.js'
import { display, value } from '../utils/fields.js'

export default function HistoriasUsuarioManager() {
  const [historias, setHistorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPrioridade, setFilterPrioridade] = useState('')
  const [viewMode, setViewMode] = useState('cards') // 'cards', 'lista', 'kanban'

  const service = useMemo(() => new HistoriasUsuarioService(), [])

  const refreshData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await service.list()
      setHistorias(data)
    } catch (err) {
      setError('Falha ao carregar histórias: ' + (err.message || 'Erro desconhecido'))
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
    if (!confirm('Tem certeza de que deseja excluir esta história de usuário?')) return
    
    try {
      const sysId = value(item.sys_id)
      await service.delete(sysId)
      await refreshData()
    } catch (err) {
      setError('Falha ao excluir história: ' + (err.message || 'Erro desconhecido'))
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
      setError('Falha ao salvar história: ' + (err.message || 'Erro desconhecido'))
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

  const filteredHistorias = historias.filter(item => {
    const matchesSearch = display(item.titulo).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         display(item.codigo).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         display(item.numero).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         display(item.persona).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !filterStatus || display(item.status) === filterStatus
    const matchesPrioridade = !filterPrioridade || display(item.prioridade) === filterPrioridade
    
    return matchesSearch && matchesStatus && matchesPrioridade
  })

  const getStatusBadge = (status) => {
    const statusMap = {
      'nova': 'badge-secondary',
      'em_andamento': 'badge-info',
      'em_teste': 'badge-warning',
      'concluida': 'badge-success',
      'cancelada': 'badge-danger'
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

  if (loading && historias.length === 0) {
    return (
      <div className="content-container">
        <div className="loading">Carregando histórias de usuário...</div>
      </div>
    )
  }

  return (
    <div className="content-container">
      <div className="page-header-wrapper">
        <div className="page-title-section">
          <h1 className="page-title">Histórias de Usuário</h1>
          <p className="page-subtitle">Criação no formato "As a... I want... So that..."</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleCreate}>
            ➕ Nova História
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
        <div className="filters-header">
          <h2 className="card-title">Filtros e Visualização</h2>
          <div className="view-toggles">
            <button 
              className={`btn ${viewMode === 'cards' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('cards')}
            >
              📊 Cards
            </button>
            <button 
              className={`btn ${viewMode === 'lista' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('lista')}
            >
              📋 Lista
            </button>
            <button 
              className={`btn ${viewMode === 'kanban' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('kanban')}
            >
              🗂️ Kanban
            </button>
          </div>
        </div>
        
        <div className="filters-row">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por título, código, número ou persona..."
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
              <option value="Nova">Nova</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Em Teste">Em Teste</option>
              <option value="Concluída">Concluída</option>
              <option value="Cancelada">Cancelada</option>
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

      {viewMode === 'cards' && (
        <CardsView
          historias={filteredHistorias}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getStatusBadge={getStatusBadge}
          getPrioridadeBadge={getPrioridadeBadge}
        />
      )}

      {viewMode === 'lista' && (
        <ListaView
          historias={filteredHistorias}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getStatusBadge={getStatusBadge}
          getPrioridadeBadge={getPrioridadeBadge}
          formatDate={formatDate}
        />
      )}

      {viewMode === 'kanban' && (
        <KanbanView
          historias={filteredHistorias}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          getStatusBadge={getStatusBadge}
          getPrioridadeBadge={getPrioridadeBadge}
        />
      )}

      {filteredHistorias.length === 0 && !loading && (
        <div className="empty-state">
          <p>Nenhuma história de usuário encontrada.</p>
        </div>
      )}

      {showForm && (
        <HistoriaForm
          item={selectedItem}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <style jsx>{`
        .page-header-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          gap: 2rem;
        }

        .page-title-section {
          flex: 1;
        }

        .page-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .filters-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
        }

        .view-toggles {
          display: flex;
          gap: 0.5rem;
        }

        .view-toggles .btn {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
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

        @media (max-width: 768px) {
          .page-header-wrapper {
            flex-direction: column;
            align-items: stretch;
          }

          .page-actions {
            justify-content: stretch;
          }

          .page-actions .btn {
            flex: 1;
          }

          .filters-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .filters-row {
            grid-template-columns: 1fr;
          }

          .view-toggles {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

// Cards View Component
function CardsView({ historias, onEdit, onDelete, getStatusBadge, getPrioridadeBadge }) {
  return (
    <div className="historias-grid">
      {historias.map(item => (
        <div key={value(item.sys_id)} className="historia-card">
          <div className="card-header">
            <div className="historia-badges">
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
          
          <div className="historia-content">
            <h3 className="historia-titulo">{display(item.titulo)}</h3>
            
            <div className="historia-story">
              <p><strong>Como</strong> {display(item.persona)}</p>
              <p><strong>Eu quero</strong> {display(item.acao_desejada)}</p>
              <p><strong>Para que</strong> {display(item.beneficio)}</p>
            </div>

            {display(item.criterios_aceitacao) && (
              <div className="criterios-preview">
                <strong>Critérios de Aceitação:</strong>
                <p>{display(item.criterios_aceitacao).substring(0, 100)}...</p>
              </div>
            )}

            <p className="historia-data">
              <strong>Criada em:</strong> {new Date(display(item.data_criacao)).toLocaleDateString('pt-BR')}
            </p>
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
        .historias-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .historia-card {
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          padding: 1.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .historia-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        
        .historia-badges {
          display: flex;
          gap: 0.5rem;
        }

        .status-badges {
          display: flex;
          gap: 0.5rem;
        }
        
        .historia-titulo {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--primary);
          margin: 1rem 0;
        }
        
        .historia-story {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
        }

        .historia-story p {
          margin: 0.5rem 0;
          line-height: 1.4;
        }

        .criterios-preview {
          margin: 1rem 0;
          padding: 0.75rem;
          background: #e3f2fd;
          border-radius: 6px;
          font-size: 0.9rem;
        }

        .criterios-preview p {
          margin: 0.5rem 0 0 0;
          color: #666;
        }
        
        .historia-data {
          font-size: 0.85rem;
          color: #666;
          margin: 1rem 0 0 0;
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
          .historias-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

// Lista View Component - APLICANDO O PADRÃO DA PÁGINA DE REQUISITOS
function ListaView({ historias, onEdit, onDelete, getStatusBadge, getPrioridadeBadge, formatDate }) {
  return (
    <div className="historias-table-container">
      <table className="historias-table">
        <thead>
          <tr>
            <th>Número</th>
            <th>Código</th>
            <th>Título</th>
            <th>História</th>
            <th>Prioridade</th>
            <th>Status</th>
            <th>Data Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {historias.map(item => (
            <tr key={value(item.sys_id)}>
              <td className="numero-cell">
                <strong>{display(item.numero)}</strong>
              </td>
              <td className="codigo-cell">
                <span className="codigo-badge">{display(item.codigo)}</span>
              </td>
              <td className="titulo-cell">
                {display(item.titulo)}
              </td>
              <td className="historia-cell">
                <div className="historia-truncated">
                  <strong>Como:</strong> {display(item.persona)}
                  <br />
                  <strong>Quero:</strong> {display(item.acao_desejada).substring(0, 50)}...
                  <br />
                  <strong>Para:</strong> {display(item.beneficio).substring(0, 50)}...
                </div>
              </td>
              <td>
                <span className={`badge ${getPrioridadeBadge(item.prioridade)}`}>
                  {display(item.prioridade)}
                </span>
              </td>
              <td>
                <span className={`badge ${getStatusBadge(item.status)}`}>
                  {display(item.status)}
                </span>
              </td>
              <td className="data-cell">
                {formatDate(item.data_criacao)}
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
        /* Estilos para visualização em lista - APLICANDO O PADRÃO DE REQUISITOS */
        .historias-table-container {
          margin-top: 1.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }
        
        .historias-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .historias-table th {
          background: var(--primary);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .historias-table td {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          vertical-align: top;
        }
        
        .historias-table tbody tr:hover {
          background: #f8f9fa;
        }
        
        .numero-cell {
          min-width: 120px;
          font-family: monospace;
        }
        
        .codigo-cell {
          min-width: 80px;
        }
        
        .codigo-badge {
          background: var(--accent);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        
        .titulo-cell {
          min-width: 200px;
          font-weight: 600;
          color: var(--primary);
        }
        
        .historia-cell {
          max-width: 300px;
        }
        
        .historia-truncated {
          line-height: 1.4;
          font-size: 0.85rem;
        }

        .historia-truncated strong {
          color: var(--primary);
        }
        
        .data-cell {
          min-width: 130px;
          font-size: 0.85rem;
          color: #666;
        }
        
        .actions-cell {
          min-width: 100px;
        }
        
        .actions-cell .btn {
          margin-right: 0.25rem;
        }

        @media (max-width: 768px) {
          .historias-table-container {
            overflow-x: auto;
          }
          
          .historias-table {
            min-width: 1000px;
          }
        }
      `}</style>
    </div>
  )
}

// Kanban View Component
function KanbanView({ historias, onEdit, onDelete, onStatusChange, getStatusBadge, getPrioridadeBadge }) {
  const statusColumns = [
    { key: 'nova', label: 'Nova', color: '#6c757d' },
    { key: 'em_andamento', label: 'Em Andamento', color: '#17a2b8' },
    { key: 'em_teste', label: 'Em Teste', color: '#ffc107' },
    { key: 'concluida', label: 'Concluída', color: '#28a745' },
    { key: 'cancelada', label: 'Cancelada', color: '#dc3545' }
  ]

  const getHistoriasPorStatus = (status) => {
    return historias.filter(item => value(item.status) === status)
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
                {getHistoriasPorStatus(column.key).length}
              </span>
            </div>
            
            <div className="column-content">
              {getHistoriasPorStatus(column.key).map(item => (
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
                  
                  <div className="card-story">
                    <p><strong>Como:</strong> {display(item.persona)}</p>
                    <p><strong>Quero:</strong> {display(item.acao_desejada).substring(0, 60)}...</p>
                  </div>

                  <div className="card-meta">
                    <span className={`badge ${getPrioridadeBadge(item.prioridade)}`}>
                      {display(item.prioridade)}
                    </span>
                    <span className="card-date">
                      {new Date(display(item.data_criacao)).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  
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

        .card-story {
          font-size: 0.8rem;
          margin-bottom: 0.75rem;
        }

        .card-story p {
          margin: 0.25rem 0;
          line-height: 1.3;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .card-date {
          font-size: 0.7rem;
          color: #666;
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

        @media (max-width: 1200px) {
          .kanban-board {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .kanban-board {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

// Form Component for Historia de Usuario
function HistoriaForm({ item, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    codigo: item ? display(item.codigo) : '',
    titulo: item ? display(item.titulo) : '',
    persona: item ? display(item.persona) : '',
    acao_desejada: item ? display(item.acao_desejada) : '',
    beneficio: item ? display(item.beneficio) : '',
    criterios_aceitacao: item ? display(item.criterios_aceitacao) : '',
    prioridade: item ? value(item.prioridade) : 'media',
    status: item ? value(item.status) : 'nova'
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
      <div className="modal" style={{ width: '800px', maxHeight: '90vh' }}>
        <div className="modal-header">
          <h2 className="modal-title">
            {item ? `Editar História ${display(item.numero)}` : 'Nova História de Usuário'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Código *</label>
              <input
                type="text"
                className="form-control"
                value={formData.codigo}
                onChange={(e) => handleChange('codigo', e.target.value)}
                placeholder="US-001"
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
            
            <div className="form-group">
              <label className="form-label">Persona (Como...) *</label>
              <input
                type="text"
                className="form-control"
                value={formData.persona}
                onChange={(e) => handleChange('persona', e.target.value)}
                placeholder="cliente da CAIXA"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Ação Desejada (Eu quero...) *</label>
              <textarea
                className="form-control textarea"
                value={formData.acao_desejada}
                onChange={(e) => handleChange('acao_desejada', e.target.value)}
                placeholder="fazer login de forma segura no sistema"
                required
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Benefício (Para que...) *</label>
              <textarea
                className="form-control textarea"
                value={formData.beneficio}
                onChange={(e) => handleChange('beneficio', e.target.value)}
                placeholder="eu possa acessar meus dados com segurança"
                required
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Critérios de Aceitação</label>
              <textarea
                className="form-control textarea"
                value={formData.criterios_aceitacao}
                onChange={(e) => handleChange('criterios_aceitacao', e.target.value)}
                placeholder="DADO que... QUANDO... ENTÃO..."
                rows="6"
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
                  <option value="nova">Nova</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="em_teste">Em Teste</option>
                  <option value="concluida">Concluída</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {item ? 'Salvar Alterações' : 'Criar História'}
            </button>
          </div>
        </form>
      </div>

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
  )
}