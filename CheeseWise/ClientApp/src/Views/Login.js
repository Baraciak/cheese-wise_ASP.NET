import React, { Component } from 'react'
import { authService } from '../_services/authService';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';


class Login extends Component {
    render(){
        return(
            <Form onSubmit={this.handleLogin}>
                <FormGroup>
                    <Label htmlFor="email">Email address</Label>
                    <Input name="email" type="email" id="email" placeholder="Enter email"/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input name="password" type="password" id="password" placeholder="Enter Password" />
                </FormGroup>
                <Button>Login</Button>
            </Form>
        );
    }

    handleLogin = (event) =>{
        event.preventDefault();
        const data = new FormData(event.target);

        const accountData = {
            Email: data.get("email"),
            Password: data.get("password")
        }
        
        authService.login(accountData);
    }
}

export default Login;