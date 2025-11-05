import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Dados de exemplo para a tabela Necessidades
Record({
    $id: Now.ID['necessidade_001'],
    table: 'x_snc_almcaixa_necessidades',
    data: {
        numero: 'NEC1000001',
        titulo: 'Portal de Autoatendimento para Clientes',
        descricao: 'Necessidade de criar um portal web onde os clientes possam acessar informações de conta, extratos e realizar operações básicas sem necessidade de atendimento presencial.',
        prioridade: 'alta',
        status: 'em_desenvolvimento',
        data_identificacao: '2024-01-15 09:00:00',
    },
})

Record({
    $id: Now.ID['necessidade_002'],
    table: 'x_snc_almcaixa_necessidades',
    data: {
        numero: 'NEC1000002',
        titulo: 'Sistema de Gestão de Riscos Integrado',
        descricao: 'Implementação de um sistema completo para identificação, análise, avaliação e monitoramento de riscos operacionais e de crédito da instituição.',
        prioridade: 'critica',
        status: 'aprovada',
        data_identificacao: '2024-01-10 14:30:00',
    },
})

Record({
    $id: Now.ID['necessidade_003'],
    table: 'x_snc_almcaixa_necessidades',
    data: {
        numero: 'NEC1000003',
        titulo: 'Modernização do Sistema de Folha de Pagamento',
        descricao: 'Atualização do sistema legado de folha de pagamento para uma solução mais moderna, com melhor performance e funcionalidades de relatórios avançados.',
        prioridade: 'media',
        status: 'em_analise',
        data_identificacao: '2024-01-20 11:15:00',
    },
})

Record({
    $id: Now.ID['necessidade_004'],
    table: 'x_snc_almcaixa_necessidades',
    data: {
        numero: 'NEC1000004',
        titulo: 'Aplicativo Mobile Banking',
        descricao: 'Desenvolvimento de aplicativo mobile nativo para iOS e Android com funcionalidades completas de mobile banking, incluindo pagamentos via PIX, transferências e investimentos.',
        prioridade: 'alta',
        status: 'identificada',
        data_identificacao: '2024-01-25 16:45:00',
    },
})