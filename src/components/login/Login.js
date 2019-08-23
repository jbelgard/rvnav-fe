// import React from 'react';
// import { withFormik, Form, Field } from 'formik';

// import axios from 'axios';

// function LoginForm({ errors, touched, isSubmitting }) {
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
//       <button disabled={isSubmitting}>Submit</button>
//     </Form>
//   );
// }

// const Login = withFormik({
//   mapPropsToValues({ username, password }) {
//     return {
//       username: username || '',
//       password: password || ''
//     };
//   },
//   handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
//     if (values.username === 'alreadytaken@atb.dev') {
//       setErrors({ username: 'That username is already taken' });
//     } else {
//       axios
//         .post(
//           'https://labs-rv-life-staging-1.herokuapp.com/users/login',
//           values
//         )
//         .then(res => {
//           console.log('Success!!!'); // data was created successfully and logs to console
//           resetForm();
//           setSubmitting(false);
//         })
//         .catch(err => {
//           console.log(err); // there was an error creating the data and logs to console
//           setSubmitting(false);
//         });
//     }
//   }
// })(LoginForm);

// export default Login;
