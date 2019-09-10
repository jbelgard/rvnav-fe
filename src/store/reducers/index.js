import { LOADING, REGISTER, LOGIN, ADD_VEHICLE, GET_VEHICLE, DUPLICATE_USER } from '../actions';

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
    case DUPLICATE_USER:
      return {
        ...state,
        error: 'Username already taken',
        loading: false,
      }
    default:
      return state;
  }
};
