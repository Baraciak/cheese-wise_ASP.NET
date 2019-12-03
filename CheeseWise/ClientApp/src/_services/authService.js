import history from '../_helpers/history';
import store from '../_redux/store';
import {userActions as userStore} from '../_redux/user/duck';


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
        method: 'post',
        headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(accountData)
    };
    //probably haszpasłord
    return fetch(`https://localhost:44356/api/auth/login`, requestOptions)
        .then(res => res.json())
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

async function loginByToken(){
    if(sessionStorage.token !== undefined){
        const authData = {'Token': sessionStorage.token};

        return fetch("https://localhost:44356/api/auth/validate-token", 
        {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.token
            },
            body: JSON.stringify(authData)
        })
        .then(res => res.json())
        .then(resJson => {
            //set refreshed token
            sessionStorage.setItem("token", resJson.token);
            //redux
            store.dispatch(userStore.add(resJson.user));
            store.dispatch(userStore.addCompanyBool(resJson.hasCompany));
        })
        .catch(error => console.log(error))
    }else{
        return {message: 'No token provided'}
    }
}
    

function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('token');
    //redux
    store.dispatch(userStore.reset());
}
