import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Dados de exemplo para a tabela Requisitos
Record({
    $id: Now.ID['requisito_001'],
    table: 'x_snc_almcaixa_requisitos',
    data: {
        numero: 'REQ1000001',
        codigo: 'RF-001',
        titulo: 'Autenticação de Usuários',
        descricao: 'O sistema deve permitir que usuários se autentiquem utilizando CPF/CNPJ e senha, com validação em duas etapas opcional para maior segurança.',
        tipo: 'funcional',
        necessidade_relacionada: Now.ID['necessidade_001'],
        prioridade: 'alta',
        status: 'aprovado',
        data_criacao: '2024-01-16 10:00:00',
    },
})

Record({
    $id: Now.ID['requisito_002'],
    table: 'x_snc_almcaixa_requisitos',
    data: {
        numero: 'REQ1000002',
        codigo: 'RF-002',
        titulo: 'Consulta de Saldo e Extrato',
        descricao: 'O sistema deve permitir que clientes consultem saldo atual e extratos detalhados de suas contas, com filtros por período e tipo de transação.',
        tipo: 'funcional',
        necessidade_relacionada: Now.ID['necessidade_001'],
        prioridade: 'alta',
        status: 'implementado',
        data_criacao: '2024-01-16 11:30:00',
    },
})

Record({
    $id: Now.ID['requisito_003'],
    table: 'x_snc_almcaixa_requisitos',
    data: {
        numero: 'REQ1000003',
        codigo: 'RF-003',
        titulo: 'Transferências Entre Contas',
        descricao: 'O sistema deve permitir transferências entre contas do mesmo titular e para terceiros, com validação de limites e confirmação por token.',
        tipo: 'funcional',
        necessidade_relacionada: Now.ID['necessidade_004'],
        prioridade: 'critica',
        status: 'em_revisao',
        data_criacao: '2024-01-17 09:15:00',
    },
})

Record({
    $id: Now.ID['requisito_004'],
    table: 'x_snc_almcaixa_requisitos',
    data: {
        numero: 'REQ1000004',
        codigo: 'RNF-001',
        titulo: 'Performance do Sistema',
        descricao: 'O sistema deve responder a consultas em no máximo 2 segundos em 95% dos casos, com tempo de resposta médio inferior a 1 segundo.',
        tipo: 'nao_funcional',
        necessidade_relacionada: Now.ID['necessidade_001'],
        prioridade: 'alta',
        status: 'testado',
        data_criacao: '2024-01-18 14:00:00',
    },
})

Record({
    $id: Now.ID['requisito_005'],
    table: 'x_snc_almcaixa_requisitos',
    data: {
        numero: 'REQ1000005',
        codigo: 'RNF-002',
        titulo: 'Segurança e Criptografia',
        descricao: 'Todas as comunicações devem utilizar protocolo HTTPS com certificados SSL/TLS. Dados sensíveis devem ser criptografados usando AES-256.',
        tipo: 'nao_funcional',
        necessidade_relacionada: Now.ID['necessidade_002'],
        prioridade: 'critica',
        status: 'aprovado',
        data_criacao: '2024-01-19 08:30:00',
    },
})

Record({
    $id: Now.ID['requisito_006'],
    table: 'x_snc_almcaixa_requisitos',
    data: {
        numero: 'REQ1000006',
        codigo: 'RNF-003',
        titulo: 'Disponibilidade do Sistema',
        descricao: 'O sistema deve manter 99.9% de disponibilidade mensal, com janelas de manutenção programadas apenas em horários de baixo movimento.',
        tipo: 'nao_funcional',
        necessidade_relacionada: Now.ID['necessidade_001'],
        prioridade: 'alta',
        status: 'rascunho',
        data_criacao: '2024-01-20 16:45:00',
    },
})