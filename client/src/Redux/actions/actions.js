import axios from "axios";
import { LOGIN, SET_GUEST_TYPE, MY_PROFILE_TO_MOUNT } from './action-types';

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

//  APPROVE USER

export const approveUser = async (id) =>
{
    try
    {
        const { data } = await axios.put(`${url}users/${id}`);
        console.log("action: approveUser, data: ", data);
        return true;
    }
    catch(error)
    {
        console.log("action: approveUser, error: ", error);
        return false;
    }

}

//  DELETE USER

export const deleteUser = async (id) =>
{
    try
    {
        const { data } = await axios.delete(`${url}users/${id}`);
        console.log("action: deleteUser, data: ", data);
        return true;
    }
    catch(error)
    {
        console.log("action: deleteUser, error: ", error);
        return false;
    }
}

export const guestTypeAction = (type) => {
    return {
		type: SET_GUEST_TYPE,
		payload: type,
	}
};

export const setMyProfileComponent = (component) => {
    return {
        type: MY_PROFILE_TO_MOUNT,
        payload: component,
    }
}