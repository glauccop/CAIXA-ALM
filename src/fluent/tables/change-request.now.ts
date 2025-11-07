import '@servicenow/sdk/global'
import { Table, StringColumn, DateTimeColumn, ReferenceColumn } from '@servicenow/sdk/core'

// Tabela de Mudanças de Requisitos - Gestão de Change Requests
export const x_snc_almcaixa_change_request = Table({
    name: 'x_snc_almcaixa_change_request',
    label: 'Change Requests',
    schema: {
        number: StringColumn({ 
            label: 'Número',
            maxLength: 40,
            read_only: true,
            default: 'javascript:global.getNextObjNumberPadded();'
        }),
        short_description: StringColumn({
            label: 'Descrição Resumida',
            maxLength: 160,
            mandatory: true,
        }),
        description: StringColumn({
            label: 'Descrição',
            maxLength: 8000,
        }),
        reason_for_change: StringColumn({
            label: 'Motivo da Mudança',
            maxLength: 4000,
        }),
        change_type: StringColumn({
            label: 'Tipo de Mudança',
            maxLength: 40,
            choices: {
                melhoria: { label: 'Melhoria', sequence: 0 },
                correcao: { label: 'Correção', sequence: 1 },
                escopo: { label: 'Escopo', sequence: 2 },
                urgente: { label: 'Urgente', sequence: 3 },
            },
            default: 'melhoria',
            dropdown: 'dropdown_with_none',
            mandatory: true,
        }),
        impact_scope: StringColumn({
            label: 'Impacto no Escopo',
            maxLength: 40,
            choices: {
                baixo: { label: 'Baixo', sequence: 2 },
                medio: { label: 'Médio', sequence: 1 },
                alto: { label: 'Alto', sequence: 0 },
            },
            default: 'medio',
            dropdown: 'dropdown_with_none'
        }),
        impact_cost: StringColumn({
            label: 'Impacto no Custo',
            maxLength: 500,
        }),
        impact_schedule: StringColumn({
            label: 'Impacto no Cronograma',
            maxLength: 500,
        }),
        status: StringColumn({
            label: 'Status',
            maxLength: 40,
            choices: {
                proposed: { label: 'Proposto', sequence: 0 },
                in_analysis: { label: 'Em Análise', sequence: 1 },
                pending_approval: { label: 'Aguardando Aprovação', sequence: 2 },
                approved: { label: 'Aprovado', sequence: 3 },
                rejected: { label: 'Rejeitado', sequence: 4 },
                implemented: { label: 'Implementado', sequence: 5 },
                cancelled: { label: 'Cancelado', sequence: 6 },
            },
            default: 'proposed',
            dropdown: 'dropdown_with_none',
            mandatory: true,
        }),
        requested_by: ReferenceColumn({
            label: 'Solicitado por',
            referenceTable: 'sys_user',
        }),
        approved_by: ReferenceColumn({
            label: 'Aprovado por',
            referenceTable: 'sys_user',
        }),
        approval_date: DateTimeColumn({
            label: 'Data de Aprovação',
        }),
        related_need: ReferenceColumn({
            label: 'Necessidade Relacionada',
            referenceTable: 'x_snc_almcaixa_necessidades',
        }),
        related_requirement: ReferenceColumn({
            label: 'Requisito Relacionado',
            referenceTable: 'x_snc_almcaixa_requisitos',
        }),
        related_story: ReferenceColumn({
            label: 'História Relacionada',
            referenceTable: 'x_snc_almcaixa_historias_usuario',
        }),
        related_test: ReferenceColumn({
            label: 'Teste Relacionado',
            referenceTable: 'x_snc_almcaixa_planos_teste',
        }),
        created_on: DateTimeColumn({
            label: 'Data de Criação',
            default: 'javascript:new GlideDateTime().getDisplayValue();',
        }),
        updated_on: DateTimeColumn({
            label: 'Data de Atualização',
        }),
    },
    accessible_from: 'public',
    caller_access: 'tracking',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true,
    auto_number: {
        prefix: 'CRQ',
        number: 1000000,
        number_of_digits: 7
    }
})