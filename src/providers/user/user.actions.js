import { useContext } from "react";
import { UserContext } from './user.provider';
const UserActions = () => {
    const { state, dispatch } = useContext(UserContext);
    return {
        currentUser: state.currentUser,
        location: state.location,
        setCurrentUser: function (item) {
            dispatch({
                type: "SET_CURRENT_USER",
                payload: item
            })
        },
        setCurrentLocation: function (item) {
            dispatch({
                type: "SET_CURRENT_LOCATION",
                payload: item
            })
        },
        resetUser: function (item) {
            dispatch({
                type: "RESET_USER",
                payload: item
            })
        }
    }
}
export default UserActions;



