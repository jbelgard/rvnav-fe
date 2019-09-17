import { LOADING, REGISTER, LOGIN, ADD_VEHICLE, GET_VEHICLE, 
  DELETE_VEHICLE,
  UPDATE_VEHICLE,
  DUPLICATE_USER, DUPLICATE_EMAIL, AUTH_ERROR, INVALID_CREDENTIALS, CLEAR_ERROR } from '../actions';

const initialState = {
  data: [],
  vehicles: [],
  error: null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        // error: null,
        loading: true
      };
    case REGISTER:
      return {
        ...state,
        // error: null,
        loading: false,
        data: [...state.data, { value: action.payload }]
      };
    case LOGIN:
      return {
        ...state,
        // error: null,
        loading: false,
        data: [...state.data, { value: action.payload }]
      };
      case ADD_VEHICLE:
        return {
          ...state,
          // error: null,
          loading: false,
          data: [...state.data, { value: action.payload }]
        };
      case GET_VEHICLE:
        return {
          ...state,
          // error: null,
          loading: false,
          vehicles: [...state.vehicles, { vehicles: action.payload }]        
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: "error",
        loading: false,
      }
    case DUPLICATE_USER:
      return {
        ...state,
        error: "Username already taken",
        loading: false,
      }
    case DUPLICATE_EMAIL:
      return {
        ...state,
        error: "Email already taken",
        loading: false,
      }
    case INVALID_CREDENTIALS:
      return {
        ...state,
        error: "Invalid username or password",
        loading: false,
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    case SELECTED:
        console.log("reducer time")
        return {
          ...state,
          selected_id: action.payload
        }
    default:
      return state;
  }
};
