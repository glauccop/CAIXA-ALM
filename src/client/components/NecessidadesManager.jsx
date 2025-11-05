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
                         display(item.descricao).toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="page-title">Necessidades</h1>
        <p className="page-subtitle">Cadastro e gestão de necessidades identificadas</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>Fechar</button>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Filtros e Busca </h2>
          <button className="btn btn-primary" onClick={handleCreate}>
            ➕ Nova Necessidade
          </button>
        </div>
        
        <div className="filters-row">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por título ou descrição..."
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

      <div className="necessidades-grid">
        {filteredNecessidades.map(item => (
          <div key={value(item.sys_id)} className="necessidade-card">
            <div className="card-header">
              <h3 className="necessidade-titulo">{display(item.titulo)}</h3>
              <div className="card-badges">
                <span className={`badge ${getStatusBadge(item.status)}`}>
                  {display(item.status)}
                </span>
                <span className={`badge ${getPrioridadeBadge(item.prioridade)}`}>
                  {display(item.prioridade)}
                </span>
              </div>
            </div>
            
            <div className="necessidade-content">
              <p className="necessidade-numero">
                <strong>Número:</strong> {display(item.numero)}
              </p>
              <p className="necessidade-descricao">
                {display(item.descricao)}
              </p>
              <p className="necessidade-data">
                <strong>Identificada em:</strong> {new Date(display(item.data_identificacao)).toLocaleDateString('pt-BR')}
              </p>
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
        .filters-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 1rem;
          margin-bottom: 0;
        }
        
        .necessidades-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
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
        
        .necessidade-titulo {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--primary);
          margin: 0 0 1rem 0;
        }
        
        .card-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .necessidade-content {
          margin: 1rem 0;
        }
        
        .necessidade-numero {
          font-size: 0.9rem;
          color: #666;
          margin: 0 0 0.5rem 0;
        }
        
        .necessidade-descricao {
          color: var(--dark);
          line-height: 1.5;
          margin: 0 0 1rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .necessidade-data {
          font-size: 0.85rem;
          color: #666;
          margin: 0;
        }
        
        .card-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }
        
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #666;
          font-size: 1.1rem;
        }
        
        @media (max-width: 768px) {
          .filters-row {
            grid-template-columns: 1fr;
          }
          
          .necessidades-grid {
            grid-template-columns: 1fr;
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
            {item ? 'Editar Necessidade' : 'Nova Necessidade'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
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