import React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { login } from "../../../store/actions";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../Auth.css"


class LoginForm extends React.Component {
  constructor() {
    super()
    this.state = {
      credentials: {
        username: '',
        password: ''
      }
    }
  }

  componentDidMount(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    console.log("props", this.props.login);
  }

  handleChange = (event) => {
    this.setState({
        credentials: {
            ...this.state.credentials,
            [event.target.name]: event.target.value
        }
    })
  }

  loginSubmit = (event) => {
    event.preventDefault()
    console.log("login", this.props.login);
    console.log("creds", this.state.credentials);
    console.log("", this.props.login(this.state.credentials));
    return this.props.login(this.state.credentials)
        .then(res => { 
            if(res){
                this.props.history.push('/map')
            }    
        })
        .catch(err => {
            console.log(err)
        })
  }
  
  render(){
    return(
      <div>
        <Form
        onSubmit={this.loginSubmit}
        >
          <Form.Group>
          <Form.Label >Username</Form.Label>

        <Form.Control        
            type="string"
            name='username'
            placeholder="RVman4000"
            value={this.state.credentials.username}
            onChange={this.handleChange}
            required>
        </Form.Control>
        <Form.Label >Password</Form.Label>

        <Form.Control
            type='password'
            name='password'
            placeholder="1egdhuy!!%^kjhd"
            value={this.state.credentials.password}
            onChange={this.handleChange}
            required>
        </Form.Control>
        <Button variant="warning">Submit</Button>
        </Form.Group>
        </Form>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  //isLoggingIn:state.isLoggingIn
})

export default withRouter(connect(
  mapStateToProps, { login }
)(LoginForm))

