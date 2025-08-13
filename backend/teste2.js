import axios from "axios";

async function checkFileUrl(fileUrl) {
    try {
        const response = await axios.get(fileUrl);
        console.log('Arquivo encontrado:', response.status);
    } catch (error) {
        console.error('Erro ao acessar o arquivo:', error.response ? error.response.data : error.message);
    }
}

// Substitua pela URL do seu arquivo
checkFileUrl('https://ioshuauploadtestes.s3.sa-east-1.amazonaws.com/Procura%C3%83%C2%A7%C3%83%C2%A3o%20fixa%20teste.pdf');