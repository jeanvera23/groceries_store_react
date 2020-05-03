import { useContext } from "react";
import { ServiceContext } from './service.provider';
const ServiceActions = () => {
    const { state, dispatch } = useContext(ServiceContext);
    return {
        serviceItems: state.serviceItems,
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
        }
    }
}
export default ServiceActions;

