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

//teste
routes.get('/github/:username', async (req,res) => {
    const {username} = req.params

    try {
        const user = await apiController.getUserGithub(username)
        return res.json(user)
    } catch (error) {
        return res.json(error)
    }
})

//Criar documento
routes.post('/apizapsign/documentopdf', async(req,res) => {
    const {name,url_pdf,signers} = req.body

    try {
        const documento = await apiController.createDocPdf(name,url_pdf,signers)
        return res.json(documento)
    } catch (error) {
        return error.data
    }
})

//Detalhar documento
routes.get('/apizapsign/documento/:token_documento', async (req,res) => {
    const {token_documento} = req.params
    try {
        const documento = await apiController.getDocumento(token_documento)
        return res.json(documento)
    } catch (error) {
        return res.json(error)
    }
})

//Listar documentos
routes.get('/apizapsign/documentos', async (req,res) => {
    try {
        const documentos = await apiController.getDocumentos()
        return res.json(documentos)
    } catch (error) {
        return res.json(error)
    }
})

//Deletar documento
routes.delete('/apizapsign/documento', async (req,res) => {
    
})

//Adicionar anexo
routes.post('/apizapsign/anexodocumento', async (req,res) => {
    
})

//Criar modelo de documento
routes.post('/apizapsign/modelo',upload.single('file'), async (req,res) => {
    
    const fileContent = req.file.buffer; // O conteúdo do arquivo
    const params = {
        Bucket: 'ioshuauploadtestes',
        Key: req.file.originalname, // Nome do arquivo no S3
        Body: fileContent,
        ContentType: req.file.mimetype // Tipo de conteúdo do arquivo
    };

    let url_documentodocx = ''

    //fazendo upload do documento pdf no amazons3
    s3.upload(params, (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao fazer upload: ' + err);
        }
        console.log(`Arquivo enviado com sucesso. URL: ${data.Location}`);
        url_documentodocx = data.Location
        return url_documentodocx
    });

    //criar o documento DOCX
    try {
        const documento = await apiController.createDocDocx(name,url_documentodocx,signers)
        
    } catch (error) {
        return error
    }
    //criar o modelo de documento
})

//Detalhar modelo
routes.get('/apizapsign/modelo', async (req,res) => {
    
})

//Listar modelos
routes.get('/apizapsign/modelo', async (req,res) => {
    
})

//Adicionar anexo ao modelo
routes.post('/apizapsign/modelo', async (req,res) => {
    
})

//Adicionar signatário
routes.post('/apizapsign/', async (req,res) => {
    
})

//Atualizar signatário
routes.post('/apizapsign/', async (req,res) => {
    
})

//Detalhar signatário
routes.get('/apizapsign/', async (req,res) => {
    
})

//Deletar signatário
routes.delete('/apizapsign/', async (req,res) => {
    
})

//Assinar em lote
routes.post('/apizapsign/', async (req,res) => {
    
})

//Coletar histórico de atividade do documento
routes.get('/apizapsign/', async (req,res) => {
    
})


export default routes