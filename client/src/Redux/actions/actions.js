import axios from "axios";
import { LOGIN, SET_GUEST_TYPE } from './action-types';

let url = "localhost:3001/";

//  LOGIN

export const logUser = async (form) =>
{
    try
    {
        const { data } = await axios.get(`${url}users/login`, form);
        return data;
    }
    catch(error)
    {
        console.log("¡Hubo un error en logUser!: ", error);
        return false;
    }
}

export const logInUser = async (id) =>
{
    try
    {
        const {data} = await axios.get(`${url}users?id=${id}`);
        return { type: LOGIN, payload: data };
    }
    catch(error)
    {
        console.log("¡Error en logInUser! : ", error)
        return { type: LOGIN, payload: {} };
    }
}

export const logOffUser = () =>
{
    return { type: LOGIN, payload: false };
}

export const decodeUser = (hashed) =>
{
    const arrayToken = hashed.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    return tokenPayload;
}

//

export const guestTypeAction = (type) => {
    return {
		type: SET_GUEST_TYPE,
		payload: type,
	}
};