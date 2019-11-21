import React, { Component } from 'react'


class Login extends Component {

    render(){
        return(
            <form onSubmit={this.handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input name="email" type="email" class="form-control" id="email" placeholder="Enter email"/>
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

        fetch("https://localhost:44356/api/accounts/login", 
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
        // just console.log need to set some session to hold logged user
        .then(resJson => console.log(resJson))
        .catch(error => console.log(error));
    }
}

export default Login;