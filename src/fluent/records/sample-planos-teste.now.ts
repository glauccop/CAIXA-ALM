import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Dados de exemplo para Planos de Teste
export const plano1 = Record({
    $id: Now.ID['plan-001'],
    table: 'x_snc_almcaixa_planos_teste',
    data: {
        codigo: 'TC-001',
        titulo: 'Teste de Login com Credenciais Válidas',
        descricao: 'Verificar se o sistema permite login com CPF e senha corretos',
        pre_condicoes: 'Usuário deve possuir conta ativa no sistema e conhecer suas credenciais válidas',
        passos_teste: `1. Acessar a página de login do portal
2. Inserir CPF válido no campo correspondente
3. Inserir senha correta no campo de senha
4. Clicar no botão "Entrar"
5. Aguardar redirecionamento`,
        resultado_esperado: 'Sistema deve autenticar o usuário e redirecionar para o dashboard principal, exibindo dados da conta',
        prioridade: 'alta',
        status: 'passou'
    }
})

export const plano2 = Record({
    $id: Now.ID['plan-002'],
    table: 'x_snc_almcaixa_planos_teste',
    data: {
        codigo: 'TC-002', 
        titulo: 'Teste de Login com Credenciais Inválidas',
        descricao: 'Verificar comportamento do sistema com credenciais incorretas',
        pre_condicoes: 'Usuário deve possuir conta ativa no sistema',
        passos_teste: `1. Acessar a página de login do portal
2. Inserir CPF válido no campo correspondente
3. Inserir senha INCORRETA no campo de senha
4. Clicar no botão "Entrar"
5. Repetir o processo 3 vezes consecutivas`,
        resultado_esperado: 'Sistema deve exibir mensagem de erro nas primeiras tentativas e bloquear temporariamente após 3 tentativas incorretas',
        prioridade: 'alta',
        status: 'passou'
    }
})

export const plano3 = Record({
    $id: Now.ID['plan-003'],
    table: 'x_snc_almcaixa_planos_teste',
    data: {
        codigo: 'TC-003',
        titulo: 'Teste de Consulta de Saldo',
        descricao: 'Validar exibição correta do saldo das contas do usuário',
        pre_condicoes: 'Usuário logado no sistema com pelo menos uma conta ativa',
        passos_teste: `1. Fazer login no sistema
2. Navegar até a seção "Minhas Contas"
3. Selecionar uma conta específica
4. Verificar informações exibidas
5. Comparar com saldo real da conta`,
        resultado_esperado: 'Sistema deve exibir saldo atual, formatado em reais (R$), com informações de conta corrente e poupança se aplicável',
        prioridade: 'media',
        status: 'em_execucao'
    }
})

export const plano4 = Record({
    $id: Now.ID['plan-004'],
    table: 'x_snc_almcaixa_planos_teste',
    data: {
        codigo: 'TC-004',
        titulo: 'Teste de Performance - Tempo de Resposta',
        descricao: 'Validar se o tempo de resposta está dentro dos parâmetros aceitáveis',
        pre_condicoes: 'Sistema em ambiente de produção com carga normal de usuários',
        passos_teste: `1. Configurar ferramenta de medição de tempo
2. Executar 100 consultas de saldo consecutivas
3. Registrar tempo de resposta de cada consulta
4. Calcular média e percentil 95
5. Comparar com SLA estabelecido (2 segundos)`,
        resultado_esperado: '95% das consultas devem ter tempo de resposta inferior a 2 segundos',
        prioridade: 'critica',
        status: 'planejado'
    }
})

export const plano5 = Record({
    $id: Now.ID['plan-005'],
    table: 'x_snc_almcaixa_planos_teste',
    data: {
        codigo: 'TC-005',
        titulo: 'Teste de Transferência Entre Contas',
        descricao: 'Verificar funcionalidade de transferência de valores entre contas próprias',
        pre_condicoes: 'Usuário logado com duas ou mais contas ativas e saldo suficiente para transferência',
        passos_teste: `1. Acessar seção "Transferências"
2. Selecionar conta de origem
3. Selecionar conta de destino
4. Inserir valor válido para transferência
5. Confirmar dados e executar transferência
6. Verificar comprovante gerado
7. Validar débito/crédito nas contas envolvidas`,
        resultado_esperado: 'Transferência deve ser processada com sucesso, gerando comprovante e atualizando saldos das contas envolvidas',
        prioridade: 'alta',
        status: 'falhou'
    }
})