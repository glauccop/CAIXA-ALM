import { gs } from '@servicenow/glide'

/**
 * Valida se Change Request implementado possui vínculo com requisito, história ou teste
 */
export function validateImplementedCR(current, previous) {
    try {
        const crNumber = current.getValue('number')
        
        // Verificar se pelo menos um relacionamento está preenchido
        const hasRelatedNeed = !gs.nil(current.getValue('related_need'))
        const hasRelatedRequirement = !gs.nil(current.getValue('related_requirement'))
        const hasRelatedStory = !gs.nil(current.getValue('related_story'))
        const hasRelatedTest = !gs.nil(current.getValue('related_test'))
        
        if (!hasRelatedNeed && !hasRelatedRequirement && !hasRelatedStory && !hasRelatedTest) {
            gs.addErrorMessage('Para marcar o Change Request como "Implementado", é obrigatório vincular pelo menos um artefato relacionado (Necessidade, Requisito, História de Usuário ou Plano de Teste)')
            current.setAbortAction(true)
            return false
        }
        
        gs.addInfoMessage(`Change Request ${crNumber} implementado com sucesso`)
        return true
        
    } catch (error) {
        gs.error(`Erro ao validar implementação do CR ${current.getValue('number')}: ${error.message}`)
        current.setAbortAction(true)
        return false
    }
}