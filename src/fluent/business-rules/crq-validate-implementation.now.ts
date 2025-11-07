import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { validateImplementedCR } from '../../server/validate-implemented-cr.js'

// Business rule para validar que CR implementado tem vínculo com requisito/história/teste
BusinessRule({
    $id: Now.ID['crq_validate_implemented'],
    name: 'CRQ - Validate Implementation',
    table: 'x_snc_almcaixa_change_request',
    when: 'before',
    action: ['update'],
    condition: "current.status == 'implemented'",
    script: validateImplementedCR,
    active: true,
    order: 200,
})