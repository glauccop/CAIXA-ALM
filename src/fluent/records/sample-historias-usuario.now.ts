import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['historia_usuario_001'],
    table: 'x_snc_almcaixa_historias_usuario',
    data: {
        numero: 'STY1000001',
        codigo: 'US-001',
        titulo: 'Login Seguro no Portal',
        persona: 'cliente da CAIXA',
        acao_desejada: 'fazer login de forma segura no portal',
        beneficio: 'eu possa acessar meus dados bancários com confiança',
        criterios_aceitacao: `DADO que sou um cliente cadastrado
QUANDO acesso a página de login
E informo minhas credenciais válidas
ENTÃO devo ser autenticado com sucesso
E ser direcionado para o dashboard principal

DADO que informo credenciais inválidas
QUANDO tento fazer login
ENTÃO devo ver uma mensagem de erro clara
E o sistema deve bloquear após 3 tentativas`,
        prioridade: 'critica',
        status: 'em_andamento',
        data_criacao: '2024-01-15 09:00:00',
    },
})

Record({
    $id: Now.ID['historia_usuario_002'],
    table: 'x_snc_almcaixa_historias_usuario',
    data: {
        numero: 'STY1000002',
        codigo: 'US-002',
        titulo: 'Visualização de Saldo',
        persona: 'correntista',
        acao_desejada: 'visualizar meu saldo atual de forma rápida',
        beneficio: 'eu possa controlar minhas finanças pessoais',
        criterios_aceitacao: `DADO que estou autenticado no sistema
QUANDO acesso o dashboard
ENTÃO devo ver meu saldo atual atualizado
E as informações devem estar em tempo real
E o saldo deve ser exibido com formatação monetária brasileira`,
        prioridade: 'alta',
        status: 'em_teste',
        data_criacao: '2024-01-16 10:30:00',
    },
})

Record({
    $id: Now.ID['historia_usuario_003'],
    table: 'x_snc_almcaixa_historias_usuario',
    data: {
        numero: 'STY1000003',
        codigo: 'US-003',
        titulo: 'Extrato Detalhado',
        persona: 'cliente pessoa física',
        acao_desejada: 'consultar meu extrato detalhado com filtros',
        beneficio: 'eu possa analisar meus gastos por período e categoria',
        criterios_aceitacao: `DADO que acesso a funcionalidade de extrato
QUANDO seleciono um período específico
ENTÃO devo ver todas as transações do período
E poder filtrar por tipo de transação
E exportar os dados em PDF ou Excel`,
        prioridade: 'media',
        status: 'nova',
        data_criacao: '2024-01-17 14:15:00',
    },
})

Record({
    $id: Now.ID['historia_usuario_004'],
    table: 'x_snc_almcaixa_historias_usuario',
    data: {
        numero: 'STY1000004',
        codigo: 'US-004',
        titulo: 'Transferência Simples',
        persona: 'usuário do internet banking',
        acao_desejada: 'realizar transferências entre contas de forma intuitiva',
        beneficio: 'eu possa movimentar meu dinheiro sem complicações',
        criterios_aceitacao: `DADO que quero fazer uma transferência
QUANDO acesso a funcionalidade
E seleciono conta de origem e destino
E informo o valor
ENTÃO o sistema deve validar os dados
E solicitar confirmação com token
E processar a transferência com sucesso`,
        prioridade: 'alta',
        status: 'concluida',
        data_criacao: '2024-01-18 11:20:00',
    },
})

Record({
    $id: Now.ID['historia_usuario_005'],
    table: 'x_snc_almcaixa_historias_usuario',
    data: {
        numero: 'STY1000005',
        codigo: 'US-005',
        titulo: 'Pagamento de Contas',
        persona: 'cliente que paga contas online',
        acao_desejada: 'pagar minhas contas através do portal',
        beneficio: 'eu economize tempo e não precise ir até uma agência',
        criterios_aceitacao: `DADO que tenho contas para pagar
QUANDO acesso a opção de pagamentos
E leio o código de barras ou digito os dados
ENTÃO o sistema deve identificar a conta
E calcular juros se houver atraso
E processar o pagamento na data selecionada`,
        prioridade: 'media',
        status: 'cancelada',
        data_criacao: '2024-01-19 16:45:00',
    },
})