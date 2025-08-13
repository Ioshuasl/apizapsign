import express from "express"
import apiController from "../Controller/apiController.js"
import aws from 'aws-sdk'
import path from 'path'
import fs from 'fs'
import os from 'os'
import multer from 'multer'
import buffer from 'buffer'
import dotenv from 'dotenv'

const bearer_token = 'db1d4952-1801-43b9-a006-9e4957ab9bb888c35e7d-e582-4a06-9095-089c0e9fa6f0'

dotenv.config()

// configuracao do aws
aws.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region
})

//instancia aws s3
const s3 = new aws.S3();

//configuracao multer para armazenar arquivos temporariamente
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const routes = express.Router()

// Rota para upload de arquivos
// requisição post localhost:PORTA/upload seleciona o body form-data key voce vai digitar file e deois selecionar sua imagem
routes.post('/upload', upload.single('file'), (req, res) => {
    const fileContent = req.file.buffer; // O conteúdo do arquivo
    const params = {
        Bucket: process.env.bucket,
        Key: req.file.originalname, // Nome do arquivo no S3
        Body: fileContent,
        ContentType: req.file.mimetype // Tipo de conteúdo do arquivo
    };

    s3.upload(params, (err, data) => {
        if (err) {
            return res.status(500).json('Erro ao fazer upload: ' + err);
        }
        res.json(`Arquivo enviado com sucesso. URL: ${data.Location}`);
    });
});

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
    try {
        const documento = await apiController.getDocumento(token_documento)
        console.log("error status 200")
        return res.status(200).json(documento)
    } catch (error) {
        console.log("error status 400")
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
    const page = req.query.page
    try {
        const documentos = await apiController.getDocumentos(page, bearer_token)
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
routes.post('/apizapsign/', async (req, res) => {
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

//Coletar histórico de atividade do documento
routes.get('/apizapsign/', async (req, res) => {
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


export default routes