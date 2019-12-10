import history from '../_helpers/history';
import store from '../_redux/store';
import {userActions as userStore} from '../_redux/user/duck';
import jwt_decode from 'jwt-decode';
import { handleResponse } from '../_helpers/handleResponse';


export const authenticationService = {
    login,
    logout,
    loginByToken,
    getCurrentUser,
    hasCompany
};

function getCurrentUser(){
    return store.getState().currentUser;
}

function hasCompany(){
    return store.getState().hasCompany;
}

async function login(accountData) {
    const requestOptions = 
    {
        method: 'POST',
        headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(accountData)
    };
    return fetch(`https://localhost:44356/api/auth/login`, requestOptions)
        .then(res => handleResponse(res))
        .then(resJson => {
            if(resJson.token !== undefined){
                console.log(resJson, "I'am in authService");
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('token', resJson.token);
                //redux
                store.dispatch(userStore.add(resJson.owner));
                store.dispatch(userStore.addCompanyBool(resJson.hasCompany));
            }
        })
        .then(setTimeout(function(){
            history.push('/')}, 500))
        .catch(error => console.log(error));
}
    
function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('token');
    //redux
    store.dispatch(userStore.reset());
    store.dispatch(userStore.addCompanyBool(false));
}


async function loginByToken(){
    const token = sessionStorage.token;

    const decodedData = jwt_decode(token);
    const user = {
        id: decodedData.Id,
        name: decodedData.Name,
        email: decodedData.Email
    };
    store.dispatch(userStore.add(user));
    store.dispatch(userStore.addCompanyBool(decodedData.hasCompany));
    console.log('loggedIn');
}
