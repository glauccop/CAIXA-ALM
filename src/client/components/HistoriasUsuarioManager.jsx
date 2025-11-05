import React, { useState, useEffect, useMemo } from 'react'
import { HistoriasUsuarioService, RequisitosService } from '../services/RequirementsServices.js'
import { display, value } from '../utils/fields.js'

export default function HistoriasUsuarioManager() {
  const [historias, setHistorias] = useState([])
  const [requisitos, setRequisitos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPrioridade, setFilterPrioridade] = useState('')

  const historiaService = useMemo(() => new HistoriasUsuarioService(), [])
  const requisitoService = useMemo(() => new RequisitosService(), [])

  const refreshData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [histData, reqData] = await Promise.all([
        historiaService.list(),
        requisitoService.list()
      ])
      setHistorias(histData)
      setRequisitos(reqData)
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
    if (!confirm('Tem certeza de que deseja excluir esta história de usuário?')) return
    
    try {
      const sysId = value(item.sys_id)
      await historiaService.delete(sysId)
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
        await historiaService.update(sysId, formData)
      } else {
        await historiaService.create(formData)
      }
      setShowForm(false)
      await refreshData()
    } catch (err) {
      setError('Falha ao salvar história: ' + (err.message || 'Erro desconhecido'))
    } finally {
      setLoading(false)
    }
  }

  const filteredHistorias = historias.filter(item => {
    const searchMatch = display(item.titulo).toLowerCase().includes(searchTerm.toLowerCase()) ||
                       display(item.codigo).toLowerCase().includes(searchTerm.toLowerCase()) ||
                       display(item.persona).toLowerCase().includes(searchTerm.toLowerCase()) ||
                       display(item.acao_desejada).toLowerCase().includes(searchTerm.toLowerCase())
    const statusMatch = !filterStatus || display(item.status) === filterStatus
    const prioridadeMatch = !filterPrioridade || display(item.prioridade) === filterPrioridade
    
    return searchMatch && statusMatch && prioridadeMatch
  })

  const getStatusBadge = (status) => {
    const statusMap = {
      'nova': 'badge-secondary',
      'em_andamento': 'badge-warning',
      'em_teste': 'badge-info',
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

  if (loading && historias.length === 0) {
    return (
      <div className="content-container">
        <div className="loading">Carregando histórias de usuário...</div>
      </div>
    )
  }

  return (
    <div className="content-container">
      <div className="page-header">
        <h1 className="page-title">Histórias de Usuário</h1>
        <p className="page-subtitle">Criação no formato "Como... Eu quero... Para que..."</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>Fechar</button>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Filtros e Busca</h2>
          <button className="btn btn-primary" onClick={handleCreate}>
            ➕ Nova História
          </button>
        </div>
        
        <div className="filters-row">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por código, título, persona ou ação..."
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

      <div className="historias-grid">
        {filteredHistorias.map(item => (
          <div key={value(item.sys_id)} className="historia-card">
            <div className="card-header">
              <div className="historia-header">
                <span className="historia-codigo">{display(item.codigo)}</span>
                <div className="card-badges">
                  <span className={`badge ${getStatusBadge(item.status)}`}>
                    {display(item.status)}
                  </span>
                  <span className={`badge ${getPrioridadeBadge(item.prioridade)}`}>
                    {display(item.prioridade)}
                  </span>
                </div>
              </div>
              <h3 className="historia-titulo">{display(item.titulo)}</h3>
            </div>
            
            <div className="historia-content">
              <div className="historia-story">
                <p className="story-part">
                  <strong>Como</strong> {display(item.persona)},
                </p>
                <p className="story-part">
                  <strong>Eu quero</strong> {display(item.acao_desejada)},
                </p>
                <p className="story-part">
                  <strong>Para que</strong> {display(item.beneficio)}.
                </p>
              </div>
              
              {item.criterios_aceitacao && display(item.criterios_aceitacao) && (
                <div className="criterios-aceitacao">
                  <strong>Critérios de Aceitação:</strong>
                  <p>{display(item.criterios_aceitacao)}</p>
                </div>
              )}
              
              {item.requisito_relacionado && display(item.requisito_relacionado) && (
                <p className="historia-requisito">
                  <strong>Requisito:</strong> {display(item.requisito_relacionado)}
                </p>
              )}
              
              <p className="historia-data">
                <strong>Criada em:</strong> {new Date(display(item.data_criacao)).toLocaleDateString('pt-BR')}
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

      {filteredHistorias.length === 0 && !loading && (
        <div className="empty-state">
          <p>Nenhuma história de usuário encontrada.</p>
        </div>
      )}

      {showForm && (
        <HistoriaForm
          item={selectedItem}
          requisitos={requisitos}
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
        
        .historias-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .historia-card {
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          padding: 1.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
          border-left: 4px solid var(--accent);
        }
        
        .historia-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        
        .historia-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        
        .historia-codigo {
          background: var(--accent);
          color: var(--white);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .historia-titulo {
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
        
        .historia-content {
          margin: 1rem 0;
        }
        
        .historia-story {
          background: var(--light);
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          border-left: 3px solid var(--primary);
        }
        
        .story-part {
          margin: 0 0 0.5rem 0;
          font-style: italic;
          line-height: 1.4;
        }
        
        .story-part:last-child {
          margin-bottom: 0;
        }
        
        .criterios-aceitacao {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          border: 1px solid #e9ecef;
        }
        
        .criterios-aceitacao p {
          margin: 0.5rem 0 0 0;
          color: #666;
          font-size: 0.9rem;
          line-height: 1.4;
        }
        
        .historia-requisito {
          font-size: 0.9rem;
          color: #666;
          margin: 0 0 0.5rem 0;
        }
        
        .historia-data {
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
          
          .historias-grid {
            grid-template-columns: 1fr;
          }
          
          .historia-header {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}

// Form Component for História de Usuário
function HistoriaForm({ item, requisitos, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    codigo: item ? display(item.codigo) : '',
    titulo: item ? display(item.titulo) : '',
    persona: item ? display(item.persona) : '',
    acao_desejada: item ? display(item.acao_desejada) : '',
    beneficio: item ? display(item.beneficio) : '',
    criterios_aceitacao: item ? display(item.criterios_aceitacao) : '',
    requisito_relacionado: item ? value(item.requisito_relacionado) : '',
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
      <div className="modal" style={{ width: '800px' }}>
        <div className="modal-header">
          <h2 className="modal-title">
            {item ? 'Editar História de Usuário' : 'Nova História de Usuário'}
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
                placeholder="Ex: US-001"
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
            
            <div className="historia-structure">
              <div className="form-group">
                <label className="form-label">Como (Persona) *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.persona}
                  onChange={(e) => handleChange('persona', e.target.value)}
                  placeholder="Ex: usuário administrador"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Eu quero (Ação Desejada) *</label>
                <textarea
                  className="form-control"
                  value={formData.acao_desejada}
                  onChange={(e) => handleChange('acao_desejada', e.target.value)}
                  placeholder="Ex: cadastrar novos usuários no sistema"
                  required
                  rows="2"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Para que (Benefício) *</label>
                <textarea
                  className="form-control"
                  value={formData.beneficio}
                  onChange={(e) => handleChange('beneficio', e.target.value)}
                  placeholder="Ex: possam acessar as funcionalidades do sistema"
                  required
                  rows="2"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Critérios de Aceitação</label>
              <textarea
                className="form-control textarea"
                value={formData.criterios_aceitacao}
                onChange={(e) => handleChange('criterios_aceitacao', e.target.value)}
                placeholder="Descreva os critérios que definem quando esta história está completa..."
                rows="4"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Requisito Relacionado</label>
              <select
                className="form-control form-select"
                value={formData.requisito_relacionado}
                onChange={(e) => handleChange('requisito_relacionado', e.target.value)}
              >
                <option value="">Selecionar requisito...</option>
                {requisitos.map(req => (
                  <option key={value(req.sys_id)} value={value(req.sys_id)}>
                    {display(req.codigo)} - {display(req.titulo)}
                  </option>
                ))}
              </select>
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
        
        <style jsx>{`
          .historia-structure {
            background: var(--light);
            padding: 1.5rem;
            border-radius: 8px;
            margin: 1rem 0;
            border: 2px dashed var(--primary);
          }
          
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