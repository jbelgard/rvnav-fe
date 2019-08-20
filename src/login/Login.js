import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            username: '',
            password: ''
        };
    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleSubmit = event => {
        event.preventDefault();
    }
    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }
    render() {
        return (
            <div className = 'login'>
                <form onSubmit = {this.handleSubmit}>
                    <FormGroup controlId = 'username'>
                        <FormLabel>Username</FormLabel>
                        <FormControl
                            autoFocus
                            type = 'username'
                            value = {this.state.username}
                            onChange = {this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId = 'password'>
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value = {this.state.password}
                            onChange = {this.handleChange}
                            type = 'password'
                        />
                    </FormGroup>
                    <Link to = '/dashboard'>
                        <Button
                            onClick = {this.handleClick}
                            block
                            disabled = {!this.validateForm()}
                            type = 'submit'
                        >
                            Login
                        </Button>
                    </Link>
                    <Link to = '/register'>
                        <Button 
                            onClick = {this.handleClick}
                            block
                            type = 'submit'
                        >
                            Register a New User
                        </Button>
                    </Link>
                </form>
                
            </div>
        )
    }
}

export default Login
