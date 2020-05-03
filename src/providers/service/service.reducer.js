
export const INITIAL_STATE = {
    serviceItems: []
}
const serviceReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return {
                ...state,
                serviceItems: [...state.serviceItems, action.payload]
            };
        case "SET_LIST":
            return {
                ...state,
                serviceItems: action.payload
            };
        case "REMOVE_ITEM":
            return {
                ...state,
                serviceItems: state.serviceItems.filter(
                    cartItem => cartItem.ServiceID !== action.payload.ServiceID
                )
            };
        case "RESET_LIST":
            return {
                state: INITIAL_STATE
            };
        default:
            return state;
    }
}
export default serviceReducer;