import React from 'react';
import ReactDOM from 'react-dom';
import { withFormik, Form, Field } from 'formik';
import { connect } from "react-redux";

// import * as Yup from 'yup';
import axios from 'axios';

function RegisterForm({ values, errors, touched, isSubmitting }) {
  return (
    <Form>
      <div>
        {touched.username && errors.username && <p>{errors.username}</p>}
        <Field type = 'username' name = 'username' placeholder = 'Username' />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type = 'password' name = 'password' placeholder = 'Password' />
      </div>
      <div>
        {touched.first_name && errors.first_name && <p>{errors.first_name}</p>}
        <Field type = 'first_name' name = 'first_name' placeholder = 'First Name' />
      </div>
      {/* // need to change name to firstname and email to lastname and add either drop down or radial selectors for 3 types of rv  a, b, c */}
      <div>
        {touched.last_name && errors.last_name && <p>{errors.last_name}</p>}
        <Field type = 'last_name' name = 'last_name' placeholder = 'Last Name' />
      </div>
      {/* <label>
        <Field type = 'checkbox' name = 'tos' checked = {values.tos} />
        Accept TOS
      </label> */}
      <button disabled = {isSubmitting}>Submit</button>
    </Form>
  );
}

const Register = withFormik({
  mapPropsToValues({ last_name, password, first_name, username }) {
    return {
      username: username || '',
      password: password || '',
      last_name: last_name || '',
      first_name: first_name || '',
      // tos: tos || ''
    };
  },
  // validationSchema: Yup.object().shape({
  //   username: Yup.string()
  //     .username("Username not valid")
  //     .required('Username is required'),
  //   password: Yup.string()
  //     .min(8, "Password must be 8 characters or longer")
  //     .required('Password is required'),
  //   name: Yup.string()
  //     .name('Name not valid')
  //     .required('Name is required'),
  //   email: Yup.string()
  //     .email('Email not valid')
  //     .required('Email is required')
  // }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    console.log("VALUES: ", values)
    if (values.username === 'alreadytaken@atb.dev') {
      setErrors({ username: 'That username is already taken' });
    } else {
      axios
        .post("https://labs-rv-life-staging-1.herokuapp.com/users/register", values)
        .then(res => {
          console.log("Success!!"); // data was created successfully and logs to console
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err);  // there was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
  }
})(RegisterForm);

export default Register;