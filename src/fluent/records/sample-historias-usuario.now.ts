import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Dados de exemplo para Histórias de Usuário
export const historia1 = Record({
    $id: Now.ID['hist-001'],
    table: 'x_snc_almcaixa_historias_usuario',
    data: {
        codigo: 'US-001',
        titulo: 'Login Seguro no Portal',
        persona: 'cliente correntista da CAIXA',
        acao_desejada: 'fazer login de forma segura no portal usando meu CPF e senha',
        beneficio: 'possa acessar minha conta e realizar operações bancárias online com segurança',
        criterios_aceitacao: `- Campo de CPF deve aceitar apenas números válidos
- Senha deve ter no mínimo 8 caracteres
- Após 3 tentativas incorretas, conta deve ser bloqueada por 30 minutos
- Deve haver opção de "Esqueci minha senha"
- Login bem-sucedido deve redirecionar para dashboard principal`,
        prioridade: 'alta',
        status: 'concluida'
    }
})

export const historia2 = Record({
    $id: Now.ID['hist-002'],
    table: 'x_snc_almcaixa_historias_usuario',
    data: {
        codigo: 'US-002',
        titulo: 'Visualização de Saldo',
        persona: 'cliente logado no sistema',
        acao_desejada: 'visualizar o saldo atual de todas as minhas contas',
        beneficio: 'possa acompanhar minha situação financeira de forma rápida e conveniente',
        criterios_aceitacao: `- Saldo deve ser exibido em tempo real
- Deve mostrar todas as contas vinculadas ao CPF
- Valores devem estar formatados em moeda brasileira (R$)
- Deve indicar se há valores bloqueados ou indisponíveis`,
        prioridade: 'alta',
        status: 'em_teste'
    }
})

export const historia3 = Record({
    $id: Now.ID['hist-003'],
    table: 'x_snc_almcaixa_historias_usuario',
    data: {
        codigo: 'US-003',
        titulo: 'Extrato Detalhado',
        persona: 'cliente que precisa acompanhar movimentações',
        acao_desejada: 'gerar e visualizar extrato detalhado de períodos específicos',
        beneficio: 'possa controlar melhor minhas finanças e ter comprovantes das transações',
        criterios_aceitacao: `- Permitir seleção de período (últimos 7, 30, 90 dias ou personalizado)
- Exibir data, hora, descrição e valor de cada transação
- Permitir filtrar por tipo de transação (débito, crédito, transferência)
- Opção de exportar para PDF
- Paginação para períodos com muitas transações`,
        prioridade: 'media',
        status: 'em_andamento'
    }
})

export const historia4 = Record({
    $id: Now.ID['hist-004'],
    table: 'x_snc_almcaixa_historias_usuario',
    data: {
        codigo: 'US-004',
        titulo: 'Transferência Simples',
        persona: 'cliente que precisa transferir dinheiro',
        acao_desejada: 'transferir valores para outras contas da CAIXA de forma simples',
        beneficio: 'possa enviar dinheiro rapidamente sem sair de casa',
        criterios_aceitacao: `- Permitir busca do destinatário por CPF, agência/conta ou favoritos
- Validar limites de transferência em tempo real  
- Solicitar confirmação com resumo da operação
- Gerar comprovante após transferência bem-sucedida
- Notificar por SMS/email sobre a transação`,
        prioridade: 'alta',
        status: 'nova'
    }
})

export const historia5 = Record({
    $id: Now.ID['hist-005'],
    table: 'x_snc_almcaixa_historias_usuario',
    data: {
        codigo: 'US-005', 
        titulo: 'Pagamento de Contas',
        persona: 'cliente com contas a pagar',
        acao_desejada: 'pagar boletos e contas através do portal',
        beneficio: 'possa quitar minhas obrigações sem precisar ir a uma agência ou casa lotérica',
        criterios_aceitacao: `- Permitir leitura de código de barras ou digitação manual
- Validar boleto e exibir dados (beneficiário, valor, vencimento)
- Verificar disponibilidade de saldo antes do pagamento
- Agendar pagamentos para data futura
- Histórico de pagamentos realizados`,
        prioridade: 'media',
        status: 'em_andamento'
    }
})