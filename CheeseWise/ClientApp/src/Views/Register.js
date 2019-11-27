import React, { Component } from 'react';
import history from '../history';


class Register extends Component {

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Name</label>
                    <input name="name" type="username" className="form-control" id="username" placeholder="Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname</label>
                    <input name="surname" type="surname" className="form-control" id="surname" placeholder="Surname"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" class="form-control" id="password" placeholder="Password" />
                    <small id="emailHelp" className="form-text text-muted">
                        Password should contain at least: 8 signs, one upper case letter, one lower case letter, one digit
                    </small>
                </div>
                <button type="submit" className="btn btn-primary">Create account</button>
            </form>
        );
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const user = {
            Name: data.get("name"),
            Surname: data.get("surname"),
            Email: data.get("email"),
            Password: data.get("password")
        }
        // const accountData = {
        //     Email: data.get("email"),
        //     Password: data.get("password"),
        //     Owner: user
        // }

        fetch("https://localhost:44356/api/auth/register", 
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }
        )
        .then(history.push("/account/login"))
        .catch(error => console.log(error));
    }



}

export default Register;
