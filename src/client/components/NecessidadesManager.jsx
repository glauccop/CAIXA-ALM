import React, { useState, useEffect, useMemo } from 'react'
import { NecessidadesService } from '../services/RequirementsServices.js'
import { display, value } from '../utils/fields.js'

export default function NecessidadesManager() {
  const [necessidades, setNecessidades] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPrioridade, setFilterPrioridade] = useState('')
  const [viewMode, setViewMode] = useState('cards') // 'cards' or 'list'

  const service = useMemo(() => new NecessidadesService(), [])

  const refreshData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await service.list()
      setNecessidades(data)
    } catch (err) {
      setError('Falha ao carregar necessidades: ' + (err.message || 'Erro desconhecido'))
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
    if (!confirm('Tem certeza de que deseja excluir esta necessidade?')) return
    
    try {
      const sysId = value(item.sys_id)
      await service.delete(sysId)
      await refreshData()
    } catch (err) {
      setError('Falha ao excluir necessidade: ' + (err.message || 'Erro desconhecido'))
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
      setError('Falha ao salvar necessidade: ' + (err.message || 'Erro desconhecido'))
    } finally {
      setLoading(false)
    }
  }

  const filteredNecessidades = necessidades.filter(item => {
    const matchesSearch = display(item.titulo).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         display(item.descricao).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         display(item.numero).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !filterStatus || display(item.status) === filterStatus
    const matchesPrioridade = !filterPrioridade || display(item.prioridade) === filterPrioridade
    
    return matchesSearch && matchesStatus && matchesPrioridade
  })

  const getStatusBadge = (status) => {
    const statusMap = {
      'identificada': 'badge-secondary',
      'em_analise': 'badge-warning',
      'aprovada': 'badge-success',
      'em_desenvolvimento': 'badge-info',
      'rejeitada': 'badge-danger',
      'concluida': 'badge-success'
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

  if (loading && necessidades.length === 0) {
    return (
      <div className="content-container">
        <div className="loading">Carregando necessidades...</div>
      </div>
    )
  }

  return (
    <div className="content-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Necessidades</h1>
          <p className="page-subtitle">Cadastro e gestão de necessidades identificadas</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleCreate}>
            ➕ Nova Necessidade
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
            <h2 className="card-title">Filtros e Busca</h2>
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
            </div>
          </div>
        </div>
        
        <div className="filters-row">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por número, título ou descrição..."
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
              <option value="Identificada">Identificada</option>
              <option value="Em Análise">Em Análise</option>
              <option value="Aprovada">Aprovada</option>
              <option value="Em Desenvolvimento">Em Desenvolvimento</option>
              <option value="Rejeitada">Rejeitada</option>
              <option value="Concluída">Concluída</option>
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

      {/* Visualização em Cards - Padrão Histórias de Usuário */}
      {viewMode === 'cards' && (
        <div className="necessidades-grid">
          {filteredNecessidades.map(item => (
            <div key={value(item.sys_id)} className="necessidade-card">
              <div className="card-header">
                <div className="necessidade-badges">
                  <span className="badge badge-primary">
                    {display(item.numero)}
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
              
              <div className="necessidade-content">
                <h3 className="necessidade-titulo">{display(item.titulo)}</h3>
                
                <div className="necessidade-descricao-section">
                  <p className="necessidade-descricao">{display(item.descricao)}</p>
                </div>

                <div className="necessidade-info">
                  <p className="necessidade-data">
                    <strong>Identificada em:</strong> {formatDate(item.data_identificacao)}
                  </p>
                </div>
              </div>
              
              <div className="card-actions">
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleEdit(item)}
                >
                  ✏️ Editar
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item)}
                >
                  🗑️ Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Visualização em Lista */}
      {viewMode === 'list' && (
        <div className="necessidades-table-container">
          <table className="necessidades-table">
            <thead>
              <tr>
                <th>Número</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Data Identificação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredNecessidades.map(item => (
                <tr key={value(item.sys_id)}>
                  <td className="numero-cell">
                    <strong>{display(item.numero)}</strong>
                  </td>
                  <td className="titulo-cell">
                    {display(item.titulo)}
                  </td>
                  <td className="descricao-cell">
                    <div className="descricao-truncated">
                      {display(item.descricao)}
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
                    {formatDate(item.data_identificacao)}
                  </td>
                  <td className="actions-cell">
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleEdit(item)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item)}
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredNecessidades.length === 0 && !loading && (
        <div className="empty-state">
          <p>Nenhuma necessidade encontrada.</p>
        </div>
      )}

      {showForm && (
        <NecessidadeForm
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
        
        /* Cards View - Padrão Histórias de Usuário */
        .necessidades-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .necessidade-card {
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          padding: 1.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .necessidade-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        
        .necessidade-badges {
          display: flex;
          gap: 0.5rem;
        }

        .status-badges {
          display: flex;
          gap: 0.5rem;
        }
        
        .necessidade-titulo {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--primary);
          margin: 1rem 0;
        }
        
        .necessidade-descricao-section {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
        }

        .necessidade-descricao {
          margin: 0;
          line-height: 1.5;
          color: var(--dark);
        }

        .necessidade-info {
          margin: 1rem 0;
          padding: 0.75rem;
          background: #e3f2fd;
          border-radius: 6px;
          font-size: 0.9rem;
        }

        .necessidade-data {
          margin: 0;
          color: #666;
        }
        
        .card-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }
        
        /* Estilos para visualização em lista */
        .necessidades-table-container {
          margin-top: 1.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }
        
        .necessidades-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .necessidades-table th {
          background: var(--primary);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .necessidades-table td {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          vertical-align: top;
        }
        
        .necessidades-table tbody tr:hover {
          background: #f8f9fa;
        }
        
        .numero-cell {
          min-width: 120px;
          font-family: monospace;
        }
        
        .titulo-cell {
          min-width: 200px;
          font-weight: 600;
          color: var(--primary);
        }
        
        .descricao-cell {
          max-width: 300px;
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
        
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #666;
          font-size: 1.1rem;
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
          
          .necessidades-grid {
            grid-template-columns: 1fr;
          }
          
          .necessidades-table-container {
            overflow-x: auto;
          }
          
          .necessidades-table {
            min-width: 800px;
          }
        }
      `}</style>
    </div>
  )
}

// Form Component for Necessidade
function NecessidadeForm({ item, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    titulo: item ? display(item.titulo) : '',
    descricao: item ? display(item.descricao) : '',
    prioridade: item ? value(item.prioridade) : 'media',
    status: item ? value(item.status) : 'identificada'
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
      <div className="modal" style={{ width: '600px' }}>
        <div className="modal-header">
          <h2 className="modal-title">
            {item ? `Editar Necessidade ${display(item.numero)}` : 'Nova Necessidade'}
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
              <label className="form-label">Descrição *</label>
              <textarea
                className="form-control textarea"
                value={formData.descricao}
                onChange={(e) => handleChange('descricao', e.target.value)}
                required
                rows="5"
              />
            </div>
            
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
                <option value="identificada">Identificada</option>
                <option value="em_analise">Em Análise</option>
                <option value="aprovada">Aprovada</option>
                <option value="em_desenvolvimento">Em Desenvolvimento</option>
                <option value="rejeitada">Rejeitada</option>
                <option value="concluida">Concluída</option>
              </select>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {item ? 'Salvar Alterações' : 'Criar Necessidade'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}