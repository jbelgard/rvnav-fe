import axios from 'axios';

export const LOADING = 'LOADING';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const ADD_VEHICLE = 'ADD_VEHICLE';
export const GET_VEHICLE = 'GET_VEHICLE';
export const GET_WALMARTS = 'GET_WALMARTS';
export const GET_HERE = "GET_HERE";

export const register = creds => {
  return dispatch => {
    dispatch({ type: LOADING });
    return axios
      .post(
        'https://labs-rv-life-staging-1.herokuapp.com/users/register',
        creds
      )
      .then(response => {
        dispatch({ type: REGISTER, payload: response.data });
        return true;
      })
      .catch(err => {
        dispatch({
          type: ERROR_MESSAGE,
          errorMessage: 'User was unable to be createed.'
        });
      });
  };
};

export const login = values => {
  return dispatch => {
    dispatch({ type: LOADING });
    return axios
      .post('https://labs-rv-life-staging-1.herokuapp.com/users/login', values)
      .then(res => {
        console.log(res); // data was created successfully and logs to console
        localStorage.setItem('token', res.data.token);
        dispatch({ type: LOGIN, payload: res.data });
        return true;
      })
      .catch(err => {
        console.log(err); // there was an error creating the data and logs to console
        dispatch({ type: ERROR_MESSAGE, errorMessage: 'request failed' });
      });
  };
};

export const addVehicle = value => {
  return dispatch => {
    dispatch({ type: LOADING });
    return axios
      .post('https://labs-rv-life-staging-1.herokuapp.com/vehicle', value,
      {headers: { Authorization: localStorage.getItem("token") }, 'Content-Type': 'application/json'})
      .then(res => {
        console.log(res); // data was created successfully and logs to console
        
        dispatch({ type: ADD_VEHICLE, payload: res.data });
        return true;
      })
      .catch(err => {
        console.log(err); // there was an error creating the data and logs to console
        dispatch({ type: ERROR_MESSAGE, errorMessage: 'request failed' });
      });
  };
};

export const getVehicles = () => {
  return dispatch => {
    dispatch({ type: LOADING });
    return axios
      .get('https://labs-rv-life-staging-1.herokuapp.com/vehicle',
      {headers: { Authorization: localStorage.getItem("token") }, 'Content-Type': 'application/json'})
      .then(res => {
        console.log("get res", res); // data was created successfully and logs to console
        
        dispatch({ type: GET_VEHICLE, payload: res.data });
        return true;
      })
      .catch(err => {
        console.log(err); // there was an error creating the data and logs to console
        dispatch({ type: ERROR_MESSAGE, errorMessage: 'request failed' });
      });
  };
};

export const getWalmarts = () => {
  return dispatch => {
    dispatch({ type: LOADING });
    return axios
      .get('http://eb-flask-rv-dev.us-east-1.elasticbeanstalk.com/fetch_walmart')
      .then(res => {
        console.log("get res", res); // data was created successfully and logs to console
        
        dispatch({ type: GET_WALMARTS, payload: res.data });
        return true;
      })
      .catch(err => {
        console.log(err); // there was an error creating the data and logs to console
        dispatch({ type: ERROR_MESSAGE, errorMessage: 'request failed' });
      });
  };
};

export const getHere = (send) => {
  return dispatch => {
    dispatch({ type: LOADING });
    return axios
      .get('https://route.api.here.com/routing/7.2/calculateroute.json?waypoint0=50.0522%2C8.2180&waypoint1=50.0957%2C8.5280&mode=fastest%3Btruck&avoidareas=50.1062%2C8.2811%3B50.0180%2C8.4253&app_id=arvginqRfleoK8308SvJ&app_code=sFz75OkwERmUxkBGeUjepg&departure=now', send)
      .then(res => {
        console.log("here res", res); // data was created successfully and logs to console
        
        dispatch({ type: GET_HERE, payload: res.data });
        return true;
      })
      .catch(err => {
        console.log(err); // there was an error creating the data and logs to console
        dispatch({ type: ERROR_MESSAGE, errorMessage: 'request failed' });
      });
  };
};