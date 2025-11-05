import React, { useState, useEffect, useMemo } from 'react'
import { RequisitosService, NecessidadesService } from '../services/RequirementsServices.js'
import { display, value } from '../utils/fields.js'

export default function RequisitosManager() {
  const [requisitos, setRequisitos] = useState([])
  const [necessidades, setNecessidades] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('funcionais')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const requisitoService = useMemo(() => new RequisitosService(), [])
  const necessidadeService = useMemo(() => new NecessidadesService(), [])

  const refreshData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [reqData, necData] = await Promise.all([
        requisitoService.list(),
        necessidadeService.list()
      ])
      setRequisitos(reqData)
      setNecessidades(necData)
    } catch (err) {
      setError('Falha ao carregar dados: ' + (err.message || 'Erro desconhecido'))
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
    if (!confirm('Tem certeza de que deseja excluir este requisito?')) return
    
    try {
      const sysId = value(item.sys_id)
      await requisitoService.delete(sysId)
      await refreshData()
    } catch (err) {
      setError('Falha ao excluir requisito: ' + (err.message || 'Erro desconhecido'))
    }
  }

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true)
      if (selectedItem) {
        const sysId = value(selectedItem.sys_id)
        await requisitoService.update(sysId, formData)
      } else {
        await requisitoService.create(formData)
      }
      setShowForm(false)
      await refreshData()
    } catch (err) {
      setError('Falha ao salvar requisito: ' + (err.message || 'Erro desconhecido'))
    } finally {
      setLoading(false)
    }
  }

  const filteredRequisitos = requisitos.filter(item => {
    const tipoMatch = activeTab === 'funcionais' ? value(item.tipo) === 'funcional' : value(item.tipo) === 'nao_funcional'
    const searchMatch = display(item.titulo).toLowerCase().includes(searchTerm.toLowerCase()) ||
                       display(item.codigo).toLowerCase().includes(searchTerm.toLowerCase()) ||
                       display(item.descricao).toLowerCase().includes(searchTerm.toLowerCase())
    const statusMatch = !filterStatus || display(item.status) === filterStatus
    
    return tipoMatch && searchMatch && statusMatch
  })

  const getStatusBadge = (status) => {
    const statusMap = {
      'rascunho': 'badge-secondary',
      'em_revisao': 'badge-warning',
      'aprovado': 'badge-success',
      'implementado': 'badge-info',
      'testado': 'badge-success',
      'rejeitado': 'badge-danger'
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

  if (loading && requisitos.length === 0) {
    return (
      <div className="content-container">
        <div className="loading">Carregando requisitos...</div>
      </div>
    )
  }

  return (
    <div className="content-container">
      <div className="page-header">
        <h1 className="page-title">Requisitos</h1>
        <p className="page-subtitle">Gestão de requisitos funcionais e não funcionais</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>Fechar</button>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <div className="tab-navigation">
            <button
              className={`tab-btn ${activeTab === 'funcionais' ? 'active' : ''}`}
              onClick={() => setActiveTab('funcionais')}
            >
              📋 Funcionais
            </button>
            <button
              className={`tab-btn ${activeTab === 'nao_funcionais' ? 'active' : ''}`}
              onClick={() => setActiveTab('nao_funcionais')}
            >
              ⚙️ Não Funcionais
            </button>
          </div>
          <button className="btn btn-primary" onClick={handleCreate}>
            ➕ Novo Requisito
          </button>
        </div>
        
        <div className="filters-row">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por código, título ou descrição..."
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
              <option value="Rascunho">Rascunho</option>
              <option value="Em Revisão">Em Revisão</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Implementado">Implementado</option>
              <option value="Testado">Testado</option>
              <option value="Rejeitado">Rejeitado</option>
            </select>
          </div>
        </div>
      </div>

      <div className="requisitos-grid">
        {filteredRequisitos.map(item => (
          <div key={value(item.sys_id)} className="requisito-card">
            <div className="card-header">
              <div className="requisito-header">
                <span className="requisito-codigo">{display(item.codigo)}</span>
                <div className="card-badges">
                  <span className={`badge ${getStatusBadge(item.status)}`}>
                    {display(item.status)}
                  </span>
                  <span className={`badge ${getPrioridadeBadge(item.prioridade)}`}>
                    {display(item.prioridade)}
                  </span>
                </div>
              </div>
              <h3 className="requisito-titulo">{display(item.titulo)}</h3>
            </div>
            
            <div className="requisito-content">
              <p className="requisito-descricao">{display(item.descricao)}</p>
              
              {item.necessidade_relacionada && display(item.necessidade_relacionada) && (
                <p className="requisito-necessidade">
                  <strong>Necessidade:</strong> {display(item.necessidade_relacionada)}
                </p>
              )}
              
              <p className="requisito-data">
                <strong>Criado em:</strong> {new Date(display(item.data_criacao)).toLocaleDateString('pt-BR')}
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

      {filteredRequisitos.length === 0 && !loading && (
        <div className="empty-state">
          <p>Nenhum requisito {activeTab === 'funcionais' ? 'funcional' : 'não funcional'} encontrado.</p>
        </div>
      )}

      {showForm && (
        <RequisitoForm
          item={selectedItem}
          necessidades={necessidades}
          defaultTipo={activeTab === 'funcionais' ? 'funcional' : 'nao_funcional'}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <style jsx>{`
        .tab-navigation {
          display: flex;
          gap: 0.5rem;
        }
        
        .tab-btn {
          background: var(--light);
          border: 1px solid #ddd;
          color: var(--dark);
          padding: 0.5rem 1rem;
          border-radius: 6px 6px 0 0;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .tab-btn.active {
          background: var(--primary);
          color: var(--white);
          border-color: var(--primary);
        }
        
        .filters-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1rem;
          margin-bottom: 0;
        }
        
        .requisitos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .requisito-card {
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          padding: 1.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .requisito-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        
        .requisito-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        
        .requisito-codigo {
          background: var(--accent);
          color: var(--white);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .requisito-titulo {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--primary);
          margin: 0.5rem 0 1rem 0;
        }
        
        .card-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .requisito-content {
          margin: 1rem 0;
        }
        
        .requisito-descricao {
          color: var(--dark);
          line-height: 1.5;
          margin: 0 0 1rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .requisito-necessidade {
          font-size: 0.9rem;
          color: #666;
          margin: 0 0 0.5rem 0;
        }
        
        .requisito-data {
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
          
          .requisitos-grid {
            grid-template-columns: 1fr;
          }
          
          .requisito-header {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}

// Form Component for Requisito
function RequisitoForm({ item, necessidades, defaultTipo, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    codigo: item ? display(item.codigo) : '',
    titulo: item ? display(item.titulo) : '',
    descricao: item ? display(item.descricao) : '',
    tipo: item ? value(item.tipo) : defaultTipo,
    necessidade_relacionada: item ? value(item.necessidade_relacionada) : '',
    prioridade: item ? value(item.prioridade) : 'media',
    status: item ? value(item.status) : 'rascunho'
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
      <div className="modal" style={{ width: '700px' }}>
        <div className="modal-header">
          <h2 className="modal-title">
            {item ? 'Editar Requisito' : 'Novo Requisito'}
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
                placeholder="Ex: RF-001, RNF-001"
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
              <label className="form-label">Descrição *</label>
              <textarea
                className="form-control textarea"
                value={formData.descricao}
                onChange={(e) => handleChange('descricao', e.target.value)}
                required
                rows="4"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Tipo *</label>
              <select
                className="form-control form-select"
                value={formData.tipo}
                onChange={(e) => handleChange('tipo', e.target.value)}
                required
              >
                <option value="funcional">Funcional</option>
                <option value="nao_funcional">Não Funcional</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Necessidade Relacionada</label>
              <select
                className="form-control form-select"
                value={formData.necessidade_relacionada}
                onChange={(e) => handleChange('necessidade_relacionada', e.target.value)}
              >
                <option value="">Selecionar necessidade...</option>
                {necessidades.map(nec => (
                  <option key={value(nec.sys_id)} value={value(nec.sys_id)}>
                    {display(nec.numero)} - {display(nec.titulo)}
                  </option>
                ))}
              </select>
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
                <option value="rascunho">Rascunho</option>
                <option value="em_revisao">Em Revisão</option>
                <option value="aprovado">Aprovado</option>
                <option value="implementado">Implementado</option>
                <option value="testado">Testado</option>
                <option value="rejeitado">Rejeitado</option>
              </select>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {item ? 'Salvar Alterações' : 'Criar Requisito'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}