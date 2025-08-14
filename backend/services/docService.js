import { apiZapsign } from "../api/apiZapsign"

export async function createDocPdf(name, url_pdf, signers) {

    const datapost = {
        name: name,
        url_pdf: url_pdf,
        external_id: null,
        signers: signers,
        lang: 'pt-br',
        disable_signer_emails: false,
        brand_logo: '',
        brand_primary_color: "",
        brand_name: "",
        folder_path: "/",
        created_by: "",
        date_limit_to_sign: null,
        signature_order_active: false,
        observers: ["test@observer.com"],
        reminder_every_n_days: 0,
        allow_refuse_signature: false,
        disable_signers_get_original_file: false
    }

    console.log(datapost)

    try {
        const documento = await apiZapsign.post('/docs', datapost, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`,
                'Content-Type': 'application/json'
            }
        })
        return documento.data
    } catch (error) {
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}

export async function createDocDocx(name, url_docx, signers) {


    try {
        const documento = await apiZapsign.post('/docs/', {
            name: name,
            url_docx: url_docx,
            external_id: null,
            signers: signers,
            lang: 'pt-br',
            disable_signer_emails: false,
            brand_logo: '',
            brand_primary_color: "",
            brand_name: "",
            folder_path: "/",
            created_by: "",
            date_limit_to_sign: null,
            signature_order_active: false,
            observers: ["test@observer.com"],
            reminder_every_n_days: 0,
            allow_refuse_signature: false,
            disable_signers_get_original_file: false
        }, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        console.log(documento)
        return documento.data
    } catch (error) {
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}

// função para Criar documento via Modelo
export async function createDocByModelo(token_modelo, signer_name, send_automatic_email, send_automatic_whatsapp, variaveis) {
    const data = {
        template_id: token_modelo,
        signer_name: signer_name,
        send_automatic_email: send_automatic_email,
        send_automatic_whatsapp: send_automatic_whatsapp,
        lang: "pt-br",
        external_id: null,
        data: variaveis
    }
    try {
        const documento = await apiZapsign.post('/models/create-doc', data, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        return documento.data
    } catch (error) {
        console.log(error)
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}

export async function getDocumento(token_documento) {
    try {
        const documento = await apiZapsign.get(`/docs/${token_documento}`, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        return documento.data
    } catch (error) {
        throw new Error(`Erro: ${error.response.data.detail}; Status:${error.response.status}`);
    }
}

export async function getDocumentos() {
    try {
        const documentos = await apiZapsign.get(`/docs`, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        return documentos.data
    } catch (error) {
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}

export async function deleteDocumento(token_documento) {
    console.log(token_documento)
    try {
        const documento = await apiZapsign.delete(`/docs/${token_documento}`, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        return documento.data
    } catch (error) {
        console.log(error)
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}

export async function addExtraDoc(token_documento, nomeArquivo, url_documento_pdf) {
    const data = {
        name: nomeArquivo,
        url_pdf: url_documento_pdf
    }
    try {
        const extraDoc = await apiZapsign.post(`/docs/${token_documento}/upload-extra-doc`, data, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        return extraDoc.data
    } catch (error) {
        console.log(error)
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}

export async function getDocHistoric(token_documento, download_pdf) {
    try {
        const historico = await apiZapsign.get(`/docs/signer-log/${token_documento}?download_pdf=${download_pdf}`)
        return historico
    } catch (error) {
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}
