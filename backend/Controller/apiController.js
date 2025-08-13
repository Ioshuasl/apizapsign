import axios from "axios";

//URL principal da API
// https://sandbox.api.zapsign.com.br/api/v1/
//token de autenticação
const bearer_token = 'db1d4952-1801-43b9-a006-9e4957ab9bb888c35e7d-e582-4a06-9095-089c0e9fa6f0'
// conta 1(já está cheio)
// e5e0d3cc-aa83-495c-9045-b486bcbe98c9bf48203a-7686-4f27-93dd-2734fc08cb3c
//conta 2(não está cheio ainda)
// db1d4952-1801-43b9-a006-9e4957ab9bb888c35e7d-e582-4a06-9095-089c0e9fa6f0


const api = axios.create({
    baseURL: 'https://sandbox.api.zapsign.com.br/api/v1'
})

class ApiController {

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
            const documento = await api.post('/docs', datapost, {
                headers: {
                    'Authorization': `Bearer ${bearer_token}`,
                    'Content-Type': 'application/json'
                }
            })
            return documento.data
        } catch (error) {
            return error
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
            return error
        }
    }


    //Detalhar documento
    async getDocumento(token_documento) {
        try {
            const documento = await api.get(`/docs/${token_documento}`, {
                headers: {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            return documento.data
        } catch (error) {
            return error
        }
    }

    //Listar documentos
    async getDocumentos() {
        try {
            const documentos = await api.get('/docs', {
                headers: {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            return documentos.data
        } catch (error) {
            return error
        }
    }

    //Deletar documento
    async deleteDocumento(token_documento) {
        try {
            const documento = await api.delete(`/docs/${token_documento}`, {
                headers: {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            return documento
        } catch (error) {
            return error
        }
    }

    //Adicionar anexo
    async createAnexoDocumento() {

    }


    //Criar modelo de documento
    async createModelo() {
        //upload do modelo de documento no amazons3

        //criação do modelo de documento na zapsign
    }


    //Detalhar modelo
    async getModelo(token_modelo) {
        try {
            const modelo = await api.get(`/templates/${token_modelo}`, {
                headers: {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            return modelo
        } catch (error) {
            return error
        }
    }


    //Listar modelos
    async getModelos() {
        try {
            const modelos = await api.get('/templates', {
                headers: {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            return modelos
        } catch (error) {
            return error
        }
    }


    //Adicionar anexo ao modelo
    async createAnexoModelo() {

    }


    //Adicionar signatário
    async addSignatario() {

    }


    //Atualizar signatário
    async atualizarSignatario() {

    }


    //Detalhar signatário
    async getSignatario(token_signatario) {
        try {
            const signatario = await api.get(`/signer/${token_signatario}`, {
                headers: {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            return signatario
        } catch (error) {
            return error
        }
    }


    //Deletar signatário
    async deleteSignatario(token_signatario) {
        try {
            const signatario = await api.delete(`/signer/${token_signatario}/remove`, {
                headers: {
                    'Authorization': `Bearer ${bearer_token}`
                }
            })
            return signatario
        } catch (error) {
            return error
        }
    }


    //Assinar em lote
    async assinarLote() {

    }


    //Coletar histórico de atividade do documento
    async getHistoricoDocumento() {

    }
}

export default new ApiController()