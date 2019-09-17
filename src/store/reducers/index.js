import { LOADING, REGISTER, LOGIN, ADD_VEHICLE, GET_VEHICLE, DELETE_VEHICLE, UPDATE_VEHICLE} from '../actions';

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
    case UPDATE_VEHICLE:
      console.log(state.vehicles)
      console.log(state.vehicles.vehicles)
      console.log("payload", action.payload)
      let filteredVehicles = state.vehicles.vehicles.filter(currentVal => {
        return currentVal.id !== action.payload.id;
      })
      let currentVehicles = state.vehicles.vehicles.filter(currentVal => {
        return currentVal.id === action.payload.id;
      })
      let updates = { ...action.payload.value, id: action.payload.id}
      currentVehicles = {...currentVehicles[0], ...updates}
      console.log(filteredVehicles, currentVehicles, "Filters")
      return {
        ...state,
        error: 'error',
        loading: false,
        vehicles: {vehicles: filteredVehicles.push(currentVehicles)}
      };

    default:
      return state;
  }
};
