import { FLIGHT_DETAILS, BOOKING_DETAILS } from "../types";
const initialState = {
  flightData: [],
  bookingData: []
};

const flightReducer = function (state = initialState, action) {
  switch (action.type) {
    case FLIGHT_DETAILS: {
      return {
        ...state,
        flightData: action.payload,
      };
    }
    case BOOKING_DETAILS: {
        console.log(action.payload)
        return {
          ...state,
          bookingData: action.payload,
        };
      }
    default: {
      return state;
    }
  }
};

export default flightReducer;
