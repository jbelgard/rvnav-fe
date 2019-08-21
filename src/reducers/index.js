import{
 LOADING,
 GET_DATA
} from "../actions"

const initialState = {
  data: []
}

export const reducer = (state=initialState, action) => {
  switch(action.type){
    case LOADING:
      return{
        ...state,
      error: null,
      loading: true
      }
    case GET_DATA:
      return{
           ...state,
        error: "error",
        loading: false,
        data: [...state.data, {value: action.payload}]
        }
    default:
      return state;
  }
}