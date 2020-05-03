import React, { createContext, useEffect, useReducer } from 'react';

import userReducer,{INITIAL_STATE} from "./user.reducer";

export const UserContext = createContext();


const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE, (INITIAL_STATE) => {
        const localData = sessionStorage.getItem("UserProvider");
        return localData ? JSON.parse(localData) : INITIAL_STATE
    });
    useEffect(() => {
        sessionStorage.setItem('UserProvider', JSON.stringify(state));
    }, [state])

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;