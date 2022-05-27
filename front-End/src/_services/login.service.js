import config from 'config';
import { fetchWrapper } from '@/_helpers';

//const baseUrl = `${config.apiUrl}/area`;
const baseUrl = 'http://localhost:8080/login';

export const loginService = {
    login
};

function login(params) {
console.log(JSON.parse('{ "rut": "16055006-6", "nombre": "Leonardo",        "apellido": "Fuentes",        "email": "leonardo.fuentes@gmail.com",        "fono": "123456",        "cargo": "Junior",        "empresa": "LFV",        "perfil": "ADMINISTRADOR",        "token": "test123"    }'));
    //return fetchWrapper.post(baseUrl, params);
    return JSON.parse('{ "rut": "16055006-6", "nombre": "Leonardo",        "apellido": "Fuentes",        "email": "leonardo.fuentes@gmail.com",        "fono": "123456",        "cargo": "Junior",        "empresa": "LFV",        "perfil": "ADMINISTRADOR",        "token": "test123"    }');
}
