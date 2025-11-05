import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import requisitosPage from '../../client/requisitos.html'

UiPage({
    $id: Now.ID['requisitos-manager-page'],
    endpoint: 'x_snc_almcaixa_requisitos_manager.do',
    description: 'Sistema de Gestão de Requisitos - CAIXA ALM',
    category: 'general',
    html: requisitosPage,
    direct: true,
})