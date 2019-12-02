import history from '../_helpers/history';
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    loginByToken,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(accountData) {
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

    return fetch(`https://localhost:44356/api/auth/login`, requestOptions)
        .then(res => res.json())
        .then(resJson => {
            if(resJson.token !== undefined){
                console.log(resJson, "I'am in authService");
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('token', resJson.token);
                sessionStorage.setItem('currentUser', JSON.stringify(resJson.owner));
                currentUserSubject.next(resJson.owner);
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
            sessionStorage.setItem("currentUser", resJson.user);
            currentUserSubject.next(resJson.user);
        })
        .catch(error => console.log(error))
    }else{
        return {message: 'No token provided'}
    }
}
    

function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}