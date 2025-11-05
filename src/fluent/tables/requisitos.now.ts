import '@servicenow/sdk/global'
import { Table, StringColumn, DateTimeColumn, ReferenceColumn } from '@servicenow/sdk/core'

// Tabela de Requisitos - Gestão de requisitos funcionais e não funcionais
export const x_snc_almcaixa_requisitos = Table({
    name: 'x_snc_almcaixa_requisitos',
    label: 'Requisitos',
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
        descricao: StringColumn({
            label: 'Descrição',
            maxLength: 8000,
            mandatory: true,
        }),
        tipo: StringColumn({
            label: 'Tipo',
            maxLength: 40,
            choices: {
                funcional: { label: 'Funcional', sequence: 0 },
                nao_funcional: { label: 'Não Funcional', sequence: 1 },
            },
            default: 'funcional',
            dropdown: 'dropdown_with_none',
            mandatory: true,
        }),
        necessidade_relacionada: ReferenceColumn({
            label: 'Necessidade Relacionada',
            referenceTable: 'x_snc_almcaixa_necessidades',
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
                rascunho: { label: 'Rascunho', sequence: 0 },
                em_revisao: { label: 'Em Revisão', sequence: 1 },
                aprovado: { label: 'Aprovado', sequence: 2 },
                implementado: { label: 'Implementado', sequence: 3 },
                testado: { label: 'Testado', sequence: 4 },
                rejeitado: { label: 'Rejeitado', sequence: 5 },
            },
            default: 'rascunho',
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
        prefix: 'REQ',
        number: 1000000,
        number_of_digits: 7
    }
})