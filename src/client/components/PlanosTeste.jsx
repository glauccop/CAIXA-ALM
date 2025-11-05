import React, { useState, useEffect, useMemo } from 'react'
import { PlanostesteService, HistoriasUsuarioService } from '../services/RequirementsServices.js'
import { display, value } from '../utils/fields.js'

export default function PlanosTeste() {
  const [planos, setPlanos] = useState([])
  const [historias, setHistorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPrioridade, setFilterPrioridade] = useState('')

  const planoService = useMemo(() => new PlanostesteService(), [])
  const historiaService = useMemo(() => new HistoriasUsuarioService(), [])

  const refreshData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [planData, histData] = await Promise.all([
        planoService.list(),
        historiaService.list()
      ])
      setPlanos(planData)
      setHistorias(histData)
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
    if (!confirm('Tem certeza de que deseja excluir este plano de teste?')) return
    
    try {
      const sysId = value(item.sys_id)
      await planoService.delete(sysId)
      await refreshData()
    } catch (err) {
      setError('Falha ao excluir plano: ' + (err.message || 'Erro desconhecido'))
    }
  }

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true)
      if (selectedItem) {
        const sysId = value(selectedItem.sys_id)
        await planoService.update(sysId, formData)
      } else {
        await planoService.create(formData)
      }
      setShowForm(false)
      await refreshData()
    } catch (err) {
      setError('Falha ao salvar plano: ' + (err.message || 'Erro desconhecido'))
    } finally {
      setLoading(false)
    }
  }

  const filteredPlanos = planos.filter(item => {
    const searchMatch = display(item.titulo).toLowerCase().includes(searchTerm.toLowerCase()) ||
                       display(item.codigo).toLowerCase().includes(searchTerm.toLowerCase()) ||
                       display(item.descricao).toLowerCase().includes(searchTerm.toLowerCase())
    const statusMatch = !filterStatus || display(item.status) === filterStatus
    const prioridadeMatch = !filterPrioridade || display(item.prioridade) === filterPrioridade
    
    return searchMatch && statusMatch && prioridadeMatch
  })

  const getStatusBadge = (status) => {
    const statusMap = {
      'planejado': 'badge-secondary',
      'em_execucao': 'badge-warning',
      'passou': 'badge-success',
      'falhou': 'badge-danger',
      'bloqueado': 'badge-info'
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
        <h1 className="page-title">Planos de Teste</h1>
        <p className="page-subtitle">Definição de casos de teste com pré-condições, passos e resultados esperados</p>
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
            ➕ Novo Plano de Teste
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

      <div className="planos-grid">
        {filteredPlanos.map(item => (
          <div key={value(item.sys_id)} className="plano-card">
            <div className="card-header">
              <div className="plano-header">
                <span className="plano-codigo">{display(item.codigo)}</span>
                <div className="card-badges">
                  <span className={`badge ${getStatusBadge(item.status)}`}>
                    {display(item.status)}
                  </span>
                  <span className={`badge ${getPrioridadeBadge(item.prioridade)}`}>
                    {display(item.prioridade)}
                  </span>
                </div>
              </div>
              <h3 className="plano-titulo">{display(item.titulo)}</h3>
            </div>
            
            <div className="plano-content">
              <div className="plano-descricao">
                <p><strong>Descrição:</strong> {display(item.descricao)}</p>
              </div>
              
              {item.pre_condicoes && display(item.pre_condicoes) && (
                <div className="plano-section">
                  <p><strong>Pré-condições:</strong></p>
                  <p className="section-content">{display(item.pre_condicoes)}</p>
                </div>
              )}
              
              <div className="plano-section">
                <p><strong>Passos do Teste:</strong></p>
                <div className="section-content expandable">
                  {display(item.passos_teste)}
                </div>
              </div>
              
              <div className="plano-section">
                <p><strong>Resultado Esperado:</strong></p>
                <div className="section-content expected-result">
                  {display(item.resultado_esperado)}
                </div>
              </div>
              
              {item.historia_relacionada && display(item.historia_relacionada) && (
                <p className="plano-historia">
                  <strong>História Relacionada:</strong> {display(item.historia_relacionada)}
                </p>
              )}
              
              <div className="plano-dates">
                <p className="plano-data">
                  <strong>Criado em:</strong> {new Date(display(item.data_criacao)).toLocaleDateString('pt-BR')}
                </p>
                {item.data_execucao && display(item.data_execucao) && (
                  <p className="plano-data">
                    <strong>Executado em:</strong> {new Date(display(item.data_execucao)).toLocaleDateString('pt-BR')}
                  </p>
                )}
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

      {filteredPlanos.length === 0 && !loading && (
        <div className="empty-state">
          <p>Nenhum plano de teste encontrado.</p>
        </div>
      )}

      {showForm && (
        <PlanoForm
          item={selectedItem}
          historias={historias}
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
        
        .planos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .plano-card {
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          padding: 1.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
          border-left: 4px solid var(--success);
        }
        
        .plano-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        
        .plano-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        
        .plano-codigo {
          background: var(--success);
          color: var(--white);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .plano-titulo {
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
        
        .plano-content {
          margin: 1rem 0;
        }
        
        .plano-descricao {
          margin-bottom: 1rem;
        }
        
        .plano-section {
          margin: 1rem 0;
          padding: 1rem;
          background: var(--light);
          border-radius: 8px;
          border-left: 3px solid var(--info);
        }
        
        .section-content {
          margin: 0.5rem 0 0 0;
          color: #333;
          line-height: 1.5;
        }
        
        .expandable {
          max-height: 100px;
          overflow-y: auto;
          white-space: pre-wrap;
        }
        
        .expected-result {
          background: rgba(40, 167, 69, 0.1);
          padding: 0.75rem;
          border-radius: 6px;
          border: 1px solid rgba(40, 167, 69, 0.2);
        }
        
        .plano-historia {
          font-size: 0.9rem;
          color: #666;
          margin: 1rem 0 0.5rem 0;
        }
        
        .plano-dates {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }
        
        .plano-data {
          font-size: 0.85rem;
          color: #666;
          margin: 0 0 0.25rem 0;
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
          
          .planos-grid {
            grid-template-columns: 1fr;
          }
          
          .plano-header {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}

// Form Component for Plano de Teste
function PlanoForm({ item, historias, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    codigo: item ? display(item.codigo) : '',
    titulo: item ? display(item.titulo) : '',
    descricao: item ? display(item.descricao) : '',
    historia_relacionada: item ? value(item.historia_relacionada) : '',
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
            {item ? 'Editar Plano de Teste' : 'Novo Plano de Teste'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Código *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.codigo}
                  onChange={(e) => handleChange('codigo', e.target.value)}
                  placeholder="Ex: TC-001"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">História Relacionada</label>
                <select
                  className="form-control form-select"
                  value={formData.historia_relacionada}
                  onChange={(e) => handleChange('historia_relacionada', e.target.value)}
                >
                  <option value="">Selecionar história...</option>
                  {historias.map(hist => (
                    <option key={value(hist.sys_id)} value={value(hist.sys_id)}>
                      {display(hist.codigo)} - {display(hist.titulo)}
                    </option>
                  ))}
                </select>
              </div>
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
                className="form-control"
                value={formData.descricao}
                onChange={(e) => handleChange('descricao', e.target.value)}
                required
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Pré-condições</label>
              <textarea
                className="form-control"
                value={formData.pre_condicoes}
                onChange={(e) => handleChange('pre_condicoes', e.target.value)}
                placeholder="Descreva as condições necessárias antes de executar o teste..."
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Passos do Teste *</label>
              <textarea
                className="form-control textarea"
                value={formData.passos_teste}
                onChange={(e) => handleChange('passos_teste', e.target.value)}
                placeholder="1. Primeiro passo&#10;2. Segundo passo&#10;3. Terceiro passo..."
                required
                rows="6"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Resultado Esperado *</label>
              <textarea
                className="form-control"
                value={formData.resultado_esperado}
                onChange={(e) => handleChange('resultado_esperado', e.target.value)}
                placeholder="Descreva o resultado esperado após executar todos os passos..."
                required
                rows="3"
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
              {item ? 'Salvar Alterações' : 'Criar Plano'}
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