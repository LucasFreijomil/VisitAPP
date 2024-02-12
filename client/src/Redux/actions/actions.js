import axios from "axios";
import { LOGIN, SET_GUEST_TYPE } from './action-types';

let url = "http://localhost:3001/";

//  LOGIN

export const logUser = async (form) =>
{
    try
    {
        const { data } = await axios.post(`${url}users/login`, form);
        return data
    }
    catch(error)
    {
        console.log("¡Hubo un error en logUser!: ", error);
        return error;
    }
}

export const logInUser = async (user) =>
{
    try
    {
        const {data} = await axios.get(`${url}users?id=${id}`);
        
    }
    catch(error)
    {
        console.log("¡Error en logInUser! : ", error)
        return { type: LOGIN, payload: {} };
    }
}

export const decodeUser = async ( token ) =>
{
    try
    {
        const { data } = await axios.get(`${url}users/decode?token=${token}`);
        return { type: LOGIN, payload: data };
    }
    catch(error)
    {
        console.log( "Error en decodeUser: ", error,"\n token provided: ", token );
    }
}

export const logOffUser = () =>
{
    return { type: LOGIN, payload: false };
}

// CREATE USER

export const createUser = ( form ) =>
{
    return axios.post(`${url}users`, form)
    .then( ( { data } ) =>
    {
        console.log("Response: ", data);
        return true;
    })
    .catch( ( error ) =>
    {
        console.log("Error al crear usuario /createUserAction/: ", error );
        return false;
    })
}




//

export const guestTypeAction = (type) => {
    return {
		type: SET_GUEST_TYPE,
		payload: type,
	}
};