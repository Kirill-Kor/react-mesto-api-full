import { checkResponse } from "./checkResponse";

export const BASE_URL = 'https://api.kirkors.mesto.nomoredomains.work';

export const register = ({ userEmail, userPassword }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: userEmail, password: userPassword})
    })
        .then(checkResponse)
}

export const login = ({userEmail, userPassword}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: userEmail, password: userPassword})
    })
        .then(checkResponse)
}

export const checkTokenValidity = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
        },
    })
        .then(checkResponse)
}