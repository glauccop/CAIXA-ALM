import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Dados de exemplo para Requisitos
export const requisito1 = Record({
    $id: Now.ID['req-001'],
    table: 'x_snc_almcaixa_requisitos',
    data: {
        codigo: 'RF-001',
        titulo: 'Autenticação de Usuários no Portal',
        descricao: 'O sistema deve permitir que os clientes se autentiquem usando CPF/CNPJ e senha, com opção de autenticação em dois fatores via SMS.',
        tipo: 'funcional',
        prioridade: 'alta',
        status: 'aprovado'
    }
})

export const requisito2 = Record({
    $id: Now.ID['req-002'],
    table: 'x_snc_almcaixa_requisitos', 
    data: {
        codigo: 'RF-002',
        titulo: 'Consulta de Saldo e Extrato',
        descricao: 'O cliente autenticado deve poder visualizar o saldo atual de suas contas e extratos dos últimos 90 dias.',
        tipo: 'funcional',
        prioridade: 'alta',
        status: 'implementado'
    }
})

export const requisito3 = Record({
    $id: Now.ID['req-003'],
    table: 'x_snc_almcaixa_requisitos',
    data: {
        codigo: 'RF-003', 
        titulo: 'Transferências entre Contas',
        descricao: 'O sistema deve permitir transferências entre contas próprias e para terceiros, com validação de limites e confirmação por token.',
        tipo: 'funcional',
        prioridade: 'alta',
        status: 'em_revisao'
    }
})

export const requisito4 = Record({
    $id: Now.ID['req-004'],
    table: 'x_snc_almcaixa_requisitos',
    data: {
        codigo: 'RNF-001',
        titulo: 'Performance do Sistema',
        descricao: 'O tempo de resposta para consultas básicas não deve exceder 2 segundos em 95% dos casos.',
        tipo: 'nao_funcional',
        prioridade: 'media',
        status: 'rascunho'
    }
})

export const requisito5 = Record({
    $id: Now.ID['req-005'],
    table: 'x_snc_almcaixa_requisitos',
    data: {
        codigo: 'RNF-002',
        titulo: 'Segurança e Criptografia',
        descricao: 'Todas as comunicações devem usar protocolo HTTPS com criptografia TLS 1.3 e dados sensíveis criptografados em repouso.',
        tipo: 'nao_funcional', 
        prioridade: 'critica',
        status: 'aprovado'
    }
})

export const requisito6 = Record({
    $id: Now.ID['req-006'],
    table: 'x_snc_almcaixa_requisitos',
    data: {
        codigo: 'RNF-003',
        titulo: 'Disponibilidade do Sistema',
        descricao: 'O sistema deve manter disponibilidade de 99.9% com janelas de manutenção programadas apenas aos domingos das 2h às 6h.',
        tipo: 'nao_funcional',
        prioridade: 'alta', 
        status: 'testado'
    }
})