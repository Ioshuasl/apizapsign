import express from "express"
import aws from 'aws-sdk'
import multer from 'multer'
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

const fileRoutes = express.Router()

// Rota para upload de arquivos
// requisição post localhost:PORTA/upload seleciona o body form-data key voce vai digitar file e deois selecionar sua imagem
fileRoutes.post('/upload', upload.single('file'), (req, res) => {
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