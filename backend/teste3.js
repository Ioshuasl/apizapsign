import { api } from "./Controller/apiController.js"

async function getDocumentos(page) {
    try {
        const documentos = await api.get(`/docs`, {
            headers: {
                'Authorization': `Bearer 985d7b07-4e55-4b8d-a02d-54f7618c258e3980ebdb-df00-4500-bcc2-6cfb94359da2`
            }
        })
        console.log(documentos)
    } catch (error) {
        console.log(error.response.data.detail)
        console.log(error.response.status)
        return error
    }
}

getDocumentos(1)