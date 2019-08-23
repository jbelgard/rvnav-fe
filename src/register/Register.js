import React from 'react';
//import ReactDOM from 'react-dom';
//import { withFormik, Form, Field } from 'formik';
import { connect } from "react-redux";
import { register } from "../actions";
//import { withRouter } from 'react-router-dom';
//import { NavLink } from 'react-router-dom';

// import * as Yup from 'yup';
//import axios from 'axios';


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
    this.props.register(this.state.credentials);

    this.setState({
      username: '',
      passord: '',
      first_name: '',
      last_name: '',

    })
    this.props.history.push("/App")
    console.log("state", this.state);
  }
  
  render() {
    return(
      <div>
        <form>
          <input
            name="username"
            placeholder="username"
            type="string"
            value={this.state.credentials.username}
            onChange={this.handleChange}
            required
          ></input>
           <input
              name='first_name'
              placeholder="first name"
              type="string"
              value={this.state.credentials.first_name}
              onChange={this.handleChange}
              required>
          </input>
          <input
        
              name='last_name'
              placeholder="last name"
              type="string"
              value={this.state.credentials.last_name}
              onChange={this.handleChange}
              required>
          </input>
          <input
        
              type="password"
              name='password'
              placeholder="password"
              value={this.state.credentials.password}
              onChange={this.handleChange}
              required>
          </input>
          <button
            onClick={this.registerSubmit}
          >Submit</button>
        </form>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  //isLoggingIn:state.isLoggingIn
})

export default withRouter(connect(
  mapStateToProps,
   { register } 
)(RegisterForm))


// function RegisterForm({ values, errors, touched, isSubmitting }, props) {
//   return (
//     <Form>
//       <div>
//         {console.log("props", props)}
//         {touched.username && errors.username && <p>{errors.username}</p>}
//         <Field type = 'username' name = 'username' placeholder = 'Username' />
//       </div>
//       <div>
//         {touched.password && errors.password && <p>{errors.password}</p>}
//         <Field type = 'password' name = 'password' placeholder = 'Password' />
//       </div>
//       <div>
//         {touched.firstname && errors.firstname && <p>{errors.firstname}</p>}
//         <Field type = 'firstname' name = 'firstname' placeholder = 'First Name' />
//       </div>
//       {/* // need to change name to firstname and email to lastname and add either drop down or radial selectors for 3 types of rv  a, b, c */}
//       <div>
//         {touched.lastname && errors.lastname && <p>{errors.lastname}</p>}
//         <Field type = 'lastname' name = 'lastname' placeholder = 'Last Name' />
//       </div>
//       <label>
//         <Field type = 'checkbox' name = 'tos' checked = {values.tos} />
//         Accept TOS
//       </label>
//       <button disabled = {isSubmitting}>Submit</button>
//     </Form>
//   );
// }

// const Register = withFormik({
//   mapPropsToValues({ lastname, password, firstname, username, tos }) {
//     return {
//       username: username || '',
//       password: password || '',
//       firstname: firstname || '',
//       lastname: lastname || '',
//       tos: tos || ''
//     };
//   },
//   // validationSchema: Yup.object().shape({
//   //   username: Yup.string()
//   //     .username("Username not valid")
//   //     .required('Username is required'),
//   //   password: Yup.string()
//   //     .min(8, "Password must be 8 characters or longer")
//   //     .required('Password is required'),
//   //   name: Yup.string()
//   //     .name('Name not valid')
//   //     .required('Name is required'),
//   //   email: Yup.string()
//   //     .email('Email not valid')
//   //     .required('Email is required')
//   // }),
//   handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
//     if (values.username === 'alreadytaken@atb.dev') {
//       setErrors({ username: 'That username is already taken' });
//     } else {
//       axios
//         .post("https://labs-rv-life-staging-1.herokuapp.com/users/register", values)
//         .then(res => { 
//           console.log("props", props);
//           console.log("values", values);
//           console.log(res); // data was created successfully and logs to console
//           resetForm();
//           setSubmitting(false);
//         })
//         .catch(err => {
//           console.log("props", props);
//           console.log("values", values);
//           console.log(err);  // there was an error creating the data and logs to console
//           setSubmitting(false);
//         });
//     }
//   }
// })(RegisterForm);

// export default Register;