import React, { Component } from 'react'
import history from '../history';


class Login extends Component {

    render(){
        return(
            <form onSubmit={this.handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input name="email" type="email" className="form-control" id="email" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" className="form-control" id="password" placeholder="Enter Password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        );
    }

    handleLogin = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        const accountData = {
            Email: data.get("email"),
            Password: data.get("password")
        }

        //sends login data to verify it on servewr side
        //which returns token
        fetch("https://localhost:44356/api/auth/login", 
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(accountData)
            }
        )
        .then(res => res.json())
        .then(resJson => sessionStorage.setItem('token', resJson.token))
        .then(setTimeout(() => {
            history.push('/')
        },1000))
        .catch(error => console.log(error));
    }
}

export default Login;