import axios from 'axios';
import { API_URL, API_URL2  } from '../navigation/Constants';

export const GetListaInvitadosCasa = () => {
    return new Promise((resolve, reject) => {
    axios.get(API_URL+"api/invitadoscasa/",{
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        console.log(response);
        resolve(response.data);
    }).catch((error) => {
        console.log(error);
        reject(error);
    });
    });
}

export const DeleteInvitadosCasa = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(API_URL+"api/invitadoscasa/"+id+"/",{
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response);
            resolve(response.data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

export const GetInvitadosCasa = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(API_URL+"api/invitadoscasa/"+id+"/",{
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response);
            resolve(response.data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
        });
}

export const PostInvitadosCasa = (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("carnet", data.carnet);
    formData.append("placavehiculo", data.placavehiculo);
    formData.append("fecha", data.fecha);
    formData.append("motivo", data.motivo);
    formData.append("dueno_id", data.dueno_id);
    formData.append("ingreso", 0);
    return new Promise((resolve, reject) => {
        axios.post(API_URL+"api/invitadoscasa/", formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            console.log(response);
            resolve(response.data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

export const PutInvitadosCasa = (id, data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("carnet", data.carnet);
    formData.append("placavehiculo", data.placavehiculo);
    formData.append("fecha", data.fecha);
    formData.append("motivo", data.motivo);
    formData.append("dueno_id", data.dueno_id);
    formData.append("ingreso", 0);
    return new Promise((resolve, reject) => {
        axios.put(API_URL+"api/invitadoscasa/"+id+"/", formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            console.log(response);
            resolve(response.data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

export const GetListaDuenos = () => {
    return new Promise((resolve, reject) => {
    axios.get(API_URL2+"api/users_rol/",{
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        console.log(response);
        resolve(response.data);
    }).catch((error) => {
        console.log(error);
        reject(error);
    });
    });
}

export const PutInvitadosCasa2 = (id) => {
    const formData = new FormData();
    formData.append("ingreso", 1 );
    return new Promise((resolve, reject) => {
        axios.patch(API_URL+"api/invitadoscasa/"+id+"/", formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            console.log(response);
            resolve(response.data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}