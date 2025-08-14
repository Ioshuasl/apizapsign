export async function addSigner(token_documento, signer_name) {
    try {
        const signer = await apiZapsign.post(`/docs/${token_documento}/add-signer`, {
            name: signer_name
        }, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        return signer.data
    } catch (error) {
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}

export async function getSigner(token_signer) {
    try {
        const signer = await apiZapsign.get(`/signer/${token_signer}`, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        return signer.data
    } catch (error) {
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}

export async function updateSigner(token_signer, signer_name) {
    try {
        const signer = await apiZapsign.post(`/signers/${token_signer}`, {
            name: signer_name
        }, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        return signer.data
    } catch (error) {
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}

export async function deleteSigner(token_signer) {
    try {
        const signer = await apiZapsign.delete(`/signer/${token_signer}/remove`, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        return signer.data
    } catch (error) {
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}

export async function signInBatch(user_api_token, signer_tokens) {
    try {
        const assinarLote = await apiZapsign.post('/sign', {
            user_token: user_api_token,
            signer_tokens: signer_tokens
        }, {
            headers: {
                'Authorization': `Bearer ${bearer_token}`
            }
        })
        return assinarLote.data
    } catch (error) {
        return { message: `Erro: ${error.response.data.detail}; Status:${error.response.status}` }
    }
}