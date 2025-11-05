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
  const [activeTab, setActiveTab] = useState('funcional')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPrioridade, setFilterPrioridade] = useState('')
  const [viewMode, setViewMode] = useState('cards') // 'cards' or 'list'

  const requisitosService = useMemo(() => new RequisitosService(), [])
  const necessidadesService = useMemo(() => new NecessidadesService(), [])

  const refreshData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [reqData, necData] = await Promise.all([
        requisitosService.list(),
        necessidadesService.list()
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
      await requisitosService.delete(sysId)
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
        await requisitosService.update(sysId, formData)
      } else {
        await requisitosService.create(formData)
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
    const matchesType = display(item.tipo) === (activeTab === 'funcional' ? 'Funcional' : 'Não Funcional')
    const matchesSearch = display(item.titulo).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         display(item.descricao).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         display(item.codigo).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         display(item.numero).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !filterStatus || display(item.status) === filterStatus
    const matchesPrioridade = !filterPrioridade || display(item.prioridade) === filterPrioridade
    
    return matchesType && matchesSearch && matchesStatus && matchesPrioridade
  })

  const getStatusBadge = (status) => {
    const statusMap = {
      'rascunho': 'badge-secondary',
      'em_revisao': 'badge-warning',
      'aprovado': 'badge-success',
      'implementado': 'badge-info',
      'testado': 'badge-primary',
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

  const getTipoBadge = (tipo) => {
    return value(tipo) === 'funcional' ? 'badge-primary' : 'badge-accent'
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

  const getNecessidadeTitulo = (necessidadeRef) => {
    if (!necessidadeRef) return 'N/A'
    const necId = value(necessidadeRef)
    const necessidade = necessidades.find(nec => value(nec.sys_id) === necId)
    return necessidade ? `${display(necessidade.numero)} - ${display(necessidade.titulo)}` : 'N/A'
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
        <div className="page-title-section">
          <h1 className="page-title">Requisitos</h1>
          <p className="page-subtitle">Gestão de requisitos funcionais e não funcionais</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleCreate}>
            ➕ Novo Requisito
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>Fechar</button>
        </div>
      )}

      {/* Tabs para Funcional e Não Funcional */}
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'funcional' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('funcional')}
          >
            🔧 Funcionais
          </button>
          <button 
            className={`tab ${activeTab === 'nao_funcional' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('nao_funcional')}
          >
            ⚙️ Não Funcionais
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="filters-section">
            <h2 className="card-title">
              Requisitos {activeTab === 'funcional' ? 'Funcionais' : 'Não Funcionais'}
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
            </div>
          </div>
        </div>
        
        <div className="filters-row">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por número, código, título ou descrição..."
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
        <div className="requisitos-grid">
          {filteredRequisitos.map(item => (
            <div key={value(item.sys_id)} className="requisito-card">
              <div className="card-header">
                <div className="requisito-badges">
                  <span className="badge badge-primary">
                    {display(item.numero)}
                  </span>
                  <span className="badge badge-accent">
                    {display(item.codigo)}
                  </span>
                </div>
                <div className="status-badges">
                  <span className={`badge ${getTipoBadge(item.tipo)}`}>
                    {display(item.tipo)}
                  </span>
                  <span className={`badge ${getStatusBadge(item.status)}`}>
                    {display(item.status)}
                  </span>
                  <span className={`badge ${getPrioridadeBadge(item.prioridade)}`}>
                    {display(item.prioridade)}
                  </span>
                </div>
              </div>
              
              <div className="requisito-content">
                <h3 className="requisito-titulo">{display(item.titulo)}</h3>
                
                <div className="requisito-descricao-section">
                  <p className="requisito-descricao">{display(item.descricao)}</p>
                </div>

                <div className="requisito-info">
                  <p className="requisito-necessidade">
                    <strong>Necessidade Relacionada:</strong><br />
                    {getNecessidadeTitulo(item.necessidade_relacionada)}
                  </p>
                  <p className="requisito-data">
                    <strong>Criado em:</strong> {formatDate(item.data_criacao)}
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
        <div className="requisitos-table-container">
          <table className="requisitos-table">
            <thead>
              <tr>
                <th>Número</th>
                <th>Código</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Necessidade</th>
                <th>Data Criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequisitos.map(item => (
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
                  <td className="descricao-cell">
                    <div className="descricao-truncated">
                      {display(item.descricao)}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getTipoBadge(item.tipo)}`}>
                      {display(item.tipo)}
                    </span>
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
                  <td className="necessidade-cell">
                    <div className="necessidade-truncated">
                      {getNecessidadeTitulo(item.necessidade_relacionada)}
                    </div>
                  </td>
                  <td className="data-cell">
                    {formatDate(item.data_criacao)}
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

      {filteredRequisitos.length === 0 && !loading && (
        <div className="empty-state">
          <p>Nenhum requisito {activeTab === 'funcional' ? 'funcional' : 'não funcional'} encontrado.</p>
        </div>
      )}

      {showForm && (
        <RequisitoForm
          item={selectedItem}
          necessidades={necessidades}
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
        
        .tabs-container {
          margin-bottom: 1.5rem;
        }
        
        .tabs {
          display: flex;
          border-bottom: 2px solid #e9ecef;
        }
        
        .tab {
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          color: #666;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
        }
        
        .tab:hover {
          color: var(--primary);
          background: #f8f9fa;
        }
        
        .tab-active {
          color: var(--primary);
          border-bottom-color: var(--primary);
          background: #f8f9fa;
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
        
        .requisito-badges {
          display: flex;
          gap: 0.5rem;
        }

        .status-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .requisito-titulo {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--primary);
          margin: 1rem 0;
        }
        
        .requisito-descricao-section {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
        }

        .requisito-descricao {
          margin: 0;
          line-height: 1.5;
          color: var(--dark);
        }

        .requisito-info {
          margin: 1rem 0;
          padding: 0.75rem;
          background: #e3f2fd;
          border-radius: 6px;
          font-size: 0.9rem;
        }

        .requisito-necessidade {
          margin: 0 0 0.5rem 0;
          color: #666;
          line-height: 1.4;
        }

        .requisito-data {
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
        .requisitos-table-container {
          margin-top: 1.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }
        
        .requisitos-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .requisitos-table th {
          background: var(--primary);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .requisitos-table td {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          vertical-align: top;
        }
        
        .requisitos-table tbody tr:hover {
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
        
        .descricao-cell {
          max-width: 250px;
        }
        
        .descricao-truncated,
        .necessidade-truncated {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
        }
        
        .necessidade-cell {
          max-width: 150px;
          font-size: 0.85rem;
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
          
          .requisitos-grid {
            grid-template-columns: 1fr;
          }
          
          .requisitos-table-container {
            overflow-x: auto;
          }
          
          .requisitos-table {
            min-width: 1000px;
          }
        }
      `}</style>
    </div>
  )
}

// Form Component for Requisito
function RequisitoForm({ item, necessidades, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    codigo: item ? display(item.codigo) : '',
    titulo: item ? display(item.titulo) : '',
    descricao: item ? display(item.descricao) : '',
    tipo: item ? value(item.tipo) : 'funcional',
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
            {item ? `Editar Requisito ${display(item.numero)}` : 'Novo Requisito'}
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
                  placeholder="Ex: RF-001, RNF-001"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Tipo</label>
                <select
                  className="form-control form-select"
                  value={formData.tipo}
                  onChange={(e) => handleChange('tipo', e.target.value)}
                >
                  <option value="funcional">Funcional</option>
                  <option value="nao_funcional">Não Funcional</option>
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
                className="form-control textarea"
                value={formData.descricao}
                onChange={(e) => handleChange('descricao', e.target.value)}
                required
                rows="5"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Necessidade Relacionada</label>
              <select
                className="form-control form-select"
                value={formData.necessidade_relacionada}
                onChange={(e) => handleChange('necessidade_relacionada', e.target.value)}
              >
                <option value="">Selecione uma necessidade</option>
                {necessidades.map(nec => (
                  <option key={value(nec.sys_id)} value={value(nec.sys_id)}>
                    {display(nec.numero)} - {display(nec.titulo)}
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
                  <option value="rascunho">Rascunho</option>
                  <option value="em_revisao">Em Revisão</option>
                  <option value="aprovado">Aprovado</option>
                  <option value="implementado">Implementado</option>
                  <option value="testado">Testado</option>
                  <option value="rejeitado">Rejeitado</option>
                </select>
              </div>
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
        
        <style jsx>{`
          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
        `}</style>
      </div>
    </div>
  )
}