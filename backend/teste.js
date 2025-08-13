import axios from "axios";

async function createDoc() {
    try {
        const response = await axios.post('https://sandbox.api.zapsign.com.br/api/v1/docs', {
            name: 'Documento',
            url_pdf: 'https://ioshuauploadtestes.s3.sa-east-1.amazonaws.com/Procura%C3%83%C2%A7%C3%83%C2%A3o+fixa+teste.pdf',
            external_id: null,
            signers: [
              {
                name: 'Ioshua Souza Lopes',
                email: 'souzaioshua2234@gmail.com',
                phone_number: '62984883324',
                auth_mode: 'assinaturaTela',
                send_automatic_email: true,
                send_automatic_whatsapp: false,
                order_group: null,
                custom_message: '',
                phone_country: '55',
                lock_email: false,
                blank_email: false,
                hide_email: false,
                lock_phone: false,
                blank_phone: false,
                hide_phone: false,
                lock_name: false,
                require_cpf: false,
                cpf: '04353094122',
                require_selfie_photo: true,
                require_document_photo: true,
                selfie_validation_type: 'liveness-document-match',
                selfie_photo_url: '',
                document_photo_url: '',
                document_verse_photo_url: '',
                qualification: '',
                external_id: '',
                redirect_link: ''
              }
            ],
            lang: 'pt-br',
            disable_signer_emails: false,
            brand_logo: '',
            brand_primary_color: '',
            brand_name: '',
            folder_path: '/',
            created_by: '',
            date_limit_to_sign: null,
            signature_order_active: false,
            observers: [ 'test@observer.com' ],
            reminder_every_n_days: 0,
            allow_refuse_signature: false,
            disable_signers_get_original_file: false
          }, {
            headers: {
                'Authorization': 'Bearer db1d4952-1801-43b9-a006-9e4957ab9bb888c35e7d-e582-4a06-9095-089c0e9fa6f0',
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error(error.response.data);
    }
}

createDoc();