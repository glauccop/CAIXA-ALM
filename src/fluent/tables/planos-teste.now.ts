import '@servicenow/sdk/global'
import { Table, StringColumn, DateTimeColumn, ReferenceColumn } from '@servicenow/sdk/core'

// Tabela de Planos de Teste - Definição de casos de teste com pré-condições, passos e resultados esperados
export const x_snc_almcaixa_planos_teste = Table({
    name: 'x_snc_almcaixa_planos_teste',
    label: 'Planos de Teste',
    schema: {
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
            maxLength: 4000,
            mandatory: true,
        }),
        historia_relacionada: ReferenceColumn({
            label: 'História Relacionada',
            referenceTable: 'x_snc_almcaixa_historias_usuario',
        }),
        pre_condicoes: StringColumn({
            label: 'Pré-condições',
            maxLength: 4000,
        }),
        passos_teste: StringColumn({
            label: 'Passos do Teste',
            maxLength: 8000,
            mandatory: true,
        }),
        resultado_esperado: StringColumn({
            label: 'Resultado Esperado',
            maxLength: 4000,
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
                planejado: { label: 'Planejado', sequence: 0 },
                em_execucao: { label: 'Em Execução', sequence: 1 },
                passou: { label: 'Passou', sequence: 2 },
                falhou: { label: 'Falhou', sequence: 3 },
                bloqueado: { label: 'Bloqueado', sequence: 4 },
            },
            default: 'planejado',
            dropdown: 'dropdown_with_none'
        }),
        data_criacao: DateTimeColumn({
            label: 'Data de Criação',
            default: 'javascript:new GlideDateTime().getDisplayValue();',
        }),
        data_execucao: DateTimeColumn({
            label: 'Data de Execução',
        }),
    },
    accessible_from: 'public',
    caller_access: 'tracking',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true,
})