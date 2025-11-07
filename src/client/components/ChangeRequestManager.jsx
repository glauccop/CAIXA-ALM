import React, { useState, useEffect } from 'react'

export default function ChangeRequestManager() {
  const [changeRequests, setChangeRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingCR, setEditingCR] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterImpact, setFilterImpact] = useState('')
  const [viewMode, setViewMode] = useState('cards') // 'cards', 'list', 'kanban'

  // Form state
  const [formData, setFormData] = useState({
    short_description: '',
    description: '',
    reason_for_change: '',
    change_type: 'melhoria',
    impact_scope: 'medio',
    impact_cost: '',
    impact_schedule: '',
    related_need: '',
    related_requirement: '',
    related_story: '',
    related_test: ''
  })

  useEffect(() => {
    loadChangeRequests()
  }, [])

  const loadChangeRequests = async () => {
    try {
      setLoading(true)
      setError(null)
      let query = '/api/now/table/x_snc_almcaixa_change_request?sysparm_display_value=all&sysparm_limit=100&sysparm_order_by=sys_created_on'
      
      const response = await fetch(query, {
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck || ""
        }
      })

      if (response.ok) {
        const data = await response.json()
        setChangeRequests(data.result || [])
      } else {
        throw new Error('Falha ao carregar change requests')
      }
    } catch (err) {
      setError('Falha ao carregar change requests: ' + (err.message || 'Erro desconhecido'))
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingCR(null)
    resetForm()
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const method = editingCR ? 'PUT' : 'POST'
      const url = editingCR 
        ? `/api/now/table/x_snc_almcaixa_change_request/${editingCR.sys_id}`
        : '/api/now/table/x_snc_almcaixa_change_request'

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck || ""
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setShowForm(false)
        setEditingCR(null)
        resetForm()
        await loadChangeRequests()
      } else {
        throw new Error('Falha ao salvar change request')
      }
    } catch (err) {
      setError('Falha ao salvar change request: ' + (err.message || 'Erro desconhecido'))
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      short_description: '',
      description: '',
      reason_for_change: '',
      change_type: 'melhoria',
      impact_scope: 'medio',
      impact_cost: '',
      impact_schedule: '',
      related_need: '',
      related_requirement: '',
      related_story: '',
      related_test: ''
    })
  }

  const handleEdit = (cr) => {
    setEditingCR(cr)
    setFormData({
      short_description: cr.short_description?.value || '',
      description: cr.description?.value || '',
      reason_for_change: cr.reason_for_change?.value || '',
      change_type: cr.change_type?.value || 'melhoria',
      impact_scope: cr.impact_scope?.value || 'medio',
      impact_cost: cr.impact_cost?.value || '',
      impact_schedule: cr.impact_schedule?.value || '',
      related_need: cr.related_need?.value || '',
      related_requirement: cr.related_requirement?.value || '',
      related_story: cr.related_story?.value || '',
      related_test: cr.related_test?.value || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (cr) => {
    if (!confirm('Tem certeza de que deseja excluir esta change request?')) return
    
    try {
      const response = await fetch(`/api/now/table/x_snc_almcaixa_change_request/${cr.sys_id}`, {
        method: 'DELETE',
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck || ""
        }
      })

      if (response.ok) {
        await loadChangeRequests()
      } else {
        throw new Error('Falha ao excluir change request')
      }
    } catch (err) {
      setError('Falha ao excluir change request: ' + (err.message || 'Erro desconhecido'))
    }
  }

  const handleStatusChange = async (cr, newStatus) => {
    try {
      const response = await fetch(`/api/now/table/x_snc_almcaixa_change_request/${cr.sys_id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck || ""
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        await loadChangeRequests()
      } else {
        throw new Error('Falha ao atualizar status')
      }
    } catch (err) {
      setError('Falha ao atualizar status: ' + (err.message || 'Erro desconhecido'))
    }
  }

  const filteredChangeRequests = changeRequests.filter(cr => {
    const matchesSearch = (cr.short_description?.display_value || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (cr.description?.display_value || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (cr.number?.display_value || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !filterStatus || cr.status?.display_value === filterStatus
    const matchesType = !filterType || cr.change_type?.display_value === filterType
    const matchesImpact = !filterImpact || cr.impact_scope?.display_value === filterImpact
    
    return matchesSearch && matchesStatus && matchesType && matchesImpact
  })

  const getStatusBadge = (status) => {
    const statusColors = {
      proposed: 'badge-secondary',
      in_analysis: 'badge-info',
      pending_approval: 'badge-warning',
      approved: 'badge-success',
      rejected: 'badge-danger',
      implemented: 'badge-primary',
      cancelled: 'badge-secondary'
    }
    return statusColors[status] || 'badge-secondary'
  }

  const getTypeBadge = (type) => {
    const typeColors = {
      melhoria: 'badge-info',
      correcao: 'badge-warning',
      escopo: 'badge-primary',
      urgente: 'badge-danger'
    }
    return typeColors[type] || 'badge-secondary'
  }

  const getImpactBadge = (impact) => {
    const impactColors = {
      baixo: 'badge-success',
      medio: 'badge-warning',
      alto: 'badge-danger'
    }
    return impactColors[impact] || 'badge-secondary'
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    try {
      return new Date(dateStr).toLocaleDateString('pt-BR', {
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

  if (loading && changeRequests.length === 0) {
    return (
      <div className="content-container">
        <div className="loading">Carregando change requests...</div>
      </div>
    )
  }

  return (
    <div className="content-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Change Requests</h1>
          <p className="page-subtitle">Gestão de mudanças de requisitos e artefatos do projeto</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleCreate}>
            ➕ Nova Change Request
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
              Change Requests ({filteredChangeRequests.length})
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
              placeholder="Buscar por número, descrição..."
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
              <option value="Proposto">Proposto</option>
              <option value="Em Análise">Em Análise</option>
              <option value="Aguardando Aprovação">Aguardando Aprovação</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Rejeitado">Rejeitado</option>
              <option value="Implementado">Implementado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          
          <div className="form-group">
            <select
              className="form-control form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Todos os Tipos</option>
              <option value="Melhoria">Melhoria</option>
              <option value="Correção">Correção</option>
              <option value="Escopo">Escopo</option>
              <option value="Urgente">Urgente</option>
            </select>
          </div>
          
          <div className="form-group">
            <select
              className="form-control form-select"
              value={filterImpact}
              onChange={(e) => setFilterImpact(e.target.value)}
            >
              <option value="">Todos os Impactos</option>
              <option value="Baixo">Baixo</option>
              <option value="Médio">Médio</option>
              <option value="Alto">Alto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Visualização em Cards */}
      {viewMode === 'cards' && (
        <CardsView
          changeRequests={filteredChangeRequests}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getStatusBadge={getStatusBadge}
          getTypeBadge={getTypeBadge}
          getImpactBadge={getImpactBadge}
          formatDate={formatDate}
        />
      )}

      {/* Visualização em Lista */}
      {viewMode === 'list' && (
        <ListaView
          changeRequests={filteredChangeRequests}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getStatusBadge={getStatusBadge}
          getTypeBadge={getTypeBadge}
          getImpactBadge={getImpactBadge}
          formatDate={formatDate}
        />
      )}

      {/* Visualização em Kanban */}
      {viewMode === 'kanban' && (
        <KanbanView
          changeRequests={filteredChangeRequests}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          getStatusBadge={getStatusBadge}
          getTypeBadge={getTypeBadge}
          getImpactBadge={getImpactBadge}
          formatDate={formatDate}
        />
      )}

      {filteredChangeRequests.length === 0 && !loading && (
        <div className="empty-state">
          <p>Nenhuma change request encontrada.</p>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <ChangeRequestForm
          cr={editingCR}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false)
            setEditingCR(null)
            resetForm()
          }}
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
          grid-template-columns: 2fr 1fr 1fr 1fr;
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
function CardsView({ changeRequests, onEdit, onDelete, getStatusBadge, getTypeBadge, getImpactBadge, formatDate }) {
  return (
    <div className="change-requests-grid">
      {changeRequests.map(cr => (
        <div key={cr.sys_id} className="change-request-card">
          <div className="card-header">
            <div className="cr-badges">
              <span className="badge badge-primary">
                {cr.number?.display_value}
              </span>
            </div>
            <div className="status-badges">
              <span className={`badge ${getTypeBadge(cr.change_type?.value)}`}>
                {cr.change_type?.display_value}
              </span>
              <span className={`badge ${getStatusBadge(cr.status?.value)}`}>
                {cr.status?.display_value}
              </span>
              <span className={`badge ${getImpactBadge(cr.impact_scope?.value)}`}>
                Impacto: {cr.impact_scope?.display_value}
              </span>
            </div>
          </div>
          
          <div className="cr-content">
            <h3 className="cr-titulo">{cr.short_description?.display_value}</h3>
            
            {cr.description?.display_value && (
              <div className="cr-descricao-section">
                <p className="cr-descricao">{cr.description?.display_value}</p>
              </div>
            )}

            {cr.reason_for_change?.display_value && (
              <div className="cr-motivo-section">
                <p><strong>Motivo da Mudança:</strong></p>
                <p className="cr-motivo">{cr.reason_for_change?.display_value}</p>
              </div>
            )}

            <div className="cr-impacts">
              {cr.impact_cost?.display_value && (
                <p><strong>Impacto no Custo:</strong> {cr.impact_cost?.display_value}</p>
              )}
              {cr.impact_schedule?.display_value && (
                <p><strong>Impacto no Cronograma:</strong> {cr.impact_schedule?.display_value}</p>
              )}
            </div>

            <div className="cr-info">
              <p className="cr-solicitante">
                <strong>Solicitado por:</strong> {cr.requested_by?.display_value || 'N/A'}
              </p>
              <p className="cr-data">
                <strong>Criado em:</strong> {formatDate(cr.created_on?.value)}
              </p>
              {cr.approval_date?.display_value && (
                <p className="cr-aprovacao">
                  <strong>Aprovado em:</strong> {formatDate(cr.approval_date?.value)}
                  {cr.approved_by?.display_value && ` por ${cr.approved_by?.display_value}`}
                </p>
              )}
            </div>
          </div>
          
          <div className="card-actions">
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => onEdit(cr)}
            >
              ✏️ Editar
            </button>
            <button 
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(cr)}
            >
              🗑️ Excluir
            </button>
          </div>
        </div>
      ))}

      <style jsx>{`
        .change-requests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .change-request-card {
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          padding: 1.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .change-request-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        
        .cr-badges {
          display: flex;
          gap: 0.5rem;
        }

        .status-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .cr-titulo {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--primary);
          margin: 1rem 0;
        }
        
        .cr-descricao-section {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
        }

        .cr-descricao {
          margin: 0;
          line-height: 1.5;
          color: var(--dark);
        }

        .cr-motivo-section {
          background: #fff3cd;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
          border-left: 4px solid #ffc107;
        }

        .cr-motivo {
          margin: 0.5rem 0 0 0;
          line-height: 1.4;
          color: var(--dark);
        }

        .cr-impacts {
          background: #d1ecf1;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
          border-left: 4px solid #17a2b8;
        }

        .cr-impacts p {
          margin: 0.25rem 0;
          font-size: 0.9rem;
          color: var(--dark);
        }

        .cr-info {
          margin: 1rem 0;
          padding: 0.75rem;
          background: #e3f2fd;
          border-radius: 6px;
          font-size: 0.9rem;
        }

        .cr-solicitante,
        .cr-data,
        .cr-aprovacao {
          margin: 0 0 0.5rem 0;
          color: #666;
          line-height: 1.4;
        }

        .cr-aprovacao {
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
          .change-requests-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

// Lista View Component
function ListaView({ changeRequests, onEdit, onDelete, getStatusBadge, getTypeBadge, getImpactBadge, formatDate }) {
  return (
    <div className="change-requests-table-container">
      <table className="change-requests-table">
        <thead>
          <tr>
            <th>Número</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Impacto</th>
            <th>Solicitado por</th>
            <th>Data Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {changeRequests.map(cr => (
            <tr key={cr.sys_id}>
              <td className="numero-cell">
                <strong>{cr.number?.display_value}</strong>
              </td>
              <td className="descricao-cell">
                <div className="descricao-truncated">
                  {cr.short_description?.display_value}
                </div>
              </td>
              <td>
                <span className={`badge ${getTypeBadge(cr.change_type?.value)}`}>
                  {cr.change_type?.display_value}
                </span>
              </td>
              <td>
                <span className={`badge ${getStatusBadge(cr.status?.value)}`}>
                  {cr.status?.display_value}
                </span>
              </td>
              <td>
                <span className={`badge ${getImpactBadge(cr.impact_scope?.value)}`}>
                  {cr.impact_scope?.display_value}
                </span>
              </td>
              <td>{cr.requested_by?.display_value || 'N/A'}</td>
              <td className="data-cell">
                {formatDate(cr.created_on?.value)}
              </td>
              <td className="actions-cell">
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => onEdit(cr)}
                  title="Editar"
                >
                  ✏️
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(cr)}
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
        .change-requests-table-container {
          margin-top: 1.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }
        
        .change-requests-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .change-requests-table th {
          background: var(--primary);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .change-requests-table td {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          vertical-align: top;
        }
        
        .change-requests-table tbody tr:hover {
          background: #f8f9fa;
        }
        
        .numero-cell {
          min-width: 120px;
          font-family: monospace;
        }
        
        .descricao-cell {
          max-width: 250px;
        }
        
        .descricao-truncated {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
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
          .change-requests-table-container {
            overflow-x: auto;
          }
          
          .change-requests-table {
            min-width: 1000px;
          }
        }
      `}</style>
    </div>
  )
}

// Kanban View Component
function KanbanView({ changeRequests, onEdit, onDelete, onStatusChange, getStatusBadge, getTypeBadge, getImpactBadge, formatDate }) {
  const statusColumns = [
    { key: 'proposed', label: 'Proposto', color: '#6c757d' },
    { key: 'in_analysis', label: 'Em Análise', color: '#17a2b8' },
    { key: 'pending_approval', label: 'Aguardando Aprovação', color: '#ffc107' },
    { key: 'approved', label: 'Aprovado', color: '#28a745' },
    { key: 'implemented', label: 'Implementado', color: '#007bff' },
    { key: 'rejected', label: 'Rejeitado', color: '#dc3545' },
    { key: 'cancelled', label: 'Cancelado', color: '#6f42c1' }
  ]

  const getCRsPorStatus = (status) => {
    return changeRequests.filter(cr => cr.status?.value === status)
  }

  const handleDragStart = (e, cr) => {
    e.dataTransfer.setData('text/plain', cr.sys_id)
    e.dataTransfer.setData('application/json', JSON.stringify(cr))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, newStatus) => {
    e.preventDefault()
    try {
      const crData = e.dataTransfer.getData('application/json')
      const cr = JSON.parse(crData)
      
      if (cr.status?.value !== newStatus) {
        onStatusChange(cr, newStatus)
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
                {getCRsPorStatus(column.key).length}
              </span>
            </div>
            
            <div className="column-content">
              {getCRsPorStatus(column.key).map(cr => (
                <div
                  key={cr.sys_id}
                  className="kanban-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, cr)}
                >
                  <div className="card-badges">
                    <span className="badge badge-primary">
                      {cr.number?.display_value}
                    </span>
                  </div>
                  
                  <h4 className="card-title">{cr.short_description?.display_value}</h4>
                  
                  <div className="card-meta">
                    <span className={`badge ${getTypeBadge(cr.change_type?.value)}`}>
                      {cr.change_type?.display_value}
                    </span>
                    <span className={`badge ${getImpactBadge(cr.impact_scope?.value)}`}>
                      {cr.impact_scope?.display_value}
                    </span>
                  </div>

                  {cr.reason_for_change?.display_value && (
                    <div className="card-reason">
                      <strong>Motivo:</strong>
                      <p>{cr.reason_for_change?.display_value.substring(0, 80)}...</p>
                    </div>
                  )}

                  <div className="card-info">
                    <span className="card-requester">
                      👤 {cr.requested_by?.display_value || 'N/A'}
                    </span>
                    <span className="card-date">
                      📅 {formatDate(cr.created_on?.value).split(' ')[0]}
                    </span>
                  </div>
                  
                  <div className="card-actions">
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => onEdit(cr)}
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(cr)}
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
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

        .card-meta {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }

        .card-meta .badge {
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
        }

        .card-reason {
          background: #fff3cd;
          padding: 0.5rem;
          border-radius: 4px;
          margin-bottom: 0.75rem;
          border-left: 3px solid #ffc107;
        }

        .card-reason strong {
          font-size: 0.75rem;
          color: var(--primary);
        }

        .card-reason p {
          margin: 0.25rem 0 0 0;
          font-size: 0.7rem;
          line-height: 1.3;
          color: #666;
        }

        .card-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          font-size: 0.7rem;
          color: #666;
        }

        .card-requester,
        .card-date {
          display: flex;
          align-items: center;
          gap: 0.25rem;
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
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 1200px) {
          .kanban-board {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 900px) {
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

// Form Component for Change Request
function ChangeRequestForm({ cr, formData, setFormData, onSubmit, onCancel }) {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ width: '800px' }}>
        <div className="modal-header">
          <h2 className="modal-title">
            {cr ? `Editar Change Request ${cr.number?.display_value}` : 'Nova Change Request'}
          </h2>
        </div>
        
        <form onSubmit={onSubmit}>
          <div className="modal-body">
            {cr && (
              <div className="form-group">
                <label className="form-label">Número</label>
                <input
                  type="text"
                  className="form-control"
                  value={cr.number?.display_value || ''}
                  disabled
                  style={{ background: '#f8f9fa', color: '#666' }}
                />
              </div>
            )}
            
            <fieldset>
              <legend>Dados Gerais</legend>
              <div className="form-group">
                <label className="form-label">Descrição Resumida *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.short_description}
                  onChange={(e) => handleChange('short_description', e.target.value)}
                  required
                  maxLength="160"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Tipo de Mudança *</label>
                  <select
                    className="form-control form-select"
                    value={formData.change_type}
                    onChange={(e) => handleChange('change_type', e.target.value)}
                    required
                  >
                    <option value="melhoria">Melhoria</option>
                    <option value="correcao">Correção</option>
                    <option value="escopo">Escopo</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Impacto no Escopo</label>
                  <select
                    className="form-control form-select"
                    value={formData.impact_scope}
                    onChange={(e) => handleChange('impact_scope', e.target.value)}
                  >
                    <option value="baixo">Baixo</option>
                    <option value="medio">Médio</option>
                    <option value="alto">Alto</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Descrição</label>
                <textarea
                  className="form-control textarea"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows="4"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Motivo da Mudança</label>
                <textarea
                  className="form-control textarea"
                  value={formData.reason_for_change}
                  onChange={(e) => handleChange('reason_for_change', e.target.value)}
                  rows="3"
                />
              </div>
            </fieldset>

            <fieldset>
              <legend>Análise de Impactos</legend>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Impacto no Custo</label>
                  <textarea
                    className="form-control textarea"
                    value={formData.impact_cost}
                    onChange={(e) => handleChange('impact_cost', e.target.value)}
                    rows="2"
                    placeholder="Ex: Estimativa de 8 horas de desenvolvimento"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Impacto no Cronograma</label>
                  <textarea
                    className="form-control textarea"
                    value={formData.impact_schedule}
                    onChange={(e) => handleChange('impact_schedule', e.target.value)}
                    rows="2"
                    placeholder="Ex: Extensão de 1 semana no prazo"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Artefatos Relacionados</legend>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Necessidade Relacionada</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.related_need}
                    onChange={(e) => handleChange('related_need', e.target.value)}
                    placeholder="Sys ID da necessidade"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Requisito Relacionado</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.related_requirement}
                    onChange={(e) => handleChange('related_requirement', e.target.value)}
                    placeholder="Sys ID do requisito"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">História Relacionada</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.related_story}
                    onChange={(e) => handleChange('related_story', e.target.value)}
                    placeholder="Sys ID da história"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Teste Relacionado</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.related_test}
                    onChange={(e) => handleChange('related_test', e.target.value)}
                    placeholder="Sys ID do teste"
                  />
                </div>
              </div>
            </fieldset>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {cr ? 'Salvar Alterações' : 'Criar Change Request'}
            </button>
          </div>
        </form>
        
        <style jsx>{`
          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
          
          fieldset {
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          
          legend {
            font-weight: 600;
            font-size: 0.9rem;
            padding: 0 0.5rem;
            color: var(--primary);
          }
        `}</style>
      </div>
    </div>
  )
}