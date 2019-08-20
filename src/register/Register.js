import React from 'react';
import ReactDOM from 'react-dom';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
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
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field type = 'name' name = 'name' placeholder = 'Name' />
      </div>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type = 'email' name = 'email' placeholder = 'Email' />
      </div>
      <label>
        <Field type = 'checkbox' name = 'tos' checked = {values.tos} />
        Accept TOS
      </label>
      <button disabled = {isSubmitting}>Submit</button>
    </Form>
  );
}

const Register = withFormik({
  mapPropsToValues({ email, password, name, username, tos }) {
    return {
      username: username || '',
      password: password || '',
      email: email || '',
      name: name || '',
      tos: tos || ''
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .username("Username not valid")
      .required('Username is required'),
    password: Yup.string()
      .min(8, "Password must be 8 characters or longer")
      .required('Password is required'),
    name: Yup.string()
      .name('Name not valid')
      .required('Name is required'),
    email: Yup.string()
      .email('Email not valid')
      .required('Email is required')
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.username === 'alreadytaken@atb.dev') {
      setErrors({ username: 'That username is already taken' });
    } else {
      axios
        .post("https://labs-rv-life-staging-1.herokuapp.com/users/register", values)
        .then(res => {
          console.log(res); // data was created successfully and logs to console
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