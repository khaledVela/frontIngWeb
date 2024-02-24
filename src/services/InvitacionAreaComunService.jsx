import axios from 'axios';
import { API_URL, API_URL2  } from '../navigation/Constants';

export const GetListainvitadosareacomun = () => {
    return new Promise((resolve, reject) => {
    axios.get(API_URL+"api/invitadosareacomun/",{
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

export const Deleteinvitadosareacomun = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(API_URL+"api/invitadosareacomun/"+id+"/",{
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

export const Getinvitadosareacomun = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(API_URL+"api/invitadosareacomun/"+id+"/",{
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

export const Postinvitadosareacomun = (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("carnet", data.carnet);
    formData.append("placaVehiculo", data.placavehiculo);
    formData.append("fecha", data.fecha);
    formData.append("areacomun_id", data.areascomunes_id);
    formData.append("dueo_id", data.dueno_id);
    formData.append("ingreso", 0);
    formData.append("condominio_id",localStorage.getItem('condominio_id'))
    return new Promise((resolve, reject) => {
        axios.post(API_URL+"api/invitadosareacomun/", formData,{
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

export const Putinvitadosareacomun = (id, data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("carnet", data.carnet);
    formData.append("placaVehiculo", data.placavehiculo);
    formData.append("fecha", data.fecha);
    formData.append("areacomun_id", data.areascomunes_id);
    formData.append("dueo_id", data.dueno_id);
    formData.append("ingreso", 0);
    formData.append("condominio_id",localStorage.getItem('condominio_id'))
    return new Promise((resolve, reject) => {
        axios.put(API_URL+"api/invitadosareacomun/"+id+"/", formData,{
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

export const GetListaAreasComunes = () => {
    return new Promise((resolve, reject) => {
    axios.get(API_URL2+"api/areacomun/",{
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

export const Putinvitadosareacomun2 = (id) => {
    return new Promise((resolve, reject) => {
        axios.patch(API_URL+"api/invitadosareacomun/"+id+"/", {ingreso: 1},{
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