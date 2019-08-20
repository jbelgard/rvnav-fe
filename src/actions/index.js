import axios from 'axios'

export const LOADING = "LOADING"
export const ERROR_MESSAGE = "ERROR_MESSAGE"
export const GET_DATA = "GET_DATA"

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