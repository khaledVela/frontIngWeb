import axios from 'axios';
import { API_URL2  } from '../navigation/Constants';

export const Login = () => {
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