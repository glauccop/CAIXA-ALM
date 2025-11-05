import '@servicenow/sdk/global'
import { Table, StringColumn, DateTimeColumn, ReferenceColumn } from '@servicenow/sdk/core'

// Tabela de Histórias de Usuário - Criação no formato "As a... I want... So that..."
export const x_snc_almcaixa_historias_usuario = Table({
    name: 'x_snc_almcaixa_historias_usuario',
    label: 'Histórias de Usuário',
    schema: {
        numero: StringColumn({ 
            label: 'Número',
            maxLength: 40,
            read_only: true,
            default: 'javascript:global.getNextObjNumberPadded();'
        }),
        codigo: StringColumn({
            label: 'Código',
            maxLength: 50,
            mandatory: true,
        }),
        titulo: StringColumn({
            label: 'Título',
            maxLength: 200,
            mandatory: true,
        }),
        persona: StringColumn({
            label: 'Persona (Como...)',
            maxLength: 200,
            mandatory: true,
        }),
        acao_desejada: StringColumn({
            label: 'Ação Desejada (Eu quero...)',
            maxLength: 500,
            mandatory: true,
        }),
        beneficio: StringColumn({
            label: 'Benefício (Para que...)',
            maxLength: 500,
            mandatory: true,
        }),
        criterios_aceitacao: StringColumn({
            label: 'Critérios de Aceitação',
            maxLength: 8000,
        }),
        requisito_relacionado: ReferenceColumn({
            label: 'Requisito Relacionado',
            referenceTable: 'x_snc_almcaixa_requisitos',
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
                nova: { label: 'Nova', sequence: 0 },
                em_andamento: { label: 'Em Andamento', sequence: 1 },
                em_teste: { label: 'Em Teste', sequence: 2 },
                concluida: { label: 'Concluída', sequence: 3 },
                cancelada: { label: 'Cancelada', sequence: 4 },
            },
            default: 'nova',
            dropdown: 'dropdown_with_none'
        }),
        data_criacao: DateTimeColumn({
            label: 'Data de Criação',
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
        prefix: 'STY',
        number: 1000000,
        number_of_digits: 7
    }
})