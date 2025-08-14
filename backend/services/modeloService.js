import { apiZapsign } from "../api/apiZapsign"

export async function createModelo(name, url_docx, blank_email, blank_phone, auth_mode, require_selfie_photo, require_document_photo, selfie_validation_type) {

    const data = {
        name: name,
        url_docx: url_docx,
        lang: 'pt-br',
        observers: ["test@observer.com"],
        first_signer: {
            blank_email: blank_email,
            blank_phone: blank_phone,
            auth_mode: auth_mode,
            require_selfie_photo: require_selfie_photo,
            require_document_photo: require_document_photo,
            selfie_validation_type: selfie_validation_type,
            qualification: Witness
        }
    }

    try {
        const modelo = await axi.post('/templates/create', data, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        console.log(modelo)
        return modelo.data
    } catch (error) {
        console.log(error.response)
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}

export async function getModelo(token_modelo) {
    try {
        const modelo = await apiZapsign.get(`/templates/${token_modelo}`, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        return modelo.data
    } catch (error) {
        console.log(error.response)
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}

export async function getModelos() {
    try {
        const modelos = await apiZapsign.get(`/templates`, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        return modelos.data
    } catch (error) {
        console.log(error.response)
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}

export async function updateModelo(token_modelo, name, url_docx, blank_email, blank_phone, auth_mode, require_selfie_photo, require_document_photo, selfie_validation_type) {
    const data = {
        name: name,
        url_docx: url_docx,
        lang: 'pt-br',
        observers: ["test@observer.com"],
        first_signer: {
            blank_email: blank_email,
            blank_phone: blank_phone,
            auth_mode: auth_mode,
            require_selfie_photo: require_selfie_photo,
            require_document_photo: require_document_photo,
            selfie_validation_type: selfie_validation_type,
            qualification: Witness
        }
    }

    try {
        const modelo = await apiZapsign.post(`/templates/${token_modelo}`, data, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        return modelo.data
    } catch (error) {
        console.log(error.response)
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }

}

export async function deleteModelo(token_modelo) {
    try {
        const modelo = await apiZapsign.delete(`/templates/${token_modelo}`, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        return modelo.data
    } catch (error) {
        console.log(error.response)
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}

export async function addExtraDocModelo(token_modelo, token_extra_doc, variaveis) {
    const data = {
        template_id: token_extra_doc,
        data: variaveis
    }
    try {
        const extraDoc = await apiZapsign.post(`/models/${token_modelo}/upload-extra-doc`, data, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        return extraDoc.data
    } catch (error) {
        console.log(error.response)
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}