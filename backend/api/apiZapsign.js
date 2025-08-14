import axios from "axios";

//URL principal da API
// https://sandbox.api.zapsign.com.br/api/v1/
//token de autenticação
// db1d4952-1801-43b9-a006-9e4957ab9bb888c35e7d-e582-4a06-9095-089c0e9fa6f0

export const apiZapsign = axios.create({
    baseURL: 'https://sandbox.api.zapsign.com.br/api/v1'
})