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
    hasCompany,
    register
};

function getCurrentUser(){
    return store.getState().currentUser;
}

function hasCompany(){
    return store.getState().hasCompany;
}

async function register(userData) {
    const response = await post('https://localhost:44356/api/auth/register', userData);
    history.push('/login');
}

async function login(accountData) {
    const response = await post('https://localhost:44356/api/auth/login', accountData);
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
    const token = sessionStorage.token;

    const decodedData = jwt_decode(token);
    const user = {
        id: decodedData.Id,
        name: decodedData.Name,
        email: decodedData.Email
    };
    store.dispatch(userActions.add(user));
    store.dispatch(userActions.addCompanyBool(decodedData.hasCompany));
}
