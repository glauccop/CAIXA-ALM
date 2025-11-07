import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Registros de exemplo para Change Requests com numeração
Record({
    $id: Now.ID['sample_crq_001'],
    table: 'x_snc_almcaixa_change_request',
    data: {
        number: 'CRQ1000001',
        short_description: 'Adicionar campo de observações na tela de aprovação',
        description: 'Necessidade de incluir um campo de observações para que o aprovador possa registrar comentários durante o processo de aprovação dos requisitos.',
        reason_for_change: 'Solicitação dos stakeholders para melhor rastreabilidade do processo de aprovação',
        change_type: 'melhoria',
        impact_scope: 'baixo',
        impact_cost: 'Estimativa: 8 horas de desenvolvimento',
        impact_schedule: 'Impacto mínimo - pode ser implementado no próximo sprint',
        status: 'proposed',
        requested_by: 'admin',
        created_on: '2024-01-10 09:00:00',
        updated_on: '2024-01-10 09:00:00',
    },
})

Record({
    $id: Now.ID['sample_crq_002'],
    table: 'x_snc_almcaixa_change_request',
    data: {
        number: 'CRQ1000002',
        short_description: 'Corrigir validação de campos obrigatórios',
        description: 'Correção de bug na validação de campos obrigatórios que está permitindo salvar registros com campos em branco.',
        reason_for_change: 'Bug crítico identificado em produção que afeta a integridade dos dados',
        change_type: 'correcao',
        impact_scope: 'medio',
        impact_cost: 'Estimativa: 4 horas de desenvolvimento + 2 horas de teste',
        impact_schedule: 'Urgente - precisa ser corrigido na próxima release',
        status: 'approved',
        requested_by: 'admin',
        approved_by: 'admin',
        approval_date: '2024-01-15 14:30:00',
        created_on: '2024-01-12 10:15:00',
        updated_on: '2024-01-15 14:30:00',
    },
})

Record({
    $id: Now.ID['sample_crq_003'],
    table: 'x_snc_almcaixa_change_request',
    data: {
        number: 'CRQ1000003',
        short_description: 'Expandir escopo para incluir gestão de defeitos',
        description: 'Expansão do escopo do projeto para incluir um módulo de gestão de defeitos integrado ao sistema de requisitos.',
        reason_for_change: 'Necessidade identificada pelos usuários durante a fase de testes',
        change_type: 'escopo',
        impact_scope: 'alto',
        impact_cost: 'Estimativa: 40 horas de desenvolvimento + custos adicionais de infraestrutura',
        impact_schedule: 'Extensão de 2 semanas no cronograma do projeto',
        status: 'in_analysis',
        requested_by: 'admin',
        created_on: '2024-01-14 16:45:00',
        updated_on: '2024-01-14 16:45:00',
    },
})

Record({
    $id: Now.ID['sample_crq_004'],
    table: 'x_snc_almcaixa_change_request',
    data: {
        number: 'CRQ1000004',
        short_description: 'Implementar notificações por email para aprovações',
        description: 'Implementação de sistema de notificações automáticas por email quando uma change request estiver aguardando aprovação.',
        reason_for_change: 'Melhoria no processo de comunicação e redução do tempo de resposta nas aprovações',
        change_type: 'melhoria',
        impact_scope: 'medio',
        impact_cost: 'Estimativa: 12 horas de desenvolvimento + configuração de templates',
        impact_schedule: 'Implementação planejada para próximo sprint',
        status: 'pending_approval',
        requested_by: 'admin',
        created_on: '2024-01-16 11:20:00',
        updated_on: '2024-01-16 14:10:00',
    },
})

Record({
    $id: Now.ID['sample_crq_005'],
    table: 'x_snc_almcaixa_change_request',
    data: {
        number: 'CRQ1000005',
        short_description: 'Atualização urgente de segurança no sistema de login',
        description: 'Atualização crítica de segurança identificada pela equipe de TI que afeta o sistema de autenticação.',
        reason_for_change: 'Vulnerabilidade de segurança crítica identificada por auditoria externa',
        change_type: 'urgente',
        impact_scope: 'alto',
        impact_cost: 'Estimativa: 6 horas de desenvolvimento + testes extensivos de segurança',
        impact_schedule: 'Deve ser implementado imediatamente - não pode aguardar próxima release',
        status: 'implemented',
        requested_by: 'admin',
        approved_by: 'admin',
        approval_date: '2024-01-18 08:30:00',
        created_on: '2024-01-17 18:00:00',
        updated_on: '2024-01-18 15:45:00',
    },
})

Record({
    $id: Now.ID['sample_crq_006'],
    table: 'x_snc_almcaixa_change_request',
    data: {
        number: 'CRQ1000006',
        short_description: 'Adicionar relatório de métricas de qualidade',
        description: 'Solicitação para incluir novo relatório que mostre métricas de qualidade dos requisitos implementados.',
        reason_for_change: 'Necessidade de acompanhar indicadores de qualidade para melhoria contínua do processo',
        change_type: 'melhoria',
        impact_scope: 'baixo',
        impact_cost: 'Estimativa: 16 horas de desenvolvimento + criação de dashboards',
        impact_schedule: 'Baixa prioridade - pode ser incluído em release futura',
        status: 'rejected',
        requested_by: 'admin',
        approved_by: 'admin',
        approval_date: '2024-01-20 10:15:00',
        created_on: '2024-01-19 14:30:00',
        updated_on: '2024-01-20 10:15:00',
    },
})

Record({
    $id: Now.ID['sample_crq_007'],
    table: 'x_snc_almcaixa_change_request',
    data: {
        number: 'CRQ1000007',
        short_description: 'Integração com sistema externo de documentação',
        description: 'Projeto cancelado de integração com sistema de documentação externa devido a mudanças na estratégia da empresa.',
        reason_for_change: 'Integração solicitada para centralizar documentação técnica',
        change_type: 'escopo',
        impact_scope: 'alto',
        impact_cost: 'Estimativa: 80 horas de desenvolvimento + integrações complexas',
        impact_schedule: 'Projeto seria realizado em 6 semanas',
        status: 'cancelled',
        requested_by: 'admin',
        created_on: '2024-01-21 09:00:00',
        updated_on: '2024-01-22 16:30:00',
    },
})