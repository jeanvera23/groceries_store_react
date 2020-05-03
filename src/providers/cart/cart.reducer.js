import { addItem, removeItem, getCartTotal } from './cart.utils';

export const INITIAL_STATE = {
    cartItems: []
}
const serviceReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return {
                ...state,
                cartItems: addItem(state.cartItems, action.payload)
            };
        case "SET_LIST":
            return {
                ...state,
                cartItems: action.payload
            };
        case "REMOVE_ITEM":
            return {
                ...state,
                cartItems: removeItem(state.cartItems, action.payload)
            };
        case "TOTAL_PRICE":
            
            console.log("Total price");
            console.log( getCartTotal(state.cartItems));
            return getCartTotal(state.cartItems);
        case "RESET_LIST":
            return {
                state: INITIAL_STATE
            };
        default:
            return state;
    }
}
export default serviceReducer;