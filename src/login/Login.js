import React from 'react';
import ReactDOM from 'react-dom';
import { withFormik, Form, Field } from 'formik';
import { connect } from "react-redux";
import { login } from "../actions"

// import * as Yup from 'yup';
import axios from 'axios';



function LoginForm({ values, errors, touched, isSubmitting }) {
    return (
        <Form>
            <div>
                {/*console.log("props", props)*/}
                {touched.username && errors.username && <p>{errors.username}</p>}
                <Field type = 'username' name = 'username' placeholder = 'Username' />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type = 'password' name = 'password' placeholder = 'Password' />
            </div>
            {/* <label>
                <Field type = 'checkbox' name = 'tos' checked = {values.tos} />
                Accept TOS
            </label> */}
            <button disabled = {isSubmitting}>Submit</button>
        </Form>
    );
}

const Login = withFormik({
    mapPropsToValues({ username, password, tos }) {
        return {
            username: username || '',
            password: password || '',
            // tos: tos || false,
        };
    },
    // validationSchema: Yup.object().shape({
    //     username: Yup.string()
    //         .username('Username not valid')
    //         .required('Username is required'),
    //     password: Yup.string()
    //         .min(8, 'Password must be 8 characters or longer')
    //         .required('Password is required')
    // }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        if (values.username === 'alreadytaken@atb.dev') {
            setErrors({ username: 'That username is already taken' });
        } else {
            // this.props.login(values)
            axios.post("https://labs-rv-life-staging-1.herokuapp.com/users/login", values)
                .then(res => {
                    console.log("Success!!!"); // data was created successfully and logs to console
                    resetForm();
                    setSubmitting(false);
                })
                .catch(err => {
                    console.log(err); // there was an error creating the data and logs to console
                    setSubmitting(false);
                });
        }
    }
})(LoginForm);

export default Login;
