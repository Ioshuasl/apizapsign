import express from "express"
import apiController from "../Controller/apiController"


const routes = express.Router()

//Criar documento
routes.post('/apizapsign/documentopdf', async (req, res) => {
    const { name, url_pdf, signers } = req.body

    try {
        const documento = await apiController.createDocPdf(name, url_pdf, signers)
        return res.status(200).json(documento)
    } catch (error) {
        const errorMessage = error.message;

        // Exemplo: extrair o status do erro da mensagem para um tratamento mais específico
        const statusMatch = errorMessage.match(/Status:(\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;

        // Retorna o status de erro e a mensagem para o cliente
        return res.status(statusCode).json({ message: errorMessage });
    }
})

//Detalhar documento
routes.get('/apizapsign/documento/:token_documento', async (req, res) => {
    const { token_documento } = req.params
    console.log(token_documento)
    try {
        const documento = await apiController.getDocumento(token_documento)
        return res.status(200).json(documento)
    } catch (error) {
        const errorMessage = error.message;

        // Exemplo: extrair o status do erro da mensagem para um tratamento mais específico
        const statusMatch = errorMessage.match(/Status:(\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;

        // Retorna o status de erro e a mensagem para o cliente
        return res.status(statusCode).json({ message: errorMessage });
    }
})

//Listar documentos
routes.get('/apizapsign/documento/', async (req, res) => {
    try {
        const documentos = await apiController.getDocumentos()
        return res.json(documentos)
    } catch (error) {
        const errorMessage = error.message;

        // Exemplo: extrair o status do erro da mensagem para um tratamento mais específico
        const statusMatch = errorMessage.match(/Status:(\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;

        // Retorna o status de erro e a mensagem para o cliente
        return res.status(statusCode).json({ message: errorMessage });
    }
})

//Deletar documento
routes.delete('/apizapsign/documento/:token_documento', async (req, res) => {
    const { token_documento } = req.params
    console.log(token_documento)
    try {
        const documento = await apiController.deleteDocumento(token_documento)
        return res.json(documento)
    } catch (error) {
        const errorMessage = error.message;

        // Exemplo: extrair o status do erro da mensagem para um tratamento mais específico
        const statusMatch = errorMessage.match(/Status:(\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;

        // Retorna o status de erro e a mensagem para o cliente
        return res.status(statusCode).json({ message: errorMessage });
    }
})

//Adicionar anexo
routes.post('/apizapsign/anexodocumento', async (req, res) => {
    try {
        return res.json()
    } catch (error) {
        const errorMessage = error.message;

        // Exemplo: extrair o status do erro da mensagem para um tratamento mais específico
        const statusMatch = errorMessage.match(/Status:(\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;

        // Retorna o status de erro e a mensagem para o cliente
        return res.status(statusCode).json({ message: errorMessage });
    }
})

//Criar modelo de documento
routes.post('/apizapsign/modelo', upload.single('file'), async (req, res) => {

    const { name, url_docx, signers } = req.body;
    //criar o documento DOCX
    try {
        const documento = await apiController.createDocDocx(name, url_docx, signers)
        return res.status(200).json(documento)
    } catch (error) {
        const errorMessage = error.message;

        // Exemplo: extrair o status do erro da mensagem para um tratamento mais específico
        const statusMatch = errorMessage.match(/Status:(\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;

        // Retorna o status de erro e a mensagem para o cliente
        return res.status(statusCode).json({ message: errorMessage });
    }
    //criar o modelo de documento
})

//Detalhar modelo
routes.get('/apizapsign/modelo/:token_documento', async (req, res) => {
    const { token_documento } = req.params
    try {
        const documento = await apiController.getModelo(token_documento)
        return res.status(200).json(documento)
    } catch (error) {
        const errorMessage = error.message;

        // Exemplo: extrair o status do erro da mensagem para um tratamento mais específico
        const statusMatch = errorMessage.match(/Status:(\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;

        // Retorna o status de erro e a mensagem para o cliente
        return res.status(statusCode).json({ message: errorMessage });
    }
})

//Listar modelos
routes.get('/apizapsign/modelo', async (req, res) => {
    try {
        const documentos = await apiController.getModelos()
        return res.status(200).json(documentos)
    } catch (error) {
        const errorMessage = error.message;

        // Exemplo: extrair o status do erro da mensagem para um tratamento mais específico
        const statusMatch = errorMessage.match(/Status:(\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;

        // Retorna o status de erro e a mensagem para o cliente
        return res.status(statusCode).json({ message: errorMessage });
    }
})

//Adicionar anexo ao modelo
routes.post('/apizapsign/modelo', async (req, res) => {
    try {

    } catch (error) {
        const errorMessage = error.message;

        // Exemplo: extrair o status do erro da mensagem para um tratamento mais específico
        const statusMatch = errorMessage.match(/Status:(\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;

        // Retorna o status de erro e a mensagem para o cliente
        return res.status(statusCode).json({ message: errorMessage });
    }
})

//Adicionar signatário
routes.post('/apizapsign/signer', async (req, res) => {
    try {

    } catch (error) {
        const errorMessage = error.message;

        // Exemplo: extrair o status do erro da mensagem para um tratamento mais específico
        const statusMatch = errorMessage.match(/Status:(\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;

        // Retorna o status de erro e a mensagem para o cliente
        return res.status(statusCode).json({ message: errorMessage });
    }
})

//Atualizar signatário
routes.post('/apizapsign/signer', async (req, res) => {
    try {

    } catch (error) {
        const errorMessage = error.message;

        // Exemplo: extrair o status do erro da mensagem para um tratamento mais específico
        const statusMatch = errorMessage.match(/Status:(\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;

        // Retorna o status de erro e a mensagem para o cliente
        return res.status(statusCode).json({ message: errorMessage });
    }
})

//Detalhar signatário
routes.get('/apizapsign/signer/:token_signatario', async (req, res) => {
    const { token_signatario } = req.params
    try {
        const signer = await apiController.getSignatario(token_signatario)
        return res.status(200).json(signer)
    } catch (error) {
        const errorMessage = error.message;

        // Exemplo: extrair o status do erro da mensagem para um tratamento mais específico
        const statusMatch = errorMessage.match(/Status:(\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;

        // Retorna o status de erro e a mensagem para o cliente
        return res.status(statusCode).json({ message: errorMessage });
    }
})

//Deletar signatário
routes.delete('/apizapsign/signer/:token_signatario', async (req, res) => {
    const { token_signatario } = req.params
    try {
        const signer = await apiController.deleteSignatario(token_signatario)
        return res.status(200).json(signer)
    } catch (error) {
        const errorMessage = error.message;

        // Exemplo: extrair o status do erro da mensagem para um tratamento mais específico
        const statusMatch = errorMessage.match(/Status:(\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;

        // Retorna o status de erro e a mensagem para o cliente
        return res.status(statusCode).json({ message: errorMessage });
    }
})

//Assinar em lote
routes.post('/apizapsign/assinar-lote', async (req, res) => {
    const { user_api_token, signer_tokens } = req.body
    try {
        const assinaturalote = await apiController.assinarLote(user_api_token, signer_tokens)
        return res.status(200).json(assinaturalote)
    } catch (error) {
        const errorMessage = error.message;

        // Exemplo: extrair o status do erro da mensagem para um tratamento mais específico
        const statusMatch = errorMessage.match(/Status:(\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;

        // Retorna o status de erro e a mensagem para o cliente
        return res.status(statusCode).json({ message: errorMessage });
    }
})

//Coletar histórico de atividade do documento
routes.get('/apizapsign/documento/historico/:token_documento', async (req, res) => {
    const {token_documento} = req.params
    const {download_pdf} = req.query.download_pdf
    try {
        const historico = await apiController.getHistoricoDocumento(token_documento,download_pdf)
        return res.status(200).json(historico)
    } catch (error) {
        const errorMessage = error.message;

        // Exemplo: extrair o status do erro da mensagem para um tratamento mais específico
        const statusMatch = errorMessage.match(/Status:(\d+)/);
        const statusCode = statusMatch ? parseInt(statusMatch[1]) : 500;

        // Retorna o status de erro e a mensagem para o cliente
        return res.status(statusCode).json({ message: errorMessage });
    }
})


export default routes