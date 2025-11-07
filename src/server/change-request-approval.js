import { gs, GlideDateTime } from '@servicenow/glide'

/**
 * Registra a data de aprovação quando o Change Request é aprovado
 */
export function approveChangeRequest(current, previous) {
    try {
        // Definir a data/hora atual da aprovação
        const now = new GlideDateTime()
        current.setValue('approval_date', now.getDisplayValue())
        
        // Definir quem aprovou (usuário atual)
        if (gs.getUserID()) {
            current.setValue('approved_by', gs.getUserID())
        }
        
        // Log da aprovação
        gs.addInfoMessage(`Change Request ${current.getValue('number')} foi aprovado em ${now.getDisplayValue()}`)
        
    } catch (error) {
        gs.error(`Erro ao processar aprovação do CR ${current.getValue('number')}: ${error.message}`)
    }
}