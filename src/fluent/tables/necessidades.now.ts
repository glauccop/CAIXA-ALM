import '@servicenow/sdk/global'
import { Table, StringColumn, DateTimeColumn } from '@servicenow/sdk/core'

// Tabela de Necessidades - Cadastro e listagem de necessidades identificadas
export const x_snc_almcaixa_necessidades = Table({
    name: 'x_snc_almcaixa_necessidades',
    label: 'Necessidades',
    schema: {
        numero: StringColumn({ 
            label: 'Número',
            maxLength: 40,
            read_only: true,
            default: 'javascript:global.getNextObjNumberPadded();'
        }),
        titulo: StringColumn({
            label: 'Título',
            maxLength: 200,
            mandatory: true,
        }),
        descricao: StringColumn({
            label: 'Descrição',
            maxLength: 8000,
            mandatory: true,
        }),
        prioridade: StringColumn({
            label: 'Prioridade',
            maxLength: 40,
            choices: {
                baixa: { label: 'Baixa', sequence: 3 },
                media: { label: 'Média', sequence: 2 },
                alta: { label: 'Alta', sequence: 1 },
                critica: { label: 'Crítica', sequence: 0 },
            },
            default: 'media',
            dropdown: 'dropdown_with_none'
        }),
        status: StringColumn({
            label: 'Status',
            maxLength: 40,
            choices: {
                identificada: { label: 'Identificada', sequence: 0 },
                em_analise: { label: 'Em Análise', sequence: 1 },
                aprovada: { label: 'Aprovada', sequence: 2 },
                em_desenvolvimento: { label: 'Em Desenvolvimento', sequence: 3 },
                rejeitada: { label: 'Rejeitada', sequence: 4 },
                concluida: { label: 'Concluída', sequence: 5 },
            },
            default: 'identificada',
            dropdown: 'dropdown_with_none'
        }),
        data_identificacao: DateTimeColumn({
            label: 'Data de Identificação',
            default: 'javascript:new GlideDateTime().getDisplayValue();',
        }),
        data_atualizacao: DateTimeColumn({
            label: 'Data de Atualização',
        }),
    },
    accessible_from: 'public',
    caller_access: 'tracking',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true,
    auto_number: {
        prefix: 'NEC',
        number: 1000,
        number_of_digits: 7
    }
})