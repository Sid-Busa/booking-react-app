import {FLIGHT_DETAILS, BOOKING_DETAILS} from "../types"

export function submitFlightData(data) {
    return (dispatch) => (
             dispatch({
                type: FLIGHT_DETAILS,
                payload: data
            })
    )
}

export function submitBookingDetails(data) {
    return (dispatch) => (
             dispatch({
                type: BOOKING_DETAILS,
                payload: data
            })
    )
}
