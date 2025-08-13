import { api } from "./Controller/apiController.js"

async function getDocumentos(page) {
    try {
        const documentos = await api.get(`/docs/?page=${page}`, {
            headers: {
                'Authorization': `Bearer 'db1d4952-1801-43b9-a006-9e4957ab9bb888c35e7d-e582-4a06-9095-089c0e9fa6f0'`
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