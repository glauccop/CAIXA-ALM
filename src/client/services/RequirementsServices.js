// Base service class for common CRUD operations
export class BaseService {
  constructor(tableName) {
    this.tableName = tableName
  }

  async list(query = '') {
    const url = `/api/now/table/${this.tableName}?sysparm_display_value=all&sysparm_limit=100${query ? '&' + query : ''}`
    const response = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "X-UserToken": window.g_ck
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${this.tableName}: ${response.statusText}`)
    }
    
    const { result } = await response.json()
    return result || []
  }

  async getById(sysId) {
    const response = await fetch(`/api/now/table/${this.tableName}/${sysId}?sysparm_display_value=all`, {
      headers: {
        "Accept": "application/json",
        "X-UserToken": window.g_ck
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch record: ${response.statusText}`)
    }
    
    const { result } = await response.json()
    return result
  }

  async create(data) {
    const response = await fetch(`/api/now/table/${this.tableName}?sysparm_display_value=all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-UserToken": window.g_ck
      },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'Failed to create record')
    }
    
    return response.json()
  }

  async update(sysId, data) {
    const response = await fetch(`/api/now/table/${this.tableName}/${sysId}?sysparm_display_value=all`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-UserToken": window.g_ck
      },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'Failed to update record')
    }
    
    return response.json()
  }

  async delete(sysId) {
    const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "X-UserToken": window.g_ck
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to delete record: ${response.statusText}`)
    }
    
    return response.ok
  }
}

// Service for Necessidades
export class NecessidadesService extends BaseService {
  constructor() {
    super('x_snc_almcaixa_necessidades')
  }
}

// Service for Requisitos
export class RequisitosService extends BaseService {
  constructor() {
    super('x_snc_almcaixa_requisitos')
  }

  async getByNecessidade(necessidadeId) {
    return this.list(`sysparm_query=necessidade_relacionada=${necessidadeId}`)
  }
}

// Service for Histórias de Usuário
export class HistoriasUsuarioService extends BaseService {
  constructor() {
    super('x_snc_almcaixa_historias_usuario')
  }

  async getByRequisito(requisitoId) {
    return this.list(`sysparm_query=requisito_relacionado=${requisitoId}`)
  }
}

// Service for Planos de Teste
export class PlanosTesteService extends BaseService {
  constructor() {
    super('x_snc_almcaixa_planos_teste')
  }

  async getByHistoria(historiaId) {
    return this.list(`sysparm_query=historia_relacionada=${historiaId}`)
  }
}