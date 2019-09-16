import { LOADING, REGISTER, LOGIN, ADD_VEHICLE, GET_VEHICLE, DELETE_VEHICLE} from '../actions';

const initialState = {
  data: [],
  vehicles: {},
  here: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        error: null,
        loading: true
      };
    case REGISTER:
      return {
        ...state,
        error: 'error',
        loading: false,
        data: [...state.data, { value: action.payload }]
      };
    case LOGIN:
      return {
        ...state,
        error: 'error',
        loading: false,
        data: [...state.data, { value: action.payload }]
      };
      case ADD_VEHICLE:
        return {
          ...state,
          error: 'error',
          loading: false,
          data: [...state.data, { value: action.payload }]
        };
      case GET_VEHICLE:
        return {
          ...state,
          error: 'error',
          loading: false,
          vehicles: {...state.vehicles, vehicles: action.payload}        
        };
        case DELETE_VEHICLE:
          return {
            ...state,
            error: 'error',
            loading: false,
            vehicles: {...state.vehicles, vehicles: action.payload}        
          };

    default:
      return state;
  }
};
