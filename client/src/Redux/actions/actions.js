import axios from "axios";
import { CURRENT_VISIT_DETAIL_ID, FOUND_BY_SEARCH, GUARD_VIEW, LOGIN, LOG_GUARD, MY_PROFILE_TO_MOUNT, REFRESH_TOAPPROVE, REFRESH_USERS, SET_GUEST_TYPE, USER_DETAIL } from './action-types';

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
        const thisGuard = await axios.get(`${url}guards?id=${data.id}`);
        return { type: LOG_GUARD, payload: thisGuard.data };
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

// Cambiar opción (GUARDIA)

export const setOption = ( dispatch, option ) =>
{
    dispatch( { type: GUARD_VIEW, payload: option } );
    return true;
}

//  Ver detalle de UN usuario

export const setUDetail = ( dispatch, user ) =>
{
    dispatch( { type: USER_DETAIL, payload: user } );
    return true;
}

/* Ir a buscar usuarios por NOMBRE, MAIL, DNI. */
////////////////////////////////////////////////

export const handleFound = ( dispatch, data ) =>
{
    dispatch( { type: FOUND_BY_SEARCH, payload: data } );
}

////////////////////////////////////////////////

// Modify Visit

export const modifyVisit = async ( form, id ) =>
{
    try
    {
        const { data } = await axios.put(`${url}visitas/${id}`, form);
        console.log("Visit modified succesfully.\nData: ", data);
        return true;
    }
    catch(error)
    {
        console.log("Error modifyVisit action: ", error);
        return false;
    }
}

// Modify Event

export const modifyEvent = async ( form, id ) =>
{
    try
    {
        const { data } = await axios.put(`${url}events/${id}`, form);
        console.log("Event modified succesfully.\nData: ", data);
        return true;
    }
    catch(error)
    {
        console.log("Error modifyEvent action: ", error );
        return false;
    }
}

// Users to approve counter

export const usersToAprove = async () =>
{
    try
    {
        const { data } = await axios.get(`${url}users/notApproved`);
        return data;
    }
    catch(error)
    {
        console.log( "Error counting usersToAprove: ", error );
        return false;
    }
}

// Pending-to-Approve users counter

export const pendingToApprove = async (dispatch) =>
{
    try
    {
        const { data } = await axios.get(`${url}users/notApproved`);
        dispatch( { type: REFRESH_TOAPPROVE, payload: data } );
        return true;
    }
    catch(error)
    {
        console.log( "Error fetching pendingToApprove users: ", error );
        return false;
    }
}

//  Refresh actual users from DB

export const refreshUsersFromDb = ( dispatch, data ) =>
{
    return dispatch( { type: REFRESH_USERS, payload: data })
}