import axios from 'axios'

export const LOADING = "LOADING"
export const ERROR_MESSAGE = "ERROR_MESSAGE"
export const GET_DATA = "GET_DATA"
export const LOGIN = "LOGIN"

export const getData = () => {
  return(dispatch) => {
    dispatch({type: LOADING})
    axios.get("https://labs15rvlife.herokuapp.com/api/v1")
    .then( response => {
      console.log("response", response.data);
      dispatch({type: GET_DATA, payload: response.data})        
    })
    .catch(err => {
      dispatch({type : ERROR_MESSAGE, errorMessage: "request failed"})
    })
  }
   
}

export const login = (values) => {
  return(dispatch) => {
    dispatch({type: LOADING})
    axios.post("https://labs-rv-life-staging-1.herokuapp.com/users/login", values)
    .then(res => {
        console.log(res); // data was created successfully and logs to console
        //resetForm();
        //setSubmitting(false);
      dispatch({type: LOGIN, payload: res.data})        

    })
    .catch(err => {
        console.log(err); // there was an error creating the data and logs to console
        //setSubmitting(false);
        dispatch({type : ERROR_MESSAGE, errorMessage: "request failed"})
    });
  }
   
}