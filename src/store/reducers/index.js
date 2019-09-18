import {
  LOADING,
  REGISTER,
  LOGIN,
  ADD_VEHICLE,
  GET_VEHICLE,
  DELETE_VEHICLE,
} from "../actions";

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
        error: "error",
        loading: false,
        data: [...state.data, { value: action.payload }]
      };
    case LOGIN:
      return {
        ...state,
        error: "error",
        loading: false,
        data: [...state.data, { value: action.payload }]
      };
    case ADD_VEHICLE:
      console.log("vehicles", state.vehicles.vehicles, action.payload)
      let vehicles = state.vehicles.vehicles.slice();
      vehicles.push(action.payload);
      console.log("vehicles push",vehicles)
      return {
        ...state,
        error: "error",
        loading: false,
        vehicles: {vehicles: vehicles}
      };
    case GET_VEHICLE:
      return {
        ...state,
        error: "error",
        loading: false,
        vehicles: { ...state.vehicles, vehicles: action.payload }
      };
    case DELETE_VEHICLE:
      let filteredVehicles = state.vehicles.vehicles.filter(vehicle => {
        console.log("vehicle info", vehicle.id, action.payload)
        return vehicle.id !== action.payload;
      });
      return {
        ...state,
        error: "error",
        loading: false,
        vehicles: {vehicles: filteredVehicles}
      };
    default:
      return state;
  }
};
