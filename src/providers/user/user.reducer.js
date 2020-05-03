
export const INITIAL_STATE = {
    currentUser: null,
    location: {
        lat: -16.408231,
        lng: -71.537385
    }
}
const userReducer = (state, action) => {
    switch (action.type) {
        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser: action.payload
            };
        case "SET_CURRENT_LOCATION":
            return {
                ...state,
                location: action.payload
            };
        case "RESET_USER":
            return {
                state: INITIAL_STATE
            };
        default:
            return state;
    }
}
export default userReducer;