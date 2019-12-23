import history from '../_helpers/history';
import store from '../_redux/store';
import {userActions} from '../_redux/user/duck';
import jwt_decode from 'jwt-decode';
import {post} from '../_helpers/api';

export const authService = {
    login,
    logout,
    loginByToken,
    getCurrentUser,
    register,
    refreshToken
};

const URL = "https://localhost:44356/api/auth";

function getCurrentUser(){
    return store.getState().currentUser;
}

async function register(userData) {
    await post(`${URL}/register`, userData);
    history.push('/account/login');
}

async function login(accountData) {
    const response = await post(`${URL}/login`, accountData);
    sessionStorage.setItem('token', response.token);
    store.dispatch(userActions.add(response.owner));
    store.dispatch(userActions.addCompanyBool(response.hasCompany));
    history.push('/');
}
    
function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('token');
    //redux
    store.dispatch(userActions.reset());
    store.dispatch(userActions.addCompanyBool(false));
}

async function loginByToken(){
    await refreshToken();
    const token = sessionStorage.token;
    const decodedData = jwt_decode(token);
    const user = {
        id: decodedData.Id,
        name: decodedData.Name,
        email: decodedData.Email
    };
    store.dispatch(userActions.add(user));
    store.dispatch(userActions.addCompanyBool(stringToBool(decodedData.hasCompany)));
}

async function refreshToken(){
    const response = await post(`${URL}/refresh-token`, sessionStorage.getItem('token'));
    sessionStorage.setItem('token', response.token);
}

//helpers
function stringToBool(string){
    if(string === "False") return false
    else if (string === "True") return true
}
