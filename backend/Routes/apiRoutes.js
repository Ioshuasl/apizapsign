import express from "express"
import apiController from "../Controller/apiController.js"
import aws from 'aws-sdk'
import path from 'path'
import fs from 'fs'
import os from 'os'
import multer from 'multer'
import buffer from 'buffer'
import dotenv from 'dotenv'

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
            return res.status(500).send('Erro ao fazer upload: ' + err);
        }
        res.send(`Arquivo enviado com sucesso. URL: ${data.Location}`);
    });
});

//Criar documento
routes.post('/apizapsign/documentopdf', async (req, res) => {
    const { name, url_pdf, signers } = req.body

    try {
        const documento = await apiController.createDocPdf(name, url_pdf, signers)
        return res.status(200).json(documento)
    } catch (error) {
        return error.data
    }
})

//Detalhar documento
routes.get('/apizapsign/documento/:token_documento', async (req, res) => {
    const { token_documento } = req.params
    try {
        const documento = await apiController.getDocumento(token_documento)
        return res.status(200).json(documento)
    } catch (error) {
        return res.status(400).send(error)
    }
})

//Listar documentos
routes.get('/apizapsign/documento', async (req, res) => {
    try {
        const documentos = await apiController.getDocumentos()
        return res.json(documentos)
    } catch (error) {
        return res.status(400).send(error)
    }
})

//Deletar documento
routes.delete('/apizapsign/documento', async (req, res) => {

})

//Adicionar anexo
routes.post('/apizapsign/anexodocumento', async (req, res) => {

})

//Criar modelo de documento
routes.post('/apizapsign/modelo', upload.single('file'), async (req, res) => {

    const { name, url_docx, signers } = req.body;
    //criar o documento DOCX
    try {
        const documento = await apiController.createDocDocx(name, url_docx, signers)
        return res.status(200).json(documento)
    } catch (error) {
        return res.status(400).send(error)
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
        return res.status(400).send(error)
    }
})

//Listar modelos
routes.get('/apizapsign/modelo', async (req, res) => {
    try {
        const documentos = await apiController.getModelos()
        return res.status(200).json(documentos)
    } catch (error) {
        return res.status(400).send(error)
    }
})

//Adicionar anexo ao modelo
routes.post('/apizapsign/modelo', async (req, res) => {
    try {

    } catch (error) {
        return res.status(400).send(error)
    }
})

//Adicionar signatário
routes.post('/apizapsign/', async (req, res) => {
    try {

    } catch (error) {
        return res.status(400).send(error)
    }
})

//Atualizar signatário
routes.post('/apizapsign/', async (req, res) => {
    try {

    } catch (error) {
        return res.status(400).send(error)
    }
})

//Detalhar signatário
routes.get('/apizapsign/signer/:token_signatario', async (req, res) => {
    const { token_signatario } = req.params
    try {
        const signer = await apiController.getSignatario(token_signatario)
        return res.status(200).json(signer)
    } catch (error) {
        return res.status(400).send(error)
    }
})

//Deletar signatário
routes.delete('/apizapsign/signer/:token_signatario', async (req, res) => {
    const { token_signatario } = req.params
    try {
        const signer = await apiController.deleteSignatario(token_signatario)
        return res.status(200).json(signer)
    } catch (error) {
        return res.status(400).send(error)
    }
})

//Assinar em lote
routes.post('/apizapsign/', async (req, res) => {
    try {

    } catch (error) {
        return res.status(400).send(error)
    }
})

//Coletar histórico de atividade do documento
routes.get('/apizapsign/', async (req, res) => {
    try {

    } catch (error) {
        return res.status(400).send(error)
    }
})


export default routes