import axios from "axios";
import {SET_GUEST_TYPE, LOGIN} from './action-types'

let url = "localhost:3001/";

export const logUser = async (form) =>
{
    try
    {
        const { data } = await axios.get(`${url}users`, form);
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

export const guestTypeAction = (type) => {
    return {
		type: SET_GUEST_TYPE,
		payload: type,
	}
};