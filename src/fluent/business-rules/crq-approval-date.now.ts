import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { approveChangeRequest } from '../../server/change-request-approval.js'

// Business rule para registrar data de aprovação quando Change Request for aprovado
BusinessRule({
    $id: Now.ID['crq_approval_date'],
    name: 'CRQ - Set Approval Date',
    table: 'x_snc_almcaixa_change_request',
    when: 'before',
    action: ['update'],
    condition: "current.status == 'approved' && previous.status != 'approved'",
    script: approveChangeRequest,
    active: true,
    order: 100,
})