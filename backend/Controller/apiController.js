import { apiZapsign } from "../api/apiZapsign"

const bearer_token = '985d7b07-4e55-4b8d-a02d-54f7618c258e3980ebdb-df00-4500-bcc2-6cfb94359da2'

class apiZapsignController {

    //Criar documento PDF
    async createDocPdf(name, url_pdf, signers) {

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

    //Criar documento DOCx
    async createDocDocx(name, url_docx, signers) {

        try {
            const documento = await axi.post('/docs/', {
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


    //Detalhar documento
    async getDocumento(token_documento) {
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

    //Listar documentos
    async getDocumentos() {
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

    //Deletar documento
    async deleteDocumento(token_documento) {
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

    //Adicionar anexo
    async createAnexoDocumento() {

    }


    //Criar modelo de documento
    async createModelo(name, url_docx, signers) {
        try {
            const documento = await axi.post('/templates/create', {
                name: name,
                url_docx: url_docx,
                lang: 'pt-br',
                observers: ["test@observer.com"],
                first_signer: {
                    blank_email: false,
                    blank_phone: false,
                    auth_mode: "assinaturaTela",
                    require_selfie_photo: false,
                    require_document_photo: false,
                    selfie_validation_type: "",
                    qualification: Witness
                }
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


    //Detalhar modelo
    async getModelo(token_modelo) {
        try {
            const modelo = await apiZapsign.get(`/templates/${token_modelo}`, {
                headers: {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            return modelo.data
        } catch (error) {
            return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
        }
    }


    //Listar modelos
    async getModelos() {
        try {
            const modelos = await apiZapsign.get(`/templates`, {
                headers: {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            return modelos.data
        } catch (error) {
            return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
        }
    }


    //Adicionar anexo ao modelo
    async createAnexoModelo() {

    }


    //Adicionar signatário
    async addSigner(token_documento, signer_name) {
        try {
            const signer = await apiZapsign.post(`/docs/${token_documento}/add-signer`, {
                name: signer_name
            }, {
                headers: {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            return signer.data
        } catch (error) {
            return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
        }
    }


    //Atualizar signatário
    async atualizarSigner(token_signer, signer_name) {
        try {
            const signer = await apiZapsign.post(`/signers/${token_signer}`, {
                name: signer_name
            }, {
                headers: {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            return signer.data
        } catch (error) {
            return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
        }
    }


    //Detalhar signatário
    async getSigner(token_signer) {
        try {
            const signer = await apiZapsign.get(`/signer/${token_signer}`, {
                headers: {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            return signer.data
        } catch (error) {
            return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
        }
    }


    //Deletar signatário
    async deleteSigner(token_signer) {
        try {
            const signer = await apiZapsign.delete(`/signer/${token_signer}/remove`, {
                headers: {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            return signer.data
        } catch (error) {
            return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
        }
    }


    //Assinar em lote
    async assinarLote(user_api_token, signer_tokens) {
        try {
            const assinarLote = await apiZapsign.post('/sign', {
                user_token: user_api_token,
                signer_tokens: signer_tokens
            }, {
                headers: {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            return assinarLote.data
        } catch (error) {
            return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
        }
    }


    //Coletar histórico de atividade do documento
    async getHistoricoDocumento(token_documento, download_pdf) {
        try {
            const historico = await apiZapsign.get(`/docs/signer-log/${token_documento}?download_pdf=${download_pdf}`)
            return historico
        } catch (error) {
            return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
        }
    }
}

export default new apiZapsignController()