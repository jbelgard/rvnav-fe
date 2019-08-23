import React from 'react';

import { connect } from "react-redux";
import { register, login } from "../../../store/actions";
import { withRouter } from 'react-router-dom';
import "../Auth.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



class RegisterForm extends React.Component {
  constructor() {
    super()
    this.state = {
      credentials: {
        username: '',
        first_name: '',
        last_name: '',
        password: ''
      }
    }
  }

  handleChange = (e) => {
    //console.log(e.target.name);
    //console.log(e.target.value);
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  registerSubmit = (e) => {
    e.preventDefault();
    console.log("creds", this.state.credentials);
    this.props.register(this.state.credentials)
      .then(res => {
        if(res) {

          this.props.login({username: this.state.credentials.username, password: this.state.credentials.password})
            .then(res => {
              this.setState({
                username: '',
                passord: '',
                first_name: '',
                last_name: '',
              })
              if (res){
                this.props.history.push("/map")
              }
     
            })
        
          console.log("state", this.state);
        }
      })
      .catch(err => {
        console.log(err)
      })

  }
//   <Form>
//   <Form.Group controlId="formBasicEmail">
//     <Form.Label>Email address</Form.Label>
//     <Form.Control type="email" placeholder="Enter email" />
//     <Form.Text className="text-muted">
//       We'll never share your email with anyone else.
//     </Form.Text>
//   </Form.Group>

//   <Form.Group controlId="formBasicPassword">
//     <Form.Label>Password</Form.Label>
//     <Form.Control type="password" placeholder="Password" />
//   </Form.Group>
//   <Form.Group controlId="formBasicChecbox">
//     <Form.Check type="checkbox" label="Check me out" />
//   </Form.Group>
//   <Button variant="primary" type="submit">
//     Submit
//   </Button>
// </Form>
  render() {
    return(
      <div>
        <Form>
          <Form.Group >
          <Form.Label >Username</Form.Label>
          <Form.Control
            name="username"
            placeholder="RVman4000"
            type="string"
            value={this.state.credentials.username}
            onChange={this.handleChange}
            required
          ></Form.Control>
          <Form.Label>First Name</Form.Label>

           <Form.Control
              name='first_name'
              placeholder="Jim"
              type="string"
              value={this.state.credentials.first_name}
              onChange={this.handleChange}
              required>
          </Form.Control>
          <Form.Label>Last Name</Form.Label>

          <Form.Control
        
              name='last_name'
              placeholder="Smith"
              type="string"
              value={this.state.credentials.last_name}
              onChange={this.handleChange}
              required>
          </Form.Control>
          <Form.Label>Password</Form.Label>
          <Form.Control
        
              type="password"
              name='password'
              placeholder="1egdhuy!!%^kjhd"
              value={this.state.credentials.password}
              onChange={this.handleChange}
              required>
          </Form.Control>
          <Button
          variant="warning"
            onClick={this.registerSubmit}
          >Submit</Button>
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
  mapStateToProps,
   { register, login } 
)(RegisterForm))

// import React from 'react';
// import { withFormik, Form, Field } from 'formik';

// import axios from 'axios';

// function RegisterForm({ errors, touched, isSubmitting }) {
//   return (
//     <Form>
//       <div>
//         {touched.username && errors.username && <p>{errors.username}</p>}
//         <Field type="username" name="username" placeholder="Username" />
//       </div>
//       <div>
//         {touched.password && errors.password && <p>{errors.password}</p>}
//         <Field type="password" name="password" placeholder="Password" />
//       </div>
//       <div>
//         {touched.first_name && errors.first_name && <p>{errors.first_name}</p>}
//         <Field type="first_name" name="first_name" placeholder="First Name" />
//       </div>
//       <div>
//         {touched.last_name && errors.last_name && <p>{errors.last_name}</p>}
//         <Field type="last_name" name="last_name" placeholder="Last Name" />
//       </div>
//       <button disabled={isSubmitting}>Submit</button>
//     </Form>
//   );
// }

// const Register = withFormik({
//   mapPropsToValues({ last_name, password, first_name, username }) {
//     return {
//       username: username || '',
//       password: password || '',
//       last_name: last_name || '',
//       first_name: first_name || ''
//     };
//   },
//   handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
//     console.log('VALUES: ', values);
//     if (values.username === 'alreadytaken@atb.dev') {
//       setErrors({ username: 'That username is already taken' });
//     } else {
//       axios
//         .post(
//           'https://labs-rv-life-staging-1.herokuapp.com/users/register',
//           values
//         )
//         .then(res => {
//           console.log('Success!!'); // data was created successfully and logs to console
//           resetForm();
//           setSubmitting(false);
//         })
//         .catch(err => {
//           console.log(err); // there was an error creating the data and logs to console
//           setSubmitting(false);
//         });
//     }
//   }
// })(RegisterForm);

// export default Register;
