import { useContext } from "react";
import { CartContext } from './cart.provider';
const CartActions = () => {
    const { state, dispatch } = useContext(CartContext);
    return {
        cartItems: state.cartItems,
        addItem: function (item) {
            dispatch({
                type: "ADD_ITEM",
                payload: item
            })
        },
        removeItem: function (item) {
            dispatch({
                type: "REMOVE_ITEM",
                payload: item
            })
        },
        setList: function (item) {
            dispatch({
                type: "SET_LIST",
                payload: item
            })
        },
        resetList: function (item) {
            dispatch({
                type: "RESET_LIST",
                payload: item
            })
        },
        getCombinedCartPrices: function () {
            dispatch({
                type: "TOTAL_PRICE"
            })
        }
    }
}
export default CartActions;

