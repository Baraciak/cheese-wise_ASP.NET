import React, { Component } from 'react'
import { authenticationService } from '../_services/authService';


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
                <button type="submit" className="btn btn-secondary">Login</button>
            </form>
        );
    }

    handleLogin = (event) =>{
        event.preventDefault();
        const data = new FormData(event.target);

        const accountData = {
            Email: data.get("email"),
            Password: data.get("password")
        }
        
        authenticationService.login(accountData);
    }
}

export default Login;