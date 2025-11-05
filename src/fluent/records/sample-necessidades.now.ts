import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Dados de exemplo para Necessidades
export const necessidade1 = Record({
    $id: Now.ID['nec-001'],
    table: 'x_snc_almcaixa_necessidades',
    data: {
        titulo: 'Portal de Autoatendimento para Clientes',
        descricao: 'Desenvolver um portal web onde os clientes da CAIXA possam acessar serviços bancários básicos de forma autônoma, reduzindo filas nas agências e melhorando a experiência do usuário.',
        prioridade: 'alta',
        status: 'aprovada'
    }
})

export const necessidade2 = Record({
    $id: Now.ID['nec-002'], 
    table: 'x_snc_almcaixa_necessidades',
    data: {
        titulo: 'Sistema de Gestão de Riscos Integrado',
        descricao: 'Implementar uma solução centralizada para monitoramento e análise de riscos operacionais, de crédito e de mercado em tempo real.',
        prioridade: 'critica',
        status: 'em_desenvolvimento'
    }
})

export const necessidade3 = Record({
    $id: Now.ID['nec-003'],
    table: 'x_snc_almcaixa_necessidades', 
    data: {
        titulo: 'Modernização do Sistema de Folha de Pagamento',
        descricao: 'Atualizar o sistema legado de folha de pagamento para uma solução mais moderna e eficiente, com melhor integração aos sistemas de RH.',
        prioridade: 'media',
        status: 'identificada'
    }
})

export const necessidade4 = Record({
    $id: Now.ID['nec-004'],
    table: 'x_snc_almcaixa_necessidades',
    data: {
        titulo: 'Aplicativo Mobile Banking',
        descricao: 'Desenvolver aplicativo móvel nativo para iOS e Android oferecendo funcionalidades bancárias completas aos clientes.',
        prioridade: 'alta', 
        status: 'em_analise'
    }
})