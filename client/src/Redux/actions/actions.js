import axios from "axios";
import { CURRENT_VISIT_DETAIL_ID, GUARD_VIEW, LOGIN, LOG_GUARD, MY_PROFILE_TO_MOUNT, SET_GUEST_TYPE } from './action-types';

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
        const thisUser = await axios.get(`${url}users?id=${data.id}`);
        return { type: LOGIN, payload: thisUser.data };
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

// LOGIN GUARD

export const logGuard = async (form) =>
{
    try
    {
        const { data } = await axios.post(`${url}guards/login`, form);
        return data
    }
    catch(error)
    {
        console.log("¡Hubo un error en logGuard!: ", error);
        return error;
    }
}

export const decodeGuard = async ( token ) =>
{
    try
    {
        const { data } = await axios.get(`${url}guards/decode?token=${token}`);
        return { type: LOG_GUARD, payload: data };
    }
    catch(error)
    {
        console.log( "Error en decodeGuard: ", error,"\n token provided: ", token );
    }
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

// DISAPPROVE USER

export const disapproveUser = async (id) =>
{
    try
    {
        const { data } = await axios.put(`${url}users/${id}`, {disapprove: true} );
        console.log("Action: disapproveUser, data: ", data);
        return true;
    }
    catch(error)
    {
        console.log("Action: disapproveUser, error: ", error);
        return false;
    }
}

// CREATE GUARD

export const createGuard = ( form ) =>
{
    return axios.post(`${url}guards`, form)
    .then( ( { data } ) =>
    {
        console.log("Response: ", data);
        return true;
    })
    .catch( ( error ) =>
    {
        console.log("Error al crear guardia /createGuardAction/: ", error );
        return false;
    })
}

// DISABLE / ENABLE GUARD

export const switchGuard = async ( id ) =>
{
    try
    {
        const { data } = await axios.put(`${url}guards/${id}`);
        console.log("RESPONSE: ", data);
        return true;
    }
    catch(error)
    {
        console.log("Error |switchGuard action|: ", error);
        return false;
    }
}

//  DELETE GUARD

export const deleteGuard = async ( id ) =>
{
    try
    {
        const { data } = await axios.delete(`${url}guards/${id}`);
        console.log("Guard deleted successfully: ", data);
    }
    catch(error)
    {
        console.log("Error |Action: deleteGuard| ", error);
        return false;
    }
}


// Mi Perfil

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

export const setCurrentVisitId = (id) => {
    return {
        type: CURRENT_VISIT_DETAIL_ID,
        payload: id,
    }
}

// Guardia


export const setGuardComponent = (component) => {
    return {
        type: GUARD_VIEW,
        payload: component,
    }
}