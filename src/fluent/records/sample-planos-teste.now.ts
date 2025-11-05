import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['plano_teste_001'],
    table: 'x_snc_almcaixa_planos_teste',
    data: {
        numero: 'TES1000001',
        codigo: 'TC-001',
        titulo: 'Teste de Login com Credenciais Válidas',
        descricao: 'Validar o processo de autenticação do usuário com credenciais corretas',
        pre_condicoes: `- Sistema disponível e acessível
- Usuário cadastrado no sistema
- Credenciais válidas disponíveis (CPF e senha)`,
        passos_teste: `1. Acessar a página de login do sistema
2. Inserir CPF válido no campo "CPF"
3. Inserir senha válida no campo "Senha"
4. Clicar no botão "Entrar"
5. Verificar o redirecionamento para o dashboard`,
        resultado_esperado: `- Login realizado com sucesso
- Usuário redirecionado para o dashboard principal
- Nome do usuário exibido no cabeçalho
- Menu principal disponível`,
        prioridade: 'critica',
        status: 'passou',
        data_criacao: '2024-01-15 14:00:00',
        data_execucao: '2024-01-20 10:30:00',
    },
})

Record({
    $id: Now.ID['plano_teste_002'],
    table: 'x_snc_almcaixa_planos_teste',
    data: {
        numero: 'TES1000002',
        codigo: 'TC-002',
        titulo: 'Teste de Login com Credenciais Inválidas',
        descricao: 'Validar o comportamento do sistema com credenciais incorretas',
        pre_condicoes: `- Sistema disponível e acessível
- Credenciais inválidas preparadas para teste`,
        passos_teste: `1. Acessar a página de login do sistema
2. Inserir CPF inválido ou inexistente
3. Inserir senha qualquer
4. Clicar no botão "Entrar"
5. Verificar mensagem de erro
6. Tentar 3 vezes consecutivas
7. Verificar bloqueio temporário`,
        resultado_esperado: `- Mensagem de erro clara exibida
- Login não autorizado
- Após 3 tentativas: conta temporariamente bloqueada
- Mensagem de bloqueio exibida`,
        prioridade: 'alta',
        status: 'em_execucao',
        data_criacao: '2024-01-16 09:15:00',
    },
})

Record({
    $id: Now.ID['plano_teste_003'],
    table: 'x_snc_almcaixa_planos_teste',
    data: {
        numero: 'TES1000003',
        codigo: 'TC-003',
        titulo: 'Teste de Consulta de Saldo',
        descricao: 'Verificar a exibição correta do saldo da conta do usuário',
        pre_condicoes: `- Usuário logado no sistema
- Conta com saldo disponível
- Conexão com o sistema bancário ativa`,
        passos_teste: `1. Fazer login no sistema
2. Acessar o dashboard principal
3. Localizar a seção "Saldo Atual"
4. Verificar valores exibidos
5. Comparar com extrato bancário
6. Testar atualização automática`,
        resultado_esperado: `- Saldo exibido corretamente
- Formatação monetária brasileira (R$)
- Valores atualizados em tempo real
- Data e hora da última atualização visível`,
        prioridade: 'alta',
        status: 'planejado',
        data_criacao: '2024-01-17 11:45:00',
    },
})

Record({
    $id: Now.ID['plano_teste_004'],
    table: 'x_snc_almcaixa_planos_teste',
    data: {
        numero: 'TES1000004',
        codigo: 'TC-004',
        titulo: 'Teste de Performance do Sistema',
        descricao: 'Avaliar o desempenho do sistema sob carga normal e pico',
        pre_condicoes: `- Ambiente de teste configurado
- Ferramentas de monitoramento instaladas
- Cenários de carga definidos`,
        passos_teste: `1. Configurar monitoramento de performance
2. Executar teste com 100 usuários simultâneos
3. Executar teste com 500 usuários simultâneos
4. Executar teste com 1000 usuários simultâneos
5. Monitorar tempo de resposta
6. Verificar uso de recursos do servidor
7. Documentar resultados`,
        resultado_esperado: `- Tempo de resposta < 3 segundos para 95% das requisições
- Sistema estável com até 1000 usuários
- Uso de CPU < 80%
- Uso de memória < 85%
- Sem erros de timeout`,
        prioridade: 'media',
        status: 'falhou',
        data_criacao: '2024-01-18 15:20:00',
        data_execucao: '2024-01-22 14:00:00',
    },
})

Record({
    $id: Now.ID['plano_teste_005'],
    table: 'x_snc_almcaixa_planos_teste',
    data: {
        numero: 'TES1000005',
        codigo: 'TC-005',
        titulo: 'Teste de Transferência Entre Contas',
        descricao: 'Validar o processo completo de transferência de valores',
        pre_condicoes: `- Usuário logado com conta origem ativa
- Conta destino válida cadastrada
- Saldo suficiente na conta origem
- Token de segurança ativo`,
        passos_teste: `1. Acessar funcionalidade "Transferir"
2. Selecionar conta de origem
3. Inserir dados da conta destino
4. Informar valor da transferência
5. Confirmar com token de segurança
6. Verificar processamento
7. Confirmar débito e crédito nas contas`,
        resultado_esperado: `- Transferência processada com sucesso
- Débito correto na conta origem
- Crédito correto na conta destino
- Comprovante gerado automaticamente
- Histórico atualizado em ambas as contas`,
        prioridade: 'critica',
        status: 'bloqueado',
        data_criacao: '2024-01-19 08:30:00',
    },
})